"use client";
import { useState } from "react";
import { GameReservationCard } from "../gameReservationCard";
import { ShopReservationCard } from "../shopReservationCard";
const demoGameCards = [
  {
    imageUrl: "/images/demoimages/ArkhamHorrorTGG_box_front_720x.webp",
    gameName: "Arkham Horror",
    description: "Investigate the horrors of Arkham while courting cosmic doom",
    players: "1 - 2 players",
    duration: "60 - 120 min",
  },
  {
    imageUrl: "/images/demoimages/beerandbread.jpg",
    gameName: "Beer & Bread",
    description:
      "Two villages face off in the traditions of brewing beer and baking bread",
    players: "2 players",
    duration: "30 - 45 min",
  },
  {
    imageUrl: "/images/demoimages/Catan-2015-boxart.jpg",
    gameName: "Settlers of Catan",
    description: "Build settlements and cities in this classic strategy game",
    players: "3-4 players",
    duration: "60 - 90 min",
  },
  {
    imageUrl: "/images/demoimages/Carcassonne-game.jpg",
    gameName: "Carcassonne",
    description:
      "Shape the medieval French landscape, claiming cities, monasteries, roads, and farms",
    players: "2 - 5 players",
    duration: "30 - 45 min",
  },
  {
    imageUrl: "/images/demoimages/Stone_Age_game.jpg",
    gameName: "Stone Age",
    description:
      "Prehistoric tribes struggle to survive and adapt. Which one will rise to the top?",
    players: "2 - 4 players",
    duration: "60 - 90 min",
  },
  {
    imageUrl: "/images/demoimages/Lostcities250px.jpg",
    gameName: "Lost Cities",
    description:
      "Set out on expeditions, but will your findings outweigh the cost of each adventure?",
    players: "2 players",
    duration: "30 min",
  },
];
const demoShopCards = [
  {
    shopName: "Legendary Wargame",
    location: "55/9 ม.9 ถ.กาญจนาภิเษก ซอยกันตนา ต.บางม่วง อ.บางใหญ่ จ.นนทบุรี",
    openingHours: "Mon - Sun: 10:30 - 23:00",
    isOpen: true,
    imageUrl: "/images/demoimages/legendarywargame.png",
    isSelected: false,
    onClick: () => {},
  },
  {
    shopName: "MORE THAN A GAME CAFE",
    location: "55/9 ม.9 ถ.กาญจนาภิเษก ซอยกันตนา ต.บางม่วง อ.บางใหญ่ จ.นนทบุรี",
    openingHours: "Mon - Sun: 10:00 - 20:00",
    isOpen: true,
    imageUrl: "/images/demoimages/morethanagamecafe.png",
    isSelected: false,
    onClick: () => {},
  },
  {
    shopName: "GameHaus Boardgame Cafe",
    location: "55/9 ม.9 ถ.กาญจนาภิเษก ซอยกันตนา ต.บางม่วง อ.บางใหญ่ จ.นนทบุรี",
    openingHours: "Tue - Sun: 11:00 - 00:00",
    isOpen: false,
    imageUrl: "/images/demoimages/GameHausBoardgameCafe.jpg",
    isSelected: false,
    onClick: () => {},
  },
];

export function ReservationCardsSection() {
  const [isInputEnable, setInputEnable] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<string>("");
  const [selectedShop, setSelectedShop] = useState<string>("");
  const [shops, setShops] = useState<typeof demoShopCards>(demoShopCards);

  function handleGameSelect(gameName: string) {
    setSelectedCard(gameName);
    setInputEnable(true);
  }

  function handleShopSearch(shopName: string) {
    if (!shopName.trim()) {
      setShops(demoShopCards);
      return;
    }

    const filteredShops = demoShopCards.filter((card) =>
      card.shopName.toLowerCase().includes(shopName.trim().toLowerCase()),
    );

    setShops(filteredShops);
  }

  function handleShopSeclect(shopName: string, isOpen: boolean) {
    if (!isOpen) {
      return;
    }
    setSelectedShop(shopName);
  }

  return (
    <section className="px-10 xl:px-25">
      {/* choose game */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-12 mb-12">
        {demoGameCards.map(
          ({ gameName, description, duration, imageUrl, players }, index) => (
            <GameReservationCard
              key={index}
              gameName={gameName}
              description={description}
              players={players}
              duration={duration}
              imageUrl={imageUrl}
              onClick={() => handleGameSelect(gameName)}
              isSelected={selectedCard == gameName ? true : false}
            />
          ),
        )}
      </div>
      {/* details input */}
      <div className="bg-[#F9FAFB] rounded-2xl shadow-xl px-6 md:px-20 py-6">
        <h1 className="text-[#364049] text-center font-bold text-4xl">
          Reservation Form
        </h1>
        {/* inputs */}
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6  mt-6">
          <input
            className="bg-[#EEF2F6] ring ring-[#627384] ring-1 outline-none rounded-md h-11 px-4 focus:ring-2 focus:ring-[#FACC14]"
            placeholder="Enter your name"
            disabled={isInputEnable ? false : true}
          />
          <input
            className="bg-[#EEF2F6] ring ring-[#627384] ring-1 outline-none rounded-md h-11 px-4 focus:ring-2 focus:ring-[#FACC14]"
            placeholder="your@email.com"
            type="email"
            disabled={isInputEnable ? false : true}
          />
          <input
            className="bg-[#EEF2F6] ring ring-[#627384] ring-1 outline-none rounded-md h-11 px-4 focus:ring-2 focus:ring-[#FACC14]"
            // placeholder="dd/mm/yyyy"
            type="date"
            disabled={isInputEnable ? false : true}
          />
          <input
            className="bg-[#EEF2F6] ring ring-[#627384] ring-1 outline-none rounded-md h-11 px-4 focus:ring-2 focus:ring-[#FACC14]"
            placeholder="Select palyers"
            type="number"
            disabled={isInputEnable ? false : true}
          />
          <input
            className="bg-[#EEF2F6] md:col-span-2 ring ring-[#627384] ring-1 outline-none rounded-md h-11 px-4 focus:ring-2 focus:ring-[#FACC14]"
            placeholder="Search locations by name"
            type="search"
            disabled={isInputEnable ? false : true}
            onChange={(e) => handleShopSearch(e.target.value)}
          />
          <select
            className="bg-[#EEF2F6] ring ring-[#627384] ring-1 outline-none rounded-md h-11 px-4 focus:ring-2 focus:ring-[#FACC14]"
            disabled={isInputEnable ? false : true}
          >
            <option>All Provinces</option>
            <option>Bangkok</option>
            <option>Nonthaburi</option>
          </select>
          <input
            className="bg-[#EEF2F6] ring ring-[#627384] ring-1 outline-none rounded-md h-11 px-4 focus:ring-2 focus:ring-[#FACC14]"
            type="time"
            disabled={isInputEnable ? false : true}
          />
        </form>

        {/* shop selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {shops.map((card, index) => (
            <ShopReservationCard
              key={index}
              {...card}
              isSelected={selectedShop == card.shopName ? true : false}
              onClick={() => handleShopSeclect(card.shopName, card.isOpen)}
            />
          ))}
        </div>
        <button className="bg-[#FACC14] hover:bg-[#EAB80B] shadow-xl block text-gray-900 font-semibold rounded-md mt-6 mx-auto transition-colors cursor-pointer py-3 px-10">
          Reserve
        </button>
      </div>
    </section>
  );
}
