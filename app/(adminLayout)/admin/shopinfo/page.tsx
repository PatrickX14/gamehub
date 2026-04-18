import { AdminTimeSetting } from "@/components/AdminTimeSetting";
import { ProfileInfo } from "@/components/ProfileInfo";

export default function ShopInfoPage() {
  return (
    <div className="flex flex-col gap-5">
      <ProfileInfo
        name={"My Shop Name"}
        email={"shopemail@email.com"}
        phoneNumber={"0995292366"}
        adminMode
      />
      <AdminTimeSetting />
    </div>
  );
}
