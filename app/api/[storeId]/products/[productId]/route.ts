import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { productId: string } }) {
    try {
        if (!params.productId) return new NextResponse("Need Product Id ", { status: 400 })
        const product = await db.product.findUnique({
            where: {
                id: params.productId,
            },
            include: {
                images: true
            }
        })
        return NextResponse.json(product)

    } catch (error) {
        console.log('[PRODUCT_GET]', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function PATCH(req: Request, { params }: { params: { storeId: string, productId: string } }) {
    try {

        const body = await req.json()
        const { name, price, categoryId, images, isFeatured, isArchived, userID } = body
        

        if (!userID) return new NextResponse("Unauthorized", { status: 401 })
        if (!name) return new NextResponse("Product label must be Input", { status: 400 })
        if (!images || !images.length) return new NextResponse("Product image must be Input", { status: 400 })
        if (!price) return new NextResponse("Product price must be Input", { status: 400 })
        if (!categoryId) return new NextResponse("Product category must be Input", { status: 400 })
        if (!params.productId) return new NextResponse("Need Product Id ", { status: 400 })

        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId: userID

            }
        })
        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 401 })

        const product = await db.product.update({
            where: {
                id: params.productId,
            },
            data: {
                name,
                price,
                isFeatured,
                isArchived,
                categoryId,
                images: {
                    deleteMany: {},
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                },
            }
        })

        // const product = await db.product.update({
        //     where: {
        //         id: params.productId
        //     },
        //     data: {
        //         images: {
        //             createMany: {
        //                 data: [
        //                     ...images.map((image: { url: string }) => image)
        //                 ]
        //             }
        //         }
        //     }
        // })
        console.log(product);
        

        return NextResponse.json(product)

    } catch (error) {
        console.log('[PRODUCT_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string, productId: string } }) {
    try {
        // const body = await req.json()
        // const { userID } = body

        // if (!userID) return new NextResponse("Unauthorized", { status: 401 })
        if (!params.productId) return new NextResponse("Need Product Id ", { status: 400 })

        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
            }
        })
        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 401 })

        const product = await db.product.deleteMany({
            where: {
                id: params.productId,
            }
        })

        return NextResponse.json(product)

    } catch (error) {
        console.log('[PRODUCT_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}