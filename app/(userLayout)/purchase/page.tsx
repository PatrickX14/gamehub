import { fetchUserOrders } from "@/app/lib/api/users/order";
import { ProfileMenu } from "@/components/ProfileMenu";
import { PurchaseInfo } from "@/components/PurchaseInfo";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PurchasePage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    redirect("/login");
  }
  const orders = await fetchUserOrders(accessToken.value);
  console.log(orders);
  return (
    <div className="xl:px-30 grid grid-cols-3 gap-4">
      {/* profile menu */}
      {/* TODO: make it responsive */}
      <div>
        <ProfileMenu selectedMenu={"Purchase"} />
      </div>
      {/* Purchase information */}
      {/* TODO: make it responsive */}
      <div className="col-span-2">
        <PurchaseInfo data={orders.items} accessToken={accessToken.value} />
      </div>
    </div>
  );
}
