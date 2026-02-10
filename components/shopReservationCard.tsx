import { MouseEventHandler } from "react";
import Image from "next/image";
interface Props {
  shopName: string;
  location: string;
  openingHours: string;
  isOpen: boolean;
  imageUrl: string;
  isSelected: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}

export function ShopReservationCard({
  shopName,
  location,
  openingHours,
  imageUrl,
  onClick,
  isSelected,
  isOpen,
}: Props) {
  return (
    <div
      className={`bg-[#F9FAFB] rounded-2xl shadow-xl p-5 h-full transition-transform duration-150 ease-in-out 
        ${isOpen ? "hover:-translate-y-2 cursor-pointer" : " cursor-not-allowed"}
        ${isSelected && "ring-2 ring-[#FACC14]"}
        ${!isOpen && "opacity-50"}
        `}
      onClick={onClick}
    >
      <Image
        src={imageUrl}
        alt="shop card image"
        className="object-cover mx-auto rounded-md mb-4"
        width={150}
        height={150}
      />
      <h3
        className={`font-semibold ${isOpen ? "text-[#16A249]" : "text-[#EF4343]"}`}
      >
        {isOpen ? "Open" : "Closed"}
      </h3>
      <h2 className="text-2xl font-bold text-[#364049]">{shopName}</h2>
      <p className="text-[#364049] ">{location}</p>

      {/* Location and Opening Hours */}
      <div className="mt-3 space-y-2">
        <p className="text-[#94A3B8]">Hours:</p>
        <p className="text-[#364049]">{openingHours}</p>
      </div>

      {/* tags */}
      <div></div>
    </div>
  );
}
