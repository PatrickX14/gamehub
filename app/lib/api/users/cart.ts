import { refreshToken } from "../utils";

const API_URL = process.env.API_URL ?? "http://localhost:3000";

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  price: string;
  quantity: number;
}

export async function userGetCartItems(
  accessToken: string,
  retry: number = 0,
): Promise<CartItem[] | null> {
  if (!accessToken) {
    throw new Error("Access token is missing");
  }
  try {
    const res = await fetch(`${API_URL}/users/cart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok && retry < 1) {
      return await refreshToken(() => userGetCartItems(accessToken, retry + 1));
    }
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return data.items;
  } catch (err) {
    throw new Error("Failed to fetch cart items");
  }
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
    const res = await fetch(`${API_URL}/users/cart/items`, {
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
