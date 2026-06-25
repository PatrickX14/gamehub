import { getMyParties } from "@/app/lib/api/users/party";
import { ProfileMenu } from "@/components/ProfileMenu";
import { UserPartyList } from "@/components/UserPartyList";
import dayjs from "dayjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { PartyCardProps } from "@/components/PartyCard";
dayjs.extend(utc);
dayjs.extend(timezone);

export default async function PartiesPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    redirect("/login");
  }

  const parties = await getMyParties(accessToken.value);
  console.log(parties);
  const mappedPartiesData: PartyCardProps[] = parties.items.map((party) => ({
    partyId: party.id,
    gameName: party.boardgame.name,
    hostName: party.hostName,
    location: party.merchant.location,
    startAt: `${dayjs(party.startAt).tz("Asia/Bangkok").format("DD/MM/YYYY HH:mm")} - ${dayjs(party.endAt).tz("Asia/Bangkok").format("DD/MM/YYYY HH:mm")}`,
    maxMembers: party.maxPlayers,
    status: party.status as PartyCardProps["status"],
    currentMembers: party.members.length,
  }));

  return (
    <div className="xl:px-30 grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* profile menu */}
      <div className="lg:col-span-1">
        <ProfileMenu selectedMenu={"Parties"} />
      </div>
      <div className="lg:col-span-2">
        <UserPartyList partiesData={parties.items} />
      </div>
    </div>
  );
}
