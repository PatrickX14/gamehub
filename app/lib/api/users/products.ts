import { refreshToken } from "../utils";

const API_URL = process.env.API_URL ?? "http://localhost:3000";

type ProductCatagory = {
  id: number;
  catagory: string;
  description: string;
};

export type ProductData = {
  id: number;
  name: string;
  description: string;
  price: string;
  quantity: number;
  status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
  createdAt: string;
  shopName: string;
  shopImageUrl: string;
  images: string[];
};

export async function userGetProducts(
  accessToken: string,
  retry: number = 0,
): Promise<{ total: number; items: ProductData[] }> {
  if (!accessToken) {
    throw new Error("Access token is missing");
  }
  try {
    const res = await fetch(`${API_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok && retry < 1) {
      return await refreshToken(() => userGetProducts(accessToken, retry + 1));
    }
    const products = await res.json();
    return products;
  } catch (err) {
    throw new Error("Failed to fetch products");
  }
}

export type Product = Omit<ProductData, "shopImageUrl"> & {
  categories: string[];
};

export async function userGetSingleProduct(
  accessToken: string,
  productId: number,
  retry: number = 0,
): Promise<Product> {
  if (!accessToken) {
    throw new Error("Access token is missing");
  }
  try {
    const res = await fetch(`${API_URL}/products/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok && retry < 1) {
      return await refreshToken(() =>
        userGetSingleProduct(accessToken, productId, retry + 1),
      );
    }
    const product = await res.json();
    return product;
  } catch (err) {
    throw new Error("Failed to fetch product");
  }
}
