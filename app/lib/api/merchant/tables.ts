import { refreshToken } from "../utils";

const API_URL = process.env.API_URL ?? "http://localhost:3000";

type CreateProductPayload = {
  seats: number;
  pricePerHour: number;
};

export type Table = {
  id: number;
  ownerId: number;
  seats: number;
  pricePerHour: string;
  createdAt: string;
};

type GetTablesResponse = {
  total: number;
  items: Table[];
};

export async function createTable(
  accessToken: string,
  payload: CreateProductPayload,
  retry: number = 0,
): Promise<{ ok: boolean }> {
  if (!accessToken) {
    throw new Error("Access token is missing");
  }
  try {
    console.log("Over here: ", JSON.stringify({ ...payload }));
    const res = await fetch(`${API_URL}/merchant/tables`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    });
    if (!res.ok && retry < 1) {
      return await refreshToken(() =>
        createTable(accessToken, payload, retry + 1),
      );
    }
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.message ?? "Failed to create table");
    }
    // const data = await res.json();
    return { ok: true };
  } catch (err) {
    console.error("Failed to create table:", err);
    throw err;
  }
}

export async function getTables(
  accessToken: string,
  retry: number = 0,
): Promise<GetTablesResponse> {
  if (!accessToken) {
    throw new Error("Access token is missing");
  }
  try {
    const res = await fetch(`${API_URL}/merchant/tables`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok && retry < 1) {
      return await refreshToken(() => getTables(accessToken, retry + 1));
    }
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.message ?? "Failed to fetch tables");
    }
    return res.json() as Promise<GetTablesResponse>;
  } catch (err) {
    console.error("Failed to fetch tables:", err);
    throw err;
  }
}

export async function deleteTable(
  accessToken: string,
  tableId: number,
  retry: number = 0,
): Promise<{ ok: boolean }> {
  if (!accessToken) {
    throw new Error("Access token is missing");
  }
  try {
    const res = await fetch(`${API_URL}/merchant/tables/${tableId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok && retry < 1) {
      return await refreshToken(() =>
        deleteTable(accessToken, tableId, retry + 1),
      );
    }
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.message ?? "Failed to delete table");
    }
    return { ok: true };
  } catch (err) {
    console.error("Failed to delete table:", err);
    throw err;
  }
}
