import { ProfileMenu } from "@/components/ProfileMenu";
import { UserPartyList } from "@/components/UserPartyList";
import { PartyCardProps } from "@/components/partyCard";

const demoParties: PartyCardProps[] = [
  {
    gameImageUrl: "/images/demoimages/Catan-2015-boxart.jpg",
    gameName: "Settlers of Catan",
    hostName: "Cristiano Ronaldo",
    location: "More Than a Game Cafe",
    date: "24/10/2025 17:30 - 19:30",
    message: "Looking for 2 more players",
    participantAvatarUrls: [null, null, null, null],
    maxParticipants: 4,
    status: "Booked",
  },
  {
    gameImageUrl: "/images/demoimages/Catan-2015-boxart.jpg",
    gameName: "Ticket to Ride",
    hostName: "Mia",
    location: "Dice & Coffee, Chiang Mai",
    date: "09/03/2025 10:00 - 12:00",
    message: "Table is ready! See you all tomorrow ✋",
    participantAvatarUrls: [null, null, null, null, null],
    maxParticipants: 5,
    status: "Gathering",
  },
  {
    gameImageUrl: "/images/demoimages/Catan-2015-boxart.jpg",
    gameName: "Wingspan",
    hostName: "Tom",
    location: "Board Room, Phuket",
    date: "14/03/2025 18:30 - 21:00",
    message: "Looking for 3 more bird lovers 🐦",
    participantAvatarUrls: [null, null],
    maxParticipants: 5,
    status: "Gathering",
  },
  {
    gameImageUrl: "/images/demoimages/Catan-2015-boxart.jpg",
    gameName: "Pandemic",
    hostName: "Sara",
    location: "Meeple Hub, Bangkok",
    date: "15/03/2025 15:00 - 18:00",
    message: "Game is full, starting soon!",
    participantAvatarUrls: [null, null, null, null],
    maxParticipants: 4,
    status: "Full",
  },
];

export default function PartiesPage() {
  return (
    <div className="xl:px-30 grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* profile menu */}
      <div className="lg:col-span-1">
        <ProfileMenu />
      </div>
      <div className="lg:col-span-2">
        <UserPartyList partiesData={demoParties} />
      </div>
    </div>
  );
}
