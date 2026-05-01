import { AdminEditProductForm } from "@/components/AdminEditProductForm";

interface Params {
  params: Promise<{
    productId: string;
  }>;
}

export default async function EditProductPage({ params }: Params) {
  const { productId } = await params;
  return (
    <div>
      <AdminEditProductForm productId={productId} />
    </div>
  );
}
