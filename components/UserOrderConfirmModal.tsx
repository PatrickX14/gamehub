"use client";
import { Button, Modal, Result } from "antd";

type UserCartOrderConfirmModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function UserCartOrderConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
}: UserCartOrderConfirmModalProps) {
  return (
    <Modal open={isOpen} closable={false} centered footer={null}>
      <Result
        status="info"
        title="Are you sure to proceed"
        subTitle="Make sure everything is correct before checking out"
        extra={[
          <Button
            type="default"
            color="red"
            key="backButton"
            onClick={onCancel}
          >
            Close
          </Button>,
          <Button type="primary" key="navigateButton" onClick={onConfirm}>
            Place order
          </Button>,
        ]}
      />
    </Modal>
  );
}
