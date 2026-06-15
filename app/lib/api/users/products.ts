import { refreshToken } from "../utils";

const API_URL = process.env.API_URL ?? "http://localhost:3000";

export type ProductData = {
  id: number;
  name: string;
  description: string;
  price: string;
  quantity: number;
  status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
  categories: string[];
  createdAt: string;
  merchantName: string;
  images: string[];
};

export async function userGetProducts(
  accessToken: string,
  query?: string,
  category?: string,
): Promise<{ total: number; items: ProductData[] }> {
  if (!accessToken) {
    throw new Error("Access token is missing");
  }

  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (category) params.set("category", category);

  const url = `${API_URL}/products${params.toString() ? `?${params.toString()}` : ""}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    throw new Error(res.statusText || "Failed to fetch products");
  }
  const products = await res.json();
  return products;
}

export type Product = Omit<ProductData, "merchantImageUrl"> & {
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
      throw new Error("Failed to fetch product, retrying...");
    }
    const product = await res.json();
    return product;
  } catch (err) {
    throw new Error("Failed to fetch product");
  }
}

export type Category = {
  id: number;
  category: string;
};

type CategoryResponse = {
  total: number;
  items: Category[];
};

export async function userGetCategories(
  accessToken: string,
): Promise<CategoryResponse> {
  if (!accessToken) {
    throw new Error("Access token is missing");
  }
  try {
    const res = await fetch(`${API_URL}/products/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      return await refreshToken(() => userGetCategories(accessToken));
    }
    const categories = await res.json();
    return categories;
  } catch (err) {
    throw new Error("Failed to fetch categories");
  }
}
