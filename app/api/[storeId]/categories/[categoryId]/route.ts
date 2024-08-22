import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { categoryId: string } }) {
    try {
        if (!params.categoryId) return new NextResponse("Need Category Id ", { status: 400 })
        const category = await db.category.findUnique({
            where: {
                id: params.categoryId,
            },
            include: {
                banner: true
            }
        })
        return NextResponse.json(category)

    } catch (error) {
        console.log('[CATEGORY_GET]', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function PATCH(req: Request, { params }: { params: { storeId: string, categoryId: string } }) {
    try {

        const body = await req.json()
        const { name, bannerId, userID } = body

        if (!userID) return new NextResponse("Unauthorized User Id from AUTH Clerk", { status: 401 })
        if (!name) return new NextResponse("Name Store must be input", { status: 400 })
        if (!bannerId) return new NextResponse("Banner ID must be input", { status: 400 })
        if (!params.categoryId) return new NextResponse("Need Category Id ", { status: 400 })

        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId: userID

            }
        })
        if (!storeByUserId) return new NextResponse("Unauthorized Store By User ID", { status: 401 })

        const category = await db.category.update({
            where: {
                id: params.categoryId,
            },
            data: {
                name,
                bannerId
            }
        })
        return NextResponse.json(category)

    } catch (error) {
        console.log('[CATEGORY_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string, categoryId: string } }) {
    try {

        const body = await req.json()
        const { userID } = body

        if (!userID) return new NextResponse("Unauthorized", { status: 401 })
        if (!params.categoryId) return new NextResponse("Need Category Id ", { status: 400 })

        const storeByUserId = await db.store.findFirst({
            where: {
                id: params.storeId,
                userId: userID

            }
        })
        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 401 })

        const category = await db.category.deleteMany({
            where: {
                id: params.categoryId,
            }
        })

        return NextResponse.json(category)

    } catch (error) {
        console.log('[CATEGORY_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}