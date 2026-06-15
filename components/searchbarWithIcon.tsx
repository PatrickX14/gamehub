"use client";
import SearchIcon from "@mui/icons-material/Search";
import { KeyboardEvent, useState } from "react";

interface Props {
  style: React.CSSProperties;
  onSearch: (query: string) => void;
}

export function SearchbarWithIcon({ style, onSearch }: Props) {
  const [value, setValue] = useState("");
  return (
    <div className="relative">
      <input
        type="search"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (e.target.value === "") {
            onSearch(e.target.value);
          }
          onSearch(e.target.value);
        }}
        className={`bg-[#F9FAFB] peer ring ring-[#627384] ring-1 outline-none rounded-md h-11 w-130 px-4 focus:ring-2 focus:ring-[#FACC14] ${style}`}
        placeholder="search for items"
        // onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
        //   if (event.key === "Enter") {
        //     onSearch(event.currentTarget.value);
        //   }
        // }}
      />
      {value === "" && (
        <SearchIcon
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 peer-focus:text-[#FACC14]"
          sx={{ fontSize: 20 }}
        />
      )}
    </div>
  );
}
