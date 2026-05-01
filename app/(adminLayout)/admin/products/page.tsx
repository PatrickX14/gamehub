"use client";
import { ProductData, getProducts } from "@/app/lib/api/admin/products";
import { getLocalStorageItem } from "@/app/lib/api/utils";
import { ProductsTable } from "@/components/AdminTable";
import { useEffect, useState } from "react";

export default function AdminProductsPage() {
  const [productData, setProductData] = useState<ProductData[]>([]);
  useEffect(() => {
    async function getProduct() {
      const accessToken = await getLocalStorageItem("accessToken");
      if (typeof accessToken === "string") {
        getProducts(accessToken).then((data) => {
          setProductData(data.data);
        });
      }
    }
    getProduct();
  }, []);
  return (
    <div>
      <ProductsTable
        tableTitle={"Products"}
        data={productData}
        itemsPerPage={0}
      />
    </div>
  );
}
