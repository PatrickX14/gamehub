"use client";
import { AddressBody, getAddress } from "@/app/lib/api/user";
import { UserAddressForm } from "@/components/UserAddressForm";
import { useEffect, useState } from "react";

export default function MerchantNewAddressPage() {
  const [addressData, setAddressData] = useState<AddressBody>();

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
      <UserAddressForm {...addressData} adminMode />
    </div>
  );
}
