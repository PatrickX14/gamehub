"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

export function UserAvatar({ src }: Props) {
  const router = useRouter();
  const [isOpen, setOpen] = useState<boolean>(false);
  const menuref = useRef<HTMLDivElement>(null);

  function handleMenuClick(link: string) {
    if (link === "logout") {
      window.localStorage.removeItem("isLogin");
    } else {
      router.replace(link);
    }
  }

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
    <div className="relative">
      <Image
        src={src}
        width={"50"}
        height={"50"}
        alt="avatar image"
        onClick={() => !isOpen && setOpen(true)}
        className="cursor-pointer"
      />
      <div
        className={`absolute right-0 w-48 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 z-50 ${isOpen ? "block" : "hidden"}`}
        ref={menuref}
      >
        {menus.map(({ title, link }) => {
          return (
            <button
              key={link}
              className={`w-full flex items-center justify-between px-4 py-2 text-sm cursor-pointer transition-colors duration-150
                ${title === "Log out" ? "text-red-500" : null}
                `}
              onClick={() => handleMenuClick(link)}
            >
              <span>{title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
