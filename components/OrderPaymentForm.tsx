"use client";
import { PaymentInfoCard } from "@/components/PaymentInfoCard";
import { Form, notification } from "antd";
import { useState } from "react";
import OrderPaymentSummaryCard from "./OrderPaymentSummaryCard";
import {
  DemoPayOrderRequestBody,
  OrderResponse,
  userPayOrder,
} from "@/app/lib/api/users/order";
import OrderPaymentSuccessModal from "./OrderPaymentSuccessModal";

type ReservationPaymentProps = {
  order: OrderResponse;
  accessToken: string;
};

type MastercardFormValues = {} & DemoPayOrderRequestBody;

export function OrderPaymentForm({
  order,
  accessToken,
}: ReservationPaymentProps) {
  const [form] = Form.useForm<MastercardFormValues>();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [notiApi, contextHolder] = notification.useNotification();

  async function handlePaymentClick(values: MastercardFormValues) {
    const cardPayload: DemoPayOrderRequestBody = {
      ...values,
      expiryDate: new Date(values.expiryDate).toISOString(),
    };
    try {
      await userPayOrder(accessToken, order.id, cardPayload);
      setModalOpen(true);
    } catch (err) {
      notiApi.error({
        title: "Payment fail!",
        description: "make sure everything is correct and try again ",
        pauseOnHover: true,
        showProgress: true,
      });
    }
  }

  return (
    <div>
      {contextHolder}
      <OrderPaymentSuccessModal isOpen={isModalOpen} />
      <Form
        form={form}
        className="grid grid-cols-3 gap-6 px-6"
        layout="vertical"
        onFinish={handlePaymentClick}
        initialValues={{ partyMemberCount: 1 }}
      >
        <div className="col-span-2 flex flex-col gap-6">
          <PaymentInfoCard />
        </div>
        <div>
          <OrderPaymentSummaryCard data={order} />
        </div>
      </Form>
    </div>
  );
}
