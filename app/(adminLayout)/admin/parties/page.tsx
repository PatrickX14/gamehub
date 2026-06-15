import { getMerchantAllParties } from "@/app/lib/api/merchant/party";
import { MerchantPartyTable } from "@/components/MerchantPartyTable";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function MerchantPartyPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    redirect("/login");
  }
  const parties = await getMerchantAllParties(accessToken.value);

  return (
    <div>
      <MerchantPartyTable data={parties.items} tableTitle={"Parties"} />
    </div>
  );
}
