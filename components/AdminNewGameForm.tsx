"use client";
import { Button, GetProp, notification, Select, SelectProps } from "antd";
import { SectionCard } from "./Cards";
import { TextInput } from "./Input";
import { SyntheticEvent, useEffect, useState } from "react";
import {
  addBoardGame,
  BoardGameData,
  getBoardGames,
} from "@/app/lib/api/admin/boardgames";
import { getLocalStorageItem } from "@/app/lib/api/utils";
import { debounce } from "@/app/lib/debounce";

type GameOptions = GetProp<SelectProps, "options">;
type SelectedGameData = {
  id: number;
  minPlayTime: number;
  maxPlayTime: number;
  minPlayer: number;
  maxPlayer: number;
};

export function AdminNewGameForm() {
  const [gameOptions, setOptions] = useState<GameOptions | []>([]);
  const [query, setQuery] = useState<string>("");

  const [gameData, setGameData] = useState<BoardGameData[] | []>([]);
  const [selectedData, setSelectData] = useState<BoardGameData | null>();
  const [quantity, setQuantity] = useState<number>();

  const [api, notificationContext] = notification.useNotification();
  useEffect(() => {
    async function fetchBoardGameData() {
      const token = await getLocalStorageItem("accessToken");
      if (typeof token != "string") return;
      const boardGameData = await getBoardGames(token, query);
      if (!boardGameData) return;
      const mappedData = boardGameData.map(({ id, name }) => {
        return { label: name, value: id };
      });

      setOptions(mappedData);
      setGameData(boardGameData);
    }
    fetchBoardGameData();
  }, [query]);

  const debouncedSearch = debounce((value: string) => {
    setQuery(value);
  }, 300);

  function handleGameSelect(gameId: number) {
    const data = gameData.find(({ id }) => Number(gameId) === Number(id));
    if (!data) return;
    setSelectData(data);
  }

  async function onSubmit() {
    const boardgameId = selectedData?.id;
    if (!boardgameId) return;
    if (!quantity) {
      api.error({
        placement: "topRight",
        title: "Error",
        description: `Quantity must not be empty`,
        pauseOnHover: true,
        showProgress: true,
      });
      return;
    }
    const accessToken = await getLocalStorageItem("accessToken");
    if (!accessToken) return;
    await addBoardGame(accessToken, boardgameId, quantity);
    api.info({
      placement: "topRight",
      title: "Board game added",
      description: `${quantity} ${selectedData.name} have been added to you shop`,
      pauseOnHover: true,
      showProgress: true,
    });
  }

  return (
    <SectionCard title={"Add game"} description={""}>
      {notificationContext}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm mb-0.5 text-secondary">Game</p>
          <Select
            className="w-full"
            options={gameOptions}
            showSearch={{
              optionFilterProp: "label",
              onSearch: debouncedSearch,
            }}
            onSelect={handleGameSelect}
          />
        </div>
        <TextInput
          name={"quantity"}
          label={"Quantity"}
          required
          number
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setQuantity(Number(event.currentTarget.value))
          }
        />
        {selectedData ? (
          <div key={selectedData.id} className="col-span-full">
            {/* Description */}
            <div className="col-span-2">
              <TextInput
                name={"Max play time"}
                label={"Description"}
                required
                disabled
                defaultValue={selectedData?.description ?? "-"}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                name={"Min play time"}
                label={"Min play time (Minute)"}
                required
                disabled
                defaultValue={selectedData?.minPlayTime ?? "-"}
              />
              <TextInput
                name={"Max play time"}
                label={"Max play time (Minute)"}
                required
                disabled
                defaultValue={selectedData?.maxPlayTime}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                name={"Min player"}
                label={"Min player"}
                required
                disabled
                defaultValue={selectedData?.minPlayers ?? "-"}
              />
              <TextInput
                name={"Max player"}
                label={"Max player"}
                required
                disabled
                defaultValue={selectedData?.maxPlayers ?? "-"}
              />
            </div>
            <div className="flex col-span-2 justify-end">
              <button
                className="bg-[#FACC14] hover:bg-[#E7B008]/80 px-4 py-2 rounded-md cursor-pointer"
                onClick={onSubmit}
              >
                submit
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </SectionCard>
  );
}
