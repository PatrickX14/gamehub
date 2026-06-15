import { Button } from "antd";
import { SectionCard } from "./Cards";
import Image from "next/image";

type PaymentSummaryCardProps = {
  merchantImageUrl: string;
  merchantName: string;
  boardganemName: string;
  reservedTime: string;
  tableSize: number;
  duration: string;
  pricePerHour: number;
  totalPrice: number;
};

export default function ReservationPaymentSummaryCard({
  merchantImageUrl,
  boardganemName,
  merchantName,
  reservedTime,
  tableSize,
  duration,
  pricePerHour,
  totalPrice,
}: PaymentSummaryCardProps) {
  return (
    <div>
      <SectionCard title={"Reservation Summary"} description={""}>
        {/* Merchant image */}
        <div>
          <Image
            src={merchantImageUrl}
            width={120}
            height={120}
            alt="merchant image"
            className=" m-auto"
          />
        </div>

        {/* Boardgame name */}
        <div className="flex justify-between text-gray-600 mt-6">
          <span>Game:</span>
          <span>{boardganemName}</span>
        </div>

        {/* Merchant name */}
        <div className="flex justify-between text-gray-600">
          <span>Merchant:</span>
          <span>{merchantName}</span>
        </div>

        {/* Reserved time */}
        <div className="flex justify-between text-gray-600">
          <span>Time:</span>
          <span>{reservedTime}</span>
        </div>

        {/* Players count */}
        <div className="flex justify-between text-gray-600">
          <span>Table size:</span>
          <span>{tableSize} seats</span>
        </div>

        {/* Duration */}
        <div className="flex justify-between text-gray-600">
          <span>Duration:</span>
          <span>{duration}</span>
        </div>

        {/* Price per hour */}
        <div className="flex justify-between text-gray-600">
          <span>Price per hour:</span>
          <span>฿{pricePerHour.toLocaleString()}</span>
        </div>

        {/* Total price */}
        <div className="flex justify-between text-gray-600">
          <span>Total:</span>
          <span>฿{totalPrice.toLocaleString()}</span>
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
