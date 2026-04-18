import { getLocalStorageItem, redirectToLogin, refreshToken } from "./utils";

const API_URL = process.env.API_URL ?? "http://localhost:3000";

export interface GetMeResponse {
  id: number;
  email: string;
  name: string;
  lastName: string;
  role: string;
  phoneNumber: string;
  gender: string;
  addresses: { total: number; items: AddressBody[] };
}

export interface AddressBody {
  id: number;
  name: string;
  receiverName: string;
  phoneNumber: string;
  houseNumber: string;
  village?: string;
  soi?: string;
  road?: string;
  subDistrict: string;
  district: string;
  province: string;
  postalCode: string;
}

export async function getMe(
  accessToken: string,
  retry: number = 0,
): Promise<GetMeResponse> {
  const res = await fetch(`${API_URL}/users/me`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok && retry < 1) {
    return await refreshToken(() => getMe(accessToken, retry + 1));
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch user: ${res.status}`);
  }

  const data: GetMeResponse = await res.json();
  return data;
}

export async function getAvatar() {
  const accessToken = await getLocalStorageItem("accessToken");
  if (!accessToken) return;
  const res = await fetch(`${API_URL}/users/avatar`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) return null;
  return await res.json();
}

interface PostAddressResponse {
  message: string;
}

export async function getAddress(addressId: string) {
  const accessToken = await getLocalStorageItem("accessToken");
  const res = await fetch(`${API_URL}/users/address/${addressId}`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch address: ${res.status}`);
  }
  return await res.json();
}

export async function postAddress(
  _prevState: { error: string | null },
  formData: FormData,
  retry: number = 0,
): Promise<PostAddressResponse> {
  const accessToken = await getLocalStorageItem("accessToken");

  const name = formData.get("name");
  const receiverName = formData.get("receiverName") ?? "";
  const phoneNumber = formData.get("phoneNumber") ?? "";
  const houseNumber = formData.get("houseNumber") ?? "";
  const soi = formData.get("soi") ?? "";
  const road = formData.get("road") ?? "";
  const village = formData.get("village") ?? "";
  const subDistrict = formData.get("subDistrict") ?? "";
  const district = formData.get("district") ?? "";
  const province = formData.get("province") ?? "";
  const postalCode = formData.get("postalCode") ?? "";

  const res = await fetch(`${API_URL}/users/address`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify({
      name,
      receiverName,
      phoneNumber,
      houseNumber,
      soi: soi === "" ? null : soi,
      road,
      village: village === "" ? null : village,
      subDistrict,
      district,
      province,
      postalCode,
    }),
  });

  if (!res.ok && retry < 1) {
    return await refreshToken(() =>
      postAddress(_prevState, formData, retry + 1),
    );
  }

  if (!res.ok) {
    throw new Error(`Failed to add address: ${res.status}`);
  }

  return await res.json();
}

export async function updateAddress(
  _prevState: { error: string | null },
  formData: FormData,
  retry: number = 0,
): Promise<PostAddressResponse> {
  const accessToken = await getLocalStorageItem("accessToken");
  const addressId = formData.get("addressId");

  if (!addressId || typeof addressId !== "string") {
    throw new Error("Missing addressId for updateAddress");
  }

  const name = formData.get("name");
  const receiverName = formData.get("receiverName") ?? "";
  const phoneNumber = formData.get("phoneNumber") ?? "";
  const houseNumber = formData.get("houseNumber") ?? "";
  const soi = formData.get("soi") ?? "";
  const road = formData.get("road") ?? "";
  const village = formData.get("village") ?? "";
  const subDistrict = formData.get("subDistrict") ?? "";
  const district = formData.get("district") ?? "";
  const province = formData.get("province") ?? "";
  const postalCode = formData.get("postalCode") ?? "";

  const res = await fetch(`${API_URL}/users/address/${addressId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify({
      name,
      receiverName,
      phoneNumber,
      houseNumber,
      soi,
      road,
      village,
      subDistrict,
      district,
      province,
      postalCode,
    }),
  });

  if (!res.ok && retry < 1) {
    return await refreshToken(() =>
      updateAddress(_prevState, formData, retry + 1),
    );
  }

  if (!res.ok) {
    throw new Error(`Failed to update address: ${res.status}`);
  }

  return await res.json();
}
