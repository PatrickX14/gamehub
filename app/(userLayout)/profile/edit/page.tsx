import { getMe } from "@/app/lib/api/user";
import { ProfileMenu } from "@/components/ProfileMenu";
import { ProfileEdit } from "@/components/UserProfileEdit";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function UserProfileEditPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    redirect("/login");
  }
  const user = await getMe(accessToken.value);
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
        <ProfileEdit
          phoneNumber={user.phoneNumber}
          email={user.email}
          firstName={user.name}
          lastName={user.lastName}
        />
      </div>
    </div>
  );
}
