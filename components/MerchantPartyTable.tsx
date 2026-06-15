"use client";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ChangeEvent, useState } from "react";
import { Select, TextInput } from "./Input";
import { SectionCard } from "./Cards";
import {
  ViewButton,
  EditButton,
  DeleteButton,
} from "./AdminTableActionButtons";
import { Party } from "@/app/lib/api/merchant/party";
import Link from "next/link";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);
dayjs.extend(timezone);

type MerchantPartyTableProps = {
  data: Party[];
  itemsPerPage?: number;
  tableTitle: string;
};

export function MerchantPartyTable({
  data,
  itemsPerPage,
  tableTitle,
}: MerchantPartyTableProps) {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageLimit] = useState<number>(itemsPerPage || 20);
  const [queries, setQueries] = useState({
    id: "",
    name: "",
    status: "",
    startAt: "",
    endAt: "",
    game: "",
  });

  function handleQueryChange(key: keyof typeof queries) {
    return (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setQueries((prev) => ({ ...prev, [key]: event.target.value }));
      setPageNumber(0);
    };
  }

  const filteredData = data.filter(
    ({
      hostName,
      id,
      boardgameName,
      reservationId,
      status,
      startAt,
      createdAt,
    }) =>
      boardgameName
        .toLocaleLowerCase()
        .includes(queries.game.toLocaleLowerCase()) &&
      hostName.toLowerCase().includes(queries.name.toLowerCase()) &&
      (queries.id === "" || id.toString().includes(queries.id)) &&
      (queries.status === "" ||
        status.toLocaleLowerCase() === queries.status.toLocaleLowerCase()) &&
      (queries.startAt === "" || startAt >= queries.startAt),
  );

  const totalPages = Math.ceil(filteredData.length / pageLimit);
  const pagedData = filteredData.slice(
    pageNumber * pageLimit,
    (pageNumber + 1) * pageLimit,
  );

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }

  return (
    <SectionCard title={tableTitle} description={""}>
      {/* Search */}
      <div className="flex justify-between">
        <div className="flex gap-2 mb-2">
          <TextInput
            name="id"
            label="Party ID"
            onChange={handleQueryChange("id")}
          />
          <TextInput
            name="name"
            label="Host name"
            onChange={handleQueryChange("name")}
          />
          <TextInput
            name="game"
            label="Game"
            onChange={handleQueryChange("game")}
          />
          {/* Status filter */}
          <Select
            options={["All Status", "Active", "Inactive"]}
            onChange={handleQueryChange("status")}
            label={"Status"}
          />
        </div>
      </div>

      {/* Table */}
      <table className="table-auto w-full">
        <thead className="bg-[#FACC14]">
          <tr>
            <th className="px-4 py-2 text-left text-primary">Id</th>
            <th className="border-x border-gray-300 px-4 py-2 text-left text-primary">
              Reservation Id
            </th>
            <th className="border-x border-gray-300 px-4 py-2 text-left text-primary">
              Host By
            </th>
            <th className="border-x border-gray-300 px-4 py-2 text-left text-primary">
              Game
            </th>
            <th className="border-x border-gray-300 px-4 py-2 text-left text-primary">
              Status
            </th>
            <th className="border-x border-gray-300 px-4 py-2 text-left text-primary">
              Start At
            </th>
            <th className="border-x border-gray-300 px-4 py-2 text-left text-primary">
              Booked At
            </th>
            <th className="px-4 py-2 text-left text-primary">Action</th>
          </tr>
        </thead>
        <tbody>
          {pagedData.map(
            ({
              id,
              reservationId,
              hostName,
              boardgameName,
              status,
              startAt,
              createdAt,
            }) => (
              <tr key={id} className="group">
                <td className="border-gray-300 px-4 py-2 text-left text-primary">
                  {id}
                </td>
                <td className="border-gray-300 px-4 py-2 text-left text-primary">
                  <Link
                    href={`/admin/reservations/${reservationId}`}
                    className="text-blue-800 underline"
                  >
                    {reservationId}
                  </Link>
                </td>
                <td className="border-gray-300 px-4 py-2 text-left text-primary">
                  {hostName}
                </td>
                <td className="border-gray-300 px-4 py-2 text-left text-primary">
                  {boardgameName}
                </td>
                <td className="border-gray-300 px-4 py-2 text-left text-primary">
                  {status}
                </td>
                <td className="border-gray-300 px-4 py-2 text-left text-primary">
                  {dayjs.tz(startAt).format("DD/MM/YYYY HH:mm")}
                </td>
                <td className="border-gray-300 px-4 py-2 text-left text-primary">
                  {dayjs.tz(createdAt).format("DD/MM/YYYY HH:mm")}
                </td>
                {/* Action buttons */}
                <td className="border-gray-300 px-4 py-2 text-left text-primary">
                  <div className="flex gap-1">
                    <ViewButton segment="parties" param={id} />
                    <EditButton segment="parties" param={id} />
                    <DeleteButton id={id} />
                  </div>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end gap-2 items-center">
        <button
          className="size-8 cursor-pointer rounded-md hover:bg-[#FACC14]"
          onClick={() => setPageNumber((p) => (p > 0 ? p - 1 : p))}
        >
          <ChevronLeftIcon />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`cursor-pointer size-8 rounded-md ${pageNumber === i ? "bg-[#FACC14] font-bold" : ""}`}
            onClick={() => setPageNumber(i)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="size-8 cursor-pointer rounded-md hover:bg-[#FACC14]"
          onClick={() => setPageNumber((p) => (p < totalPages - 1 ? p + 1 : p))}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </SectionCard>
  );
}
