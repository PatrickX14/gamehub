"use client";
import { Product, userGetSingleProduct } from "@/app/lib/api/users/products";
import { getLocalStorageItem } from "@/app/lib/api/utils";
import { BreadCrumb } from "@/components/breadCrumb";
import { ProductDetailSection } from "@/components/sections/shop/productDetailSection";
import { ProductImagesSection } from "@/components/sections/shop/productImagesSection";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Note: mock up data for development
const data = {
  productName: "Mor Deythan Squad",
  productImagesUrl: [
    "/images/demoimages/products/99550101476_RavenGuardMorDeythanStrikeSquad01.jpg",
    "/images/demoimages/products/99550101476_RavenGuardMorDeythanStrikeSquad02.jpg",
    "/images/demoimages/products/99550101476_RavenGuardMorDeythanStrikeSquad03.jpg",
  ],
  price: 2700,
  description:
    "Mor Dey is a calm yet determined personality, driven by curiosity and a desire to make a meaningful impact on the world around them.",
  tags: ["Miniatures Wargame", "Warhammer 40,000", "Space Marine"],
  shopName: "Legendary Wargame",
  shopImageUrl: "/images/demoimages/legendarywargame.png",
};

type PathParams = {
  productid: string;
};

export default function SingleProductPage() {
  const params = useParams<PathParams>();
  const [product, setProduct] = useState<Product>();
  useEffect(() => {
    async function fetchProductData() {
      const accessToken = await getLocalStorageItem("accessToken");
      if (!accessToken) return;
      const productRes = await userGetSingleProduct(
        accessToken,
        +params.productid,
      );
      setProduct(productRes);
    }
    fetchProductData();
  }, []);

  return (
    <div className="px-4 xl:px-30">
      <BreadCrumb shopName={data.shopName} productName={data.productName} />
      {product && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-7 mt-3">
          {/* images */}
          <div className="lg:col-start-1 lg:col-end-4">
            <ProductImagesSection productImagesUrl={product?.images} />
          </div>
          {/* details */}
          <div className="lg:col-start-4 lg:col-end-8 mt-30 lg:mt-0">
            <ProductDetailSection
              productId={product.id}
              productName={product.name}
              price={product.price}
              description={product.description}
              tags={product.categories}
              shopImageUrl={data.shopImageUrl}
              shopName={product.shopName}
            />
          </div>
        </div>
      )}
    </div>
  );
}
