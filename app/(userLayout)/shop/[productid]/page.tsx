"use client";
import { BreadCrumb } from "@/components/breadCrumb";
import { ProductDetailSection } from "@/components/sections/shop/productDetailSection";
import { ProductImagesSection } from "@/components/sections/shop/productImagesSection";

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

export default function SingleProductPage() {
  return (
    <div className="px-4 xl:px-30">
      <BreadCrumb shopName={data.shopName} productName={data.productName} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-7 mt-3">
        {/* images */}
        <div className="lg:col-start-1 lg:col-end-4">
          <ProductImagesSection productImagesUrl={data.productImagesUrl} />
        </div>
        {/* details */}
        <div className="lg:col-start-4 lg:col-end-8 mt-30 lg:mt-0">
          <ProductDetailSection
            productName={data.productName}
            price={data.price}
            description={data.description}
            tags={data.tags}
            shopImageUrl={data.shopImageUrl}
            shopName={data.shopName}
          />
        </div>
      </div>
    </div>
  );
}
