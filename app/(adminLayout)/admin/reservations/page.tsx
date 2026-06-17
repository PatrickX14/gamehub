import { getMerchantReservations } from "@/app/lib/api/merchant/reservations";
import { MerchantReservationTable } from "@/components/MerchantReservationTable";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminBookingsPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    redirect("/login");
  }
  const reservationData = await getMerchantReservations(accessToken.value);
  return (
    <div>
      <MerchantReservationTable
        tableTitle={"Bookings"}
        itemsPerPage={0}
        accessToken={accessToken.value}
        reservationsData={reservationData}
      />
    </div>
  );
}
