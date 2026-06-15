"use client";
import { Button, Modal, Result } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type MerchantSuccessGameAddedModalProps = {
  isOpen: boolean;
  onCloseClick: () => void;
};

export function MerchantSuccessGameAddedModal({
  isOpen,
  onCloseClick,
}: MerchantSuccessGameAddedModalProps) {
  const router = useRouter();
  return (
    <Modal open={isOpen} closeIcon={null} footer={null} centered>
      <Result
        status="success"
        title="Game added!"
        extra={[
          <Button
            type="default"
            color="default"
            key="backButton"
            onClick={() => router.replace("/admin/games")}
          >
            Back
          </Button>,
          <Button type="default" key="navigateButton" onClick={onCloseClick}>
            Add more game
          </Button>,
        ]}
      />
      {/* Create party */}
    </Modal>
  );
}
