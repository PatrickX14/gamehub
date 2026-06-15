import { getMe } from "@/app/lib/api/user";
import { userGetCartItems } from "@/app/lib/api/users/cart";
import { UserCartSumary } from "@/components/UserCartSumary";
import { Empty } from "antd";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function CartPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    redirect("/login");
  }
  const cartData = await userGetCartItems(accessToken.value);
  const userData = await getMe(accessToken.value);

  return (
    <div className="px-30">
      {cartData.total > 0 ? (
        <UserCartSumary
          cartData={cartData.items}
          addresses={userData.addresses.items}
          accessToken={accessToken.value}
        />
      ) : (
        <Empty
          description={
            "No items in your cart, Start shopping before checking out."
          }
        />
      )}
    </div>
  );
}
