import { MerchantPartyTable } from "@/components/MerchantPartyTable";

const mockedPartyData = [
  {
    id: 1,
    hostName: "Erling Haaland",
    game: "Dungeons & Dragons",
    status: "Active",
    startAt: "2026-05-10T14:00:00",
    endAt: "2026-05-10T18:00:00",
    bookedAt: "2026-05-01T09:30:00",
  },
  {
    id: 2,
    hostName: "Kylian Mbappé",
    game: "Warhammer 40K",
    status: "Active",
    startAt: "2026-05-11T10:00:00",
    endAt: "2026-05-11T13:00:00",
    bookedAt: "2026-05-02T11:00:00",
  },
  {
    id: 3,
    hostName: "Jude Bellingham",
    game: "Magic: The Gathering",
    status: "Inactive",
    startAt: "2026-05-08T16:00:00",
    endAt: "2026-05-08T20:00:00",
    bookedAt: "2026-04-28T14:00:00",
  },
  {
    id: 4,
    hostName: "Vinicius Jr.",
    game: "Chess",
    status: "Active",
    startAt: "2026-05-12T09:00:00",
    endAt: "2026-05-12T11:00:00",
    bookedAt: "2026-05-03T08:45:00",
  },
  {
    id: 5,
    hostName: "Phil Foden",
    game: "Warhammer 40K",
    status: "Inactive",
    startAt: "2026-05-07T13:00:00",
    endAt: "2026-05-07T17:00:00",
    bookedAt: "2026-04-25T10:00:00",
  },
];

export default function MerchantPartyPage() {
  return (
    <div>
      <MerchantPartyTable data={mockedPartyData} tableTitle={"Parties"} />
    </div>
  );
}
