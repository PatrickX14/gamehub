import { getAllParties } from "@/app/lib/api/users/party";
import DEMOPartyPage from "@/components/UserPartyPage.DEMO";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PartyPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    redirect("/login");
  }
  const parties = await getAllParties(accessToken.value);
  return (
    <div>
      <DEMOPartyPage accessToken={accessToken.value} data={parties.items} />
    </div>
  );
}
