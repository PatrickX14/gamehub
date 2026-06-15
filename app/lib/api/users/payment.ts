const API_URL = process.env.API_URL ?? "http://localhost:3000";

export async function getUserSingleReservationPayment(
  accessToken: string,
  reservationId: number,
) {
  const res: Response = await fetch(`${API_URL}/reservations/payment`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    console.log(res.status, res.statusText);
    throw new Error(res.statusText);
  }
  const reservationPayment = await res.json();
  return reservationPayment;
}
