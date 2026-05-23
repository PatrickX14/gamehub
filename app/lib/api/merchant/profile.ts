import { refreshToken } from "../utils";

const API_URL = process.env.API_URL ?? "http://localhost:3000";

export type UpdateMerchantProfilePayload = {
  name: string;
  phoneNumber: string;
  email: string;
};

type UpdateMerchantProfileResponse = {
  message: string;
  data: {
    name: string;
    email: string;
    phoneNumber: string;
    updatedAt: string;
  };
};

export async function updateMerchantProfile(
  accessToken: string,
  payload: UpdateMerchantProfilePayload,
  retry: number = 0,
): Promise<UpdateMerchantProfileResponse> {
  const response = await fetch(`${API_URL}/merchant/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok && retry < 1) {
    return await refreshToken(() =>
      updateMerchantProfile(accessToken, payload, retry + 1),
    );
  }

  if (!response.ok) {
    throw new Error("Failed to update merchant profile");
  }

  return response.json();
}

export type BusinessHour = {
  day: string;
  open: string | null;
  close: string | null;
};

type GetMerchantBusinessHourResponse = {
  total: number;
  items: BusinessHour[];
};

export async function getMerchantBusinessHour(
  accessToken: string,
  retry: number = 0,
): Promise<GetMerchantBusinessHourResponse> {
  const response = await fetch(`${API_URL}/merchant/profile/businesshours`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok && retry < 1) {
    return await refreshToken(() =>
      getMerchantBusinessHour(accessToken, retry + 1),
    );
  }
  if (!response.ok) {
    throw new Error("Failed to fetch merchant business hour");
  }

  return response.json();
}

type PutMerchantBusinessHourResponse = {
  message: string;
};

export async function putMerchantBusinessHour(
  accessToken: string,
  payload: BusinessHour[],
  retry: number = 0,
): Promise<PutMerchantBusinessHourResponse> {
  console.log(payload);
  const jsonPayload = JSON.stringify({ businessHours: payload });
  console.log(jsonPayload);
  const response = await fetch(`${API_URL}/merchant/profile/businesshours`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ businessHours: payload }),
  });
  if (!response.ok && retry < 1) {
    return await refreshToken(() =>
      putMerchantBusinessHour(accessToken, payload, retry + 1),
    );
  }
  if (!response.ok) {
    throw new Error("Failed to update merchant business hour");
  }
  return response.json();
}
