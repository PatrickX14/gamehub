"use client";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ChangeEvent, useState } from "react";
import { DateInput, Select, TextInput } from "./Input";
import { SectionCard } from "./Cards";
import { Empty, Tag } from "antd";
import { ReservationItem } from "@/app/lib/api/merchant/reservations";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { useRouter } from "next/navigation";

dayjs.extend(utc);
dayjs.extend(timezone);

interface RevervationTableProps {
  tableTitle: string;
  itemsPerPage: number;
  accessToken: string;
  reservationsData: ReservationItem[];
}

export function MerchantReservationTable({
  itemsPerPage,
  tableTitle,
  reservationsData,
}: RevervationTableProps) {
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageLimit, setPageLimit] = useState<number>(itemsPerPage || 20);

  const [queries, setQueries] = useState({
    id: "",
    name: "",
    status: "",
    startAt: "",
    endAt: "",
    bookedAt: "",
    game: "",
  });

  const filteredData = reservationsData.filter(
    ({ boardgameName, hostName, status, createdAt, startAt }) =>
      (queries.game === "" ||
        queries.game === "all" ||
        boardgameName.toLowerCase() === queries.game.toLowerCase()) &&
      hostName.toLowerCase().includes(queries.name.toLowerCase()) &&
      (queries.status === "" ||
        status.toLowerCase() === queries.status.toLowerCase()) &&
      (queries.startAt === "" || startAt.includes(queries.startAt)) &&
      (queries.bookedAt === "" || createdAt.includes(queries.bookedAt)),
  );

  const totalPages = Math.ceil(filteredData.length / pageLimit);
  const pagedData = filteredData.slice(
    pageNumber * pageLimit,
    (pageNumber + 1) * pageLimit,
  );

  const gameFilter = reservationsData.reduce<string[]>(
    (prevData, { boardgameName }) => {
      if (!prevData.includes(boardgameName)) {
        prevData.push(boardgameName);
      }
      return prevData;
    },
    [],
  );

  const statusFilter = reservationsData.reduce<string[]>(
    (prevData, { status }) => {
      if (!prevData.includes(status)) {
        prevData.push(status);
      }
      return prevData;
    },
    [],
  );

  function handleUserNameQuery(event: ChangeEvent<HTMLInputElement>) {
    setQueries((prev) => ({ ...prev, name: event.target.value }));
    setPageNumber(0);
  }

  function handleQueryChange(key: keyof typeof queries) {
    return (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setQueries((prev) => ({ ...prev, [key]: event.target.value }));
      setPageNumber(0);
    };
  }

  return (
    <div>
      <SectionCard title={tableTitle} description={""}>
        {/* Search */}
        <div className="flex justify-between">
          <div className="flex gap-2 mb-2">
            <TextInput
              name="hostName"
              label="Host name"
              onChange={handleUserNameQuery}
            />

            {/* Status filters */}
            <Select
              options={["All games", ...gameFilter]}
              onChange={handleQueryChange("game")}
              label={"Game"}
            />

            <Select
              options={["All status", ...statusFilter]}
              onChange={handleQueryChange("status")}
              label={"Status"}
            />

            {/* Date range */}
            {/* <DateInput
              onChange={handleQueryChange("")}
              label={"From"}
            /> */}
            <DateInput
              onChange={handleQueryChange("startAt")}
              label={"Start at"}
            />
            <DateInput
              onChange={handleQueryChange("bookedAt")}
              label={"Booked at"}
            />
          </div>
        </div>

        {/* Table */}
        {reservationsData.length > 0 ? (
          <table className="table-auto w-full">
            <thead className="bg-[#FACC14]">
              <tr>
                <th className="px-4 py-2 text-left text-primary">Id</th>
                <th className="border-x border-gray-300 px-4 py-2 text-left text-primary">
                  Booked by
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
                  End At
                </th>
                <th className="border-x border-gray-300 px-4 py-2 text-left text-primary">
                  Booked At
                </th>
              </tr>
            </thead>
            <tbody>
              {pagedData.map(
                ({
                  id,
                  createdAt,
                  hostName,
                  endAt,
                  boardgameName,
                  startAt,
                  status,
                }) => (
                  <tr
                    key={id}
                    className="group cursor-pointer hover:bg-gray-500/15"
                    onClick={() => router.push(`/admin/reservations/${id}`)}
                  >
                    <td className="border-gray-300 px-4 py-2 text-left text-primary">
                      {id}
                    </td>
                    <td className="border-gray-300 px-4 py-2 text-left text-primary">
                      {hostName}
                    </td>
                    <td className="border-gray-300 px-4 py-2 text-left text-primary">
                      {boardgameName}
                    </td>
                    <td className="border-gray-300 px-4 py-2 text-left text-primary">
                      <Tag
                        variant="solid"
                        color={
                          status === "PENDING APPROVAL"
                            ? "orange"
                            : status === "CANCELLED"
                              ? "red"
                              : status === "CONFIRMED"
                                ? "green"
                                : status === "COMPLETED"
                                  ? "green"
                                  : "geekblue"
                        }
                      >
                        {status}
                      </Tag>
                    </td>
                    <td className="border-gray-300 px-4 py-2 text-left text-primary">
                      {dayjs.tz(startAt).format("DD/MM/YYYY HH:mm")}
                    </td>
                    <td className="border-gray-300 px-4 py-2 text-left text-primary">
                      {dayjs.tz(endAt).format("DD/MM/YYYY HH:mm")}
                    </td>
                    <td className="border-gray-300 px-4 py-2 text-left text-primary">
                      {dayjs.tz(createdAt).format("DD/MM/YYYY HH:mm")}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        ) : (
          <Empty />
        )}

        {/* Pagination */}
        <div className="flex justify-end gap-2 items-center">
          <button
            className="size-8 cursor-pointer rounded-md hover:bg-[#FACC14]"
            onClick={() => setPageNumber((p: number) => (p > 0 ? p - 1 : p))}
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
            onClick={() =>
              setPageNumber((p: number) => (p < totalPages - 1 ? p + 1 : p))
            }
          >
            <ChevronRightIcon />
          </button>
        </div>
      </SectionCard>
    </div>
  );
}
