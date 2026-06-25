"use client";
import { SectionCard } from "./Cards";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  CreateSingleFacility,
  DeleteSingleFacility,
  Facility,
} from "@/app/lib/api/merchant/facility";
import { Input, notification } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";

type MerchantServiceManagementProps = {
  serviceOptions: Facility[];
  accessToken: string;
};

export function MerchantServiceManagement({
  serviceOptions,
  accessToken,
}: MerchantServiceManagementProps) {
  const router = useRouter();
  const [notificationApi, contextHolder] = notification.useNotification();
  const [facilityInput, setFacilityInput] = useState<string>("");
  async function handleAdd() {
    if (facilityInput === "") {
      return;
    }
    const res = await CreateSingleFacility(accessToken, facilityInput);

    if (res.ok) {
      notificationApi.info({
        placement: "topRight",
        title: "Successfully added facility",
        pauseOnHover: true,
        showProgress: true,
      });
      setFacilityInput("");

      router.refresh();
    } else {
      notificationApi.error({
        placement: "topRight",
        title: "Failed to create facility",
        pauseOnHover: true,
        showProgress: true,
      });
    }
  }

  async function handleDelete(facilityId: number) {
    const res = await DeleteSingleFacility(accessToken, facilityId);
    if (res.ok) {
      notificationApi.info({
        placement: "topRight",
        title: "Successfully remove facility",
        pauseOnHover: true,
        showProgress: true,
      });
      router.refresh();
    } else {
      notificationApi.error({
        placement: "topRight",
        title: "Failed to remove facility",
        pauseOnHover: true,
        showProgress: true,
      });
    }
  }

  return (
    <SectionCard title={"Service Management"} description={""}>
      {contextHolder}
      <p>Add New Service</p>
      {/* New service form*/}
      <div className="flex gap-3">
        <Input
          onChange={(event) => setFacilityInput(event.target.value)}
          value={facilityInput}
        />
        <button
          className="w-30 h-9 bg-[#FACC14] rounded-md cursor-pointer"
          onClick={handleAdd}
        >
          <p>
            <AddIcon />
            Add
          </p>
        </button>
      </div>
      {/* Service records */}
      <div className="mt-4 flex flex-col gap-4">
        {serviceOptions.map(({ id, name }) => (
          <ServiceRecord
            key={id}
            serviceName={name}
            onDelete={() => handleDelete(id)}
          />
        ))}
      </div>
    </SectionCard>
  );
}

type ServiceRecordProps = {
  serviceName: string;
  onDelete: (serviceName: string) => void;
};

function ServiceRecord({ serviceName, onDelete }: ServiceRecordProps) {
  return (
    <div className="flex items-center justify-between px-20 border border-black/20 p-2 rounded-md">
      <p>{serviceName}</p>
      {/* Delete button */}
      <div className="my-auto">
        <button
          className="cursor-pointer hover:bg-gray-300 size-10 rounded-md"
          onClick={() => onDelete(serviceName)}
        >
          <DeleteIcon className="text-[#FACC14]" />
        </button>
      </div>
    </div>
  );
}
