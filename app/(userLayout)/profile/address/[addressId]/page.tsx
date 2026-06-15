"use client";
import { AddressBody, getAddress } from "@/app/lib/api/user";
import { ProfileMenu } from "@/components/ProfileMenu";
import { UserEditAddressForm } from "@/components/UserEditAddressForm";
import { use, useEffect, useState } from "react";

interface PageProps {
  params: Promise<{ addressId: string }>;
}

export default function SingleAddressPage({ params }: PageProps) {
  const [addressData, setAddressData] = useState<AddressBody>();
  const { addressId } = use(params);

  useEffect(() => {
    async function fetchAddress() {
      const addressData = await getAddress(addressId);
      if (!addressData) return;
      setAddressData(addressData);
    }
    fetchAddress();
  });

  return (
    <div className="xl:px-30 grid grid-cols-3 gap-4">
      {/* profile menu */}
      {/* TODO: make it responsive */}
      <div>
        <ProfileMenu selectedMenu={"Profile"} />
      </div>
      {/* Profile information */}
      {/* TODO: make it responsive */}
      <div className="col-span-2 flex flex-col gap-5">
        <UserEditAddressForm {...addressData} />
      </div>
    </div>
  );
}
