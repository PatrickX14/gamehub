"use client";
import { TextInput } from "./Input";
import EditIcon from "@mui/icons-material/Edit";
import { useActionState } from "react";
import { updateAddress } from "@/app/lib/api/user";

interface EditFormProps {
  id?: number;
  name?: string;
  receiverName?: string;
  phoneNumber?: string;
  houseNumber?: string;
  soi?: string;
  road?: string;
  village?: string;
  subDistrict?: string;
  district?: string;
  province?: string;
  postalCode?: string;
  adminMode?: boolean;
}

export function UserEditAddressForm({
  id,
  name,
  receiverName,
  phoneNumber,
  houseNumber,
  soi,
  road,
  village,
  subDistrict,
  district,
  province,
  postalCode,
  adminMode,
}: EditFormProps) {
  const [state, formAction, isPending] = useActionState(updateAddress, {
    error: null,
  });
  return (
    <div className="bg-[#F9FAFB] rounded-md shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#364049]/10">
        <div>
          <h2 className="text-primary font-semibold text-lg">Edit address</h2>
          <p className="text-secondary text-sm">
            Update this address and save your changes
          </p>
        </div>
      </div>

      {/* Address details */}
      <form
        className="px-6 py-6 grid grid-cols-2 gap-y-2 gap-x-3"
        action={formAction}
      >
        {id && <input type="hidden" name="addressId" value={String(id)} />}
        {adminMode ? null : (
          <>
            <TextInput
              name={"name"}
              label={"Address Label*"}
              required
              defaultValue={name}
            />
            <TextInput
              name={"receiverName"}
              label={"Receiver Name*"}
              required
              defaultValue={receiverName}
            />
            <TextInput
              name={"phoneNumber"}
              label={"Phone Number*"}
              required
              defaultValue={phoneNumber}
            />
          </>
        )}
        <TextInput
          name={"houseNumber"}
          label={"House Number*"}
          required
          defaultValue={houseNumber}
        />
        <TextInput name={"soi"} label={"Soi"} defaultValue={soi} />
        <TextInput name={"road"} label={"Road*"} required defaultValue={road} />
        <TextInput name={"village"} label={"Village"} defaultValue={village} />
        <TextInput
          name={"subDistrict"}
          label={"Sub District*"}
          required
          defaultValue={subDistrict}
        />
        <TextInput
          name={"district"}
          label={"District*"}
          required
          defaultValue={district}
        />
        <TextInput
          name={"province"}
          label={"Province*"}
          required
          defaultValue={province}
        />
        <TextInput
          name={"postalCode"}
          label={"Postal Code*"}
          required
          defaultValue={postalCode}
        />
        <div className="flex justify-end col-span-2">
          <p className="text-sm text-center text-red-500">{state.error}</p>

          {isPending ? (
            <p>Saving....</p>
          ) : (
            <button
              type="submit"
              className="bg-[#FACC14] px-2 py-1 rounded-md cursor-pointer flex items-center gap-1 text-primary"
            >
              Save
              <EditIcon fontSize="small" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
