"use client";
import { AddressBody, getAddress } from "@/app/lib/api/user";
import { UserEditAddressForm } from "@/components/UserEditAddressForm";
import { use, useEffect, useState } from "react";

interface PageProps {
  params: Promise<{ addressId: string }>;
}

export default function MerchantEditAddressPage({ params }: PageProps) {
  const [addressData, setAddressData] = useState<AddressBody>();
  const { addressId } = use(params);
  // console.log(addressId);

  useEffect(() => {
    async function fetchAddress() {
      const addressData = await getAddress(addressId);
      if (!addressData) return;
      setAddressData(addressData);
    }
    fetchAddress();
  });
  return (
    <div>
      <UserEditAddressForm {...addressData} adminMode />
    </div>
  );
}
