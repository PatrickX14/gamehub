import { RevervationTable } from "@/components/AdminTable";

const demoTableData = [
  {
    id: 1042,
    customerName: "Jane Doe",
    game: "Catan",
    startAt: "2026-04-21T14:00:00",
    endAt: "2026-04-21T16:00:00",
    status: "Upcoming",
    bookedAt: "2026-04-19T10:23:00",
  },
  {
    id: 1043,
    customerName: "Mark Rivera",
    game: "Pandemic",
    startAt: "2026-04-21T10:00:00",
    endAt: "2026-04-21T12:00:00",
    status: "Completed",
    bookedAt: "2026-04-18T09:15:00",
  },
  {
    id: 1044,
    customerName: "Sophie Chen",
    game: "Ticket to Ride",
    startAt: "2026-04-21T13:00:00",
    endAt: "2026-04-21T15:30:00",
    status: "Ongoing",
    bookedAt: "2026-04-20T14:00:00",
  },
  {
    id: 1045,
    customerName: "Liam Nguyen",
    game: "Wingspan",
    startAt: "2026-04-22T09:00:00",
    endAt: "2026-04-22T11:00:00",
    status: "Upcoming",
    bookedAt: "2026-04-20T16:45:00",
  },
  {
    id: 1046,
    customerName: "Aisha Patel",
    game: "Gloomhaven",
    startAt: "2026-04-20T15:00:00",
    endAt: "2026-04-20T18:00:00",
    status: "Completed",
    bookedAt: "2026-04-17T11:30:00",
  },
  {
    id: 1047,
    customerName: "Carlos Mendez",
    game: "7 Wonders",
    startAt: "2026-04-22T13:00:00",
    endAt: "2026-04-22T14:30:00",
    status: "Upcoming",
    bookedAt: "2026-04-21T08:00:00",
  },
  {
    id: 1048,
    customerName: "Emily Hartman",
    game: "Azul",
    startAt: "2026-04-21T11:00:00",
    endAt: "2026-04-21T12:30:00",
    status: "Completed",
    bookedAt: "2026-04-19T17:20:00",
  },
  {
    id: 1049,
    customerName: "Noah Kim",
    game: "Brass: Birmingham",
    startAt: "2026-04-23T10:00:00",
    endAt: "2026-04-23T13:00:00",
    status: "Upcoming",
    bookedAt: "2026-04-21T09:55:00",
  },
];

export default function AdminBookingsPage() {
  return (
    <div>
      <RevervationTable
        tableTitle={"Bookings"}
        data={demoTableData}
        itemsPerPage={0}
      />
    </div>
  );
}
