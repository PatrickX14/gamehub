import { RevervationTable } from "@/components/AdminTable";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminBookingsPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    redirect("/login");
  }
  return (
    <div>
      <RevervationTable
        tableTitle={"Bookings"}
        itemsPerPage={0}
        accessToken={accessToken.value}
      />
    </div>
  );
}
