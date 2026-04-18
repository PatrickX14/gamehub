"use client";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ChangeEvent, useState } from "react";
import { DateInput, Select, TextInput } from "./Input";
import { SectionCard } from "./Cards";

export function AdminTable() {
  return <div>AdminTable</div>;
}

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
  const [pageLimit, setPageLimit] = useState<number>(itemsPerPage ?? 20);
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
        <div className="flex justify-between mb-2">
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
                Date
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
