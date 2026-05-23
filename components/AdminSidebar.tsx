"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Navigations } from "./AdminNaviations";
import { getLocalStorageItem } from "@/app/lib/api/utils"; // adjust import path as needed
import { getAvatar, getMe, GetMeResponse } from "@/app/lib/api/user";
import { Spin, SpinProps } from "antd";

export function AdminSidebar() {
  const [profile, setProfile] = useState<GetMeResponse | null>(null);
  const [avatarImage, setAvatarImage] = useState<string>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    async function fetchProfile() {
      const accessToken = await getLocalStorageItem("accessToken");
      if (!accessToken) return;

      try {
        const data = await getMe(accessToken);
        setProfile(data);
        const avatarImage = await getAvatar();
        setAvatarImage(avatarImage.imageUrl);
        setIsMounted(true);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    }

    fetchProfile();
  }, []);

  const stylesObject: SpinProps["styles"] = {
    indicator: {
      color: "#FACC14",
    },
  };

  return (
    <div className="fixed top-0 left-0 h-screen bg-[#F9FAFB] w-80 py-10 z-50 flex-shrink-0">
      {!isMounted ? (
        // Render nothing (or a static skeleton) during SSR + first paint
        // so server and client HTML always match
        <div className="flex justify-center my-20" />
      ) : avatarImage && profile ? (
        <AdminLogo
          imageUrl={avatarImage}
          shopName={profile.name} // no need for ?. since profile is checked
          role={"Merchant"}
        />
      ) : (
        <div className="flex justify-center my-20">
          <Spin size="large" styles={stylesObject} />
        </div>
      )}
      {/* <div className="flex justify-center my-20">
        <Spin size="large" />
      </div> */}
      <Navigations />
    </div>
  );
}

interface AdminLogoProps {
  imageUrl: string;
  shopName: string;
  role: string;
}

function AdminLogo({ imageUrl, role, shopName }: AdminLogoProps) {
  return (
    <div className="mb-3">
      <Image
        alt="admin login image"
        className="mx-auto mb-2"
        src={imageUrl}
        width={150}
        height={150}
        unoptimized
      />
      <h3 className="text-center font-bold text-xl">{shopName}</h3>
      <p className="text-center">{role}</p>
    </div>
  );
}
