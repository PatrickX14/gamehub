import { MouseEventHandler } from "react";

interface Props {
  gameName: string;
  description: string;
  players: string;
  duration: string;
  imageUrl: string;
  isSelected: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}

export function GameReservationCard({
  gameName,
  description,
  duration,
  players,
  imageUrl,
  onClick,
  isSelected,
}: Props) {
  return (
    <div
      className={`bg-[#F9FAFB] rounded-2xl shadow-xl p-5 h-full cursor-pointer transition-transform duration-150 ease-in-out hover:-translate-y-2
        ${isSelected && "ring-2 ring-[#FACC14]"}
        `}
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt="reservation card image"
        className="object-cover w-45 h-55 mx-auto"
      />
      <h2 className="text-2xl font-semibold mt-3 text-[#364049]">{gameName}</h2>
      <p className="text-[#627384]">{description}</p>

      {/* players and duration */}
      <div>
        <div className="flex justify-between">
          <p className="text-[#94A3B8]">Players:</p>
          <p className="text-[#364049]">{players}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-[#94A3B8]">Duration:</p>
          <p className="text-[#364049]">{duration}</p>
        </div>
      </div>
    </div>
  );
}
