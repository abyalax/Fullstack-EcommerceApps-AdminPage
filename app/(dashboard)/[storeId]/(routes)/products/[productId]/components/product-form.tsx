'use client'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Category, Image, Product } from "@prisma/client"
import Heading from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import * as z from "zod"
import { Separator } from "@/components/ui/separator"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { AlertModal } from "@/components/modal/alert-modal"
import ImageUpload from "@/components/ui/image-upload"
import { Checkbox } from "@/components/ui/checkbox"
import { auth } from "@clerk/nextjs/server"
import { useAuth } from "@clerk/nextjs"


interface ProductFormProps {
    initialData: Product & {
        images: Image[]
    } | null
    categories: Category[]
}

const formSchema = z.object({
    name: z.string().min(1),
    images: z.object({ url: z.string() }).array(),
    price: z.coerce.number().min(1),
    categoryId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional()
})

type ProductFormValues = z.infer<typeof formSchema>

const ProductForm = ({ initialData, categories }: ProductFormProps) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const router = useRouter()
    const { userId } = useAuth()
    console.log({ userId });
    const title = initialData ? "Edit Product" : "Add Product"
    const description = initialData ? "Edit Product Store" : "Add Product Store"
    const action = initialData ? "Save Product" : "Create Product"
    const actionLoading = loading ? "Loading..." : action

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            price: parseFloat(String(initialData?.price)),
        } : {
            name: '',
            images: [],
            price: 0,
            categoryId: '',
            isFeatured: false,
            isArchived: false
        },
    })

    const onSubmit = async (data: ProductFormValues) => {
        try {
            setLoading(true)
            const newData = {
                ...data,
                userId,
            }
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/products/${params.productId}`, newData)
            } else {
                await axios.post(`/api/${params.storeId}/products`, newData)
            }
            router.refresh()
            toast.success("Success Upload Product")
            router.push(`/${params.storeId}/products`)
        } catch (error) {
            toast.error("Check Your Data Again")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/products/${params.productId}`)
            router.refresh()
            router.push(`/${params.storeId}/products`)
            toast.success("Success Delete Product")
        } catch (error) {
            console.log(error)
            toast.error("Failed to delete products, Check your connection")
            setLoading(false)
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {initialData && (<Button
                    variant={"destructive"}
                    size={"sm"}
                    disabled={loading}
                    onClick={() => setOpen(true)}>
                    <Trash className="h-4 w-4" />
                </Button>)}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <FormField control={form.control} name="images" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Images</FormLabel>
                            <FormControl>
                                <ImageUpload
                                    disabled={loading}
                                    onChange={(url) => field.onChange([...field.value, { url }])}
                                    onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                                    value={field.value.map((image) => image.url)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Product Name" disabled={loading} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="price" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input placeholder="Rp" disabled={loading} {...field} type="number" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="categoryId" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select Category"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="isFeatured" render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Featured
                                    </FormLabel>
                                    <FormDescription>
                                        This product will be displayed on the home page.
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="isArchived" render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Archived
                                    </FormLabel>
                                    <FormDescription>
                                        This product will be hidden from the home page.
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )} />
                    </div>
                    <Button type="submit" disabled={loading}>
                        {actionLoading}
                    </Button>
                </form>
            </Form>
            <Separator />
        </>
    )
}

export default ProductForm
