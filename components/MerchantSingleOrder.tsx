"use client";
import {
  OrderResponse,
  updateMerchantDeliveryInfo,
  updateMerchantOrderStatus,
} from "@/app/lib/api/merchant/order";
import { SectionCard } from "./Cards";
import { CartItemCard } from "./CartCard";
import { Button, notification, Tag } from "antd";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { AddressCard } from "./UserAddressInfo";
import { TextInput } from "./Input";
import { useState } from "react";
import { useRouter } from "next/navigation";

dayjs.extend(utc);
dayjs.extend(timezone);

type MerchantSingleOrderProps = {
  data: OrderResponse;
  accessToken: string;
};

export function MerchantSingleOrder({
  data,
  accessToken,
}: MerchantSingleOrderProps) {
  const router = useRouter();
  const [notiApi, contextHolder] = notification.useNotification();
  const [develieryCompany, setDeliveryCompany] = useState<string>();
  const [trackingNumber, settrackingNumber] = useState<string>();

  async function handleApprove() {
    const updatedOrder = await updateMerchantOrderStatus(
      accessToken,
      data.id,
      "approve",
    );
    if (updatedOrder) {
      notiApi.success({
        title: `Success`,
        description: "Successfully approved this order",
        placement: "topRight",
      });
      router.refresh();
    }
  }

  async function handleReject() {
    const updatedOrder = await updateMerchantOrderStatus(
      accessToken,
      data.id,
      "reject",
    );
    if (updatedOrder) {
      notiApi.success({
        title: `Success`,
        description: "Successfully rejected this order",
        placement: "topRight",
      });
      router.refresh();
    }
  }

  async function handleDeliverToCourrier() {
    const updatedOrder = await updateMerchantDeliveryInfo(
      accessToken,
      data.id,
      develieryCompany as string,
      trackingNumber as string,
    );
    if (updatedOrder) {
      notiApi.success({
        title: `Success`,
        description: "Successfully update status to delivered to courier",
        placement: "topRight",
      });
      router.refresh();
    }
  }

  return (
    <SectionCard title={`Order ${data.id} summary`} description={""}>
      {contextHolder}
      <p className="text-secondary mb-3">
        Status:{" "}
        <span className="text-primary">
          <Tag
            variant="solid"
            color={
              data.status === "ORDER_PLACED"
                ? "orange-inverse"
                : data.status === "CANCELLED"
                  ? "red"
                  : data.status === "CONFIRMED"
                    ? "green"
                    : data.status === "COMPLETED"
                      ? "green"
                      : "geekblue"
            }
          >
            {data.status.replaceAll("_", " ")}
          </Tag>
        </span>
      </p>

      <p className="text-secondary mb-3">
        Delivery Company:{" "}
        <span className="text-primary">{data.deliveryCompany ?? "-"}</span>
      </p>
      <p className="text-secondary mb-3">
        Tracking:{" "}
        <span className="text-primary">{data.trackingNumber ?? "-"}</span>
      </p>
      <p className="text-secondary mb-3">
        Ordered by:{" "}
        <span className="text-primary">
          {data.user.name} {data.user.lastName}
        </span>
      </p>
      <p className="text-secondary mb-3">
        Ordered at:{" "}
        <span className="text-primary">
          {dayjs.tz(data.createdAt).format("DD/MM/YYYY HH:mm")}
        </span>
      </p>

      {/* Address details  */}
      <div className="my-6">
        <p className="text-secondary">Address details:</p>
        <div className="mt-px flex flex-col gap-4">
          <AddressCard
            id={data.user.rawAddress.id}
            addressLabel={data.user.rawAddress.name}
            name={data.user.rawAddress.receiverName}
            phoneNumber={data.user.rawAddress.phoneNumber}
            address={data.user.address.address}
            secondLineAddress={""}
            hideEdit
            hideLabel
          />
        </div>
      </div>

      {/* Ordered products  */}
      <div>
        <p className="text-secondary">Ordered Products:</p>
        <div className="mt-px flex flex-col gap-4">
          {data.items.map(
            ({ productId, price, productName, quantity, subTotal }) => (
              <CartItemCard
                key={productId}
                productId={productId}
                quantity={quantity}
                productName={productName}
                price={+price}
                totalPrice={+subTotal}
                onSelected={function (
                  isChecked: boolean,
                  productId: number,
                ): void {
                  throw new Error("Function not implemented.");
                }}
                hideEdit
              />
            ),
          )}
        </div>
      </div>

      {/* Delivery Company and tracking number */}
      {data.status === "CONFIRMED" ? (
        <div className="grid grid-cols-2 gap-6 mt-3">
          <TextInput
            name={""}
            label={"Delivery company"}
            onChange={(event) => setDeliveryCompany(event.target.value)}
          />
          <TextInput
            name={""}
            label={"Tracking numbers"}
            onChange={(event) => settrackingNumber(event.target.value)}
          />
        </div>
      ) : null}

      <div className="flex justify-end py-3">
        {data.status === "ORDER_PLACED" ? (
          <div className="flex gap-2">
            <Button color={"red"} variant="solid" onClick={handleReject}>
              Reject
            </Button>
            <Button color={"green"} variant="solid" onClick={handleApprove}>
              Aprrove
            </Button>
          </div>
        ) : data.status === "CONFIRMED" ? (
          <div className="flex gap-2">
            <Button
              color={"primary"}
              variant="solid"
              onClick={handleDeliverToCourrier}
            >
              Delivered to courrier
            </Button>
          </div>
        ) : null}
      </div>
    </SectionCard>
  );
}
