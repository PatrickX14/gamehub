"use client";
import { ChangeEvent, useState } from "react";
import { BoardgameStockData } from "@/app/lib/api/admin/boardgames";
import { SectionCard } from "./Cards";
import { DateInput, Select, TextInput } from "./Input";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { DeleteButton, EditButton } from "./AdminTableActionButtons";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { Empty, Pagination } from "antd";

dayjs.extend(utc);
dayjs.extend(timezone);

interface GamesTableProps {
  tableTitle: string;
  itemsPerPage: number;
  data: BoardgameStockData[] | null;
}

export function MerchantGamesTable({
  data,
  tableTitle,
  itemsPerPage,
}: GamesTableProps) {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageLimit, setPageLimit] = useState<number>(itemsPerPage || 10);
  const [queries, setQueries] = useState({
    name: "",
    status: "",
    dateFrom: "",
    dateTo: "",
  });

  const filteredData = data
    ? data.filter(
        ({ name, id, quantity, status, createdAt }) =>
          name.toLowerCase().includes(queries.name.toLowerCase()) &&
          (queries.status === "" ||
            status.toLocaleLowerCase() ===
              queries.status.toLocaleLowerCase()) &&
          // (queries.paymentMethod === "" ||
          //   paymentMethod === queries.paymentMethod) &&
          (queries.dateFrom === "" || createdAt >= queries.dateFrom) &&
          (queries.dateTo === "" || createdAt <= queries.dateTo),
      )
    : null;
  const totalPages = filteredData
    ? Math.ceil(filteredData.length / pageLimit)
    : 0;
  const pagedData = filteredData
    ? filteredData.slice(pageNumber * pageLimit, (pageNumber + 1) * pageLimit)
    : [];

  function handleProductIdQuery(event: ChangeEvent<HTMLInputElement>) {
    setQueries((prev) => ({ ...prev, productId: event.target.value }));
    setPageNumber(0);
  }

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

  function handlePaginate(page: number, pageSize: number) {
    setPageNumber(page);
    setPageLimit(pageSize);
  }

  return (
    <div>
      <SectionCard title={tableTitle} description={""}>
        {/* Search */}
        <div className="flex justify-between">
          <div className="flex gap-2 mb-2">
            <TextInput
              name="productName"
              label="Product name"
              onChange={handleUserNameQuery}
            />

            {/* Status filters */}
            <Select
              options={["All Status", "Active", "Inactive"]}
              onChange={handleQueryChange("status")}
              label={"Status"}
            />

            {/* Date range */}
            <DateInput
              onChange={handleQueryChange("dateFrom")}
              label={"From"}
            />
            <DateInput onChange={handleQueryChange("dateTo")} label={"To"} />
          </div>

          {/* add new product */}
          <div className="flex items-center justify-center">
            <Link
              href={"/admin/games/new"}
              className="flex items-center bg-[#FACC14] hover:bg-[#E7B008]/80 px-4 py-2 rounded-md"
            >
              <AddIcon />
              Add new game
            </Link>
          </div>
        </div>

        {/* Table */}
        {data ? (
          <>
            <table className="table-auto w-full">
              <thead className="bg-[#FACC14]">
                <tr>
                  <th className=" border-gray-300 px-4 py-2 text-left text-primary">
                    Game Name
                  </th>
                  <th className="border-x border-gray-300 px-4 py-2 text-left text-primary">
                    Quantity
                  </th>
                  <th className="px-4 py-2 text-left text-primary">Status </th>
                  <th className="border-x border-gray-300 px-4 py-2 text-left text-primary">
                    Date Added
                  </th>
                  <th className="px-4 py-2 text-left text-primary">Action</th>
                </tr>
              </thead>
              <tbody>
                {pagedData.map(({ createdAt, status, name, id, quantity }) => (
                  <tr key={id} className="group">
                    <td className="border-gray-300 px-4 py-2 text-left text-primary">
                      {name}
                    </td>
                    <td className="border-gray-300 px-4 py-2 text-left text-primary">
                      {quantity.toLocaleString()}
                    </td>
                    <td className="border-gray-300 px-4 py-2 text-left text-primary">
                      {status}
                    </td>
                    <td className="border-gray-300 px-4 py-2 text-left text-primary">
                      {dayjs(createdAt).format("DD/MM/YYYY HH:mm")}
                    </td>
                    <td className="border-gray-300 px-4 py-2 text-left text-primary flex justify-center gap-4">
                      <EditButton segment={"/games"} param={id} />
                      <DeleteButton id={id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <Pagination
              total={data.length}
              onChange={handlePaginate}
              defaultPageSize={10}
              align={"end"}
            />
          </>
        ) : (
          <Empty />
        )}

        {/* <div className="flex justify-end gap-2 items-center">
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
        </div> */}
      </SectionCard>
    </div>
  );
}
