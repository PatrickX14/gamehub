import { ReservationCardsSection } from "@/components/sections/index/gameReservationSection";

export default function Home() {
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
      <ReservationCardsSection />
    </div>
  );
}
