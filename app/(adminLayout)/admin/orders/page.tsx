import { getAllMerchantOrders } from "@/app/lib/api/merchant/order";
import { OrdersTable } from "@/components/MerchantOrderTable";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminOrdersPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    redirect("login");
  }
  const orders = await getAllMerchantOrders(accessToken.value);
  return (
    <div>
      <OrdersTable tableTitle={"Orders"} data={orders.items} />
    </div>
  );
}
