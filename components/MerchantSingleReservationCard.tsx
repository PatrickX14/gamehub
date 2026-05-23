"use client";
import {
  getSingleMerchantReservation,
  putMerchantReservationStatus,
  ReservationItem,
  ReservationUpdateStatus,
} from "@/app/lib/api/merchant/reservations";
import { getLocalStorageItem } from "@/app/lib/api/utils";
import { useEffect, useState } from "react";
import { SectionCard } from "./Cards";
import { TextInput } from "./Input";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { Button, Tag } from "antd";
import { useRouter } from "next/navigation";

dayjs.extend(utc);
dayjs.extend(timezone);

type MerchantSingleReservationCardProps = {
  reservationId: number;
};

export function MerchantSingleReservationCard({
  reservationId,
}: MerchantSingleReservationCardProps) {
  const router = useRouter();
  const [reservation, setReservation] = useState<ReservationItem | null>();

  useEffect(() => {
    async function fetchData() {
      const accessToken = await getLocalStorageItem("accessToken");
      if (!accessToken) return;
      const reservation = await getSingleMerchantReservation(
        accessToken,
        reservationId,
      );
      if (!reservation) return;
      setReservation(reservation);
    }
    fetchData();
  }, []);

  async function updateReservationStatus(status: ReservationUpdateStatus) {
    if (!reservation) return;
    const accessToken = await getLocalStorageItem("accessToken");
    if (!accessToken) return;
    const res = putMerchantReservationStatus(
      accessToken,
      reservation?.id,
      status,
    );
    if (!res) return;
    router.refresh();
  }

  return (
    <>
      {reservation ? (
        <SectionCard title={"Reservation Details"} description={""}>
          {/* Status */}
          <p className="text-secondary mb-3">
            Status:{" "}
            <span>
              <Tag
                variant="solid"
                color={
                  reservation?.status === "PENDING APPROVAL"
                    ? "orange-inverse"
                    : reservation?.status === "CANCELLED"
                      ? "red"
                      : reservation?.status === "CONFIRMED"
                        ? "green"
                        : "geekblue"
                }
              >
                {reservation?.status}
              </Tag>
            </span>
          </p>

          {/* Reservation Id */}
          <p className="text-secondary mb-3">
            Reservation Id:{" "}
            <span className="text-primary">{reservation?.id}</span>
          </p>
          <div className="grid grid-cols-2 gap-6 mb-3">
            <TextInput
              name={"hostName"}
              label={"Hosted by"}
              defaultValue={reservation?.hostName}
              disabled
            />
            <TextInput
              name={"boardgameName"}
              label={"Boardgame"}
              defaultValue={reservation?.boardgameName}
              disabled
            />
            <TextInput
              name={"startAt"}
              label={"Start at"}
              defaultValue={dayjs
                .tz(reservation?.startAt as string)
                .format("dddd DD/MMMM/YYYY HH:mm")}
              disabled
            />
            <TextInput
              name={"endAt"}
              label={"End at"}
              defaultValue={dayjs
                .tz(reservation?.endAt as string)
                .format("dddd DD/MMMM/YYYY HH:mm")}
              disabled
            />
          </div>
          {/* Buttons */}
          <div className="flex justify-end gap-3">
            {reservation?.status === "PENDING APPROVAL" ? (
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
      ) : null}
    </>
  );
}
