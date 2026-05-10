"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Props {
  src: string;
  onLogoutClick: () => void;
}

const menus = [
  {
    title: "Profile",
    link: "/profile",
  },
  { link: "/cart", title: "Cart" },
  {
    title: "Purchase",
    link: "/purchase",
  },
  {
    title: "Bookings",
    link: "/bookings",
  },
  {
    title: "Parties",
    link: "/parties",
  },
  {
    title: "Log out",
    link: "/logout",
  },
];

export function UserAvatar({ src, onLogoutClick }: Props) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const menuref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuref.current && !menuref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative ">
      <Image
        src={src}
        width={"50"}
        height={"50"}
        alt="avatar image"
        onClick={() => !isOpen && setOpen(true)}
        className="cursor-pointer rounded-full shadow-3xl"
        unoptimized
      />
      <div
        className={`absolute right-0 w-48 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 z-50 ${isOpen ? "block" : "hidden"}`}
        ref={menuref}
      >
        {menus.map(({ link, title }) =>
          link === "/logout" ? (
            <button
              key={link}
              className={`w-full flex items-center justify-between px-4 py-2 text-sm cursor-pointer transition-colors duration-150
                ${title === "Log out" ? "text-red-500" : null}
                `}
              onClick={onLogoutClick}
            >
              <span>{title}</span>
            </button>
          ) : (
            <Link
              href={link}
              key={link}
              className={`w-full flex items-center justify-between px-4 py-2 text-sm cursor-pointer transition-colors duration-150
                ${title === "Log out" ? "text-red-500" : null}
                `}
            >
              <span>{title}</span>
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
