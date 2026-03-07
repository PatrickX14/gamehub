"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserAvatar } from "./userAvatar";
import { useEffect, useState } from "react";
import { api } from "@/app/lib/axios";

export function UserHeader() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const pathname = usePathname();
  const items = [
    { key: "/", label: "Reservation" },
    { key: "/shop", label: "Shop" },
    { key: "/findparty", label: "Find Party" },
  ];

  useEffect(() => {
    async function fetchMe() {
      const res = await api.get<{ userId: number }>("/auth/me");

      if (res.data.userId) {
        setIsLogin(true);
      }
    }

    fetchMe();
  }, []);

  return (
    <section className="bg-[#F9FAFB] sticky top-0 z-50 justify-between px-4 xl:px-30 flex h-15 shadow-sm shadow-[#D3D9DE]">
      {/* Logo */}
      <Link href={"/"} className="my-auto">
        <div className="flex items-center gap-2">
          <Image
            src={"/images/dice.png"}
            alt={"Game Hub Logo"}
            width={"50"}
            height={"50"}
          />
          <p className="m-0 text-2xl font-bold text-[#FCCB1D]">Game Hub</p>
        </div>
      </Link>

      {/* Nav menu */}
      <nav className="items-center justify-between hidden sm:flex md:gap-5">
        {items.map((item) => {
          const isActive: boolean =
            item.key === "/" ? pathname === "/" : pathname.startsWith(item.key);

          return (
            <Link
              href={item.key}
              key={item.key}
              className={`group py-1 px-4 rounded-md ${
                isActive ? "bg-[#FACC14]" : "hover:bg-[#FACC14]"
              }`}
            >
              <p
                className={`group-hover:text-[#364049] ${isActive ? "text-[#364049]" : "text-[#627384]"}`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </nav>

      {/* Right Actions */}
      <div className="flex items-center gap-3 hidden md:flex">
        {/* TODO: delete getItem it's for test */}
        {isLogin ? (
          <UserAvatar
            src={"/images/avatar.svg"}
            // TODO: implement this log out
            onLogoutClick={async () => {
              await api.post("/auth/logout");
              setIsLogin(false);
            }}
          />
        ) : (
          <>
            <p className="text-[#627384] hidden lg:block">Welcome, Guest!</p>
            <Link
              className="bg-[#FACC14] hover:bg-[#EAB80B] text-[#364049] rounded-md py-1 px-4 cursor-pointer"
              href={"/signin"}
            >
              Sign In
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
