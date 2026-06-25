const API_URL = process.env.API_URL ?? "http://localhost:3000";

export type Facility = {
  id: number;
  name: string;
  createdAt: string;
};

type GetMerchantManyFacilityRepose = {
  total: number;
  items: Facility[];
};

export async function GetMerchantManyFacility(
  accessToken: string,
): Promise<GetMerchantManyFacilityRepose> {
  const response = await fetch(`${API_URL}/merchant/facilities`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export async function CreateSingleFacility(
  accessToken: string,
  facilityName: string,
): Promise<{ ok: boolean }> {
  const response = await fetch(`${API_URL}/merchant/facilities`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: facilityName }),
  });
  if (!response.ok) {
    console.log(response.status);
    throw new Error(response.statusText);
  }

  return { ok: true };
}

export async function DeleteSingleFacility(
  accessToken: string,
  facilityId: number,
): Promise<{ ok: boolean }> {
  const response = await fetch(`${API_URL}/merchant/facilities/${facilityId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    console.log(response.status);
    throw new Error(response.statusText);
  }

  return { ok: true };
}
