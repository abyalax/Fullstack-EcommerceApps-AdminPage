import { UserButton } from "@clerk/nextjs"
import { MainNav } from "../main-nav"
import StoreSwitcher from "../store-switcher"
// import { auth } from "@clerk/nextjs/server"
// import { redirect } from "next/navigation"
import db from "@/lib/db"

// let memoizedUserId: string | null = null

const Navbar = async () => {

    // if (!memoizedUserId) {
    //     const { userId } = await auth();
    //     console.log({ userId });

    //     if (!userId) {
    //         return redirect("/sign-in");
    //     }
    //     memoizedUserId = userId;
    // }

    const store = await db.store.findMany({
        where: {
            userId: "user_2kNVlvvQFuyvt5LawJCn3hCraVO"
        }
    })


    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher items={store} />
                <MainNav className="mx-6 " />
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/"/>
                </div>
            </div>
        </div>
    )
}
export default Navbar