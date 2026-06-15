"use client";
import { MerchantOrder } from "@/app/lib/api/merchant/order";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SectionCard } from "./Cards";
import { DateInput, Select, TextInput } from "./Input";
import { Tag } from "antd";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);
dayjs.extend(timezone);

interface OrderTableProps {
  tableTitle: string;
  itemsPerPage?: number;
  data: MerchantOrder[];
}

export function OrdersTable({
  data,
  tableTitle,
  itemsPerPage,
}: OrderTableProps) {
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageLimit, setPageLimit] = useState<number>(itemsPerPage || 20);

  // Queries
  const [nameQuery, setNameQuery] = useState<string>("");
  const [deliveryCompanyQuery, setdeliveryCompanyQuery] = useState<string>("");
  const [trackingQuery, setTrackingQuery] = useState<string>("");
  const [dateQuery, setDateQuery] = useState<string>("");
  const [statusQuery, setStatusQuery] = useState<string>("");

  const filteredData = data.filter((order) => {
    const orderDate = new Date(order.createdAt).toISOString().split("T")[0];

    return (
      order.user.toLowerCase().includes(nameQuery.toLowerCase()) &&
      (order.trackNumber ?? "")
        .toLowerCase()
        .includes(trackingQuery.toLowerCase()) &&
      (order.deliveryCompany ?? "")
        .toLowerCase()
        .includes(deliveryCompanyQuery.toLowerCase()) &&
      (order.status ?? "")
        .toLowerCase()
        .replaceAll("_", " ")
        .includes(statusQuery.toLowerCase()) &&
      (dateQuery === "" || orderDate === dateQuery)
    );
  });

  const totalPages = Math.ceil(filteredData.length / pageLimit);
  const pagedData = filteredData.slice(
    pageNumber * pageLimit,
    (pageNumber + 1) * pageLimit,
  );

  const reducedStatus = data.reduce<string[]>((prevArray, { status }) => {
    if (!prevArray.includes(status)) {
      prevArray.push(status.replaceAll("_", " "));
    }

    return prevArray;
  }, []);

  return (
    <div>
      <SectionCard title={tableTitle} description={""}>
        {/* Search */}
        <div className="flex gap-2 mb-2">
          <TextInput
            name="userName"
            label="User name"
            onChange={(event) => setNameQuery(event.target.value)}
          />

          <TextInput
            name="deliveryCompanyQuery"
            label="Delivery Company"
            onChange={(event) => setdeliveryCompanyQuery(event.target.value)}
          />

          {/* Payment method filters */}

          <TextInput
            name="trackingNumber"
            label="Tracking Number"
            onChange={(event) => setTrackingQuery(event.target.value)}
          />

          <Select
            options={["All Status", ...reducedStatus]}
            onChange={(event) =>
              setStatusQuery(
                event.target.value.toLowerCase().replaceAll("_", " "),
              )
            }
            label={"Status"}
          />

          {/* Date range */}
          <DateInput
            onChange={(event) => setDateQuery(event.target.value)}
            label={"Ordered Date"}
          />
        </div>

        {/* Table */}
        <table className="table-auto w-full">
          <thead className="bg-[#FACC14]">
            <tr>
              <th className="px-4 py-2 text-left">Order Id</th>
              <th className=" border-gray-300 px-4 py-2 text-left text-primary">
                User Name
              </th>
              <th className="border-x border-gray-300 px-4 py-2 text-left text-primary">
                Delivery Company
              </th>
              <th className="px-4 py-2 text-left text-primary">Tracking</th>
              <th className="border-x border-gray-300 px-4 py-2 text-left text-primary">
                Status
              </th>
              <th className="border-x border-gray-300 px-4 py-2 text-left text-primary">
                Order date
              </th>
            </tr>
          </thead>
          <tbody>
            {pagedData.map(
              ({
                id,
                user,
                trackNumber,
                deliveryCompany,
                createdAt,
                status,
              }) => (
                <tr
                  key={id}
                  className="group cursor-pointer hover:bg-gray-500/15"
                  onClick={() => router.push(`/admin/orders/${id}`)}
                >
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    {id}
                  </td>
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    {user}
                  </td>
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    {deliveryCompany ?? "-"}
                  </td>
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    {trackNumber ?? "-"}
                  </td>
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    <Tag
                      variant="solid"
                      color={
                        status === "ORDER_PLACED"
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
                      {status.replaceAll("_", " ")}
                    </Tag>
                  </td>
                  <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    {dayjs(createdAt)
                      .tz("Asia/Bangkok")
                      .format("DD/MM/YYYY HH:mm")}
                  </td>
                  {/* <td className="border-gray-300 px-4 py-2 text-left text-primary">
                    <ViewButton segment={"orders"} param={id} />
                  </td> */}
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
