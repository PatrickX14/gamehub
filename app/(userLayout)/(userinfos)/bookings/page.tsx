"use client";

import { useState } from "react";
import { ProfileMenu } from "@/components/ProfileMenu";
import BookingInfo from "@/components/BookingInfo";

const MOCK_UPCOMING_BOOKINGS = [
  {
    id: "b1",
    storeName: "GameHub Center District 1",
    storeAddress: "123 Gaming Street, District 1, Ho Chi Minh City",
    date: "October 12, 2026",
    time: "14:00 - 18:00",
    mapUrl: "https://maps.google.com",
    status: "upcoming" as const,
  },
  {
    id: "b2",
    storeName: "GameHub Cyber District 7",
    storeAddress: "456 Tech Avenue, District 7, Ho Chi Minh City",
    date: "October 15, 2026",
    time: "09:00 - 12:00",
    mapUrl: "https://maps.google.com",
    status: "upcoming" as const,
  },
];

const MOCK_PAST_BOOKINGS = [
  {
    id: "b3",
    storeName: "GameHub Center District 1",
    storeAddress: "123 Gaming Street, District 1, Ho Chi Minh City",
    date: "September 05, 2026",
    time: "18:00 - 22:00",
    mapUrl: "https://maps.google.com",
    status: "past" as const,
  },
  {
    id: "b4",
    storeName: "GameHub Arena District 3",
    storeAddress: "789 Esport Blvd, District 3, Ho Chi Minh City",
    date: "August 20, 2026",
    time: "10:00 - 16:00",
    mapUrl: "https://maps.google.com",
    status: "past" as const,
  },
];

export default function BookingPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const displayedBookings =
    activeTab === "upcoming" ? MOCK_UPCOMING_BOOKINGS : MOCK_PAST_BOOKINGS;

  return (
    <div className="xl:px-30 grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* profile menu */}
      <div className="lg:col-span-1">
        <ProfileMenu selectedMenu={"Bookings"} />
      </div>

      {/* user bookings information */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-md shadow-sm border border-[#364049]/10 p-6">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#364049]/10">
            <div>
              <h2 className="text-primary font-semibold text-lg">
                My Bookings
              </h2>
              <p className="text-secondary text-sm">View your order history</p>
            </div>

            {/* Tabs */}
            <div className="flex bg-[#F9FAFB] p-1 rounded-lg border border-[#364049]/10">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-4 py-2 rounded-md font-semibold text-sm transition-all ${
                  activeTab === "upcoming"
                    ? "bg-white text-primary shadow-sm"
                    : "text-secondary hover:text-primary"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-4 py-2 rounded-md font-semibold text-sm transition-all ${
                  activeTab === "past"
                    ? "bg-white text-primary shadow-sm"
                    : "text-secondary hover:text-primary"
                }`}
              >
                Past
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {displayedBookings.length > 0 ? (
              displayedBookings.map((booking) => (
                <BookingInfo
                  key={booking.id}
                  storeName={booking.storeName}
                  storeAddress={booking.storeAddress}
                  date={booking.date}
                  time={booking.time}
                  mapUrl={booking.mapUrl}
                  status={booking.status}
                />
              ))
            ) : (
              <div className="text-center py-12 text-secondary bg-[#F9FAFB] rounded-md border border-dashed border-[#364049]/20">
                <p>No {activeTab} bookings found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
