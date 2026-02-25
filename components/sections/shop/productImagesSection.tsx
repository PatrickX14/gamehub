"use client";
import Image from "next/image";
import { useState } from "react";

interface props {
  productImagesUrl: string[];
}

export function ProductImagesSection({ productImagesUrl }: props) {
  const [selectedImage, setImage] = useState<number>(0);
  return (
    <div className="h-full bg-[#F9FAFB] border border-black/20 shadow-md relative">
      <div className="">
        <Image
          src={productImagesUrl[selectedImage]}
          alt={"small product image"}
          height={"450"}
          width={"450"}
          className="m-auto overflow-hidden"
        />
      </div>
      <div className="absolute -bottom-30 flex gap-2 justify-center w-full">
        {productImagesUrl.map((imageUrl, index) => (
          <Image
            key={index}
            src={imageUrl}
            alt={"small product image"}
            height={"100"}
            width={"100"}
            className={`cursor-pointer shadow-md
              ${index == selectedImage && "border border-black/40"}
              `}
            onClick={() => setImage(index)}
          />
        ))}
      </div>
    </div>
  );
}
