import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { storeId: string } }) {
    
    try {

        const body = await req.json()
        const { name, userID } = body
        console.log({userID});
        

        if (!userID) return new NextResponse("Unauthorized", { status: 401 })
        if (!name) return new NextResponse("Store Name must be input", { status: 400 })
        if (!params.storeId) return new NextResponse("Need Store Id ", { status: 400 })

        const store = await db.store.update({
            where: {
                id: params.storeId,
                userId: userID
            },
            data: {
                name
            }
        })

        return NextResponse.json(store)

    } catch (error) {
        console.log('[STORE_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const {userId} = await auth()
        console.log("Method DELETE " + {userId});
        

        if (!userId) return new NextResponse("Unauthorized", { status: 401 })
        if (!params.storeId) return new NextResponse("Need Store Id ", { status: 400 })

        const store = await db.store.deleteMany({
            where: {
                id: params.storeId,
                userId
            }
        })

        return NextResponse.json(store)

    } catch (error) {
        console.log('[STORE_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}