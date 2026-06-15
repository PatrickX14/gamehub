"use client";
import { OrderResponse } from "@/app/lib/api/merchant/order";
import { SectionCard } from "./Cards";
import { AddressCard } from "./UserAddressInfo";
import { CartItemCard } from "./CartCard";
import { Button, notification, Tag } from "antd";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { OrderItem, userConfirmDelivery } from "@/app/lib/api/users/order";
import Image from "next/image";
import { useRouter } from "next/navigation";

dayjs.extend(utc);
dayjs.extend(timezone);

type UserOrderProps = {
  data: OrderItem[];
  accessToken: string;
};

export function PurchaseInfo({ data, accessToken }: UserOrderProps) {
  const [notiApi, contextHolder] = notification.useNotification();
  const router = useRouter();

  async function handleUserRecivedProducts(orderId: number) {
    const res = await userConfirmDelivery(accessToken, orderId);
    if (res.ok) {
      notiApi.success({
        title: "Thank you!",
        description: `you have recvied order ${orderId}`,
      });
      router.refresh();
    } else {
      notiApi.error({
        title: "Something went wrong",
        description: `please try again later`,
      });
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {contextHolder}
      {data.map((order) => (
        <SectionCard
          title={`Order ${order.id} summary`}
          description={""}
          key={order.id}
          hideHeader
        >
          <div className="flex items-center gap-4 mb-4">
            <Image
              src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${order.merchant.merchantName}`}
              alt={"merchant profile image"}
              width={40}
              height={40}
              unoptimized
              className="rounded-full shadow-3xl"
            />
            <h2 className="text-xl font-semibold">
              {order.merchant.merchantName}
            </h2>
          </div>
          <p className="text-secondary mb-3">
            Status:{" "}
            <span className="text-primary">
              {
                <Tag
                  variant="solid"
                  color={
                    order.status === "ORDER_PLACED"
                      ? "orange-inverse"
                      : order.status === "CANCELLED"
                        ? "red"
                        : order.status === "CONFIRMED"
                          ? "volcano"
                          : order.status === "COMPLETED"
                            ? "green"
                            : order.status === "DELIVERED_TO_COURIER"
                              ? "magenta"
                              : "geekblue"
                  }
                >
                  {order.status}
                </Tag>
              }
            </span>
          </p>
          <p className="text-secondary mb-3">
            Delivery Company:{" "}
            <span className="text-primary">{order.deliveryCompany ?? "-"}</span>
          </p>
          <p className="text-secondary mb-3">
            Tracking:{" "}
            <span className="text-primary">{order.trackNumber ?? "-"}</span>
          </p>
          <p className="text-secondary mb-3">
            Ordered at:{" "}
            <span className="text-primary">
              {dayjs.tz(order.createdAt).format("DD/MM/YYYY HH:mm")}
            </span>
          </p>

          {/* Address details  */}
          <div className="my-6">
            <p className="text-secondary">Address details:</p>
            <div className="mt-px flex flex-col gap-4">
              <AddressCard
                id={order.user.address.rawAddress.id}
                addressLabel={order.user.address.rawAddress.name}
                name={order.user.address.rawAddress.receiverName}
                phoneNumber={order.user.address.rawAddress.phoneNumber}
                address={order.user.address.formattedAddress}
                secondLineAddress={""}
                hideEdit
              />
            </div>
          </div>

          {/* Ordered products  */}
          <div>
            <p className="text-secondary">Ordered Products:</p>
            <div className="mt-px flex flex-col gap-4">
              {order.products.map(
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

          <div className="flex justify-end py-3">
            {order.status === "AWAITING_PAYMENT" ? (
              <div className="flex gap-2">
                <Button
                  variant="solid"
                  onClick={() => router.replace(`/orderpayment/${order.id}`)}
                >
                  Procceed to payment
                </Button>
              </div>
            ) : order.status === "DELIVERED_TO_COURIER" ? (
              <div className="flex gap-2">
                <Button
                  variant="solid"
                  onClick={() => handleUserRecivedProducts(order.id)}
                >
                  Products Recived
                </Button>
              </div>
            ) : null}
          </div>
        </SectionCard>
      ))}
    </div>
  );
}
