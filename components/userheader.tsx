"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function UserHeader() {
  const pathname = usePathname();
  const items = [
    { key: "/", label: "Reservation" },
    { key: "/store", label: "Store" },
    { key: "/party", label: "Find Party" },
  ];
  return (
    <section className="bg-[#F9FAFB] justify-around flex h-15 shadow-sm shadow-[#D3D9DE] mb-6">
      {/* Logo */}
      <Link href={"/"} className="my-auto">
        <div className="flex items-center gap-2">
          <img src={"/images/dice.png"} className="w-10" />
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
      <div className="flex items-center gap-3">
        <p className="text-[#627384]">Welcome, Guest!</p>
        <Link
          className="bg-[#FACC14] text-[#364049] rounded-md py-1 px-4 cursor-pointer"
          href={"/"}
        >
          Sign In
        </Link>
      </div>
    </section>
  );
}
