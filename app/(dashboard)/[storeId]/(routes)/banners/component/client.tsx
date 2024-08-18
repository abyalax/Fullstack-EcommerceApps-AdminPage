'use client'

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { BannerColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ApiList from "@/components/ui/api-list"

interface BannerClientProps {
    data: BannerColumn[]
}

const BannerClient = ({ data }: BannerClientProps) => {

    const params = useParams()
    const router = useRouter()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={`Banners (${data.length})`} description="Manage your banners" />
                <Button onClick={() => router.push(`/${params.storeId}/banners/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Banner
                </Button>
            </div>
            <Separator />
            <DataTable data={data} columns={columns} searchKey="label" />
            <Heading title="API" description="API for your banners" />
            <Separator />
            <ApiList namaIndikator="banners" idIndikator="bannerId"/>
        </>
    )
}

export default BannerClient
