import { redirect } from "next/navigation";
import { refreshToken } from "../utils";

const API_URL = process.env.API_URL ?? "http://localhost:3000";

export type CartItem = {
  productId: number;
  quantity: number;
  productName: string;
  price: number;
  totalPrice: number;
};

export type CartItems = {
  merchantId: number;
  merchantName: string;
  merchantImageUrl: string;
  items: CartItem[];
};

type CartResponse = {
  total: number;
  items: CartItems[];
};

export async function userGetCartItems(
  accessToken: string,
): Promise<CartResponse> {
  const res = await fetch(`${API_URL}/carts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 403) {
    redirect("/login");
  }

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data = await res.json();
  return data;
}

export async function userAddToCart(
  accessToken: string,
  productId: number,
  quantity: number,
  retry: number = 0,
): Promise<{ ok: boolean }> {
  if (!accessToken) {
    throw new Error("Access token is missing");
  }
  try {
    const res = await fetch(`${API_URL}/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });
    if (!res.ok && retry < 1) {
      return await refreshToken(() =>
        userAddToCart(accessToken, productId, quantity, retry + 1),
      );
    }
    return res.ok ? { ok: true } : { ok: false };
  } catch (err) {
    throw new Error("Failed to add product to cart");
  }
}
