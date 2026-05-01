import { AdminSingleProduct } from "@/components/AdminSingleProduct";

interface Params {
  params: Promise<{
    productId: string;
  }>;
}

export default async function AdminSingleProductPage({ params }: Params) {
  const { productId } = await params;
  return (
    <div>
      <AdminSingleProduct productId={productId} />
    </div>
  );
}
