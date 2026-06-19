import { MemberStatus } from "../users/party";

const API_URL = process.env.API_URL ?? "http://localhost:3000";

type PartyStatus = "OPEN" | "FULL" | "CLOSED";
export type Party = {
  id: number;
  reservationId: number;
  hostName: string;
  boardgameName: string;
  status: PartyStatus;
  startAt: string;
  createdAt: string;
};

type GetMerchantAllPartiesResponse = {
  total: number;
  items: Party[];
};

export async function getMerchantAllParties(
  accessToken: string,
): Promise<GetMerchantAllPartiesResponse> {
  const response = await fetch(`${API_URL}/merchant/parties`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    console.log(response.statusText);
    throw new Error("Failed to fetch merchant parties");
  }
  return response.json();
}

export type PartyMember = {
  id: number;
  name: string;
  userImageUrl: string;
  joinAt: string;
  status: MemberStatus;
  joinedAt: string;
};

export type PartyDetails = {
  id: number;
  reservationId: number;
  hostName: string;
  boardgameName: string;
  maxPlayers: number;
  status: PartyStatus;
  startAt: string;
  createdAt: string;
  members: PartyMember[];
};

export async function getMerchantSingleParty(
  accessToken: string,
  partyId: string,
): Promise<PartyDetails> {
  const response = await fetch(`${API_URL}/merchant/parties/${partyId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    console.log(response.statusText);
    throw new Error("Failed to fetch merchant parties");
  }
  return response.json();
}
