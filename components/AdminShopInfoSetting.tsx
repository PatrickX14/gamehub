import { SectionCard } from "./Cards";
import { TextInput } from "./Input";
import { ProfileInfo } from "./ProfileInfo";

export function AdminShopInfoSetting() {
  return (
    <SectionCard
      title={"Shop Information"}
      description={"Manage your shop details"}
    >
      <ProfileInfo name={""} email={""} gender={""} phoneNumber={""} />
    </SectionCard>
  );
}
