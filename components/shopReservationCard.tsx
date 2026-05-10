import { MouseEventHandler } from "react";
import CheckIcon from "@mui/icons-material/Check";
import StoreIcon from "@mui/icons-material/Store";
interface Props {
  shopName: string;
  location: string;
  openingHours: string;
  imageUrl: string;
  isSelected: boolean;
  tags: Array<string>;
  onClick: MouseEventHandler<HTMLDivElement>;
}

export function ShopReservationCard({
  shopName,
  location,
  openingHours,
  onClick,
  isSelected,
  tags,
}: Props) {
  return (
    <div
      className={`bg-[#F9FAFB] rounded-2xl shadow-xl p-5 h-full transition-transform duration-150 ease-in-out cursor-pointer hover:scale-105
        ${isSelected && "ring-2 ring-[#FACC14]"}
        `}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 ">
        <StoreIcon sx={{ color: "#FACC14" }} />
        <h2 className="text-2xl font-semibold text-[#364049]">{shopName}</h2>
      </div>
      <p className="text-[#627384] ">{location}</p>

      {/* Location and Opening Hours */}
      <div className="mt-3 space-y-2">
        <p className="text-[#94A3B8]">Hours:</p>
        <p className="text-[#364049]">{openingHours}</p>
      </div>

      {/* tags */}
      <div>
        {tags.map((tag) => (
          <div key={tag} className="flex gap-2 items-center">
            <CheckIcon fontSize="small" className="text-[#16A249]" />
            <p className="text-[#94A3B8]">{tag}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
