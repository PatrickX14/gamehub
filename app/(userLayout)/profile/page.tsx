"use client";
import { getMe, GetMeResponse } from "@/app/lib/api/user";
import { getLocalStorageItem } from "@/app/lib/api/utils";
import { ProfileMenu } from "@/components/ProfileMenu";
import { AddressSection } from "@/components/UserAddressInfo";
import { ProfileInfo } from "@/components/ProfileInfo";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [userData, setUserData] = useState<GetMeResponse | null>();

  useEffect(() => {
    async function fetchUserData() {
      const accessToken = await getLocalStorageItem("accessToken");
      if (!accessToken) return;
      const userData = await getMe(accessToken);
      setUserData(userData);
    }
    fetchUserData();
  }, []);

  const name = userData?.name ? `${userData?.name} ${userData?.lastName}` : "-";
  const email = userData?.email ?? "-";
  const gender = userData?.gender ?? "-";
  const phoneNumber = userData?.phoneNumber == "" ? "-" : userData?.phoneNumber;
  const addressData = userData?.addresses?.items;

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
        <ProfileInfo
          name={name}
          email={email}
          gender={gender}
          phoneNumber={phoneNumber ?? ""}
        />
        <AddressSection addressData={addressData ?? []} />
      </div>
    </div>
  );
}
