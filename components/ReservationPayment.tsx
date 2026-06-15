"use client";
import dayjs, { Dayjs } from "dayjs";
import { PaymentInfoCard } from "@/components/PaymentInfoCard";
import { PaymentPartyCreationCard } from "@/components/PaymentPartyCreationCard";
import {
  payReservation,
  ReservationResponse,
} from "@/app/lib/api/users/reservation";
import ReservationPaymentSummaryCard from "@/components/PaymentSummaryCard";
import { Form } from "antd";
import ReservationPaymentSuccessModal from "./ReservationPaymentSuccessModal";
import { useState } from "react";
import ReservationPaymentErrorModal from "./ReservationPaymentErrorModal";

type ReservationPaymentProps = {
  accessToken: string;
  reservation: ReservationResponse;
};

type MastercardFormValues = {
  paymentMethod: string;
  cardNumber: string;
  cvv: string;
  expiryDate: Dayjs;
  cardHolderName: string;
  partyDescription: string | undefined;
  partyMemberCount: number | undefined;
};

export function ReservationPaymentForm({
  reservation,
  accessToken,
}: ReservationPaymentProps) {
  const [form] = Form.useForm<MastercardFormValues>();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isErrorModalOpen, setErrorModalOpen] = useState<boolean>(false);

  const duration = dayjs(reservation.endAt).diff(
    dayjs(reservation.startAt),
    "minute",
  );
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  const formattedDuration = `${hours}h ${minutes}m`;

  async function handleFormSubbmit(values: MastercardFormValues) {
    const createParty =
      values.partyMemberCount && values.partyMemberCount > 0 ? true : undefined;

    try {
      const payment = await payReservation(accessToken, reservation.id, {
        paymentMethod: values.paymentMethod,
        cardNumber: values.cardNumber,
        cvv: values.cvv,
        cardHolderName: values.cardHolderName,
        expiryDate: dayjs(values.expiryDate).toISOString(),
        createParty: createParty,
        partyDescription: values.partyDescription,
        partyMemberCount: values.partyMemberCount,
      });

      if (payment) {
        setModalOpen(true);
      } else {
        setErrorModalOpen(true);
      }
    } catch (err) {
      setErrorModalOpen(true);
    }
  }

  return (
    <div className="px-30">
      <ReservationPaymentErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setErrorModalOpen(false)}
      />
      <ReservationPaymentSuccessModal isOpen={isModalOpen} />
      <Form
        form={form}
        className="grid grid-cols-3 gap-6 px-6"
        layout="vertical"
        onFinish={handleFormSubbmit}
        initialValues={{ partyMemberCount: 1 }}
      >
        <div className="col-span-2 flex flex-col gap-6">
          <PaymentInfoCard />
          <PaymentPartyCreationCard />
        </div>
        <div>
          <ReservationPaymentSummaryCard
            merchantImageUrl={"/images/demoimages/morethanagamecafe.png"}
            boardganemName={reservation.boardgameName}
            merchantName={reservation.merchantName}
            reservedTime={"17:30 - 18:30"}
            tableSize={reservation.tableSize}
            duration={formattedDuration}
            pricePerHour={reservation.pricePerHour}
            totalPrice={reservation.totalPrice}
          />
        </div>
      </Form>
    </div>
  );
}
