import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { AddressBody } from "@/app/lib/api/user";
import { SectionCard } from "./Cards";

interface AddressSectionProps {
  addressData: AddressBody[];
}

export function AddressSection({ addressData }: AddressSectionProps) {
  return (
    <SectionCard title={"Address"} description={"Manage your addresses"}>
      {/* Address details */}
      <div className="flex flex-col gap-5">
        {addressData.length > 0 ? (
          <>
            {addressData.map(
              ({
                id,
                name,
                receiverName,
                phoneNumber,
                district,
                houseNumber,
                postalCode,
                province,
                subDistrict,
                road,
                soi,
                village,
              }) => {
                const firstLineAddress = `${houseNumber} ${village} ${soi} ${road}`;
                const secondLineAddress = `${subDistrict} ${district} ${province} ${postalCode}`;
                return (
                  <AddressCard
                    key={id}
                    id={id}
                    addressLabel={name}
                    name={receiverName}
                    phoneNumber={phoneNumber}
                    address={firstLineAddress}
                    secondLineAddress={secondLineAddress}
                  />
                );
              },
            )}
          </>
        ) : (
          <>
            <p className="text-muted text-sm italic">No addresses added.</p>
          </>
        )}
      </div>
      {/* Add new address button */}
      <div className="flex justify-center mb-4">
        <Link
          href={"/profile/newaddress"}
          className="flex items-center bg-[#FACC14] hover:bg-[#E7B008]/80 px-4 py-2 rounded-md "
        >
          <AddIcon />
          Add new address
        </Link>
      </div>
    </SectionCard>
  );
}

interface AddressCardProps {
  id: number;
  addressLabel: string;
  name: string;
  phoneNumber: string;
  address: string;
  secondLineAddress: string;
}

function AddressCard({
  address,
  addressLabel,
  id,
  name,
  phoneNumber,
  secondLineAddress,
}: AddressCardProps) {
  return (
    <div className="flex">
      {/* details */}
      <div className="flex-1">
        <p className="text-xl text-primary font-bold">{addressLabel}</p>
        <p className="my-2 text-primary">
          {name} | {phoneNumber}
        </p>
        <p className="text-secondary">{address}</p>
        <p className="text-secondary">{secondLineAddress}</p>
      </div>
      {/* edit button */}
      <div className="flex items-center mb-4">
        <Link
          href={`/profile/address/${id}`}
          className="flex items-center bg-[#FACC14] hover:bg-[#E7B008]/80 px-4 py-2 rounded-md "
        >
          <AddIcon />
          Edit
        </Link>
      </div>
    </div>
  );
}
