const API_URL = process.env.API_URL ?? "http://localhost:3000";

type PartyStatus = "OPEN" | "FULL" | "CLOSED";

type Boardgame = {
  id: number;
  name: string;
};

type Merchant = {
  id: number;
  name: string;
  location: string;
};

export type MemberStatus = "ACEPTED" | "PENDING" | "REJECTED";

export type PartyMember = {
  id: number;
  name: string;
  lastName: string;
  imageUrl: string;
  joinedAt: string;
  status: MemberStatus;
  isHost?: boolean;
};

export type Session = {
  id: number;
  maxPlayers: number;
  hostName: string;
  status: PartyStatus;
  description: string;
  boardgame: Boardgame;
  merchant: Merchant;
  members: PartyMember[];
  startAt?: string;
  endAt?: string;
};

type GetAllPartiesResponse = {
  total: number;
  items: Session[];
};

export async function getAllParties(
  accessToken: string,
): Promise<GetAllPartiesResponse> {
  const response = await fetch(`${API_URL}/parties`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch parties");
  }

  return response.json();
}

export type Party = {
  id: number;
  description: string;
  hostName: string;
  maxPlayers: number;
  startAt: string;
  endAt: string;
  members: PartyMember[];
  merchant: Merchant;
  status: PartyStatus;
  boardgame: Boardgame;
  currentPlayers: number;
};

type CreatePartyResponse = {
  total: number;
  items: Party[];
};

export async function getMyParties(
  accessToken: string,
): Promise<CreatePartyResponse> {
  const response = await fetch(`${API_URL}/parties/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch parties");
  }

  return response.json();
}

export async function joinParty(accessToken: string, partyId: number) {
  const response = await fetch(`${API_URL}/parties/${partyId}/join`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Failed to join parties");
  }

  return response.json();
}
