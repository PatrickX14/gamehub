"use client";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  style: React.CSSProperties;
}

export function SearchbarWithIcon({ style }: Props) {
  return (
    <div className="relative">
      <input
        type="text"
        className={`bg-[#F9FAFB] peer ring ring-[#627384] ring-1 outline-none rounded-full h-11 w-130 px-4 focus:ring-2 focus:ring-[#FACC14] ${style}`}
        placeholder="search for items"
      />
      <SearchIcon
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 peer-focus:text-[#FACC14]"
        sx={{ fontSize: 20 }} // MUI specific sizing
      />
    </div>
  );
}
