"use client";
import { getMe, GetMeResponse } from "@/app/lib/api/user";
import { getLocalStorageItem } from "@/app/lib/api/utils";
import { ProfileEdit } from "@/components/UserProfileEdit";
import { useEffect, useState } from "react";

export default function ShopInfoEditPage() {
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
    <div>
      <ProfileEdit
        adminMode
        shopName={profileData?.name ?? ""}
        phoneNumber={profileData?.phoneNumber ?? ""}
        email={profileData?.email ?? ""}
      />
    </div>
  );
}
