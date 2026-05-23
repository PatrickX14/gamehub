"use client";
import { useEffect, useMemo, useState } from "react";
import { GameReservationCard } from "@/components/GameReservationCard";
import { ShopReservationCard } from "@/components/shopReservationCard";
import { Switch, SwitchProps } from "antd";
import { createStyles } from "antd-style";
import {
  getBoardgamesForReservations,
  getMerchantOptions,
  getMerchantsForReservations,
  MerchantData,
  type BoardgameData,
} from "@/app/lib/api/users/reservation";
import { getLocalStorageItem } from "@/app/lib/api/utils";
import { debounce } from "@/app/lib/debounce";
import dayjs from "dayjs";

const useStyle = createStyles(({ token }) => ({
  root: {
    width: 40,
    backgroundColor: token.colorPrimary,
  },
}));

export function ReservationCardsSection() {
  const [isShopFirst, setFirstSelection] = useState<boolean>(false);
  const [selectedGameId, setSelectedGameId] = useState<number | null>();
  const [selectedMercantId, setSelectedMerchantId] = useState<number | null>();
  const [boardgameData, setBoardgameData] = useState<BoardgameData[]>([]);
  const [merchanteData, setMerchantData] = useState<MerchantData[]>([]);
  const [boardgameQuery, setBoardgameQuery] = useState<string>("");
  const [merchantQuery, setshopQuery] = useState<string>("");

  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [playerCount, setPlayerCount] = useState<number>(1);

  async function handleGameSelect(gameId: number) {
    if (!date || !time) return; // guard: inputs must be filled

    const accessToken = await getLocalStorageItem("accessToken");
    if (!accessToken) return;

    const startAt = dayjs(`${date}T${time}:00+07:00`).format(
      "YYYY-MM-DDTHH:mm:ssZ",
    );

    const result = await getMerchantOptions(
      accessToken,
      gameId,
      startAt,
      playerCount,
    );

    setMerchantData(
      result.merchantOptions.map((m) => ({
        id: m.shopId,
        name: m.shopName,
        email: m.shopEmail,
        phoneNumber: m.shopPhone,
        businessHours: m.businessHours,
        address: m.address,
      })),
    );
    setSelectedGameId(gameId);
  }

  const handleGameSearch = useMemo(
    () => debounce((value: string) => setBoardgameQuery(value), 300),
    [],
  );

  const handleShopSearch = useMemo(
    () => debounce((value: string) => setshopQuery(value), 300),
    [],
  );

  async function onSwitchCheck(checked: boolean) {
    setBoardgameQuery("");
    setshopQuery("");
    setSelectedGameId(null);
    setSelectedMerchantId(null);
    setFirstSelection(checked);

    const accessToken = await getLocalStorageItem("accessToken");
    if (!accessToken) return;
    // checked is user choose shop first
    if (checked) {
      const boardgames = await getBoardgamesForReservations(
        accessToken,
        boardgameQuery,
      );
      setBoardgameData(boardgames);
    } else {
      const merchants = await getMerchantsForReservations(
        accessToken,
        merchantQuery,
      );
      setMerchantData(merchants);
    }
  }

  const stylesFn: SwitchProps["styles"] = (info) => {
    if (info.props.size === "medium") {
      return {
        root: { backgroundColor: "#FACC14" },
      } satisfies SwitchProps["styles"];
    }
    return {};
  };

  const { styles: classNames } = useStyle();

  useEffect(() => {
    async function fetchDatas() {
      const accessToken = await getLocalStorageItem("accessToken");
      if (!accessToken) return;
      const boardgames = await getBoardgamesForReservations(
        accessToken,
        boardgameQuery,
      );
      const merchants = await getMerchantsForReservations(
        accessToken,
        merchantQuery,
      );
      if (!boardgames && !merchants) return;
      setBoardgameData(boardgames);
      setMerchantData(merchants);
    }
    fetchDatas();
  }, [boardgameQuery]);

  const gameSection = (
    <>
      <div className="w-full my-7">
        <input
          className="bg-[#EEF2F6] ring ring-[#627384] ring-1 outline-none rounded-md h-11 px-4 focus:ring-2 focus:ring-[#FACC14] w-full"
          placeholder="Search board games..."
          type="text"
          onChange={(event) => handleGameSearch(event.target.value)}
        />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-12 mb-12">
        {boardgameData.map(
          ({ gameName, description, duration, players, gameId }, index) => (
            <GameReservationCard
              key={index}
              gameName={gameName}
              description={description}
              players={players}
              duration={duration}
              onClick={() => handleGameSelect(gameId)}
              isSelected={selectedGameId === gameId}
            />
          ),
        )}
      </div>
    </>
  );

  const shopSection = (
    <>
      <div className="w-full my-7">
        <select
          className={`col-span-full bg-[#EEF2F6] ring ring-[#627384] ring-1 outline-none rounded-md h-11 px-4 focus:ring-2 w-full focus:ring-[#FACC14]`}
        >
          <option>All Provinces</option>
          <option>Bangkok</option>
          <option>Nonthaburi</option>
        </select>
        <input
          className="bg-[#EEF2F6] ring ring-[#627384] ring-1 outline-none rounded-md h-11 px-4 focus:ring-2 focus:ring-[#FACC14] w-full mt-6"
          placeholder="Search merchants..."
          type="text"
          onChange={(event) => setshopQuery(event.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mb-6">
        {merchanteData.map(({ id, name, address, businessHours }, index) => (
          <ShopReservationCard
            key={index}
            isSelected={selectedMercantId === id}
            onClick={() => setSelectedMerchantId(id)}
            shopName={name}
            location={address}
            openingHours={businessHours}
            imageUrl={""}
            tags={[
              "Food and Drink",
              "Air Conditioning",
              "Parking Available",
              "Cozy Atmosphere",
            ]}
          />
        ))}
      </div>
    </>
  );

  return (
    <div className="bg-[#F9FAFB] rounded-2xl shadow-xl px-6 md:px-20 py-6">
      {/* Switch selection mode */}
      <div className="mb-7 flex justify-center items-center gap-4">
        <p
          className={`w-50 text-right font-medium transition-colors duration-200 ${
            !isShopFirst ? "text-[#FACC14]" : "text-gray-400"
          }`}
        >
          Boardgame First
        </p>
        <Switch
          size="medium"
          classNames={classNames}
          styles={stylesFn}
          onClick={onSwitchCheck}
        />
        <p
          className={`w-50 text-left font-medium transition-colors duration-200 ${
            isShopFirst ? "text-[#FACC14]" : "text-gray-400"
          }`}
        >
          Shop First
        </p>
      </div>

      {/* Inputs */}
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        <div className="grid grid-cols-2 gap-6">
          <input
            className={`bg-[#EEF2F6] ring ring-[#627384] ring-1 outline-none rounded-md h-11 px-4 focus:ring-2 focus:ring-[#FACC14]`}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            className={`bg-[#EEF2F6] ring ring-[#627384] ring-1 outline-none rounded-md h-11 px-4 focus:ring-2 focus:ring-[#FACC14]`}
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <input
          className={`bg-[#EEF2F6] ring ring-[#627384] ring-1 outline-none rounded-md h-11 px-4 focus:ring-2 focus:ring-[#FACC14]`}
          placeholder="Select players"
          type="number"
          value={playerCount}
          onChange={(e) => setPlayerCount(Number(e.target.value))}
        />
      </form>

      {/* First section */}
      {isShopFirst ? shopSection : gameSection}

      {/* Second section */}
      {isShopFirst
        ? selectedMercantId != null
          ? gameSection
          : null
        : selectedGameId != null
          ? shopSection
          : null}

      <button className="bg-[#FACC14] hover:bg-[#EAB80B] shadow-xl block text-gray-900 font-semibold rounded-md mt-6 mx-auto transition-colors cursor-pointer py-3 px-10">
        Reserve
      </button>
    </div>
  );
}
