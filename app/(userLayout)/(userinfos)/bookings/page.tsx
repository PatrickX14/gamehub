import { ProfileMenu } from "@/components/ProfileMenu";
import BookingInfo from "@/components/BookingInfo";
import { getUserReservations } from "@/app/lib/api/users/reservation";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

dayjs.extend(utc);
dayjs.extend(timezone);

export default async function BookingPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    redirect("/login");
  }
  const reservations = await getUserReservations(accessToken.value);

  return (
    <div className="xl:px-30 grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* profile menu */}
      <div className="lg:col-span-1">
        <ProfileMenu selectedMenu={"Bookings"} />
      </div>

      {/* user bookings information */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-md shadow-sm border border-[#364049]/10 p-6">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#364049]/10">
            <div>
              <h2 className="text-primary font-semibold text-lg">
                My Bookings
              </h2>
              <p className="text-secondary text-sm">View your order history</p>
            </div>

            {/* Tabs */}
            {/* <div className="flex bg-[#F9FAFB] p-1 rounded-lg border border-[#364049]/10">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-4 py-2 rounded-md font-semibold text-sm transition-all ${
                  activeTab === "upcoming"
                    ? "bg-white text-primary shadow-sm"
                    : "text-secondary hover:text-primary"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-4 py-2 rounded-md font-semibold text-sm transition-all ${
                  activeTab === "past"
                    ? "bg-white text-primary shadow-sm"
                    : "text-secondary hover:text-primary"
                }`}
              >
                Past
              </button>
            </div> */}
          </div>

          <div className="flex flex-col gap-6">
            {reservations ? (
              reservations.map((reservation) => (
                <BookingInfo
                  key={reservation.id}
                  storeName={reservation.merchantName}
                  storeAddress={reservation.merchantAddress}
                  startAt={dayjs(reservation.startAt)
                    .tz("Asia/Bangkok")
                    .format("D/MMMM/YYYY hh:mm")}
                  endAt={dayjs(reservation.endAt)
                    .tz("Asia/Bangkok")
                    .format("D/MMMM/YYYY hh:mm")}
                  mapUrl={""}
                  status={reservation.status}
                  boardgameName={reservation.boardgameName}
                />
              ))
            ) : (
              <div className="text-center py-12 text-secondary bg-[#F9FAFB] rounded-md border border-dashed border-[#364049]/20">
                <p>No bookings found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
