"use client";
import { Button, Modal, Result } from "antd";
import { useRouter } from "next/navigation";

type UserCartOrderPlacedModalProps = {
  isModalOpen: boolean;
};

export function UserCartOrderPlacedModal({
  isModalOpen,
}: UserCartOrderPlacedModalProps) {
  const router = useRouter();
  return (
    <Modal open={isModalOpen} closable={false} footer={null}>
      <Result
        status={"success"}
        title="Order placed successfully"
        subTitle="Wait for merchant to confirm your order."
        extra={[
          <Button
            type="primary"
            key="backButton"
            onClick={() => router.replace("/purchase")}
          >
            Go to your purchase
          </Button>,
        ]}
      />
    </Modal>
  );
}
