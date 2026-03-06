import { ProfileMenu } from "@/components/ProfileMenu";

export default function PartiesPage() {
  return (
    <div className="xl:px-30 grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* profile menu */}
      <div className="lg:col-span-1">
        <ProfileMenu />
      </div>
      <div className="lg:col-span-2">
        <ProfileMenu />
      </div>
    </div>
  );
}
