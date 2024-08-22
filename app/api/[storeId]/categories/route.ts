import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const body = await req.json()

        const { name, bannerId, userId } = body

        console.log(userId);
        
        if (!userId) return new NextResponse("Unauthorized", { status: 401 })

        if (!name) return new NextResponse("Category name must be Input", { status: 400 })

        if (!bannerId) return new NextResponse("Banner ID must be Input", { status: 400 })

        if (!params.storeId) return new NextResponse("Need Store Id ", { status: 400 })

        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId,

            }
        })
        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 401 })

        const category = await db.category.create({
            data: {
                name,
                bannerId,
                storeId: params.storeId
            }
        })
        
        return NextResponse.json(category)

    } catch (error) {
        console.log("[CATEGORIES_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {
        if (!params.storeId) return new NextResponse("Need Store Id ", { status: 400 })

        const categories = await db.category.findMany({
            where: {
                storeId: params.storeId
            }   
        })
        return NextResponse.json(categories)

    } catch (error) {
        console.log("[CATEGORIES_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}