import { MouseEventHandler } from "react";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import GroupIcon from "@mui/icons-material/Group";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface Props {
  gameName: string;
  description: string;
  players: string;
  duration: string;
  isSelected: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}

export function GameReservationCard({
  gameName,
  description,
  duration,
  players,
  onClick,
  isSelected,
}: Props) {
  return (
    <div
      className={`flex flex-col bg-[#F9FAFB] rounded-2xl shadow-xl p-5 cursor-pointer transition-transform duration-150 ease-in-out hover:scale-110
        ${isSelected && "ring-2 ring-[#FACC14]"}
      `}
      onClick={onClick}
    >
      {/* Game name — can wrap to 2 lines */}
      <div className="flex items-center gap-2">
        <SportsEsportsIcon sx={{ color: "#FACC14" }} />
        <h2 className="text-2xl font-semibold text-[#364049] leading-tight">
          {gameName}
        </h2>
      </div>

      {/* Description grows to fill remaining space */}
      <p className="text-[#627384] mt-2 flex-1">{description}</p>

      {/* Players and duration always pinned to the bottom */}
      <div className="flex flex-col gap-px mt-3">
        <p className="text-[#364049]">
          <GroupIcon /> {players}
        </p>
        <p className="text-[#364049]">
          <AccessTimeIcon /> {duration}
        </p>
      </div>
    </div>
  );
}
