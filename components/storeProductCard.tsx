"use client";
import Image from "next/image";
import Link from "next/link";
import { notification } from "antd";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { getLocalStorageItem } from "@/app/lib/api/utils";
import { userAddToCart } from "@/app/lib/api/users/cart";

interface Props {
  productId: number;
  productImageUrl: string;
  productName: string;
  storeImageUrl: string;
  storeName: string;
  price: number;
}

export function StoreProductCard({
  productImageUrl,
  productName,
  price,
  storeImageUrl,
  storeName,
  productId,
}: Props) {
  const [api, contextHolder] = notification.useNotification();
  function openSuccessNoti() {
    api.info({
      title: "Notification",
      description: `Added ${productName} to your cart`,
      placement: "topRight",
      showProgress: true,
      pauseOnHover: true,
      icon: <ShoppingCartOutlined style={{ color: "#FACC14" }} />,
    });
  }
  function openErrorNoti() {
    api.error({
      title: "Notification",
      description: `Something went wrong please try again later`,
      placement: "topRight",
      showProgress: true,
      pauseOnHover: true,
    });
  }
  async function handleAddToCart(productId: number) {
    const accessToken = await getLocalStorageItem("accessToken");
    if (!accessToken) {
      return openErrorNoti();
    }
    const res = await userAddToCart(accessToken, productId, 1, price);
    if (res.ok) {
      openSuccessNoti();
    } else {
      openErrorNoti();
    }
  }
  return (
    <div className="bg-[#F9FAFB] rounded-2xl pt-3 shadow-xl overflow-hidden transition-transform duration-150 ease-in-out hover:-translate-y-2 flex flex-col">
      {contextHolder}
      <Link href={`/shop/${productId}`} className="flex-1">
        <div>
          <Image
            src={productImageUrl}
            alt={"boardgame product"}
            className="mx-auto object-contain w-60 h-80"
            width={"300"}
            height={"300"}
          />
        </div>

        {/* product owner (store) */}
        <div className="px-5 mt-5 mb-2">
          <h3 className="text-2xl font-semibold truncate">{productName}</h3>
          <div className="flex items-center gap-2">
            <Image
              src={storeImageUrl}
              alt={"store logo"}
              width={"40"}
              height={"40"}
            />
            <p className="bg-[#FACC14] rounded-full px-2 text-sm font-light text-[#364049]">
              {storeName}
            </p>
          </div>
        </div>
      </Link>
      {/* price and button */}
      <div className="bg-[#2B2B2B] flex justify-between px-10 py-4">
        <div>
          <p className="text-[#94A3B8]">Price</p>
          <p className="text-[#F9FAFB] text-2xl font-semibold">
            ฿{price.toLocaleString()}
          </p>
        </div>
        <button
          className="bg-[#FACC14] rounded-md px-3 cursor-pointer text-[#364049]"
          onClick={() => handleAddToCart(productId)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
