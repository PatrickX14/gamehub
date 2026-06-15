"use client";
import { CartItem } from "@/app/lib/api/users/cart";
import { SectionCard } from "./Cards";
import { Checkbox } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import Image from "next/image";

type CartCardProps = {
  merchantId: number;
  merchantName: string;
  merchantImageUrl: string;
  items: CartItem[];
  onProductSelect: (isChecked: boolean, product: CartItem) => void;
  onQuantityChange: (productId: number, newQuantity: number) => void;
};

export function CartCard({
  merchantId,
  merchantName,
  merchantImageUrl,
  items,
  onProductSelect,
  onQuantityChange,
}: CartCardProps) {
  function handleProductSelect(isChecked: boolean, productId: number) {
    const selectedItem = items.find((item) => item.productId === productId);
    if (!selectedItem) {
      return;
    }
    onProductSelect(isChecked, selectedItem);
  }

  return (
    <SectionCard title={""} description={""} hideHeader>
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={merchantImageUrl}
          alt={"merchant profile image"}
          width={40}
          height={40}
          unoptimized
          className="rounded-full shadow-3xl"
        />
        <h2 className="text-xl font-semibold">{merchantName}</h2>
      </div>
      <div className="flex flex-col gap-4">
        {items.map(
          ({ productId, price, productName, quantity, totalPrice }) => (
            <CartItemCard
              key={productId}
              productId={productId}
              quantity={quantity}
              productName={productName}
              price={price}
              totalPrice={totalPrice}
              onSelected={handleProductSelect}
              onQuantityChange={(newQuantity) =>
                onQuantityChange(productId, newQuantity)
              }
            />
          ),
        )}
      </div>
    </SectionCard>
  );
}

type CartItemCardProps = CartItem & {
  onSelected: (isChecked: boolean, productId: number) => void;
  onQuantityChange?: (amount: number) => void;
  hideEdit?: boolean;
};

export function CartItemCard({
  price,
  productId,
  productName,
  quantity,
  totalPrice,
  onSelected,
  onQuantityChange,
  hideEdit,
}: CartItemCardProps) {
  const [item, setItem] = useState<CartItem>({
    price,
    productId,
    productName,
    quantity,
    totalPrice,
  });

  function handleDecreaseQuan() {
    if (item.quantity <= 1) return;
    const newQty = item.quantity - 1;
    setItem((item) => ({ ...item, quantity: newQty }));
    onQuantityChange?.(newQty); // 👈
  }

  function handleIncreaseQuan() {
    if (item.quantity >= 20) return;
    const newQty = item.quantity + 1;
    setItem((item) => ({ ...item, quantity: newQty }));
    onQuantityChange?.(newQty); // 👈
  }

  return (
    <div className="flex items-center justify-between bg-white border border-black/10 rounded-md px-6 py-4 gap-4">
      {hideEdit ? null : (
        <Checkbox onChange={(e) => onSelected(e.target.checked, productId)} />
      )}
      <>
        {/* Product info */}
        <div className="flex-1">
          <p className="font-semibold text-gray-800">{item.productName}</p>
          <p className="text-sm text-gray-400">
            ฿{Number(item.price).toLocaleString()} each
          </p>
        </div>

        {/* Quantity controls */}
        {hideEdit ? (
          <span className="w-6 text-center font-medium">x{item.quantity}</span>
        ) : (
          <div className="flex items-center gap-2">
            <button
              className="size-8 rounded-md border border-gray-200 hover:bg-gray-100 cursor-pointer flex items-center justify-center"
              onClick={() => handleDecreaseQuan()}
            >
              <RemoveIcon className="!size-4" />
            </button>
            <span className="w-6 text-center font-medium">{item.quantity}</span>
            <button
              className="size-8 rounded-md border border-gray-200 hover:bg-gray-100 cursor-pointer flex items-center justify-center"
              onClick={() => handleIncreaseQuan()}
            >
              <AddIcon className="!size-4" />
            </button>
          </div>
        )}

        {/* sub total */}
        <p className="w-20 text-right font-semibold text-gray-800">
          ฿{(+item.price * item.quantity).toLocaleString()}
        </p>

        {/* Delete */}
        {hideEdit ? null : (
          <button className="cursor-pointer hover:bg-gray-100 size-9 rounded-md flex items-center justify-center">
            <DeleteIcon className="text-[#FACC14]" />
          </button>
        )}
      </>
    </div>
  );
}
