"use client";
import { CartItem, CartItems } from "@/app/lib/api/users/cart";
import { CartCard } from "./CartCard";
import { useState } from "react";
import { AddressSelectRadio } from "@/components/AddressSelectRadio";
import { UserCartOrderSumary } from "./UserCartOrderSumary";
import { AddressBody } from "@/app/lib/api/user";
import { userPlaceOrder } from "@/app/lib/api/users/order";
import { notification } from "antd";
import { UserCartOrderConfirmModal } from "./UserOrderConfirmModal";
import { UserCartOrderPlacedModal } from "./UserCartOrderPlacedModal";

type UserCartSumaryProps = {
  cartData: CartItems[];
  addresses: AddressBody[];
  accessToken: string;
};

export function UserCartSumary({
  cartData,
  addresses,
  accessToken,
}: UserCartSumaryProps) {
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number>();
  const [notiApi, contextHolder] = notification.useNotification();
  const [isConfirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState<boolean>(false);

  function handleProductSelect(isChecked: boolean, product: CartItem) {
    if (isChecked) {
      setSelectedItems((prevItems) => [...prevItems, product]);
    } else {
      setSelectedItems((prevItems) =>
        prevItems.filter((item) => item.productId !== product.productId),
      );
    }
  }

  function handleQuantityChange(productId: number, newQuantity: number) {
    // Update selectedItems if the product is currently selected
    setSelectedItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  }

  async function handleOnCheckout() {
    setConfirmModalOpen(true);
  }

  async function handlePlaceOrderConfirm() {
    if (!selectedAddressId) {
      return;
    }
    const response = await userPlaceOrder(accessToken, {
      userAddressId: selectedAddressId,
      orderData: selectedItems.map(({ productId, quantity }) => ({
        productId,
        quantity,
      })),
    });
    if (response.ok) {
      setSuccessModalOpen(true);
    } else {
      setConfirmModalOpen(false);
      notiApi.error({
        title: "Something went wrong",
        description: "Fail to place order",
      });
    }
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {contextHolder}
      <UserCartOrderConfirmModal
        isOpen={isConfirmModalOpen}
        onConfirm={handlePlaceOrderConfirm}
        onCancel={() => setConfirmModalOpen(false)}
      />
      <UserCartOrderPlacedModal isModalOpen={isSuccessModalOpen} />
      <div className="flex flex-col gap-6 col-span-2">
        <AddressSelectRadio
          addresses={addresses}
          isAddressSelected={(addressId) => setSelectedAddressId(addressId)}
        />
        {cartData.map(
          ({ merchantId, merchantImageUrl, merchantName, items }) => (
            <CartCard
              key={merchantId}
              merchantId={merchantId}
              merchantName={merchantName}
              items={items}
              merchantImageUrl={merchantImageUrl}
              onProductSelect={handleProductSelect}
              onQuantityChange={handleQuantityChange}
            />
          ),
        )}
      </div>

      <div>
        {/* TODO: implement confirmation modal */}
        <UserCartOrderSumary
          cartItems={selectedItems}
          buttonDisable={
            selectedItems.length > 0 &&
            addresses.length > 0 &&
            selectedAddressId
              ? false
              : true
          }
          onCheckoutClick={handleOnCheckout}
        />
      </div>
    </div>
  );
}
