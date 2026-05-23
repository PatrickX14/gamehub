"use client";
import { Modal, Result, Button } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type ConfirmReservationModalProps = {
  isOpen?: boolean;
};

export function ConfirmReservationModal({
  isOpen = false,
}: ConfirmReservationModalProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  return (
    <Modal
      open={isModalOpen}
      closeIcon={null}
      footer={null}
      onCancel={() => setIsModalOpen(false)}
      centered
    >
      <Result
        status="success"
        title="Successfully Make Reserved Table!"
        subTitle={
          <div>
            <p>Reservation number: 2</p>
            <p>Cloud server configuration takes 1-5 minutes, please wait.</p>
          </div>
        }
        extra={[
          <Button
            type="default"
            key="closeButton"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </Button>,
          <Button
            type="primary"
            key="navigateButton"
            onClick={() => router.replace("/bookings")}
          >
            Go to reservations
          </Button>,
        ]}
      />
    </Modal>
  );
}
