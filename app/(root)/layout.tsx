import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SetUplayout({ children }: { children: React.ReactNode }) {

    const { userId } = await auth();
    console.log({ userId });


    if (!userId) {
        return redirect("/sign-in");
    }
    const store = await db.store.findFirst({
        where: { userId }
    });

    if (store) {
        return redirect(`/${store.id}`);
    }
    return (
        <>
            {children}
        </>
    )
}