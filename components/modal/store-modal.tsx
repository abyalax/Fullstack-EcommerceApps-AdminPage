'use client'

import { useStoreModal } from "@/hooks/use-store-modal"
import * as z from "zod"
import Modal from "../ui/modal"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

const formSchema = z.object({
    name: z.string().min(1),
})

const StoreModal = () => {
    const storeModal = useStoreModal()
    const [isLoading, setIsLoading] = useState(false)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)

            const response = await axios.post('/api/stores', value)
            console.log(response.data);
            toast.success("Berhasil membuat Toko")
            window.location.assign(`/${response.data.id}`)
        } catch
         (error) {
            toast.error("Gagal Membuat Toko")
            console.log(error);
        } finally {
            setIsLoading(false)
        }
        console.log(value);
    }
    
    return (
        <Modal
            description="Tambahkan  Store untuk membuat produk dan kategori"
            title="Buat Store"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}>
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Store Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Nama Toko" />
                                        </FormControl>
                                        <FormDescription>
                                            This is your store name
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6 space-x-2 w-full flex justify-end items-center">
                                <Button
                                    variant="outline"
                                    type="button"
                                    disabled={isLoading}
                                    onClick={storeModal.onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="default"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Loading..." : "Continue"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}
export default StoreModal