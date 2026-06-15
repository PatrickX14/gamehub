"use client";
import { AddressBody } from "@/app/lib/api/user";
import { Radio, RadioChangeEvent } from "antd";
import { SectionCard } from "./Cards";
import Link from "next/link";

type AddressSelectRadioProps = {
  addresses: AddressBody[];
  isAddressSelected: (selectedId: number) => void;
};

export function AddressSelectRadio({
  addresses,
  isAddressSelected,
}: AddressSelectRadioProps) {
  function handleAddressSelect(event: RadioChangeEvent) {
    isAddressSelected(event.target.value);
  }

  return (
    <SectionCard
      title={"Select Address"}
      description={"Choose a delivery address"}
    >
      {addresses.length > 0 ? (
        <Radio.Group onChange={handleAddressSelect} className="w-full">
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
        <>
          <p className="text-muted text-sm italic mb-5">
            No addresses available.
          </p>
          <Link
            href={"/profile/newaddress"}
            className="block mx-auto w-50 bg-[#FACC14] hover:bg-[#E7B008] py-1 rounded-md font-semibold text-center text-primary cursor-pointer transition-colors"
          >
            Add new address
          </Link>
        </>
      )}
    </SectionCard>
  );
}
