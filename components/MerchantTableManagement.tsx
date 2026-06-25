"use client";
import { SectionCard } from "./Cards";
import { TextInput } from "./Input";
import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { getLocalStorageItem } from "@/app/lib/api/utils";
import { createTable, deleteTable, Table } from "@/app/lib/api/merchant/tables";
import { notification } from "antd";
import { useRouter } from "next/navigation";

type MerchantTableProps = {
  tableData: Table[];
};

export function MerchantTableManagement({ tableData }: MerchantTableProps) {
  const router = useRouter();
  const [seats, setSeats] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [api, contextHolder] = notification.useNotification();
  async function fetchCreateTable() {
    try {
      if (seats === 0 || price === 0) return;
      const accessToken = await getLocalStorageItem("accessToken");
      if (!accessToken) throw Error("Access token is missing");
      console.log({ seats, pricePerHour: price });
      const res = await createTable(accessToken, {
        seats,
        pricePerHour: price,
      });
      if (res.ok) {
        api.info({
          title: "Success",
          description: `Successfully add seat`,
          showProgress: true,
          pauseOnHover: true,
        });
        router.refresh();
        return;
      } else {
        api.error({
          title: "Error",
          description: `Something went wrong`,
          showProgress: true,
          pauseOnHover: true,
        });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SectionCard title={"Table management"} description={""}>
      {contextHolder}
      {/* New table form */}
      <p>Add New Table</p>
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          name={""}
          label={"Seats"}
          number
          onChange={(event) => setSeats(+event.currentTarget.value)}
        />
        <TextInput
          name={""}
          label={"Price per hour (baht)"}
          number
          onChange={(event) => setPrice(+event.currentTarget.value)}
        />
        <div className="col-span-full flex justify-center">
          <button
            className="w-60 h-9 bg-[#FACC14] rounded-md cursor-pointer"
            onClick={fetchCreateTable}
          >
            <AddIcon />
            New table
          </button>
        </div>
      </div>
      {/* Table records */}
      <div className="mt-4 flex flex-col gap-4">
        {tableData.map(({ seats, pricePerHour, id }) => (
          <TableRecord
            players={seats}
            price={+pricePerHour}
            key={id}
            onTableDeleted={() => router.refresh()}
            id={id}
            api={api}
          />
        ))}
      </div>
    </SectionCard>
  );
}

type TableReocrd = {
  players: number;
  price: number;
  id: number;
  onTableDeleted: () => void;
  api: ReturnType<typeof notification.useNotification>[0]; // 👈 add this
};

function TableRecord({ players, price, id, onTableDeleted, api }: TableReocrd) {
  async function handleDelete(id: number) {
    try {
      const accessToken = await getLocalStorageItem("accessToken");
      if (!accessToken) throw Error("Access token is missing");
      const res = await deleteTable(accessToken, id);
      if (res.ok) {
        api.info({
          title: "Success",
          description: `Successfully delete table`,
          showProgress: true,
          pauseOnHover: true,
        });
        onTableDeleted();
        return;
      } else {
        api.error({
          title: "Error",
          description: `Something went wrong`,
          showProgress: true,
          pauseOnHover: true,
        });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex justify-around border border-black/20 p-2 rounded-md">
      <div>
        <p className="text-secondary text-center">Players</p>
        <p className="text-center text-lg">
          <PeopleIcon />
          {players}
        </p>
      </div>
      {/* <div>
        <p className="text-secondary text-center">Quantity</p>
        <p className="text-center text-lg">{quantity}</p>
      </div> */}
      <div>
        <p className="text-secondary text-center">Price/Hour</p>
        <p className="text-center text-lg">฿{price}</p>
      </div>
      <div className="my-auto">
        <button
          className="cursor-pointer hover:bg-gray-300 size-10 rounded-md"
          onClick={() => handleDelete(id)}
        >
          <DeleteIcon className="text-[#FACC14]" />
        </button>
      </div>
    </div>
  );
}
