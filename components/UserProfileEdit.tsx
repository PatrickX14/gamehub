"use client";
import { GetProp, Select, SelectProps } from "antd";
import { SectionCard } from "./Cards";
import { EmailInput, TextInput } from "./Input";
import { useState } from "react";
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
export function UserProfileEdit() {
  const [gender, setSelectGender] = useState<Genders>("MALE");
  return (
    <SectionCard title={"Profile Edit"} description={""}>
      <form className="px-6 py-6 grid grid-cols-2 gap-y-2 gap-x-3">
        <TextInput
          name={"firstName"}
          label={"First name*"}
          defaultValue={"Kitjapong"}
          required
        />
        <TextInput
          name={"lastName"}
          label={"Last name*"}
          defaultValue={"Pongpattanakitja"}
          required
        />
        <div className="w-full">
          <p className="text-sm mb-0.5 text-secondary">Categories</p>
          <Select
            className="w-full"
            options={genders}
            value={gender}
            onChange={(gender) => setSelectGender(gender)}
          />
        </div>
        <TextInput
          name={"phoneNumber"}
          label={"Phone number*"}
          defaultValue={"0995292366"}
          required
        />
        <EmailInput
          defaultValue={"pat12@example.com"}
          label={"Email*"}
          required
        />
        <button
          type="submit"
          className="col-span-full cursor-pointer bg-[#FACC14] mt-3 rounded-md p-2 font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
        >
          Submit
        </button>
      </form>
    </SectionCard>
  );
}
