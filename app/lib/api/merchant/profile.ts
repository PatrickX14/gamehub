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
