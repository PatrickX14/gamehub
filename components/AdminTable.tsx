"use client";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import { TextInput } from "./Input";
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
  const [pageLimit, setPageLitmit] = useState<number>(itemsPerPage ?? 20);

  const totalPages: number = Math.ceil(data.length / pageLimit);
  const tableData: OrderData[] = data.slice(
    pageNumber * pageLimit,
    (pageNumber + 1) * pageLimit,
  );

  return (
    <div>
      <SectionCard title={"Orders"} description={""}>
        {/* Search */}
        <div className="flex gap-2 mb-2">
          <TextInput
            name={tableTitle}
            label={"Order id"}
            // onChange={}
          />
          <TextInput name={"productId"} label={"Product id"} />
          <TextInput name={"userName"} label={"User name"} />
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
            {tableData.map(
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
