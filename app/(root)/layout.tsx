import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export default async function SetUplayout({ children }: { children: React.ReactNode }) {

    const userId = await auth().userId
    
    if (!userId) {
        redirect("/sign-in")
    }
    const store = await db.store.findFirst({
        where: { userId }
    });
    
    if (!store) {
        return redirect('/')
    }
    if (store) {
        return redirect(`/${store.id}`);
    }

    return (
        <>
            {children}
        </>
    );
}
