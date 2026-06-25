import { getCategories } from "@/app/lib/api/admin/categories";
import { getSingleProduct } from "@/app/lib/api/admin/products";

import { AdminEditProductForm } from "@/components/AdminEditProductForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Params {
  params: Promise<{
    productId: string;
  }>;
}

export default async function EditProductPage({ params }: Params) {
  const { productId } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    redirect("/login");
  }
  const category = await getCategories(accessToken.value);
  const product = await getSingleProduct(accessToken.value, Number(productId));
  return (
    <div>
      <AdminEditProductForm
        productData={product}
        catagoriesData={category.data}
        accessToken={accessToken.value}
      />
    </div>
  );
}
