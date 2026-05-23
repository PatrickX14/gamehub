import { refreshToken } from "../utils";

const API_URL = process.env.API_URL ?? "http://localhost:3000";

type ReservationStatus =
  | "PENDING APPROVAL"
  | "AWAITING PAYMENT"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

export type ReservationItem = {
  id: number;
  hostId: number;
  hostName: string;
  boardgameId: number;
  boardgameName: string;
  startAt: string;
  endAt: string;
  status: ReservationStatus;
  createdAt: string;
};

type ReservationListResponse = {
  total: number;
  items: ReservationItem[];
};

export async function getSingleMerchantReservation(
  accessToken: string,
  reservationId: number,
  retry: number = 0,
): Promise<ReservationItem> {
  const res = await fetch(`${API_URL}/merchant/reservations/${reservationId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok && retry < 1) {
    return await refreshToken(() =>
      getSingleMerchantReservation(accessToken, reservationId, retry + 1),
    );
  }
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.message ?? "Failed to create table");
  }
  const data: ReservationItem = await res.json();
  return data;
}

export async function getMerchantReservations(
  accessToken: string,
  retry: number = 0,
): Promise<ReservationItem[]> {
  const res = await fetch(`${API_URL}/merchant/reservations`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok && retry < 1) {
    return await refreshToken(() =>
      getMerchantReservations(accessToken, retry + 1),
    );
  }
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.message ?? "Failed to create table");
  }
  const data: ReservationListResponse = await res.json();
  return data.items;
}

export type ReservationUpdateStatus = Extract<
  ReservationStatus,
  "CONFIRMED" | "CANCELLED"
>;

export async function putMerchantReservationStatus(
  accessToken: string,
  reservationId: number,
  status: ReservationUpdateStatus,
): Promise<boolean> {
  const res = await fetch(`${API_URL}/merchant/reservations/${reservationId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: status === "CONFIRMED" ? "approve" : "reject",
    }),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.message ?? "Failed to update reservation status");
  }
  return res.ok;
}
