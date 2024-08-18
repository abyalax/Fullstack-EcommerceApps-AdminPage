import db from "@/lib/db"
import { format } from "date-fns"
import { CategoryColumn } from "./component/columns"
import CategoryClient from "./component/client"

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
    const categories = await db.category.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            banner: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedCategories: CategoryColumn[] = categories.map((item) => ({
        id: item.id,
        name: item.name,
        bannerLabel: item.banner.label,
        createdAt: format(item.createdAt, "MMM do, yyyy"),
    }))

    return (
        <div className=" flex flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CategoryClient data={formattedCategories} />
            </div>
        </div>
    )
}

export default CategoriesPage
