"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserAvatar } from "./userAvatar";
import { useEffect, useState } from "react";
import { getAvatar } from "@/app/lib/api/user";
import { useRouter } from "next/navigation";

export function UserHeader() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const pathname = usePathname();
  const items = [
    { key: "/", label: "Reservation" },
    { key: "/shop", label: "Shop" },
    { key: "/findparty", label: "Find Party" },
  ];

  useEffect(() => {
    async function fetechAvatar() {
      const avatarUrl = await getAvatar();
      if (avatarUrl) {
        setAvatarUrl(avatarUrl.imageUrl);
        setIsLogin(true);
      } else {
        setAvatarUrl("");
        setIsLogin(false);
      }
    }
    fetechAvatar();
  }, []);

  return (
    <section className="bg-[#2B2B2B] sticky top-0 z-100 justify-between px-4 xl:px-30 flex h-15 shadow-sm shadow-[#D3D9DE]">
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
        {isLogin && avatarUrl ? (
          <UserAvatar
            src={avatarUrl}
            onLogoutClick={() => {
              localStorage.removeItem("accessToken");
              router.push("/");
              setIsLogin(false);
            }}
          />
        ) : (
          <>
            <p className="text-[#627384] hidden lg:block">Welcome, Guest!</p>
            <Link
              className="bg-[#FACC14] hover:bg-[#EAB80B] text-[#364049] rounded-md py-1 px-4 cursor-pointer"
              href={"/usersignin"}
            >
              Sign In
            </Link>
          </>
        )}
      </div>
    </section>
  );
}
