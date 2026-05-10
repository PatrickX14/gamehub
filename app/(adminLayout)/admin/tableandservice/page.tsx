"use client";

import { useEffect, useState } from "react";
import { MerchantServiceManagement } from "@/components/MerchantServiceManagement";
import { MerchantTableManagement } from "@/components/MerchantTableManagement";
import { getLocalStorageItem } from "@/app/lib/api/utils";
import { getTables } from "@/app/lib/api/merchant/tables";

const services = [
  { value: 1, label: "Air Conditioning" },
  { value: 2, label: "Free Wi-Fi" },
  { value: 3, label: "Parking" },
  { value: 4, label: "Food and Drinks" },
  { value: 5, label: "Snacks Available" },
  { value: 6, label: "Restroom" },
  { value: 7, label: "Accessible Entrance" },
  { value: 8, label: "Wheelchair Accessible" },
  { value: 9, label: "Power Outlets" },
  { value: 10, label: "Phone Charging Station" },

  { value: 11, label: "Board Game Library" },
  { value: 12, label: "Game Recommendations" },
  { value: 13, label: "Staff Assistance" },
  { value: 14, label: "Game Tutorials" },
  { value: 15, label: "Private Tables" },
  { value: 16, label: "Group Seating" },
  { value: 17, label: "Quiet Zone" },
  { value: 18, label: "Event Space" },
  { value: 19, label: "Air Purifier" },
  { value: 20, label: "Security Cameras" },

  { value: 21, label: "Lockers" },
  { value: 22, label: "Coat Hangers" },
  { value: 23, label: "Outdoor Seating" },
  { value: 24, label: "Smoking Area" },
  { value: 25, label: "Pet Friendly" },
  { value: 26, label: "Child Friendly Area" },
  { value: 27, label: "Baby Changing Station" },
  { value: 28, label: "First Aid Kit" },
  { value: 29, label: "Fire Safety Equipment" },
  { value: 30, label: "CCTV Monitoring" },

  { value: 31, label: "Membership Program" },
  { value: 32, label: "Loyalty Rewards" },
  { value: 33, label: "Online Booking" },
  { value: 34, label: "Walk-in Available" },
  { value: 35, label: "Reservation System" },
  { value: 36, label: "Digital Payment Accepted" },
  { value: 37, label: "Cash Payment Accepted" },
  { value: 38, label: "Gift Cards" },
  { value: 39, label: "Merchandise Shop" },
  { value: 40, label: "Game Retail Section" },

  { value: 41, label: "Extended Hours" },
  { value: 42, label: "Late Night Service" },
  { value: 43, label: "Air Ventilation System" },
  { value: 44, label: "Clean Tables Guarantee" },
  { value: 45, label: "Sanitizer Stations" },
  { value: 46, label: "Noise Control Measures" },
  { value: 47, label: "Themed Decor" },
  { value: 48, label: "Streaming Setup" },
  { value: 49, label: "Background Music" },
  { value: 50, label: "Friendly Staff" },
];

export default function TableandServicePage() {
  const [tableData, setTableData] = useState<
    {
      id: number;
      ownerId: number;
      seats: number;
      pricePerHour: string;
      createdAt: string;
    }[]
  >([]);

  async function fetchTables() {
    const accessToken = await getLocalStorageItem("accessToken");
    if (!accessToken) return;
    const data = await getTables(accessToken);
    setTableData(data.items);
  }

  useEffect(() => {
    fetchTables();
  }, [fetchTables]);

  return (
    <div className="flex flex-col gap-4">
      <MerchantTableManagement
        tableData={tableData}
        onTableCreated={fetchTables}
      />
      <MerchantServiceManagement serviceOptions={services} />
    </div>
  );
}
