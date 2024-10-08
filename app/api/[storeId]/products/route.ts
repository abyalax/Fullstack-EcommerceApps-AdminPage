import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const body = await req.json()

        const { name, price, categoryId, images, isFeatured, isArchived, userID } = body

        if (!userID) return new NextResponse("Unauthorized", { status: 401 })
        if (!name) return new NextResponse("Banner label must be Input", { status: 400 })
        if (!images || !images.length) return new NextResponse("Banner image must be Input", { status: 400 })
        if (!price) return new NextResponse("Banner price must be Input", { status: 400 })
        if (!categoryId) return new NextResponse("Banner category must be Input", { status: 400 })
        if (!params.storeId) return new NextResponse("Need Store Id ", { status: 400 })

        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId: userID

            }
        })
        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 401 })

        const product = await db.product.create({
            data: {
                name,
                price,
                categoryId,
                isFeatured,
                isArchived,
                storeId: params.storeId,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                }
            }
        })
        return NextResponse.json(product)

    } catch (error) {
        console.log("[PRODUCTS_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { searchParams } = new URL(req.url)
        const categoryId = searchParams.get("categoryId") || undefined
        const isFeatured = searchParams.get("isFeatured")
        if (!params.storeId) return new NextResponse("Need Store Id ", { status: 400 })
        const product = await db.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false
            },
            include: {
                images: true,
                category: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return NextResponse.json(product)

    } catch (error) {
        console.log("[PRODUCTS_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}