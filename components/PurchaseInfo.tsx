"use client";
import { useState } from "react";
import Image from "next/image";
interface Purchase {
  id: string;
  productName: string;
  productDescription: string;
  shopImageUrl: string;
  date: string;
  price: string;
  quantity: number;
  status: string;
  imageUrl: string;
}

const samplePurchases: Purchase[] = [
  {
    id: "1",
    productName: "Blade Champion",
    productDescription:
      "A Blade Champion is a living weapon in the Emperor’s hand. His role is to identify the greatest battlefield threat ",
    date: "2026-02-15",
    price: "฿1,400",
    quantity: 1,
    status: "Delivered",
    imageUrl: "/images/demoimages/products/Blade Champion.jpg",
    shopImageUrl: "/images/demoimages/legendarywargame.png",
  },
  {
    id: "2",
    productName: "Cadian Shock Troops",
    productDescription:
      "A Blade Champion is a living weapon in the Emperor’s hand. His role is to identify the greatest battlefield threat ",
    date: "2026-02-23",
    price: "฿1,400",
    quantity: 2,
    status: "Shipped",
    imageUrl: "/images/demoimages/products/Cadian Shock Troops.jpg",
    shopImageUrl: "/images/demoimages/legendarywargame.png",
  },
  {
    id: "3",
    productName: "Caanokvar",
    productDescription:
      "A Blade Champion is a living weapon in the Emperor’s hand. His role is to identify the greatest battlefield threat ",
    date: "2026-03-01",
    price: "฿1,400",
    quantity: 3,
    status: "Processing",
    imageUrl: "/images/demoimages/products/caanokvar.jpg",
    shopImageUrl: "/images/demoimages/legendarywargame.png",
  },
];

export function PurchaseInfo() {
  const [purchases] = useState<Purchase[]>(samplePurchases);
  const totalOrderCount: number = samplePurchases.length ?? 0;
  return (
    <div className="bg-[#F9FAFB] rounded-md shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#364049]/10">
        <div>
          <h2 className="text-primary font-semibold text-lg">
            Purchase Information ({totalOrderCount})
          </h2>
          <p className="text-secondary text-sm">View your order history</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 py-3">
        {purchases.length === 0 ? (
          <p className="text-muted text-sm italic">No purchases yet.</p>
        ) : (
          <div className="overflow-x-auto">
            {samplePurchases.map(
              (
                {
                  id,
                  date,
                  imageUrl,
                  productName,
                  price,
                  quantity,
                  status,
                  productDescription,
                  shopImageUrl,
                },
                index,
                arr,
              ) => (
                <div key={index}>
                  <PurchaseOrderCard
                    imageUrl={imageUrl}
                    productName={productName}
                    productDescription={productDescription}
                    shopName={"Legendary Wargame"}
                    shopImageUrl={shopImageUrl}
                    status={status}
                    price={price}
                    quantity={quantity}
                    date={date}
                  />
                  {index == arr.length - 1 ? null : (
                    <div className="w-full h-0.5 bg-[#000000]/20"></div>
                  )}
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const statusStyles: Record<string, { bg: string; text: string; dot: string }> =
  {
    Delivered: {
      bg: "bg-green-100",
      text: "text-green-700",
      dot: "bg-green-500",
    },
    Shipped: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      dot: "bg-blue-500",
    },
    Processing: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      dot: "bg-yellow-500",
    },
    Cancelled: {
      bg: "bg-red-100",
      text: "text-red-700",
      dot: "bg-red-500",
    },
  };

interface purchaseOrderCardProps {
  imageUrl: string;
  productName: string;
  productDescription: string;
  shopName: string;
  shopImageUrl: string;
  status: string;
  price: string;
  quantity: number;
  date: string;
}

function PurchaseOrderCard({
  imageUrl,
  productName,
  productDescription,
  shopImageUrl,
  shopName,
  status,
  price,
  quantity,
  date,
}: purchaseOrderCardProps) {
  const style = statusStyles[status] ?? {
    bg: "bg-gray-100",
    text: "text-gray-700",
    dot: "bg-gray-400",
  };

  return (
    <div className="grid grid-cols-5 items-center py-4 cursor-pointer gap-1">
      {/* image */}
      <div className="m-auto">
        <Image src={imageUrl} alt={"purchase orders"} width={150} height={90} />
      </div>

      {/* product details */}
      <div className="col-span-2">
        <h3 className="text-2xl font-semibold">{productName}</h3>
        <div className="flex gap-2">
          <Image
            src={shopImageUrl}
            alt={"purchase orders"}
            width={40}
            height={40}
          />
          <div className="flex items-center bg-[#FACC14] px-3 rounded-full my-2">
            <p className="text-sm font-thin text-primary">{shopName}</p>
          </div>
        </div>
        <p className="text-sm text-secondary">{productDescription}</p>
      </div>

      {/* order details */}
      <div className="col-span-2 flex flex-col gap-2 pl-4 mx-auto">
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-secondary uppercase tracking-wide w-20">
            Price
          </span>
          <span className="text-base font-semibold text-primary">{price}</span>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-secondary uppercase tracking-wide w-20">
            Quantity
          </span>
          <span className="text-base font-semibold text-primary">
            {quantity}
          </span>
        </div>

        {/* Order Date */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-secondary uppercase tracking-wide w-20">
            Order Date
          </span>
          <span className="text-sm text-secondary">{date}</span>
        </div>

        {/* Delivery Status */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-secondary uppercase tracking-wide w-20">
            Status
          </span>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}
