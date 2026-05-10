import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
// import { GetMeResponse } from "@/app/lib/api/user";
// import { useRouter } from "next/navigation";
import { SectionCard } from "./Cards";
import Link from "next/link";
import { Settings } from "@mui/icons-material";

interface ProfileInfoProps {
  name: string;
  email: string;
  phoneNumber: string;
  gender?: string;
  adminMode?: boolean;
}

export function ProfileInfo({
  email,
  gender,
  name,
  phoneNumber,
  adminMode,
}: ProfileInfoProps) {
  return (
    <SectionCard
      title={"Shop Information"}
      description={"Manage your shop details"}
    >
      {/* Fields */}
      <div className="flex flex-col gap-5">
        {/* Name */}
        <Field
          icon={<PersonOutlineIcon style={{ fontSize: 20 }} />}
          label={adminMode ? "Shop name" : "Full Name"}
          isEditing={false}
          value={name}
        />

        {/* Gender */}
        {!adminMode && (
          <Field
            icon={<WcOutlinedIcon style={{ fontSize: 20 }} />}
            label="Gender"
            isEditing={false}
            value={gender ?? "-"}
          />
        )}

        {/* Phone */}
        <Field
          icon={<PhoneOutlinedIcon style={{ fontSize: 20 }} />}
          label="Phone Number"
          isEditing={false}
          value={phoneNumber}
        />

        {/* Email */}
        <Field
          icon={<EmailOutlinedIcon style={{ fontSize: 20 }} />}
          label="Email"
          isEditing={false}
          value={email}
          type="email"
        />
        <div className="flex justify-end">
          <Link
            href={adminMode ? "/admin/shopinfo/edit" : "/profile/edit"}
            className="flex items-center bg-[#FACC14] hover:bg-[#E7B008]/80 px-4 py-2 rounded-md "
          >
            <Settings />
            Edit
          </Link>
        </div>
      </div>
    </SectionCard>
  );
}

type FieldProps = {
  icon: React.ReactNode;
  label: string;
  isEditing: boolean;
  value: string;
  // onChange: (v: string) => void;
  type?: string;
};

export function Field({
  icon,
  label,
  isEditing,
  value,
  // onChange,
  type = "text",
}: FieldProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#364049]/10 flex items-center justify-center text-[#364049] mt-2 shadow-md">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-secondary text-xs mb-1 font-medium uppercase tracking-wide">
          {label}
        </p>
        {isEditing ? (
          <input
            type={type}
            value={value ?? ""}
            // onChange={(e) => onChange(e.target.value)}
            className="w-full border border-[#364049]/20 rounded-md px-3 py-2 text-primary bg-white focus:outline-none focus:ring-2 focus:ring-[#FACC14] text-sm"
          />
        ) : (
          <p className="text-primary">{value}</p>
        )}
      </div>
    </div>
  );
}
