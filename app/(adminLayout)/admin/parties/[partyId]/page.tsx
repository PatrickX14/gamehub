import { MerchantPartySummary } from "@/components/MerchantPartySummary";

interface Params {
  params: Promise<{
    partyId: string;
  }>;
}

export default async function MerchantSinglePartyPage({ params }: Params) {
  const { partyId } = await params;
  return (
    <div>
      <MerchantPartySummary />
    </div>
  );
}
