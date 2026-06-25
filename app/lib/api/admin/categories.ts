const API_URL = process.env.API_URL ?? "http://localhost:3000";

export type Category = {
  id: number;
  category: string;
};

export interface CategoryData {
  total: number;
  data: Category[];
}

export async function getCategories(
  accessToken: string,
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
