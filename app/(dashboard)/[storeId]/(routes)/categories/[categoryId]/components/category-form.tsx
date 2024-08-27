'use client'

import { Banner, Category } from "@prisma/client"
import Heading from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import * as z from "zod"
import { Separator } from "@/components/ui/separator"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { AlertModal } from "@/components/modal/alert-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUserContext } from "@/context/user-context"


interface CategoryFormProps {
    initialData: Category | null
    banners: Banner[]
}

const formSchema = z.object({
    name: z.string().min(1),
    bannerId: z.string().min(1)
})

type CategoryFormValues = z.infer<typeof formSchema>

const CategoryForm = ({ initialData, banners }: CategoryFormProps) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const router = useRouter()
    // const { userId } = useAuth()
    const { userID } = useUserContext()
    const title = initialData ? "Edit Category" : "Add Category"
    const description = initialData ? "Edit Category Store" : "Add Category Store"
    const action = initialData ? "Save Category" : "Create Category"

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            bannerId: ''
        }
    })

    const onSubmit = async (data: CategoryFormValues) => {
        try {
            setLoading(true)
            const newData = {
                ...data,
                userID
            }
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, newData)
            } else {
                await axios.post(`/api/${params.storeId}/categories`, newData)
            }
            router.refresh()
            toast.success("Success Update Category")
            router.push(`/${params.storeId}/categories`)
        } catch (error) {
            toast.error("Check Your Data Again")
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`)
            router.refresh()
            router.push(`/${params.storeId}/categories`)
            toast.success("Success Delete Category")
        } catch (error) {
            console.log(error)
            toast.error("Failed to delete category, Check your connection")
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
                    <div className="grid grid-cols-3 gap-8">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Banner Name" disabled={loading} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="bannerId" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Banner</FormLabel>
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
                                                    placeholder="Select Banner"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {banners.map((banner) => (
                                                <SelectItem key={banner.id} value={banner.id}>
                                                    {banner.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <Button type="submit" disabled={loading}>
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator />
        </>
    )
}

export default CategoryForm
