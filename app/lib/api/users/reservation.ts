import { refreshToken } from "../utils";

const API_URL = process.env.API_URL ?? "http://localhost:3000";

// type MerchantAddress = {
//   houseNumber: string;
//   soi: string;
//   road: string;
//   village: string;
//   subDistrict: string;
//   district: string;
//   province: string;
//   postalCode: string;
// };

export type BookingStatus =
  | "CANCELLED"
  | "AWAITING_PAYMENT"
  | "CONFIRMED"
  | "COMPLETED"
  | "PENDING_APPROVAL";

export type BookingItem = {
  id: number;
  merchantName: string;
  merchantAddress: string;
  status: BookingStatus;
  boardgameName: string;
  startAt: string;
  endAt: string;
};

type ReservationsResponse = {
  total: number;
  items: BookingItem[];
};

export async function getUserReservations(
  accessToken: string,
): Promise<BookingItem[]> {
  const res: Response = await fetch(`${API_URL}/reservations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user reservations");
  }
  const reservations: ReservationsResponse = await res.json();
  return reservations.items;
}

export type BoardgameData = {
  gameId: number;
  gameName: string;
  description: string;
  players: string;
  duration: string;
};

type GetBoardgamesForReservationsResponse = {
  total: number;
  items: BoardgameData[];
};

export async function getBoardgamesForReservations(
  accessToken: string,
  boardgamequery: string = "",
  merchantquery: string = "",
  retry: number = 0,
): Promise<BoardgameData[]> {
  try {
    const res: Response = await fetch(
      `${API_URL}/boardgames?forReservation=true&query=${encodeURIComponent(boardgamequery)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (!res.ok && retry < 1) {
      return await refreshToken(() =>
        getBoardgamesForReservations(
          accessToken,
          boardgamequery,
          merchantquery,
          retry + 1,
        ),
      );
    }
    const products: GetBoardgamesForReservationsResponse = await res.json();
    return products.items;
  } catch (err) {
    throw new Error(
      "Failed to fetch products: " +
        (err instanceof Error ? err.message : String(err)),
    );
  }
}

export type MerchantData = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  businessHours: string[];
  address: string;
};

type GetMerchantsForReservationsResponse = {
  total: number;
  items: MerchantData[];
};

export async function getMerchantsForReservations(
  accessToken: string,
  merchantquery: string = "",
  retry: number = 0,
): Promise<MerchantData[]> {
  try {
    const res: Response = await fetch(
      `${API_URL}/reservations/merchants?findMerchantFirst=true&query=${encodeURIComponent(merchantquery)}`,
      {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (!res.ok && retry < 1) {
      return await refreshToken(() =>
        getMerchantsForReservations(accessToken, merchantquery, retry + 1),
      );
    }
    const merchants: GetMerchantsForReservationsResponse = await res.json();
    return merchants.items;
  } catch (err) {
    throw new Error(
      "Failed to fetch products: " +
        (err instanceof Error ? err.message : String(err)),
    );
  }
}

export type ReservationTable = {
  id: number;
  seats: number;
  pricePerHour: number;
  estimatedTotal: number;
};

export type MerchantOption = {
  shopId: number;
  shopName: string;
  shopEmail: string;
  shopPhone: string;
  businessHours: string[];
  address: string;
  tables: ReservationTable[];
};

export type GetMerchantOptionsResponse = {
  boardgame: {
    id: number;
    name: string;
    minPlayTime: number;
    maxPlayTime: number;
    minPlayers: number;
    maxPlayers: number;
  };
  sessionMinutes: number;
  merchantOptions: MerchantOption[];
  startAt: string;
  endAt: string;
};

export async function getMerchantOptions(
  accessToken: string,
  boardgameId: number,
  startAt: string,
  playerCount: number,
  retry: number = 0,
): Promise<GetMerchantOptionsResponse> {
  try {
    const res: Response = await fetch(`${API_URL}/reservations/merchants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ boardgameId, startAt, playerCount }),
    });
    if (!res.ok && retry < 1) {
      return await refreshToken(() =>
        getMerchantOptions(
          accessToken,
          boardgameId,
          startAt,
          playerCount,
          retry + 1,
        ),
      );
    }
    return await res.json();
  } catch (err) {
    throw new Error(
      "Failed to fetch merchant options: " +
        (err instanceof Error ? err.message : String(err)),
    );
  }
}
