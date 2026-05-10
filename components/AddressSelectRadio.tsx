"use client";
import { getMe, AddressBody } from "@/app/lib/api/user";
import { getLocalStorageItem } from "@/app/lib/api/utils";
import { Radio } from "antd";
import { useEffect, useState } from "react";
import { SectionCard } from "./Cards";

export function AddressSelectRadio() {
  const [addresses, setAddresses] = useState<AddressBody[]>([]);
  const [selected, setSelected] = useState<number>();

  useEffect(() => {
    async function fetchAddress() {
      const accessToken = await getLocalStorageItem("accessToken");
      if (!accessToken) return;
      const data = await getMe(accessToken);
      if (!data) return;
      setAddresses(data.addresses.items);
    }
    fetchAddress();
  }, []);

  return (
    <SectionCard
      title={"Select Address"}
      description={"Choose a delivery address"}
    >
      {addresses.length > 0 ? (
        <Radio.Group
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full"
        >
          <div className="flex flex-col gap-4">
            {addresses.map(
              ({
                id,
                name,
                receiverName,
                phoneNumber,
                houseNumber,
                village,
                soi,
                road,
                subDistrict,
                district,
                province,
                postalCode,
              }) => {
                const firstLine =
                  `${houseNumber} ${village ?? ""} ${soi ?? ""} ${road ?? ""}`.trim();
                const secondLine = `${subDistrict} ${district} ${province} ${postalCode}`;
                return (
                  <Radio key={id} value={id} className="w-full">
                    <div className="ml-2">
                      <p className="text-xl text-primary font-bold">{name}</p>
                      <p className="my-1 text-primary">
                        {receiverName} | {phoneNumber}
                      </p>
                      <p className="text-secondary text-sm">{firstLine}</p>
                      <p className="text-secondary text-sm">{secondLine}</p>
                    </div>
                  </Radio>
                );
              },
            )}
          </div>
        </Radio.Group>
      ) : (
        <p className="text-muted text-sm italic">No addresses available.</p>
      )}
    </SectionCard>
  );
}
