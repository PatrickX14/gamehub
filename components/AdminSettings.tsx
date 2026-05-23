"use client";
import Link from "next/link";
import { Settings } from "@mui/icons-material";
import {
  BusinessHour,
  getMerchantBusinessHour,
} from "@/app/lib/api/merchant/profile";
import { useEffect, useState } from "react";
import { getLocalStorageItem } from "@/app/lib/api/utils";

export function AdminContactSetting() {
  return (
    <div className="grid grid-cols-2">
      {/* phone number */}
      <div></div>
      {/* email address */}
      <div></div>
    </div>
  );
}

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function BusinessHours() {
  const [timeData, setTimeData] = useState<BusinessHour[]>();
  const today = DAYS[new Date().getDay()];

  useEffect(() => {
    async function fetchTimeData() {
      const accessToken = await getLocalStorageItem("accessToken");
      if (!accessToken) return;
      const res = await getMerchantBusinessHour(accessToken);
      console.log(res);
      if (res.items) {
        setTimeData(
          res.items.map(({ day, open, close }) => ({
            day,
            open,
            close,
          })),
        );
      }
    }
    fetchTimeData();
  }, []);

  return (
    <div className="flex flex-col gap-0.5">
      {timeData?.map(({ day, open, close }) => {
        const isToday = day === today;
        const isOpen = open !== null;

        return (
          <div
            key={day}
            className={`flex items-center gap-4 px-3.5 py-2.5 rounded-lg
              ${isToday ? "bg-gray-50 border border-gray-200" : "border border-transparent"}`}
            style={{ gridTemplateColumns: "130px 1fr" }}
          >
            {/* Left: day + badge */}
            <div className="flex items-center gap-2.5">
              <span
                className={`w-30 ${isToday ? "font-medium" : "font-normal"} text-gray-900`}
              >
                {day}
              </span>
              <span
                className="w-18 h-6 text-center rounded-full text-white text-sm/6"
                style={
                  isOpen
                    ? {
                        background: "#1ACC6D",
                      }
                    : {
                        background: "#EF4343",
                      }
                }
              >
                {isOpen ? "Open" : "Closed"}
              </span>
            </div>

            {/* Right: hours */}
            <div className="flex items-center gap-2">
              {isOpen ? (
                <>
                  <span className="text-sm font-medium tabular-nums text-gray-900">
                    {open}
                  </span>
                  <span className="text-gray-400">–</span>
                  <span className="text-sm font-medium tabular-nums text-gray-900">
                    {close}
                  </span>
                  {isToday && (
                    <>
                      <span className="size-2 rounded-full bg-green-500 ml-1.5" />
                      <span className="text-xs text-gray-400">Today</span>
                    </>
                  )}
                </>
              ) : (
                <span className="text-sm text-gray-400">Closed all day</span>
              )}
            </div>
          </div>
        );
      })}
      <div className="flex justify-end">
        <Link
          href={`/admin/shopinfo/editbusinesshour`}
          className="flex items-center bg-[#FACC14] hover:bg-[#E7B008]/80 px-4 py-2 rounded-md"
        >
          <Settings />
          Edit
        </Link>
      </div>
    </div>
  );
}
