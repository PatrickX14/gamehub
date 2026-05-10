"use client";
import { useEffect, useState } from "react";
import { GamesTable } from "@/components/AdminTable";
import { getLocalStorageItem } from "@/app/lib/api/utils";
import {
  BoardgameStockData,
  getBoardGameStock,
} from "@/app/lib/api/admin/boardgames";

export default function AdminGamesPage() {
  const [gamesData, setGamesData] = useState<BoardgameStockData[]>([]);

  useEffect(() => {
    const fetchGamesData = async () => {
      try {
        const accessToken = await getLocalStorageItem("accessToken");
        if (!accessToken) return;
        const data = await getBoardGameStock(accessToken);
        if (!data) return;
        setGamesData(data);
      } catch (error) {
        console.error("Error fetching games data:", error);
      }
    };

    fetchGamesData();
  }, []);

  return (
    <div>
      <GamesTable tableTitle={"Games"} data={gamesData} itemsPerPage={0} />
    </div>
  );
}
