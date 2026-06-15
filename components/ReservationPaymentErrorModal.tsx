"use client";
import { Button, Modal, Result } from "antd";

export type ReservationPaymentErrorModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ReservationPaymentErrorModal({
  isOpen,
  onClose,
}: ReservationPaymentErrorModalProps) {
  return (
    <Modal open={isOpen} closeIcon={null} footer={null} centered>
      <Result
        status="error"
        title="Failed to proceed"
        extra={[
          <Button type="primary" key="navigateButton" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    </Modal>
  );
}
