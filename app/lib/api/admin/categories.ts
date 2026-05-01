import { getLocalStorageItem, refreshToken } from "../utils";

const API_URL = process.env.API_URL ?? "http://localhost:3000";

export interface CategoryData {
  total: number;
  data: {
    id: number;
    category: string;
  }[];
}

export async function getCategories(
  accessToken: string,
  retry: number = 0,
): Promise<CategoryData> {
  if (!accessToken) {
    throw new Error("Access token is missing");
  }
  try {
    const res = await fetch(`${API_URL}/admin/categories`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok && retry < 1) {
      return await refreshToken(() => getCategories(accessToken, retry + 1));
    }
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.message ?? "Failed to fetch categories");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    throw err;
  }
}
