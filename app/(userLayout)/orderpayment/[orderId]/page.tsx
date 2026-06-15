import { fetchOrderDetails } from "@/app/lib/api/users/order";
import { OrderPaymentForm } from "@/components/OrderPaymentForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Params = {
  params: Promise<{ orderId: string }>;
};

export default async function OrderPaymentPage({ params }: Params) {
  const { orderId } = await params;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    redirect("/login");
  }
  const order = await fetchOrderDetails(accessToken.value, +orderId);

  return (
    <div className="px-30">
      <OrderPaymentForm order={order} accessToken={accessToken.value} />
    </div>
  );
}
