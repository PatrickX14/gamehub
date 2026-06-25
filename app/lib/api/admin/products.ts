import { refreshToken } from "../utils";

const API_URL = process.env.API_URL ?? "http://localhost:3000";

export interface ProductData {
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
  createdAt: string;
}

export interface GetProductsResponse {
  total: number;
  data: ProductData[];
}

export interface CreateProductPayload {
  categoryId: number[];
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export async function createProduct(
  accessToken: string,
  payload: CreateProductPayload,
  imageIds: number[],
  retry: number = 0,
): Promise<ProductData> {
  if (!accessToken) {
    throw new Error("Access token is missing");
  }
  try {
    const res = await fetch(`${API_URL}/admin/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload, imageIds }),
    });
    if (!res.ok && retry < 1) {
      return await refreshToken(() =>
        createProduct(accessToken, payload, imageIds, retry + 1),
      );
    }
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.message ?? "Failed to create product");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to create product:", err);
    throw err;
  }
}

export type Category = {
  id: number;
  category: string;
  description: string;
};

export interface GetSingleProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  status: "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";
  createdAt: string;
  images: { id: number; path: string }[];
  categories: Category[];
}

export async function getSingleProduct(
  accessToken: string,
  productId: number,
  retry: number = 0,
): Promise<GetSingleProduct> {
  if (!accessToken) {
    throw new Error("Access token is missing");
  }
  try {
    const res = await fetch(`${API_URL}/admin/products/${productId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok && retry < 1) {
      return await refreshToken(() =>
        getSingleProduct(accessToken, productId, retry + 1),
      );
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch products:", err);
    throw err;
  }
}

export async function getProducts(
  accessToken: string,
  retry: number = 0,
): Promise<GetProductsResponse> {
  if (!accessToken) {
    throw new Error("Access token is missing");
  }
  try {
    const res = await fetch(`${API_URL}/admin/products`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok && retry < 1) {
      return await refreshToken(() => getProducts(accessToken, retry + 1));
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch products:", err);
    throw err;
  }
}

export async function deleteProduct(
  accessToken: string,
  productId: number | string,
  retry: number = 0,
): Promise<void> {
  if (!accessToken) {
    throw new Error("Access token is missing");
  }
  try {
    const res = await fetch(`${API_URL}/admin/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok && retry < 1) {
      return await refreshToken(() =>
        deleteProduct(accessToken, productId, retry + 1),
      );
    }
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.message ?? "Failed to delete product");
    }
  } catch (err) {
    console.error("Failed to delete product:", err);
    throw err;
  }
}

export async function updateProduct(
  accessToken: string,
  productId: number,
  payload: CreateProductPayload,
  imageIds: number[],
  retry: number = 0,
): Promise<ProductData> {
  if (!accessToken) {
    throw new Error("Access token is missing");
  }
  try {
    const res = await fetch(`${API_URL}/admin/products/${productId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload, imageIds }),
    });
    if (!res.ok && retry < 1) {
      return await refreshToken(() =>
        updateProduct(accessToken, productId, payload, imageIds, retry + 1),
      );
    }
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.message ?? "Failed to update product");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to update product:", err);
    throw err;
  }
}
