"use client";
import { getMe, GetMeResponse } from "@/app/lib/api/user";
import { getLocalStorageItem } from "@/app/lib/api/utils";
import { AdminTimeSetting } from "@/components/AdminTimeSetting";
import { ProfileInfo } from "@/components/ProfileInfo";
import { AddressSection } from "@/components/UserAddressInfo";
import { useEffect, useState } from "react";

export default function ShopInfoPage() {
  const [profileData, setProfile] = useState<GetMeResponse>();

  useEffect(() => {
    async function fetchMerchantProfile() {
      const accessToken = await getLocalStorageItem("accessToken");
      if (!accessToken) return;
      const userData = await getMe(accessToken);
      if (!userData) return;
      setProfile(userData);
    }
    fetchMerchantProfile();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <ProfileInfo
        name={profileData?.name ?? "Shop name"}
        email={profileData?.email ?? "Email"}
        phoneNumber={profileData?.phoneNumber ?? "Phone number"}
        adminMode
      />
      <AddressSection
        addressData={profileData?.addresses.items ?? []}
        adminMode
      />
      <AdminTimeSetting />
    </div>
  );
}
