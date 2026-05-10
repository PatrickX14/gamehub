"use client";
import { notification, Switch } from "antd";
import { useEffect, useState } from "react";
import { SectionCard } from "./Cards";
import { TextInput } from "./Input";
import { getLocalStorageItem } from "@/app/lib/api/utils";
import {
  getSingleMerchantBoardGame,
  MerchantBoardgameResponse,
  updateBoardGameStatus,
} from "@/app/lib/api/admin/boardgames";

type MerchantBoardgameEditFormProps = {
  gameId: number;
};

export function MerchantBoardgameEditForm({
  gameId,
}: MerchantBoardgameEditFormProps) {
  const [api, contextHolder] = notification.useNotification();
  const [isChecked, setIsChecked] = useState(false);
  const [gameData, setGameData] = useState<MerchantBoardgameResponse>();
  const [quantity, setQuantity] = useState<number>();
  useEffect(() => {
    async function fetchMerchantBoardGame() {
      const accessToken = await getLocalStorageItem("accessToken");
      if (!accessToken) return;
      const data = await getSingleMerchantBoardGame(accessToken, gameId);
      console.log(data);
      if (!data) return;
      setGameData(data);
      setIsChecked(data.status === "ACTIVE" ? true : false);
      setQuantity(data.quantity);
    }
    fetchMerchantBoardGame();
  }, []);

  async function onUpdateClick() {
    const accessToken = await getLocalStorageItem("accessToken");
    if (!accessToken) return;
    if (!gameData) return;
    if (!quantity) return;
    const status = isChecked ? "ACTIVE" : "INACTIVE";
    await updateBoardGameStatus(accessToken, gameData?.id, status, quantity);
    api.info({
      title: "Success",
      description: "succesfully update boardgame data",
      showProgress: true,
      pauseOnHover: true,
      placement: "topRight",
    });
  }

  return (
    <SectionCard title={"Edit game data"} description={""}>
      {contextHolder}
      <div className="grid grid-cols-2 gap-4">
        <div className=" gap-4 col-span-full">
          <p className="text-sm mb-0.5 text-secondary">Status</p>
          <Switch
            size="medium"
            checked={isChecked}
            onChange={(checked) => setIsChecked(checked)}
            style={{
              backgroundColor: isChecked ? "#FACC14" : undefined,
            }}
          />
        </div>
        <TextInput
          name={"quantity"}
          label={"Game name"}
          defaultValue={gameData?.gameName}
          disabled
        />
        <TextInput
          name={"quantity"}
          label={"Quantity"}
          defaultValue={quantity}
          onChange={(event) => setQuantity(+event.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full mt-4 cursor-pointer bg-[#FACC14] rounded-md p-2 font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
        onClick={onUpdateClick}
      >
        {/* {formState === "loading" ? "Submitting…" : "Submit"} */}
        Save
      </button>
    </SectionCard>
  );
}
