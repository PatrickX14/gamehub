import { ProfileMenu } from "@/components/ProfileMenu";
import { ProfileInfo } from "@/components/ProfileInfo";

export default function PurchasePage() {
  return (
    <div className="xl:px-30 grid grid-cols-3 gap-4">
      {/* profile menu */}
      {/* TODO: make it responsive */}
      <div>
        <ProfileMenu />
      </div>
      {/* Profile information */}
      {/* TODO: make it responsive */}
      <div className="col-span-2">
        <ProfileInfo />
      </div>
    </div>
  );
}
