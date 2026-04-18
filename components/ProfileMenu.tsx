"use client";
import Link from "next/link";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Groups2Icon from "@mui/icons-material/Groups2";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { usePathname } from "next/navigation";

const menus = [
  {
    title: "Profile",
    description: "customize your personal informations",
    menuImage: <PersonOutlineIcon className="text-[#364049] m-1" />,
    link: "/profile",
  },
  {
    title: "Purchase",
    description: "see your purchase history",
    menuImage: <LocalMallIcon className="text-[#364049] m-1" />,
    link: "/purchase",
  },
  {
    title: "Bookings",
    description: "see your booked tables",
    menuImage: <CalendarTodayIcon className="text-[#364049] m-1" />,
    link: "/bookings",
  },
  {
    title: "Parties",
    description: "see your participated party",
    menuImage: <Groups2Icon className="text-[#364049] m-1" />,
    link: "/parties",
  },
];

interface MenuProps {
  selectedMenu: "Profile" | "Purchase" | "Bookings" | "Parties";
}

export function ProfileMenu({ selectedMenu }: MenuProps) {
  return (
    <div className="bg-[#F9FAFB] rounded-md overflow-hidden shadow-md fixed w-20 lg:w-100 2xl:w-135">
      {menus.map(({ title, description, menuImage, link }) => (
        <Link
          key={title}
          className="flex items-center gap-2 hover:bg-[#364049]/20 p-4 hover:cursor-pointer relative"
          href={link}
        >
          <div
            className={`absolute left-0 h-full w-2 z-50 ${selectedMenu === title ? "bg-[#FACC14]" : "bg-transparent"}`}
          ></div>
          <div
            className={`rounded-full border border-[#364049]/20 shadown-md p-1 ${selectedMenu === title && "bg-[#FACC14]"}`}
          >
            {menuImage}
          </div>
          <div>
            <h3 className="text-primary">{title}</h3>
            <p className="text-secondary">{description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
