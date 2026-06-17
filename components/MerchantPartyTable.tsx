"use client";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ChangeEvent, useState } from "react";
import { DateInput, Select, TextInput } from "./Input";
import { SectionCard } from "./Cards";
import { Party } from "@/app/lib/api/merchant/party";
// import Link from "next/link";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { Tag } from "antd";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageLimit] = useState<number>(itemsPerPage || 20);
  const [queries, setQueries] = useState({
    id: "",
    name: "",
    status: "",
    startAt: "",
    endAt: "",
    game: "",
    bookedAt: "",
  });

  function handleQueryChange(key: keyof typeof queries) {
    return (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setQueries((prev) => ({ ...prev, [key]: event.target.value }));
      setPageNumber(0);
    };
  }

  const filteredData = data.filter(
    ({ hostName, id, boardgameName, status, startAt, createdAt }) =>
      boardgameName
        .toLocaleLowerCase()
        .includes(queries.game.toLocaleLowerCase()) &&
      hostName.toLowerCase().includes(queries.name.toLowerCase()) &&
      (queries.id === "" || id.toString().includes(queries.id)) &&
      (queries.status === "" ||
        status.toLocaleLowerCase() === queries.status.toLocaleLowerCase()) &&
      (queries.startAt === "" || startAt.includes(queries.startAt)) &&
      (queries.bookedAt === "" || createdAt.includes(queries.bookedAt)),
  );

  const totalPages = Math.ceil(filteredData.length / pageLimit);
  const pagedData = filteredData.slice(
    pageNumber * pageLimit,
    (pageNumber + 1) * pageLimit,
  );

  const statusFilter = data.reduce<string[]>((prevArray, { status }) => {
    if (!prevArray.includes(status)) {
      prevArray.push(status);
    }
    return prevArray;
  }, []);

  const gameFilter = data.reduce<string[]>((prevData, { boardgameName }) => {
    if (!prevData.includes(boardgameName)) {
      prevData.push(boardgameName);
    }
    return prevData;
  }, []);

  return (
    <SectionCard title={tableTitle} description={""}>
      {/* Search */}
      <div className="flex justify-between">
        <div className="flex gap-2 mb-2">
          <TextInput
            name="name"
            label="Host name"
            onChange={handleQueryChange("name")}
          />
          {/* Status filter */}
          <Select
            options={["All Status", ...statusFilter]}
            onChange={handleQueryChange("status")}
            label={"Status"}
          />

          <Select
            options={["All games", ...gameFilter]}
            onChange={handleQueryChange("game")}
            label={"Games"}
          />
          {/* 
          <DateInput
            onChange={handleQueryChange("startAt")}
            label={"Start at"}
          /> */}
          <DateInput
            onChange={handleQueryChange("bookedAt")}
            label={"Booked at"}
          />
        </div>
      </div>

      {/* Table */}
      <table className="table-auto w-full">
        <thead className="bg-[#FACC14]">
          <tr>
            <th className="px-4 py-2 text-left text-primary">Id</th>
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
              Booked At
            </th>
          </tr>
        </thead>
        <tbody>
          {pagedData.map(
            ({ id, hostName, boardgameName, status, createdAt }) => (
              <tr
                key={id}
                className="group cursor-pointer hover:bg-gray-500/15"
                onClick={() => router.push(`/admin/parties/${id}`)}
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
                      status === "OPEN"
                        ? "green"
                        : status === "CLOSED"
                          ? "red"
                          : "gold"
                    }
                  >
                    {status}
                  </Tag>
                </td>
                <td className="border-gray-300 px-4 py-2 text-left text-primary">
                  {dayjs.tz(createdAt).format("DD/MM/YYYY HH:mm")}
                </td>
                {/* Action buttons */}
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
