'use client'

import { useOrigin } from "@/hooks/use-origin"
import { useParams } from "next/navigation"
import { ApiAlert } from "./api-alert"

interface ApiListProps {
    namaIndikator: string
    idIndikator: string
}

const ApiList = ({ namaIndikator, idIndikator }: ApiListProps) => {

    const params = useParams()
    const origin = useOrigin()
    const baseURL = `${origin}/api/${params.storeId}`

    return (
        <>
            <ApiAlert
                title="GET"
                variant="public"
                description={`${baseURL}/${namaIndikator}`}
            />
            <ApiAlert
                title="GET"
                variant="public"
                description={`${baseURL}/${namaIndikator}/${idIndikator}`}
            />
            <ApiAlert
                title="POST"
                variant="admin"
                description={`${baseURL}/${namaIndikator}`}
            />
            <ApiAlert
                title="PATCH"
                variant="admin"
                description={`${baseURL}/${namaIndikator}/${idIndikator}`}
            />
            <ApiAlert
                title="DELETE"
                variant="admin"
                description={`${baseURL}/${namaIndikator}/${idIndikator}`}
            />
        </>
    )
}

export default ApiList
