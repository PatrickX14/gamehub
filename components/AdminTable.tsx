"use client";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ChangeEvent, useEffect, useState } from "react";
import { DateInput, Select, TextInput } from "./Input";
import { SectionCard } from "./Cards";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { ProductData } from "@/app/lib/api/admin/products";
import {
  DeleteButton,
  EditButton,
  ViewButton,
} from "./AdminTableActionButtons";
import { BoardgameStockData } from "@/app/lib/api/admin/boardgames";
import { Empty, Pagination, Tag } from "antd";
import {
  getMerchantReservations,
  ReservationItem,
} from "@/app/lib/api/merchant/reservations";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { useRouter } from "next/navigation";

dayjs.extend(utc);
dayjs.extend(timezone);

interface ProductTableProps {
  tableTitle: string;
  itemsPerPage: number;
  data: ProductData[];
}

export function ProductsTable({
  data,
  tableTitle,
  itemsPerPage,
}: ProductTableProps) {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageLimit, setPageLimit] = useState<number>(itemsPerPage || 20);
  const [queries, setQueries] = useState({
    productId: "",
    name: "",
    status: "",
    dateFrom: "",
    dateTo: "",
  });

  const filteredData = data?.filter(
    ({ id, name, price, status, createdAt }) =>
      name.toLowerCase().includes(queries.name.toLowerCase()) &&
      id.toString().toLowerCase().includes(queries.productId.toLowerCase()) &&
      (queries.status === "" ||
        status.toLocaleLowerCase() === queries.status.toLocaleLowerCase()) &&
      // (queries.paymentMethod === "" ||
      //   paymentMethod === queries.paymentMethod) &&
      (queries.dateFrom === "" || createdAt >= queries.dateFrom) &&
      (queries.dateTo === "" || createdAt <= queries.dateTo),
  );
  const totalPages = Math.ceil(filteredData?.length / pageLimit);
  const pagedData = filteredData?.slice(
    pageNumber * pageLimit,
    (pageNumber + 1) * pageLimit,
  );

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

  return (
    <div>
      <SectionCard title={tableTitle} description={""}>
        {/* Search */}
        <div className="flex justify-between">
          <div className="flex gap-2 mb-2">
            <TextInput
              name="productId"
              label="Product id"
              onChange={handleProductIdQuery}
            />
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
              href={"/admin/products/new"}
              className="flex items-center bg-[#FACC14] hover:bg-[#E7B008]/80 px-4 py-2 rounded-md "
            >
              <AddIcon />
              Add product
            </Link>
          </div>
        </div>

        {/* Table */}
        <table className="table-auto w-full">
          <thead className="bg-[#FACC14]">
            <tr>
              <th className="border-x border-gray-300 px-4 py-2 text-left text-primary">
                Product Id
              </th>
              <th className=" border-gray-300 px-4 py-2 text-left text-primary">
                Product Name
              </th>
              <th className="border-x border-gray-300 px-4 py-2 text-left text-primary">
                Price
              </th>
              <th className="px-4 py-2 text-left text-primary">Status </th>
              <th className="border-x border-gray-300 px-4 py-2 text-left text-primary">
                Date
              </th>
              <th className="px-4 py-2 text-left text-primary">Action</th>
            </tr>
          </thead>
          <tbody>
            {pagedData &&
              pagedData.map(({ id, createdAt, status, name, price }) => (
                <tr key={id} className="group">
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    {id}
                  </td>
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    {name}
                  </td>
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    ฿{Number(price).toLocaleString()}
                  </td>
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    {status}
                  </td>
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    {new Date(createdAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    })}
                  </td>
                  <td className="border-gray-300  py-2 text-left text-primary">
                    <div className="flex justify-center gap-2">
                      <ViewButton segment={"products"} param={id} />
                      <EditButton segment={"products/edit"} param={id} />
                      <DeleteButton id={id} />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
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

interface GamesTableProps {
  tableTitle: string;
  itemsPerPage: number;
  data: BoardgameStockData[] | null;
}

export function GamesTable({
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
              name="productId"
              label="Product id"
              onChange={handleProductIdQuery}
            />
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

interface ReservationData {
  id: number;
  customerName: string;
  game: string;
  startAt: string;
  endAt: string;
  status: string;
  bookedAt: string;
}

interface RevervationTableProps {
  tableTitle: string;
  itemsPerPage: number;
  accessToken: string;
}

export function RevervationTable({
  itemsPerPage,
  tableTitle,
  accessToken,
}: RevervationTableProps) {
  const router = useRouter();
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
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

  const filteredData = reservations.filter(
    ({ id, boardgameName, hostName, status, createdAt, endAt, startAt }) =>
      boardgameName
        .toLocaleLowerCase()
        .includes(queries.game.toLocaleLowerCase()) &&
      hostName.toLowerCase().includes(queries.name.toLowerCase()) &&
      (queries.status === "" ||
        (id.toString() === queries.id &&
          status.toLocaleLowerCase() === queries.status.toLocaleLowerCase())) &&
      // bookedAt === queries.bookedAt &&
      (queries.startAt === "" || startAt >= queries.startAt) &&
      (queries.endAt === "" || endAt <= queries.endAt),
  );
  const totalPages = Math.ceil(filteredData.length / pageLimit);
  const pagedData = filteredData.slice(
    pageNumber * pageLimit,
    (pageNumber + 1) * pageLimit,
  );

  function handleProductIdQuery(event: ChangeEvent<HTMLInputElement>) {
    setQueries((prev) => ({ ...prev, productId: event.target.value }));
    setPageNumber(0);
  }

  function handleUserNameQuery(event: ChangeEvent<HTMLInputElement>) {
    setQueries((prev) => ({ ...prev, name: event.target.value }));
    setPageNumber(0);
  }

  function handleQueryChange(key: keyof typeof queries) {
    console.log(queries);
    return (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setQueries((prev) => ({ ...prev, [key]: event.target.value }));
      setPageNumber(0);
    };
  }

  useEffect(() => {
    async function fetchDatas() {
      const reservationData = await getMerchantReservations(accessToken);
      if (!reservationData) return;
      setReservations(reservationData);
      console.log(reservationData);
    }
    fetchDatas();
  }, []);

  return (
    <div>
      <SectionCard title={tableTitle} description={""}>
        {/* Search */}
        <div className="flex justify-between">
          <div className="flex gap-2 mb-2">
            <TextInput
              name="productId"
              label="Product id"
              onChange={handleProductIdQuery}
            />
            <TextInput
              name="productName"
              label="Product name"
              onChange={handleUserNameQuery}
            />

            {/* Status filters */}
            <Select
              options={[
                "All Status",
                "PENDING APPROVAL",
                "CANCELLED",
                "AWAITING PAYMENT",
              ]}
              onChange={handleQueryChange("status")}
              label={"Status"}
            />

            {/* Date range */}
            {/* <DateInput
              onChange={handleQueryChange("dateFrom")}
              label={"From"}
            />
            <DateInput onChange={handleQueryChange("dateTo")} label={"To"} /> */}
          </div>
        </div>

        {/* Table */}
        {reservations.length > 0 ? (
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
                            ? "orange-inverse"
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
