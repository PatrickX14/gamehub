"use client";
import { useEffect, useMemo, useState } from "react";
import { GameReservationCard } from "@/components/GameReservationCard";
import { ShopReservationCard } from "@/components/shopReservationCard";
import { Switch, SwitchProps } from "antd";
import { createStyles } from "antd-style";
import {
  createReservation,
  getBoardgamesForReservations,
  getMerchantOptions,
  getMerchantsForReservations,
  MerchantData,
  type BoardgameData,
} from "@/app/lib/api/users/reservation";
import { getLocalStorageItem } from "@/app/lib/api/utils";
import { debounce } from "@/app/lib/debounce";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { ConfirmReservationModal } from "@/components/ConfirmReservationModal";

dayjs.extend(utc);
dayjs.extend(timezone);

const useStyle = createStyles(({ token }) => ({
  root: {
    width: 40,
    backgroundColor: token.colorPrimary,
  },
}));

type ReservationCardsSectionProps = {
  accessToken: string;
};

export function ReservationCardsSection({
  accessToken,
}: ReservationCardsSectionProps) {
  const [isShopFirst, setFirstSelection] = useState<boolean>(false);
  const [boardgameData, setBoardgameData] = useState<BoardgameData[]>([]);
  const [merchanteData, setMerchantData] = useState<MerchantData[]>([]);
  const [boardgameQuery, setBoardgameQuery] = useState<string>("");
  const [merchantQuery, setshopQuery] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState(false);

  const [selectedGameId, setSelectedGameId] = useState<number | null>();
  const [selectedMercantId, setSelectedMerchantId] = useState<number | null>();
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

  async function handleReserve() {
    // Validations
    if (!selectedGameId || !selectedMercantId) return;
    //NOTE: Correct datetime format
    // console.log(dayjs(`${date}T${time}`).toISOString());
    const dateTime = dayjs(`${date}T${time}`).toISOString();
    const success = await createReservation(
      accessToken,
      selectedMercantId,
      selectedGameId,
      dateTime,
      playerCount,
    );
    if (success) {
      setModalOpen(true);
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

  const provinces = [
    { en: "Amnat Charoen", th: "อำนาจเจริญ" },
    { en: "Ang Thong", th: "อ่างทอง" },
    { en: "Bangkok", th: "กรุงเทพมหานคร" },
    { en: "Bueng Kan", th: "บึงกาฬ" },
    { en: "Buri Ram", th: "บุรีรัมย์" },
    { en: "Chachoengsao", th: "ฉะเชิงเทรา" },
    { en: "Chai Nat", th: "ชัยนาท" },
    { en: "Chaiyaphum", th: "ชัยภูมิ" },
    { en: "Chanthaburi", th: "จันทบุรี" },
    { en: "Chiang Mai", th: "เชียงใหม่" },
    { en: "Chiang Rai", th: "เชียงราย" },
    { en: "Chon Buri", th: "ชลบุรี" },
    { en: "Chumphon", th: "ชุมพร" },
    { en: "Kalasin", th: "กาฬสินธุ์" },
    { en: "Kamphaeng Phet", th: "กำแพงเพชร" },
    { en: "Kanchanaburi", th: "กาญจนบุรี" },
    { en: "Khon Kaen", th: "ขอนแก่น" },
    { en: "Krabi", th: "กระบี่" },
    { en: "Lampang", th: "ลำปาง" },
    { en: "Lamphun", th: "ลำพูน" },
    { en: "Loei", th: "เลย" },
    { en: "Lop Buri", th: "ลพบุรี" },
    { en: "Mae Hong Son", th: "แม่ฮ่องสอน" },
    { en: "Maha Sarakham", th: "มหาสารคาม" },
    { en: "Mukdahan", th: "มุกดาหาร" },
    { en: "Nakhon Nayok", th: "นครนายก" },
    { en: "Nakhon Pathom", th: "นครปฐม" },
    { en: "Nakhon Phanom", th: "นครพนม" },
    { en: "Nakhon Ratchasima", th: "นครราชสีมา" },
    { en: "Nakhon Sawan", th: "นครสวรรค์" },
    { en: "Nakhon Si Thammarat", th: "นครศรีธรรมราช" },
    { en: "Nan", th: "น่าน" },
    { en: "Narathiwat", th: "นราธิวาส" },
    { en: "Nong Bua Lam Phu", th: "หนองบัวลำภู" },
    { en: "Nong Khai", th: "หนองคาย" },
    { en: "Nonthaburi", th: "นนทบุรี" },
    { en: "Pathum Thani", th: "ปทุมธานี" },
    { en: "Pattani", th: "ปัตตานี" },
    { en: "Phang Nga", th: "พังงา" },
    { en: "Phatthalung", th: "พัทลุง" },
    { en: "Phayao", th: "พะเยา" },
    { en: "Phetchabun", th: "เพชรบูรณ์" },
    { en: "Phetchaburi", th: "เพชรบุรี" },
    { en: "Phichit", th: "พิจิตร" },
    { en: "Phitsanulok", th: "พิษณุโลก" },
    { en: "Phra Nakhon Si Ayutthaya", th: "พระนครศรีอยุธยา" },
    { en: "Phrae", th: "แพร่" },
    { en: "Phuket", th: "ภูเก็ต" },
    { en: "Prachin Buri", th: "ปราจีนบุรี" },
    { en: "Prachuap Khiri Khan", th: "ประจวบคีรีขันธ์" },
    { en: "Ranong", th: "ระนอง" },
    { en: "Ratchaburi", th: "ราชบุรี" },
    { en: "Rayong", th: "ระยอง" },
    { en: "Roi Et", th: "ร้อยเอ็ด" },
    { en: "Sa Kaeo", th: "สระแก้ว" },
    { en: "Sakon Nakhon", th: "สกลนคร" },
    { en: "Samut Prakan", th: "สมุทรปราการ" },
    { en: "Samut Sakhon", th: "สมุทรสาคร" },
    { en: "Samut Songkhram", th: "สมุทรสงคราม" },
    { en: "Saraburi", th: "สระบุรี" },
    { en: "Satun", th: "สตูล" },
    { en: "Sing Buri", th: "สิงห์บุรี" },
    { en: "Sisaket", th: "ศรีสะเกษ" },
    { en: "Songkhla", th: "สงขลา" },
    { en: "Sukhothai", th: "สุโขทัย" },
    { en: "Suphan Buri", th: "สุพรรณบุรี" },
    { en: "Surat Thani", th: "สุราษฎร์ธานี" },
    { en: "Surin", th: "สุรินทร์" },
    { en: "Tak", th: "ตาก" },
    { en: "Trang", th: "ตรัง" },
    { en: "Trat", th: "ตราด" },
    { en: "Ubon Ratchathani", th: "อุบลราชธานี" },
    { en: "Udon Thani", th: "อุดรธานี" },
    { en: "Uthai Thani", th: "อุทัยธานี" },
    { en: "Uttaradit", th: "อุตรดิตถ์" },
    { en: "Yala", th: "ยะลา" },
    { en: "Yasothon", th: "ยโสธร" },
  ];

  const shopSection = (
    <>
      <div className="w-full my-7">
        <select
          className={`col-span-full bg-[#EEF2F6] ring ring-[#627384] ring-1 outline-none rounded-md h-11 px-4 focus:ring-2 w-full focus:ring-[#FACC14]`}
        >
          <option>All Provinces</option>
          {provinces.map(({ th }) => (
            <option key={th}>{th}</option>
          ))}
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
    <>
      <ConfirmReservationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
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

        <button
          className="bg-[#FACC14] hover:bg-[#EAB80B] shadow-xl block text-gray-900 font-semibold rounded-md mt-6 mx-auto transition-colors cursor-pointer py-3 px-10"
          onClick={handleReserve}
        >
          Reserve
        </button>
      </div>
    </>
  );
}
