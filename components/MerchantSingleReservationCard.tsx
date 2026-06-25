"use client";
import {
  putMerchantReservationStatus,
  ReservationItem,
  ReservationUpdateStatus,
} from "@/app/lib/api/merchant/reservations";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { useRouter } from "next/navigation";
import { SectionCard } from "./Cards";
import { TextInput } from "./Input";
import { Button, notification, Tag } from "antd";

dayjs.extend(utc);
dayjs.extend(timezone);

type MerchantSingleReservationCardProps = {
  accessToken: string;
  data: ReservationItem;
};

export function MerchantSingleReservationCard({
  accessToken,
  data,
}: MerchantSingleReservationCardProps) {
  const router = useRouter();
  const [notiApi, contextHolder] = notification.useNotification();

  async function updateReservationStatus(status: ReservationUpdateStatus) {
    const res = putMerchantReservationStatus(accessToken, data?.id, status);
    if (!res) return;
    notiApi.success({
      title: `Success`,
      description: "Successfully accept this reservation",
      placement: "topRight",
    });
    router.refresh();
  }

  return (
    <SectionCard title={"Reservation Details"} description={""}>
      {/* Status */}
      {contextHolder}
      <p className="text-secondary mb-3">
        Status:{" "}
        <span>
          <Tag
            variant="solid"
            color={
              data?.status === "PENDING APPROVAL"
                ? "orange"
                : data?.status === "CANCELLED"
                  ? "red"
                  : data?.status === "CONFIRMED"
                    ? "green"
                    : "geekblue"
            }
          >
            {data?.status}
          </Tag>
        </span>
      </p>

      {/* Reservation Id */}
      <p className="text-secondary mb-3">
        Reservation Id: <span className="text-primary">{data?.id}</span>
      </p>
      <div className="grid grid-cols-2 gap-6 mb-3">
        <TextInput
          name={"hostName"}
          label={"Booked by"}
          defaultValue={data?.hostName}
          disabled
        />
        <TextInput
          name={"boardgameName"}
          label={"Boardgame"}
          defaultValue={data?.boardgameName}
          disabled
        />
        <TextInput
          name={"startAt"}
          label={"Start at"}
          defaultValue={dayjs
            .tz(data?.startAt as string)
            .format("dddd DD/MMMM/YYYY HH:mm")}
          disabled
        />
        <TextInput
          name={"endAt"}
          label={"End at"}
          defaultValue={dayjs
            .tz(data?.endAt as string)
            .format("dddd DD/MMMM/YYYY HH:mm")}
          disabled
        />
      </div>
      {/* Buttons */}
      <div className="flex justify-end gap-3">
        {data?.status === "PENDING APPROVAL" ? (
          <>
            <Button
              className="rounded-md"
              color={"danger"}
              variant="solid"
              onClick={() => updateReservationStatus("CANCELLED")}
            >
              Reject
            </Button>
            <Button
              className="rounded-md"
              color={"green"}
              variant="solid"
              onClick={() => updateReservationStatus("CONFIRMED")}
            >
              Approve
            </Button>
          </>
        ) : null}
      </div>
    </SectionCard>
  );
}
