import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const body = await req.json()
        const { label, imageUrl, userID } = body

        if (!userID) return new NextResponse("Unauthorized", { status: 401 })
        if (!label) return new NextResponse("Banner name must be Input", { status: 400 })
        if (!imageUrl) return new NextResponse("Banner image must be Input", { status: 400 })
        if (!params.storeId) return new NextResponse("Need Store Id ", { status: 400 })

        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId: userID

            }
        })
        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 401 })

        const banner = await db.banner.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            }
        })
        
        return NextResponse.json(banner)

    } catch (error) {
        console.log("[BANNERS_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {
        if (!params.storeId) return new NextResponse("Need Store Id ", { status: 400 })

        const banner = await db.banner.findMany({
            where: {
                storeId: params.storeId
            }   
        })
        return NextResponse.json(banner)

    } catch (error) {
        console.log("[BANNERS_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}