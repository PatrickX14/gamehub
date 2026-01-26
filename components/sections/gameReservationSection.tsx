"use client";
import { useState } from "react";
import { GameReservationCard } from "../gameReservationCard";

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

export function ReservationCardsSection() {
  const [isInputEnable, setInputEnable] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<string>("");

  function handleGameSelect(gameName: string) {
    setSelectedCard(gameName);
    setInputEnable(true);
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
      <div className="bg-[#F9FAFB] rounded-2xl shadow-xl py-6">
        <h1 className="text-[#364049] text-center font-bold text-4xl">
          Reservation Form
        </h1>
        {/* inputs */}
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6 md:px-20 mt-6">
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
      </div>
    </section>
  );
}
