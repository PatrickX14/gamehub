import { Button } from "antd";
import { SectionCard } from "./Cards";
import Image from "next/image";
import { OrderResponse } from "@/app/lib/api/users/order";

type OrderPaymentSummaryCardProps = {
  data: OrderResponse;
};

export default function OrderPaymentSummaryCard({
  data,
}: OrderPaymentSummaryCardProps) {
  const subtotal = data.products.reduce((acc, { subTotal }) => {
    return acc + +subTotal;
  }, 0);
  const deliveryCost = 100;

  return (
    <div>
      <SectionCard title={"Order Summary"} description={""}>
        {/* Merchant image */}
        <div>
          <Image
            src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${data.merchant.merchantName}`}
            width={120}
            height={120}
            alt="merchant image"
            className=" m-auto"
            unoptimized
          />
        </div>

        {/* Merchant name */}
        <div className="flex justify-between text-primary">
          <span>Merchant:</span>
          <span>{data.merchant.merchantName}</span>
        </div>

        {/* Products list */}
        <>
          <p className="text-secondary">Products: </p>
          {data.products.map(({ productId, productName, quantity, price }) => (
            <div className="flex justify-between text-primary" key={productId}>
              <span>{productName}</span>
              <span>
                ฿{Number(price).toLocaleString()} x {quantity}
              </span>
            </div>
          ))}
        </>

        {/* Delivery price */}
        <div className="flex justify-between text-primary">
          <span>Delivery:</span>
          <span>฿{deliveryCost}</span>
        </div>

        {/* subtotal */}
        <div className="flex justify-between text-primary">
          <span>Subtotal:</span>
          <span>฿{Number(subtotal + deliveryCost).toLocaleString()}</span>
        </div>
      </SectionCard>
      <Button
        className="mt-6 w-full"
        size="large"
        type="primary"
        htmlType="submit"
      >
        Confirm Payment
      </Button>
    </div>
  );
}
