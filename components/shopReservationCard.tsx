import { MouseEventHandler } from "react";

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
      className={`bg-[#F9FAFB] rounded-2xl shadow-xl p-5 h-full cursor-pointer transition-transform duration-150 ease-in-out hover:-translate-y-2
        ${isSelected && "ring-2 ring-[#FACC14]"}
        `}
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt="shop card image"
        className="object-cover size-34 mx-auto rounded-md mb-4"
      />
      <h3
        className={`font-semibold ${isOpen ? "text-[#16A249]" : "text-[#EF4343]"}`}
      >
        {isOpen ? "Open" : "Closed"}
      </h3>
      <h2 className="text-2xl font-bold text-[#364049]">{shopName}</h2>

      {/* Location and Opening Hours */}
      <div className="mt-3 space-y-2">
        <div className="flex justify-between items-start">
          <p className="text-[#94A3B8]">Location:</p>
          <p className="text-[#364049] text-right flex-1 ml-4">{location}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-[#94A3B8]">Hours:</p>
          <p className="text-[#364049]">{openingHours}</p>
        </div>
      </div>
    </div>
  );
}
