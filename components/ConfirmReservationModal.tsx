"use client";
import { Modal, Result, Button } from "antd";
import { useRouter } from "next/navigation";

export type ConfirmReservationModalProps = {
  isOpen?: boolean;
  onClose: () => void;
};

export function ConfirmReservationModal({
  isOpen,
  onClose,
}: ConfirmReservationModalProps) {
  const router = useRouter();
  console.log(isOpen);
  return (
    <Modal open={isOpen} closeIcon={null} footer={null} centered>
      <Result
        status="success"
        title="Successfully Reserved Table!"
        subTitle={
          <div>
            <p>Reservation number: 2</p>
            <p>Localtion: </p>
            <p>Boardgame: </p>
          </div>
        }
        extra={[
          <Button type="default" key="closeButton" onClick={onClose}>
            Close
          </Button>,
          <Button
            type="primary"
            key="navigateButton"
            onClick={() => router.replace("/bookings")}
          >
            Go to reservations
          </Button>,
          // <div key="createParty">
          //   <p className="text-center text-secondary my-2">or</p>
          //   <Button type="primary">Create a party</Button>
          // </div>,
        ]}
      />
      {/* Create party */}
    </Modal>
  );
}
