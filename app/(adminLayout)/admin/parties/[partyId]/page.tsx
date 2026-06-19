import { getMerchantSingleParty } from "@/app/lib/api/merchant/party";
import { MerchantPartySummary } from "@/components/MerchantPartySummary";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Params {
  params: Promise<{
    partyId: string;
  }>;
}

export default async function MerchantSinglePartyPage({ params }: Params) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    redirect("/login");
  }
  const { partyId } = await params;
  const party = await getMerchantSingleParty(accessToken.value, partyId);
  return (
    <div>
      <MerchantPartySummary partyData={party} />
    </div>
  );
}
