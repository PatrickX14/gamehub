"use client";
import { GetProp, Select, SelectProps } from "antd";
import { SectionCard } from "./Cards";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

type GameOptions = GetProp<SelectProps, "options">;

type MerchantServiceManagementProps = {
  serviceOptions: GameOptions;
};

export function MerchantServiceManagement({
  serviceOptions,
}: MerchantServiceManagementProps) {
  const [selectedService, setSelectedService] = useState<string>("");
  const [serviceList, setServiceList] = useState<string[]>([]);

  function handleSelect(id: number) {
    const serviceData = serviceOptions.find(({ value }) => value === id);
    if (!serviceData) return;
    setSelectedService(serviceData.label as string);
  }

  function handleAdd() {
    if (selectedService === "") return;
    if (serviceList.includes(selectedService)) return;
    setServiceList((prev) => [...prev, selectedService]);
  }

  function handleDelete(serviceName: string) {
    const deletedList = serviceList.filter((service) => service != serviceName);
    setServiceList(deletedList);
  }

  return (
    <SectionCard title={"Service Management"} description={""}>
      <p>Add New Service</p>
      {/* New service form*/}
      <div className="flex gap-3">
        <Select
          className="flex-1"
          options={serviceOptions}
          showSearch={{ optionFilterProp: "label" }}
          allowClear
          onSelect={handleSelect}
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
        {serviceList.map((service, index) => (
          <ServiceRecord
            key={index}
            serviceName={service}
            onDelete={handleDelete}
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
