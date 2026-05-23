import { MerchantSingleReservationCard } from "@/components/MerchantSingleReservationCard";
import React from "react";

type Params = {
  params: Promise<{ reservationId: string }>;
};

export default async function MerchantSingleReservationPage({
  params,
}: Params) {
  const { reservationId } = await params;
  return (
    <div>
      <MerchantSingleReservationCard reservationId={+reservationId} />
    </div>
  );
}
