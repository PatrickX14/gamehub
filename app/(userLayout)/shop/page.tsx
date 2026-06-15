import {
  userGetCategories,
  userGetProducts,
} from "@/app/lib/api/users/products";
import { UserShop } from "@/components/UserShop";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type StorePageParams = {
  searchParams: Promise<{ q?: string; category?: string }>;
};

export default async function StorePage({ searchParams }: StorePageParams) {
  const { q, category } = await searchParams;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    redirect("/login");
  }

  // Decode filter url
  const decodedCategory = category ? decodeURIComponent(category) : null;
  const products = await userGetProducts(
    accessToken.value,
    q,
    decodedCategory ? decodedCategory : undefined,
  );

  const categories = await userGetCategories(accessToken.value);
  return (
    <div>
      <UserShop
        productData={products.items}
        categoriesData={categories.items}
      />
    </div>
  );
}
