"use client";
import dynamic from "next/dynamic";

export const NoSsrConfirmReservationModal = dynamic(
  () =>
    import("@/components/ConfirmReservationModal").then(
      (m) => m.ConfirmReservationModal,
    ),
  { ssr: false },
);
