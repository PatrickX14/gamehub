"use client";
import { GetProp, Select, SelectProps } from "antd";
import { SectionCard } from "./Cards";
import { EmailInput, TextInput } from "./Input";
import { useState } from "react";
import { getLocalStorageItem } from "@/app/lib/api/utils";
import {
  updateMerchantProfile,
  UpdateMerchantProfilePayload,
} from "@/app/lib/api/merchant/profile";

type Genders = "MALE" | "FEMALE" | "OTHER";
type GenderOptions = GetProp<SelectProps, "options">;

const genders: GenderOptions = [
  {
    label: "Male",
    value: "MALE",
  },
  {
    label: "Female",
    value: "FEMALE",
  },
  {
    label: "Other",
    value: "OTHER",
  },
];

type ProfileEditProps = {
  firstName: string;
  lastName: string;
  shopName?: string;
  phoneNumber: string;
  email: string;
  adminMode?: boolean;
};

export function ProfileEdit({
  firstName,
  lastName,
  shopName,
  email,
  phoneNumber,
  adminMode,
}: ProfileEditProps) {
  const [gender, setSelectGender] = useState<Genders>("MALE");
  const [profileData, setProfileData] = useState<UpdateMerchantProfilePayload>({
    email: email,
    name: firstName,
    phoneNumber: phoneNumber,
  });

  async function adminUpdateProfile(event: React.SyntheticEvent) {
    event.preventDefault();
    const accessToken = await getLocalStorageItem("accessToken");
    if (!accessToken) {
      return;
    }
    const res = await updateMerchantProfile(accessToken, profileData);
    if (!res) return;
  }

  async function userUpdateProfile() {
    const accessToken = await getLocalStorageItem("accessToken");
    if (!accessToken) {
      return;
    }
  }

  return (
    <SectionCard title={"Profile Edit"} description={""}>
      <form className="px-6 py-6 grid grid-cols-2 gap-y-2 gap-x-3">
        {adminMode ? (
          <TextInput
            name={"Shop name"}
            label={"Shop name*"}
            defaultValue={shopName}
            required
            onChange={(event) =>
              setProfileData((prev) => {
                return {
                  name: event.target.value,
                  email: prev.email,
                  phoneNumber: prev.phoneNumber,
                };
              })
            }
          />
        ) : (
          <>
            <TextInput
              name={"firstName"}
              label={"First name*"}
              defaultValue={firstName}
              required
            />
            <TextInput
              name={"lastName"}
              label={"Last name*"}
              defaultValue={lastName}
              required
            />
          </>
        )}
        {adminMode ? null : (
          <div className="w-full">
            <p className="text-sm mb-0.5 text-secondary">Categories</p>
            <Select
              className="w-full"
              options={genders}
              value={gender}
              onChange={(gender) => setSelectGender(gender)}
            />
          </div>
        )}
        <TextInput
          name={"phoneNumber"}
          label={"Phone number*"}
          defaultValue={phoneNumber}
          required
          onChange={(event) =>
            setProfileData((prev) => {
              return {
                name: prev.name,
                email: prev.email,
                phoneNumber: event.target.value,
              };
            })
          }
        />
        <EmailInput
          defaultValue={email}
          label={"Email*"}
          required
          onChange={(event) =>
            setProfileData((prev) => {
              return {
                name: prev.name,
                email: event.target.value,
                phoneNumber: prev.phoneNumber,
              };
            })
          }
        />
        <button
          type="submit"
          className="col-span-full cursor-pointer bg-[#FACC14] mt-3 rounded-md p-2 font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
          onClick={adminMode ? adminUpdateProfile : userUpdateProfile}
        >
          Submit
        </button>
      </form>
    </SectionCard>
  );
}
