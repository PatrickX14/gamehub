import { GamesTable } from "@/components/AdminTable";
import { getBoardGameStock } from "@/app/lib/api/admin/boardgames";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminGamesPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    redirect("/login");
  }
  const gamesData = await getBoardGameStock(accessToken.value);

  return (
    <div>
      <GamesTable
        tableTitle={"Games"}
        data={gamesData?.length > 0 ? gamesData : null}
        itemsPerPage={0}
      />
    </div>
  );
}
