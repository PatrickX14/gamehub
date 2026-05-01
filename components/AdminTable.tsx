"use client";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ChangeEvent, useState } from "react";
import { DateInput, Select, TextInput } from "./Input";
import { SectionCard } from "./Cards";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { ProductData } from "@/app/lib/api/admin/products";

interface OrderData {
  orderId: string;
  productId: string;
  userName: string;
  date: string;
  paymentMethod: string;
  payment: number;
  status: string;
}

interface OrderTableProps {
  tableTitle: string;
  itemsPerPage?: number;
  data: OrderData[];
}

export function OrdersTable({
  data,
  tableTitle,
  itemsPerPage,
}: OrderTableProps) {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageLimit, setPageLimit] = useState<number>(itemsPerPage || 20);
  const [queries, setQueries] = useState({
    orderId: "",
    productId: "",
    userName: "",
    status: "",
    paymentMethod: "",
    dateFrom: "",
    dateTo: "",
  });

  const filteredData = data.filter(
    ({ orderId, productId, userName, status, paymentMethod, date }) =>
      orderId.toLowerCase().includes(queries.orderId.toLowerCase()) &&
      productId.toLowerCase().includes(queries.productId.toLowerCase()) &&
      userName.toLowerCase().includes(queries.userName.toLowerCase()) &&
      (queries.status === "" || status === queries.status) &&
      (queries.paymentMethod === "" ||
        paymentMethod === queries.paymentMethod) &&
      (queries.dateFrom === "" || date >= queries.dateFrom) &&
      (queries.dateTo === "" || date <= queries.dateTo),
  );
  const totalPages = Math.ceil(filteredData.length / pageLimit);
  const pagedData = filteredData.slice(
    pageNumber * pageLimit,
    (pageNumber + 1) * pageLimit,
  );

  function handleOrderIdQuery(event: ChangeEvent<HTMLInputElement>) {
    setQueries((prev) => ({ ...prev, orderId: event.target.value }));
    setPageNumber(0);
  }

  function handleProductIdQuery(event: ChangeEvent<HTMLInputElement>) {
    setQueries((prev) => ({ ...prev, productId: event.target.value }));
    setPageNumber(0);
  }

  function handleUserNameQuery(event: ChangeEvent<HTMLInputElement>) {
    setQueries((prev) => ({ ...prev, userName: event.target.value }));
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
        <div className="flex gap-2 mb-2">
          <TextInput
            name="orderId"
            label="Order id"
            onChange={handleOrderIdQuery}
          />
          <TextInput
            name="productId"
            label="Product id"
            onChange={handleProductIdQuery}
          />
          <TextInput
            name="userName"
            label="User name"
            onChange={handleUserNameQuery}
          />

          {/* Status filters */}
          <Select
            options={[
              "All Status",
              "Pending",
              "Processing",
              "Shipped",
              "Delivered",
              "Cancelled",
              "Refunded",
            ]}
            onChange={handleQueryChange("status")}
            label={"Status"}
          />

          {/* Payment method filters */}
          <Select
            options={[
              "All Payment",
              "AirPay",
              "TrueMoney Wallet",
              "Rabbit LINE Pay",
              "KBank Mobile Banking",
              "SCB Easy",
              "PromptPay",
              "WeChat Pay Thai",
            ]}
            onChange={handleQueryChange("paymentMethod")}
            label={"Payment Method"}
          />

          {/* Date range */}
          <DateInput onChange={handleQueryChange("dateFrom")} label={"From"} />
          <DateInput onChange={handleQueryChange("dateTo")} label={"To"} />
        </div>

        {/* Table */}
        <table className="table-auto w-full">
          <thead className="bg-[#FACC14]">
            <tr>
              <th className="px-4 py-2 text-left">Order Id</th>
              <th className="border-x border-gray-300 px-4 py-2 text-left text-primary">
                Product Id
              </th>
              <th className=" border-gray-300 px-4 py-2 text-left text-primary">
                User Name
              </th>
              <th className="border-x border-gray-300 px-4 py-2 text-left text-primary">
                Status
              </th>
              <th className="px-4 py-2 text-left text-primary">
                Payment Method
              </th>
              <th className="border-x border-gray-300 px-4 py-2 text-left text-primary">
                Date 1200{" "}
              </th>
              <th className="px-4 py-2 text-left text-primary">Action</th>
            </tr>
          </thead>
          <tbody>
            {pagedData.map(
              ({
                orderId,
                productId,
                date,
                payment,
                paymentMethod,
                status,
                userName,
              }) => (
                <tr key={orderId} className="group">
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    {orderId}
                  </td>
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    {productId}
                  </td>
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    {userName}
                  </td>
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    {status}
                  </td>
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    {paymentMethod}
                  </td>
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    {date}
                  </td>
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    <button className="text-blue-600 hover:underline">
                      View
                    </button>
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
            {pagedData.map(({ id, createdAt, status, name, price }) => (
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
                <td className="border-gray-300 px-4 py-2 text-left text-primary">
                  <Link
                    className="text-blue-600 hover:underline"
                    href={`/admin/products/${id}`}
                  >
                    View
                  </Link>
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

interface GamesData {
  id: number;
  name: string;
  date: string;
  quantity: number;
  status: string;
}

interface GamesTableProps {
  tableTitle: string;
  itemsPerPage: number;
  data: GamesData[];
}

export function GamesTable({
  data,
  tableTitle,
  itemsPerPage,
}: GamesTableProps) {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageLimit, setPageLimit] = useState<number>(itemsPerPage || 20);
  const [queries, setQueries] = useState({
    name: "",
    status: "",
    dateFrom: "",
    dateTo: "",
  });

  const filteredData = data.filter(
    ({ name, id, quantity, status, date }) =>
      name.toLowerCase().includes(queries.name.toLowerCase()) &&
      (queries.status === "" ||
        status.toLocaleLowerCase() === queries.status.toLocaleLowerCase()) &&
      // (queries.paymentMethod === "" ||
      //   paymentMethod === queries.paymentMethod) &&
      (queries.dateFrom === "" || date >= queries.dateFrom) &&
      (queries.dateTo === "" || date <= queries.dateTo),
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
              href={"/profile/newaddress"}
              className="flex items-center bg-[#FACC14] hover:bg-[#E7B008]/80 px-4 py-2 rounded-md "
            >
              <AddIcon />
              Add new game
            </Link>
          </div>
        </div>

        {/* Table */}
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
            {pagedData.map(({ date, status, name, id, quantity }) => (
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
                  {date}
                </td>
                <td className="border-gray-300 px-4 py-2 text-left text-primary">
                  <button className="text-blue-600 hover:underline">
                    View
                  </button>
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
  data: ReservationData[];
}

export function RevervationTable({
  data,
  itemsPerPage,
  tableTitle,
}: RevervationTableProps) {
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

  const filteredData = data.filter(
    ({ customerName, id, game, status, bookedAt, endAt, startAt }) =>
      game.toLocaleLowerCase().includes(queries.game.toLocaleLowerCase()) &&
      customerName.toLowerCase().includes(queries.name.toLowerCase()) &&
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
            {/* <DateInput
              onChange={handleQueryChange("dateFrom")}
              label={"From"}
            />
            <DateInput onChange={handleQueryChange("dateTo")} label={"To"} /> */}
          </div>

          {/* add new product */}
          <div className="flex items-center justify-center">
            <Link
              href={"/profile/newaddress"}
              className="flex items-center bg-[#FACC14] hover:bg-[#E7B008]/80 px-4 py-2 rounded-md "
            >
              <AddIcon />
              Add new game
            </Link>
          </div>
        </div>

        {/* Table */}
        <table className="table-auto w-full">
          <thead className="bg-[#FACC14]">
            <tr>
              <th className="px-4 py-2 text-left text-primary">Id</th>
              <th className="border-x border-gray-300 px-4 py-2 text-left text-primary">
                Customer
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
              <th className="px-4 py-2 text-left text-primary">Action</th>
            </tr>
          </thead>
          <tbody>
            {pagedData.map(
              ({
                id,
                bookedAt,
                customerName,
                endAt,
                game,
                startAt,
                status,
              }) => (
                <tr key={id} className="group">
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    {id}
                  </td>
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    {customerName}
                  </td>
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    {game}
                  </td>
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    {status}
                  </td>
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    {new Date(startAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    })}
                  </td>
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    {new Date(endAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    })}
                  </td>
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    {new Date(bookedAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    })}
                  </td>
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    <button className="text-blue-600 hover:underline">
                      View
                    </button>
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
