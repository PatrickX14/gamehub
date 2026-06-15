import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReservationPaymentForm } from "@/components/ReservationPayment";
import { getReservationById } from "@/app/lib/api/users/reservation";

type Params = {
  params: Promise<{ reservationId: string }>;
};

export default async function ReservationPaymentPage({ params }: Params) {
  const { reservationId } = await params;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    redirect("/login");
  }
  const reservation = await getReservationById(
    accessToken.value,
    +reservationId,
  );

  return (
    <>
      <ReservationPaymentForm
        reservation={reservation}
        accessToken={accessToken.value}
      />
    </>
  );
}
