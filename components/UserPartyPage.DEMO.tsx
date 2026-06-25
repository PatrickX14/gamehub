"use client";
import { useState, useRef, useEffect } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import { SearchbarWithIcon } from "@/components/searchbarWithIcon";
import { PartyCardProps } from "@/components/partyCard";
import { PartyDetailModal } from "@/components/partyDetailModal";
import { CreatePartyModal } from "@/components/createPartyModal";

import { joinParty, Session } from "@/app/lib/api/users/party";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { notification } from "antd";
import { PartyCard } from "./PartyCard";
import { useRouter } from "next/navigation";
dayjs.extend(utc);
dayjs.extend(timezone);

type Prop = {
  data: Session[];
  accessToken: string;
};

export default function DEMOPartyPage({ data, accessToken }: Prop) {
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedParty, setSelectedParty] = useState<PartyCardProps | null>(
    null,
  );
  const [createOpen, setCreateOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleFilter(filter: string) {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter],
    );
  }

  async function handlePartyJoin(partyId: number) {
    try {
      await joinParty(accessToken, partyId);
      api.info({
        title: "Join request sent",
        description: "Wait for party leader approval",
        placement: "topRight",
        showProgress: true,
        pauseOnHover: true,
      });
      router.refresh();
    } catch (err) {
      api.error({ title: "Something went wrong when trying to join party" });
    }
  }

  return (
    <div className="px-30">
      {contextHolder}
      <section className="mb-6">
        <h1 className="text-[#364049] text-center font-bold text-4xl">
          Find a party
        </h1>
        <p className="text-[#627384] text-center">
          Team up instantly — discover the perfect group to join. <br />
          Your next adventure begins here.
        </p>
      </section>

      <div className="flex justify-end items-center gap-3">
        {/* filter */}
        {/* <div className="relative" ref={filterRef}>
          <button
            onClick={() => setFilterOpen((prev) => !prev)}
            className={`flex items-center gap-1.5 h-11 px-4 rounded-full border transition-all duration-200 cursor-pointer
                            ${
                              filterOpen || activeFilters.length > 0
                                ? "bg-[#FACC14] border-[#FACC14] text-[#364049]"
                                : "bg-[#F9FAFB] border-[#627384] text-[#627384] hover:border-[#FACC14] hover:text-[#364049]"
                            }`}
          >
            <span className="text-sm font-medium">Filter</span>
            {activeFilters.length > 0 && (
              <span className="bg-[#364049] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center leading-none">
                {activeFilters.length}
              </span>
            )}
            <TuneIcon sx={{ fontSize: 18 }} />
          </button>

          {filterOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 z-50">
              <p className="text-xs text-[#627384] font-semibold uppercase tracking-wider px-4 pb-1">
                Status
              </p>
              {FILTERS.map((filter) => {
                const isActive = activeFilters.includes(filter);
                return (
                  <button
                    key={filter}
                    onClick={() => toggleFilter(filter)}
                    className={`w-full flex items-center justify-between px-4 py-2 text-sm cursor-pointer transition-colors duration-150
                                            ${isActive ? "text-[#364049] font-semibold" : "text-[#627384] hover:bg-gray-50"}`}
                  >
                    <span>{filter}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#FACC14]" />
                    )}
                  </button>
                );
              })}
              {activeFilters.length > 0 && (
                <>
                  <div className="border-t border-gray-100 mt-1 mb-1" />
                  <button
                    onClick={() => setActiveFilters([])}
                    className="w-full text-left px-4 py-2 text-xs text-red-400 hover:text-red-500 cursor-pointer transition-colors"
                  >
                    Clear all
                  </button>
                </>
              )}
            </div>
          )}
        </div> */}
      </div>

      {/* party cards */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {data.map((party) => (
          <PartyCard
            key={party.id}
            gameName={party.boardgame.name}
            hostName={party.hostName}
            location={party.merchant.location}
            startAt={`${dayjs(party.startAt).tz("Asia/Bangkok").format("DD/MM/YYYY HH:mm")} - ${dayjs(party.endAt).tz("Asia/Bangkok").format("DD/MM/YYYY HH:mm")}`}
            currentMembers={party.members.length}
            maxMembers={party.maxPlayers}
            status={party.status}
            partyId={party.id}
            onJoin={() => handlePartyJoin(party.id)}
          />
        ))}
        {/* {demoParties.map((party, i) => (
          <PartyCard
            key={i}
            {...party}
            onClick={() => setSelectedParty(party)}
          />
        ))} */}
      </div>

      {/* Party detail modal */}
      <PartyDetailModal
        party={selectedParty}
        onClose={() => setSelectedParty(null)}
      />
    </div>
  );
}
