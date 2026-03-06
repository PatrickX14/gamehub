import { ProfileMenu } from "@/components/ProfileMenu";
import { PurchaseInfo } from "@/components/PurchaseInfo";

export default function PurchasePage() {
  return (
    <div className="xl:px-30 grid grid-cols-3 gap-4">
      {/* profile menu */}
      {/* TODO: make it responsive */}
      <div>
        <ProfileMenu />
      </div>
      {/* Purchase information */}
      {/* TODO: make it responsive */}
      <div className="col-span-2">
        <PurchaseInfo />
      </div>
    </div>
  );
}
