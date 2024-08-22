import { useUserContext } from "@/context/user-context";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SetUplayout({ children }: { children: React.ReactNode }) {

    const userId = auth().userId

    if (!userId) {
        redirect("/sign-in")
    }
    const store = await db.store.findFirst({
        where: {
            userId
        }
    })
    if (store) {
        redirect(`/${store.id}`)
    }
    return (
        <>
            {children}
        </>
    )
}