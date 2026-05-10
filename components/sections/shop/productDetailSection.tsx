"use client";
import { useState } from "react";
import Image from "next/image";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { notification } from "antd";
import { userAddToCart } from "@/app/lib/api/users/cart";
import { getLocalStorageItem } from "@/app/lib/api/utils";
import { ShoppingCartOutlined } from "@mui/icons-material";

interface props {
  productId: number;
  productName: string;
  price: number | string;
  description: string;
  tags: string[];
  shopImageUrl: string;
  shopName: string;
}

export function ProductDetailSection({
  description,
  price,
  productName,
  shopImageUrl,
  shopName,
  tags,
  productId,
}: props) {
  const [quantity, setQuantity] = useState<number>(1);
  const [api, contextHolder] = notification.useNotification();

  async function handleAddToCart(productId: number) {
    const accessToken = await getLocalStorageItem("accessToken");
    if (!accessToken) {
      api.error({
        title: "Invalid credentials",
        description: `Invalid credentials`,
        placement: "topRight",
        showProgress: true,
        pauseOnHover: true,
      });
      return;
    }
    const res = await userAddToCart(accessToken, productId, quantity);
    if (!res.ok) {
      api.error({
        title: "Error",
        description: `Something went wrong`,
        placement: "topRight",
        showProgress: true,
        pauseOnHover: true,
      });
      return;
    }
    api.info({
      title: "Notification",
      description: `Added ${quantity} ${productName} to your cart`,
      placement: "topRight",
      showProgress: true,
      pauseOnHover: true,
      icon: <ShoppingCartOutlined style={{ color: "#FACC14" }} />,
    });
  }

  return (
    <div className="bg-[#F9FAFB] border border-black/20 shadow-md px-5 lg:px-10 py-12">
      {contextHolder}
      <h1 className="text-3xl font-semibold text-primary">{productName}</h1>
      <h3 className="text-2xl font-bold mb-5 text-primary">
        ฿ {price.toLocaleString()}
      </h3>
      <p className="text-[#627384] mb-5">{description}</p>

      {/* tags */}
      <div className="flex flex-col gap-2 mb-5">
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center gap-2">
            <Image
              src={"/images/icons/CheckCircle.svg"}
              width={"23"}
              height={"23"}
              alt={"check circle icon"}
            />
            <p className="text-primary">{tag}</p>
          </div>
        ))}
      </div>

      {/* shop detail */}
      <div className="flex gap-2 mb-5 items-center">
        <Image
          src={shopImageUrl}
          width={"50"}
          height={"50"}
          alt={"check circle icon"}
        />
        <p className="text-primary font-semibold  ">{shopName}</p>
      </div>

      {/* buttons */}
      <div className="flex flex-col lg:flex-row justify-between">
        {/* quantity select */}
        <div className="flex items-center justify-center gap-10 mb-5 lg:mb-0">
          <button
            className="bg-[#FCCB1D] cursor-pointer rounded-md p-1 shadow-md"
            onClick={() => (quantity <= 1 ? null : setQuantity(quantity - 1))}
          >
            <RemoveIcon className="text-primary" />
          </button>
          <p className="text-2xl font-semibold text-primary">{quantity}</p>
          <button
            className="bg-[#FCCB1D] cursor-pointer rounded-md p-1 shadow-md"
            onClick={() => setQuantity(quantity + 1)}
          >
            <AddIcon className="text-primary" />
          </button>
        </div>

        <button
          className="bg-[#FCCB1D] gap-2 justify-center rounded-md lg:px-20 py-3 flex items-center cursor-pointer shadow-md"
          onClick={() => handleAddToCart(productId)}
        >
          <ShoppingBasketIcon className="text-primary" />
          <p className="text-primary">Add to cart</p>
        </button>
      </div>
    </div>
  );
}
