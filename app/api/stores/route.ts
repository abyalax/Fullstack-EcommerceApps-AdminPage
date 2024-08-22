import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const body = await req.json()   
        const {name, userID} = body
        
        if (!userID) return new NextResponse("Unauthorized", { status: 401 })
        if (!name) return new NextResponse("Name Toko perlu diinput", {status: 400})

        const store = await db.store.create({
            data: {
                name,
                userId : userID
            }
        })

        return NextResponse.json(store)

    } catch (error) {   
        console.log("[STORE_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}