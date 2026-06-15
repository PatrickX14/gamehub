"use client";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { SectionCard } from "@/components/Cards";
import { getLocalStorageItem } from "@/app/lib/api/utils";
import { CartItem, UserCart, userGetCartItems } from "@/app/lib/api/users/cart";
import { AddressSelectRadio } from "@/components/AddressSelectRadio";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<UserCart[]>([]);

  function handleIncrease(id: number) {
    console.log("handleIncrease");
    // setCartItems((prev) =>
    //   prev.map((item) =>
    //     item.items === id ? { ...item, quantity: item.quantity + 1 } : item,
    //   ),
    // );
  }

  function handleDecrease(id: number) {
    console.log("handleDecrease");
    // setCartItems((prev) =>
    //   prev.map((item) =>
    //     item.productId === id && item.quantity > 1
    //       ? { ...item, quantity: item.quantity - 1 }
    //       : item,
    //   ),
    // );
  }

  function handleDelete(id: number) {
    console.log("handleDelete");

    // setCartItems((prev) => prev.filter((item) => item.productId !== id));
  }

  function handleCheckout() {
    alert("Proceeding to checkout!");
  }

  // const subtotal = cartItems.reduce(
  //   (sum, item) => sum + Number(item.price) * item.quantity,
  //   0,
  // );
  const subtotal = 0;

  const shipping = cartItems.length > 0 ? 5.0 : 0;
  const total = subtotal + shipping;

  useEffect(() => {
    async function fetchCartItems() {
      const accessToken = await getLocalStorageItem("accessToken");
      if (!accessToken) return;
      const cartData = await userGetCartItems(accessToken);
      if (!cartData) return;
      setCartItems(cartData.items);
    }
    fetchCartItems();
  }, []);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCartIcon className="text-[#FACC14] !size-8" />
          <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
          <span className="text-sm text-gray-400">
            ({cartItems.length} items)
          </span>
        </div>

        {cartItems.length === 0 ? (
          /* Empty state */
          <SectionCard
            title="Your cart is empty"
            description="Add some products to get started."
          >
            <div className="flex justify-center py-8">
              <ShoppingCartIcon className="!size-16 text-gray-300" />
            </div>
          </SectionCard>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Item list */}
            <div className="flex-1 flex flex-col gap-4">
              <AddressSelectRadio />
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {/* Order summary */}
            <div className="w-full lg:w-80">
              <SectionCard title="Order Summary" description="">
                <div className="flex flex-col gap-3">
                  {/* Line items */}
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
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
                    <span>฿{subtotal.toFixed(2)}</span>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span>฿{shipping.toFixed(2)}</span>
                  </div>

                  <hr className="border-gray-200 my-1" />

                  {/* Total */}
                  <div className="flex justify-between font-bold text-gray-800 text-base">
                    <span>Total</span>
                    <span>฿{total.toFixed(2)}</span>
                  </div>

                  {/* Checkout button */}
                  <button
                    className="mt-4 w-full bg-[#FACC14] hover:bg-[#E7B008] py-3 rounded-md font-semibold text-gray-800 cursor-pointer transition-colors"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </SectionCard>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type CartItemCardProps = {
  item: CartItem;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onDelete: (id: number) => void;
};
