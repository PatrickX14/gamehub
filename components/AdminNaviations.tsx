"use client";
import Link from "next/link";
import { ReactNode, useState } from "react";
// Icons
import {
  Settings,
  Inventory,
  ListAlt,
  Summarize,
  ExpandMore,
  ExpandLess,
  Store,
  TableChart,
} from "@mui/icons-material";
import { usePathname } from "next/navigation";

export function Navigations() {
  const pathname = usePathname();
  const [settingsExpanded, setSettingsExpanded] = useState(
    pathname.startsWith("/admin/settings"),
  );
  const links: { title: string; link: string; icon: ReactNode }[] = [
    { title: "Overall", link: "/admin", icon: <Summarize /> },
    { title: "Orders", link: "/admin/orders", icon: <ListAlt /> },
    { title: "Products", link: "/admin/products", icon: <Inventory /> },
    { title: "Settings", link: "/admin", icon: <Settings /> },
  ];
  return (
    <div className="px-2">
      {links.map(({ link, title, icon }) => {
        if (title === "Settings") {
          const isActive =
            pathname == "/admin/shopinfo" ||
            pathname == "/admin/tableandservice";
          return (
            <div key={title}>
              <div
                onClick={() => setSettingsExpanded(!settingsExpanded)}
                className={`flex gap-2 items-center hover:bg-[#FACC14] p-2 rounded-md cursor-pointer ${
                  isActive && "bg-[#FACC14]"
                }`}
              >
                {icon}
                <p className="text-primary text-md">{title}</p>
                {settingsExpanded ? (
                  <ExpandLess className="ml-auto" />
                ) : (
                  <ExpandMore className="ml-auto" />
                )}
              </div>
              {settingsExpanded && (
                <div className="ml-4 mt-1">
                  <Link
                    href="/admin/shopinfo"
                    className={`flex gap-2 items-center hover:bg-[#FACC14] p-2 rounded-md text-sm ${
                      pathname === "/admin/shopinfo" && "bg-[#FACC14]"
                    }`}
                  >
                    <Store fontSize="small" />
                    <p className="text-primary">Shop information</p>
                  </Link>
                  <Link
                    href="/admin/tableandservice"
                    className={`flex gap-2 items-center hover:bg-[#FACC14] p-2 rounded-md text-sm ${
                      pathname === "/admin/tableandservice" && "bg-[#FACC14]"
                    }`}
                  >
                    <TableChart fontSize="small" />
                    <p className="text-primary">Table and Service</p>
                  </Link>
                </div>
              )}
            </div>
          );
        } else {
          const isActive =
            pathname === link ||
            (link !== "/admin" && pathname.startsWith(link + "/"));
          return (
            <Link
              key={title}
              href={link}
              className={`flex gap-2 items-center hover:bg-[#FACC14] p-2 rounded-md ${
                isActive && "bg-[#FACC14]"
              }`}
            >
              {icon}
              <p className="text-primary text-md">{title}</p>
            </Link>
          );
        }
      })}
    </div>
  );
}
