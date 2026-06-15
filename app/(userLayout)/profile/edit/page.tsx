import { ProfileMenu } from "@/components/ProfileMenu";
import { ProfileEdit } from "@/components/UserProfileEdit";

export default async function UserProfileEditPage() {
  return (
    <div className="xl:px-30 grid grid-cols-3 gap-4">
      {/* profile menu */}
      {/* TODO: make it responsive */}
      <div>
        <ProfileMenu selectedMenu={"Profile"} />
      </div>
      {/* Profile information */}
      {/* TODO: make it responsive */}
      <div className="col-span-2 flex flex-col gap-5">
        <ProfileEdit />
      </div>
    </div>
  );
}
