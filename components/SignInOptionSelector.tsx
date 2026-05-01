"use client";
import { useState } from "react";

export function AccountTypePicker() {
  const [selected, setSelected] = useState("USER");

  const options = [
    { value: "USER", label: "User Account" },
    { value: "SHOP", label: "Shop Account" },
  ];
  console.log(selected);
  return (
    <div className="flex justify-between items-center gap-2 rounded-xl">
      {options.map((opt) => {
        const isSelected = selected === opt.value;
        return (
          <label
            key={opt.value}
            className={`
              relative flex items-center justify-center px-10 py-3 rounded-lg cursor-pointer
              transition-all duration-200 select-none w-full
              ${isSelected ? "bg-[#FCCB1D] shadow-md" : "bg-transparent hover:bg-white/5"}
            `}
          >
            <input
              type="radio"
              name="accountType"
              value={opt.value}
              checked={isSelected}
              onChange={() => setSelected(opt.value)}
              className="sr-only"
            />
            <span
              className={`text-sm font-bold tracking-wide transition-colors duration-200 ${
                isSelected ? "text-primary" : "text-white"
              }`}
            >
              {opt.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}
