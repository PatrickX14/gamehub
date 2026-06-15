"use client";
import { CartItem } from "@/app/lib/api/users/cart";
import { SectionCard } from "./Cards";
import { Button } from "antd";

type UserCartOrderSumaryProps = {
  cartItems: CartItem[];
  onCheckoutClick: () => void;
  buttonDisable?: boolean;
};

export function UserCartOrderSumary({
  cartItems,
  buttonDisable,
  onCheckoutClick,
}: UserCartOrderSumaryProps) {
  const shippingCost = 100;
  return (
    <SectionCard title="Order Summary" description="">
      <div className="flex flex-col gap-3">
        {/* Line items */}
        {cartItems.map((item) => (
          <div
            key={item.productId}
            className="flex justify-between text-sm text-gray-600"
          >
            <span>
              {item.productName} x{item.quantity}
            </span>
            <span>
              ฿{(Number(item.price) * item.quantity).toLocaleString()}
            </span>
          </div>
        ))}

        <hr className="border-gray-200 my-1" />

        {/* Subtotal */}
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>
            ฿
            {cartItems
              .reduce(
                (accumulator, currentItem) =>
                  accumulator + currentItem.price * currentItem.quantity,
                0,
              )
              .toLocaleString()}
          </span>
          {/* <span>฿{.toFixed(2)}</span> */}
        </div>

        {/* Shipping */}
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span>฿{shippingCost.toLocaleString()}</span>
          {/* <span>฿{shipping.toFixed(2)}</span> */}
        </div>

        <hr className="border-gray-200 my-1" />

        {/* Total */}
        <div className="flex justify-between font-bold text-gray-800 text-base">
          <span>Total</span>
          <span>
            ฿
            {cartItems
              .reduce(
                (accumulator, currentItem) =>
                  accumulator + currentItem.price * currentItem.quantity,
                shippingCost,
              )
              .toLocaleString()}
          </span>
          {/* <span>฿{total.toFixed(2)}</span> */}
        </div>

        {/* Checkout button */}
        <Button
          className="mt-4 w-full bg-[#FACC14] hover:bg-[#E7B008] py-3 rounded-md font-semibold text-gray-800 cursor-pointer transition-colors"
          onClick={onCheckoutClick}
          disabled={buttonDisable ? true : false}
        >
          Place order
        </Button>
      </div>
    </SectionCard>
  );
}
