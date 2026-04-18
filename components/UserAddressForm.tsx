"use client";
import { TextInput } from "./Input";
import EditIcon from "@mui/icons-material/Edit";
import { useActionState } from "react";
import { postAddress } from "@/app/lib/api/user";

export function UserAddressForm() {
  const [state, formAction] = useActionState(postAddress, {
    error: null,
  });
  return (
    <div className="bg-[#F9FAFB] rounded-md shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#364049]/10">
        <div>
          <h2 className="text-primary font-semibold text-lg">
            Add new address
          </h2>
          <p className="text-secondary text-sm">
            Fill out this form to and save your new address
          </p>
        </div>
      </div>

      {/* Address details */}
      <form
        className="px-6 py-6 grid grid-cols-2 gap-y-2 gap-x-3"
        action={formAction}
      >
        <TextInput name={"name"} label={"Address Label*"} required />
        <TextInput name={"receiverName"} label={"Receiver Name*"} required />
        <TextInput name={"phoneNumber"} label={"Phone Number*"} required />
        <TextInput name={"houseNumber"} label={"House Number*"} required />
        <TextInput name={"soi"} label={"Soi"} />
        <TextInput name={"road"} label={"Road*"} required />
        <TextInput name={"village"} label={"Village"} />
        <TextInput name={"subDistrict"} label={"Sub District*"} required />
        <TextInput name={"district"} label={"District*"} required />
        <TextInput name={"province"} label={"Province*"} required />
        <TextInput name={"postalCode"} label={"Postal Code*"} required />
        <div className="flex justify-end col-span-2">
          <p className="text-sm text-center text-red-500">{state.error}</p>
          <button
            type="submit"
            className="bg-[#FACC14] px-2 py-1 rounded-md cursor-pointer flex items-center gap-1 text-primary"
          >
            Save
            <EditIcon fontSize="small" />
          </button>
        </div>
      </form>
    </div>
  );
}
