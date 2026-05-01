"use client";
import {
  GetSingleProduct,
  getSingleProduct,
} from "@/app/lib/api/admin/products";
import { SectionCard } from "./Cards";
import { useEffect, useState } from "react";
import { getLocalStorageItem } from "@/app/lib/api/utils";
import { Field } from "./ProfileInfo";
import SellIcon from "@mui/icons-material/Sell";
import InventoryIcon from "@mui/icons-material/Inventory";
import DescriptionIcon from "@mui/icons-material/Description";
import Image from "next/image";
import Link from "next/link";
import { Settings } from "@mui/icons-material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Tag } from "antd";

interface AdminSingleProductProps {
  productId: string;
}

export function AdminSingleProduct({ productId }: AdminSingleProductProps) {
  const [productData, setProductData] = useState<GetSingleProduct | null>();
  useEffect(() => {
    async function fetchProductData() {
      const accessToken = await getLocalStorageItem("accessToken");
      if (!accessToken) return;
      const productData = await getSingleProduct(
        accessToken,
        Number(productId),
      );
      setProductData(productData);
      console.log(productData);
    }
    fetchProductData();
  }, []);
  return (
    <SectionCard title={"Product Details"} description={""}>
      <div>
        {productData ? (
          <div className="flex flex-col gap-5">
            <Field
              icon={<DriveFileRenameOutlineIcon style={{ fontSize: 20 }} />}
              label={"Name"}
              isEditing={false}
              value={productData.name}
            />
            <Field
              icon={<DescriptionIcon style={{ fontSize: 20 }} />}
              label={"Description"}
              isEditing={false}
              value={`${productData.description}`}
            />
            <Field
              icon={<SellIcon style={{ fontSize: 20 }} />}
              label={"Price"}
              isEditing={false}
              value={`฿${Number(productData.price).toLocaleString()}`}
            />
            <Field
              icon={<InventoryIcon style={{ fontSize: 20 }} />}
              label={"Quantity"}
              isEditing={false}
              value={`${productData.quantity}`}
            />
            <div>
              <p className="text-primary mb-2">Categories</p>
              <div className="flex flex-wrap gap-2">
                {productData.categories.map(({ category, id }) => (
                  <Tag key={id} color={"#EAB308"} variant="solid">
                    {category}
                  </Tag>
                ))}
              </div>
            </div>
            <div>
              <p className="text-primary mb-2">Product Images</p>
              {productData.images.length > 0 ? (
                <div className="flex gap-3">
                  {productData.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={"product images"}
                      width={200}
                      height={200}
                      className="size-25"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-secondary">No images</p>
              )}
            </div>
          </div>
        ) : (
          <p>Fail to load product data</p>
        )}

        {/* Edit button */}
        <div className="flex justify-end">
          <Link
            href={`/admin/products/edit/${productId}`}
            className="flex items-center bg-[#FACC14] hover:bg-[#E7B008]/80 px-4 py-2 rounded-md "
          >
            <Settings />
            Edit
          </Link>
        </div>
      </div>
    </SectionCard>
  );
}
