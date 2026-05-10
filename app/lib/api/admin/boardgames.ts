import { refreshToken } from "../utils";

const API_URL = process.env.API_URL ?? "http://localhost:3000";

export type BoardGameData = {
  id: number;
  name: string;
  minPlayTime: number;
  maxPlayTime: number;
  minPlayers: number;
  maxPlayers: number;
  isActive: boolean;
  description: string;
  createdAt: string;
};

export async function getBoardGames(
  accessToken: string,
  query?: string,
  retry: number = 0,
): Promise<BoardGameData[] | null> {
  if (!accessToken) {
    throw new Error("Access token is missing");
  }

  try {
    const res = await fetch(`${API_URL}/boardgames?query=${query ?? ""}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok && retry < 1) {
      return await refreshToken(() =>
        getBoardGames(accessToken, query, retry + 1),
      );
    }
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.message ?? "Failed to fetch categories");
    }
    const data = await res.json();
    return data.items;
  } catch (err) {
    return null;
  }
}

export type BoardgameStockData = {
  id: number;
  name: string;
  quantity: number;
  status: string;
  createdAt: string;
};

export async function getBoardGameStock(
  accessToken: string,
  retry: number = 0,
): Promise<BoardgameStockData[] | null> {
  if (!accessToken) {
    throw new Error("Access token is missing");
  }

  try {
    const res = await fetch(`${API_URL}/merchant/boardgames`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok && retry < 1) {
      return await refreshToken(() =>
        getBoardGameStock(accessToken, retry + 1),
      );
    }
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.message ?? "Failed to fetch categories");
    }
    const data = await res.json();
    return data.items;
  } catch (err) {
    return null;
  }
}

export type MerchantBoardgameResponse = {
  id: number;
  gameName: string;
  quantity: number;
  status: string;
  createdAt: string;
};

export async function getSingleMerchantBoardGame(
  accessToken: string,
  gameId: number,
  retry: number = 0,
): Promise<MerchantBoardgameResponse | null> {
  if (!accessToken) {
    throw new Error("Access token is missing");
  }

  try {
    const res = await fetch(`${API_URL}/merchant/boardgames/${gameId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok && retry < 1) {
      return await refreshToken(() =>
        getSingleMerchantBoardGame(accessToken, gameId, retry + 1),
      );
    }
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.message ?? "Failed to fetch categories");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    return null;
  }
}

export async function updateBoardGameStatus(
  accessToken: string,
  gameId: number,
  newStatus: string,
  quantity: number,
  retry: number = 0,
): Promise<boolean> {
  if (!accessToken) {
    throw new Error("Access token is missing");
  }

  try {
    const res = await fetch(`${API_URL}/merchant/boardgames/${gameId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus, quantity }),
    });
    console.log(res);
    if (!res.ok && retry < 1) {
      return await refreshToken(() =>
        updateBoardGameStatus(
          accessToken,
          gameId,
          newStatus,
          quantity,
          retry + 1,
        ),
      );
    }
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.message ?? "Failed to update board game status");
    }
    return true;
  } catch (err) {
    console.error("updateBoardGameStatus failed:", err);
    return false;
  }
}

export async function deleteBoardGame(
  accessToken: string,
  gameId: number,
  retry: number = 0,
): Promise<boolean> {
  if (!accessToken) {
    throw new Error("Access token is missing");
  }

  try {
    const res = await fetch(`${API_URL}/merchant/boardgames/${gameId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok && retry < 1) {
      return await refreshToken(() =>
        deleteBoardGame(accessToken, gameId, retry + 1),
      );
    }
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.message ?? "Failed to delete board game");
    }
    return true;
  } catch (err) {
    return false;
  }
}

export async function addBoardGame(
  accessToken: string,
  boardgameId: number,
  quantity: number,
  retry: number = 0,
): Promise<string | null> {
  if (!accessToken) {
    throw new Error("Access token is missing");
  }

  try {
    const res = await fetch(`${API_URL}/merchant/boardgames`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ boardgameId, quantity }),
    });
    if (!res.ok && retry < 1) {
      return await refreshToken(() =>
        addBoardGame(accessToken, boardgameId, quantity, retry + 1),
      );
    }
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.message ?? "Failed to add board game");
    }
    const data = await res.json();
    return data.data;
  } catch (err) {
    return null;
  }
}
