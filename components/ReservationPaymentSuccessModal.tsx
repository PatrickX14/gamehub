"use client";
import { Button, Modal, Result } from "antd";
import { useRouter } from "next/navigation";

export type ReservationPaymentSuccessModalProps = {
  isOpen: boolean;
};

export default function ReservationPaymentSuccessModal({
  isOpen,
}: ReservationPaymentSuccessModalProps) {
  const router = useRouter();
  return (
    <Modal open={isOpen} closeIcon={null} footer={null} centered>
      <Result
        status="success"
        title="Transaction Completed!"
        extra={[
          <Button
            type="primary"
            key="navigateButton"
            onClick={() => router.replace("/purchase")}
          >
            Go to reservations
          </Button>,
        ]}
      />
      {/* Create party */}
    </Modal>
  );
}
