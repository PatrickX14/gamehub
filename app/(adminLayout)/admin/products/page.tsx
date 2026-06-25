import { getProducts } from "@/app/lib/api/admin/products";
import { MerchantProductsTable } from "@/components/MerchantProductsTable";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminProductsPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    redirect("/login");
  }
  const products = await getProducts(accessToken.value);
  return (
    <div>
      <MerchantProductsTable
        tableTitle={"Products"}
        data={products.data}
        itemsPerPage={0}
      />
    </div>
  );
}
