'use client'

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ProductColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ApiList from "@/components/ui/api-list"

interface ProductClientProps {
    data: ProductColumn[]
}

const ProductClient = ({ data }: ProductClientProps) => {

    const params = useParams()
    const router = useRouter()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Products (${data.length})`} description="Manage your Products" />
                <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Product
                </Button>
            </div>
            <Separator />
            <DataTable data={data} columns={columns} searchKey="name" />
            <Heading title="API" description="API for your products" />
            <Separator />
            <ApiList namaIndikator="products" idIndikator="productId" />
        </>
    )
}

export default ProductClient
