import { getSingleMerchantReservation } from "@/app/lib/api/merchant/reservations";
import { MerchantSingleReservationCard } from "@/components/MerchantSingleReservationCard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type Params = {
  params: Promise<{ reservationId: string }>;
};

export default async function MerchantSingleReservationPage({
  params,
}: Params) {
  const { reservationId } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    redirect("/login");
  }

  const reservation = await getSingleMerchantReservation(
    accessToken.value,
    +reservationId,
  );

  return (
    <div>
      <MerchantSingleReservationCard
        data={reservation}
        accessToken={accessToken.value}
      />
    </div>
  );
}
