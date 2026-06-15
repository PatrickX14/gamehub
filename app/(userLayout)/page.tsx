import { ReservationCardsSection } from "@/components/sections/index/gameReservationSection";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    redirect("/login");
  }
  return (
    <div>
      <section className="mb-6">
        <h1 className="text-[#364049] text-center font-bold text-4xl">
          Board Game Reservations
        </h1>
        <p className="text-[#627384] text-center">
          Reserve your favorite board games and enjoy quality{" "}
          <br className="hidden lg:block" />
          time with friends and family
        </p>
      </section>
      <section className="px-10 xl:px-30">
        <ReservationCardsSection accessToken={accessToken} />
      </section>
    </div>
  );
}
