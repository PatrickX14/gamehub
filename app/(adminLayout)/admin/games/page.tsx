import { GamesTable } from "@/components/AdminTable";

const demoTableData = [
  {
    id: 1,
    name: "Catan",
    date: "2023-01-15",
    quantity: 12,
    status: "Active",
  },
  {
    id: 2,
    name: "Ticket to Ride",
    date: "2022-11-20",
    quantity: 8,
    status: "Active",
  },
  {
    id: 3,
    name: "Pandemic",
    date: "2021-06-10",
    quantity: 15,
    status: "Active",
  },
  {
    id: 4,
    name: "Carcassonne",
    date: "2022-03-05",
    quantity: 0,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Wingspan",
    date: "2023-07-22",
    quantity: 5,
    status: "Active",
  },
  {
    id: 6,
    name: "Azul",
    date: "2021-09-14",
    quantity: 20,
    status: "Active",
  },
  {
    id: 7,
    name: "Betrayal at House on the Hill",
    date: "2020-12-01",
    quantity: 0,
    status: "Inactive",
  },
  {
    id: 8,
    name: "Gloomhaven: Jaws of the Lion",
    date: "2023-04-18",
    quantity: 3,
    status: "Active",
  },
  {
    id: 9,
    name: "7 Wonders",
    date: "2020-08-30",
    quantity: 0,
    status: "Inactive",
  },
  {
    id: 10,
    name: "Dominion",
    date: "2022-05-11",
    quantity: 9,
    status: "Active",
  },
];

export default function AdminGamesPage() {
  return (
    <div>
      <GamesTable tableTitle={"Games"} data={demoTableData} itemsPerPage={0} />
    </div>
  );
}
