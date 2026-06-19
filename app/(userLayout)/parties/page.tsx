import { getMyParties } from "@/app/lib/api/users/party";
import { ProfileMenu } from "@/components/ProfileMenu";
import { UserPartyList } from "@/components/UserPartyList";
import dayjs from "dayjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { PartyCardProps } from "@/components/PartyCard";
dayjs.extend(utc);
dayjs.extend(timezone);

// const demoParties: PartyCardProps[] = [
//   {
//     gameName: "Settlers of Catan",
//     hostName: "Cristiano Ronaldo",
//     location: "More Than a Game Cafe",
//     date: "24/10/2025 17:30 - 19:30",
//     message: "Looking for 2 more players",
//     participantAvatarUrls: [null, null, null, null],
//     maxParticipants: 4,
//     status: "Booked",
//   },
//   {
//     gameName: "Ticket to Ride",
//     hostName: "Mia",
//     location: "Dice & Coffee, Chiang Mai",
//     date: "09/03/2025 10:00 - 12:00",
//     message: "Table is ready! See you all tomorrow ✋",
//     participantAvatarUrls: [null, null, null, null, null],
//     maxParticipants: 5,
//     status: "Gathering",
//   },
//   {
//     gameName: "Wingspan",
//     hostName: "Tom",
//     location: "Board Room, Phuket",
//     date: "14/03/2025 18:30 - 21:00",
//     message: "Looking for 3 more bird lovers 🐦",
//     participantAvatarUrls: [null, null],
//     maxParticipants: 5,
//     status: "Gathering",
//   },
//   {
//     gameName: "Pandemic",
//     hostName: "Sara",
//     location: "Meeple Hub, Bangkok",
//     date: "15/03/2025 15:00 - 18:00",
//     message: "Game is full, starting soon!",
//     participantAvatarUrls: [null, null, null, null],
//     maxParticipants: 4,
//     status: "Full",
//   },
// ];

export default async function PartiesPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    redirect("/login");
  }

  const parties = await getMyParties(accessToken.value);
  console.log(parties);
  const mappedPartiesData: PartyCardProps[] = parties.items.map((party) => ({
    partyId: party.id,
    gameName: party.boardgame.name,
    hostName: party.hostName,
    location: party.merchant.location,
    startAt: `${dayjs(party.startAt).tz("Asia/Bangkok").format("DD/MM/YYYY HH:mm")} - ${dayjs(party.endAt).tz("Asia/Bangkok").format("DD/MM/YYYY HH:mm")}`,
    maxMembers: party.maxPlayers,
    status: party.status as PartyCardProps["status"],
    currentMembers: party.members.length,
  }));

  return (
    <div className="xl:px-30 grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* profile menu */}
      <div className="lg:col-span-1">
        <ProfileMenu selectedMenu={"Parties"} />
      </div>
      <div className="lg:col-span-2">
        <UserPartyList partiesData={parties.items} />
      </div>
    </div>
  );
}
