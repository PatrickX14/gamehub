import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Tag } from "antd";
import { PartyMemberCard } from "./PartyMemberCard";
import { Party } from "@/app/lib/api/users/party";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

dayjs.extend(utc);
dayjs.extend(timezone);

type UserPartyDetailsPrtops = {
  partyData: Party;
};

export async function UserPartyDetails({ partyData }: UserPartyDetailsPrtops) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  if (!accessToken) {
    redirect("/login");
  }
  return (
    <div className="bg-white border border-black/10 rounded-md px-6 py-4">
      {/* Header */}
      <div className="flex gap-3">
        <SportsEsportsIcon
          sx={{
            backgroundColor: "#FACC14",
            color: "#EEF2F6",
            borderRadius: "4px",
            fontSize: "40px",
          }}
        />
        <div>
          <p className="text-primary">
            {partyData.boardgame.name}{" "}
            <span>
              <Tag
                variant="solid"
                color={
                  partyData.status === "OPEN"
                    ? "green"
                    : partyData.status === "FULL"
                      ? "orange"
                      : "red"
                }
              >
                {partyData.status}
              </Tag>
            </span>
          </p>
          <p className="text-secondary">Hosted by: {partyData.hostName}</p>
        </div>
      </div>
      {/* Time and location */}
      <div className="flex flex-col gap-2 mt-3">
        <p className="text-sm text-primary">
          <LocationPinIcon sx={{ color: "#FACC14" }} />{" "}
          {partyData.merchant.name}
        </p>
        <p className="text-sm text-primary">
          <CalendarTodayIcon sx={{ color: "#FACC14" }} />{" "}
          {dayjs(partyData.startAt).format("D/MMMM/YYYY HH:mm")} -{" "}
          {dayjs(partyData.endAt).format("D/MMMM/YYYY HH:mm")}
        </p>
      </div>
      {/* Members */}
      <div className="mt-4">
        <p>
          Members:{" "}
          {
            partyData.members.filter(({ status }) => status === "ACCEPTED")
              .length
          }
          /{partyData.maxPlayers + 1}
        </p>
        <div className="flex flex-col mt-2 gap-3">
          {partyData.members.map(({ id, imageUrl, name, joinedAt, status }) => (
            <PartyMemberCard
              key={id}
              userId={id}
              userImageUrl={imageUrl}
              userName={`${name}`}
              joinedAt={joinedAt}
              status={status}
              hostName={partyData.hostName}
              isHost={partyData.isUserHost}
              accessToken={accessToken.value}
              partyId={partyData.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
