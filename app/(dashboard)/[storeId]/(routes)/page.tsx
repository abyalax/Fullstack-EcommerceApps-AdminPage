import db from "@/lib/db"
import { auth } from "@clerk/nextjs/server";

interface DashboardPageProps {
  params: { storeId: string }
}

const DashboardPage = async ({ params }: DashboardPageProps) => {

  const store = await db.store.findFirst({ where: { id: params.storeId } })
  console.log(auth().userId);
  

  return (
    <div>
      Active Store : {store?.name}
    </div>
  )
}

export default DashboardPage
