"use client";

import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";

interface ProfileData {
  name: string;
  gender: string;
  phone: string;
  email: string;
  addresses: string[];
}

const initialProfile: ProfileData = {
  name: "Patrick Doe",
  gender: "Male",
  phone: "+66 81 234 5678",
  email: "patrick@example.com",
  addresses: ["123 Main St, Bangkok, Thailand"],
};

export function ProfileInfo() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [draft, setDraft] = useState<ProfileData>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setDraft({ ...profile, addresses: [...profile.addresses] });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft({ ...profile, addresses: [...profile.addresses] });
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfile({ ...draft, addresses: [...draft.addresses] });
    setIsEditing(false);
  };

  const handleAddAddress = () => {
    setDraft((prev) => ({ ...prev, addresses: [...prev.addresses, ""] }));
  };

  const handleRemoveAddress = (index: number) => {
    setDraft((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((_, i) => i !== index),
    }));
  };

  const handleAddressChange = (index: number, value: string) => {
    setDraft((prev) => {
      const updated = [...prev.addresses];
      updated[index] = value;
      return { ...prev, addresses: updated };
    });
  };

  return (
    <div className="bg-[#F9FAFB] rounded-md shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#364049]/10">
        <div>
          <h2 className="text-primary font-semibold text-lg">
            Profile Information
          </h2>
          <p className="text-secondary text-sm">Manage your personal details</p>
        </div>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-1.5 bg-[#364049] hover:bg-[#364049]/80 text-white text-sm px-4 py-2 rounded-md transition-colors cursor-pointer"
          >
            <EditIcon style={{ fontSize: 16 }} />
            Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-1.5 border border-[#364049]/30 hover:bg-[#364049]/10 text-secondary text-sm px-4 py-2 rounded-md transition-colors cursor-pointer"
            >
              <CloseIcon style={{ fontSize: 16 }} />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 bg-[#FACC14] hover:bg-[#FACC14]/80 text-[#364049] font-semibold text-sm px-4 py-2 rounded-md transition-colors cursor-pointer"
            >
              <SaveIcon style={{ fontSize: 16 }} />
              Save
            </button>
          </div>
        )}
      </div>

      {/* Fields */}
      <div className="px-6 py-6 flex flex-col gap-5">
        {/* Name */}
        <Field
          icon={<PersonOutlineIcon style={{ fontSize: 20 }} />}
          label="Full Name"
          isEditing={isEditing}
          value={isEditing ? draft.name : profile.name}
          onChange={(v) => setDraft((p) => ({ ...p, name: v }))}
        />

        {/* Gender */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#364049]/10 flex items-center justify-center text-[#364049] mt-0.5">
            <WcOutlinedIcon style={{ fontSize: 20 }} />
          </div>
          <div className="flex-1">
            <p className="text-muted text-xs mb-1 font-medium uppercase tracking-wide">
              Gender
            </p>
            {isEditing ? (
              <select
                value={draft.gender}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, gender: e.target.value }))
                }
                className="w-full border border-[#364049]/20 rounded-md px-3 py-2 text-primary bg-white focus:outline-none focus:ring-2 focus:ring-[#FACC14] text-sm"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            ) : (
              <p className="text-primary text-sm">{profile.gender}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <Field
          icon={<PhoneOutlinedIcon style={{ fontSize: 20 }} />}
          label="Phone Number"
          isEditing={isEditing}
          value={isEditing ? draft.phone : profile.phone}
          onChange={(v) => setDraft((p) => ({ ...p, phone: v }))}
          type="tel"
        />

        {/* Email */}
        <Field
          icon={<EmailOutlinedIcon style={{ fontSize: 20 }} />}
          label="Email"
          isEditing={isEditing}
          value={isEditing ? draft.email : profile.email}
          onChange={(v) => setDraft((p) => ({ ...p, email: v }))}
          type="email"
        />

        {/* Divider */}
        <div className="border-t border-[#364049]/10" />

        {/* Addresses */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#364049]/10 flex items-center justify-center text-[#364049] mt-0.5">
            <HomeOutlinedIcon style={{ fontSize: 20 }} />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-muted text-xs font-medium uppercase tracking-wide">
                Addresses
              </p>
              {isEditing && (
                <button
                  onClick={handleAddAddress}
                  className="flex items-center gap-1 text-[#364049] hover:text-[#364049]/70 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <AddIcon style={{ fontSize: 16 }} />
                  Add Address
                </button>
              )}
            </div>

            {(isEditing ? draft.addresses : profile.addresses).length === 0 && (
              <p className="text-muted text-sm italic">No addresses added.</p>
            )}

            {(isEditing ? draft.addresses : profile.addresses).map(
              (addr, idx) =>
                isEditing ? (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      value={addr}
                      onChange={(e) => handleAddressChange(idx, e.target.value)}
                      placeholder={`Address ${idx + 1}`}
                      className="flex-1 border border-[#364049]/20 rounded-md px-3 py-2 text-primary bg-white focus:outline-none focus:ring-2 focus:ring-[#FACC14] text-sm"
                    />
                    <button
                      onClick={() => handleRemoveAddress(idx)}
                      className="text-red-400 hover:text-red-600 transition-colors cursor-pointer p-1"
                      title="Remove address"
                    >
                      <DeleteOutlineIcon style={{ fontSize: 20 }} />
                    </button>
                  </div>
                ) : (
                  <div
                    key={idx}
                    className="bg-[#364049]/5 rounded-md px-3 py-2 text-primary text-sm"
                  >
                    {addr}
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Reusable text field ─────────────────────────────── */
type FieldProps = {
  icon: React.ReactNode;
  label: string;
  isEditing: boolean;
  value: string;
  onChange: (v: string) => void;
  type?: string;
};

function Field({
  icon,
  label,
  isEditing,
  value,
  onChange,
  type = "text",
}: FieldProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#364049]/10 flex items-center justify-center text-[#364049] mt-0.5">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-secondary text-xs mb-1 font-medium uppercase tracking-wide">
          {label}
        </p>
        {isEditing ? (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border border-[#364049]/20 rounded-md px-3 py-2 text-primary bg-white focus:outline-none focus:ring-2 focus:ring-[#FACC14] text-sm"
          />
        ) : (
          <p className="text-primary">{value}</p>
        )}
      </div>
    </div>
  );
}
