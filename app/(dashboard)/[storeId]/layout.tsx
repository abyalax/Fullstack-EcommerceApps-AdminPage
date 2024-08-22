import db from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Navbar from "@/components/ui/navbar"

export default async function DashboardLayout(
    { children, params }: { children: React.ReactNode, params: { storeId: string } }
) {

    const authRes = auth()
    const userId = await auth().userId
    console.log({ authRes });
    console.log({ userId });
    
    if (!userId) {
        redirect("/sign-in")
    }
    const store = await db.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })
    if (!store) {
        redirect('/')
    }
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )

}