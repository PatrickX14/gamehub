import { getSingleMerchantOrders } from "@/app/lib/api/merchant/order";
import { MerchantSingleOrder } from "@/components/MerchantSingleOrder";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Params {
  params: Promise<{
    orderId: string;
  }>;
}
export default async function MerchantOrderPage({ params }: Params) {
  const { orderId } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    redirect("/login");
  }
  const order = await getSingleMerchantOrders(accessToken.value, +orderId);
  return (
    <div>
      <MerchantSingleOrder data={order} accessToken={accessToken.value} />
    </div>
  );
}
