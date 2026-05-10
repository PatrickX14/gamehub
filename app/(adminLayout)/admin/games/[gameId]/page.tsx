import { MerchantBoardgameEditForm } from "@/components/MerchantBoardgameEditForm";

interface Params {
  params: Promise<{
    gameId: string;
  }>;
}

export default async function MerchantSingleGamePage({ params }: Params) {
  const { gameId } = await params;
  return (
    <div>
      <MerchantBoardgameEditForm gameId={+gameId} />
    </div>
  );
}
