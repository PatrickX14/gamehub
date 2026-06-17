import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Tag } from "antd";
import { PartyMemberCard } from "./PartyMemberCard";
import { Party } from "@/app/lib/api/users/party";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);
dayjs.extend(timezone);

type UserPartyDetailsPrtops = {
  partyData: Party;
};

export function UserPartyDetails({ partyData }: UserPartyDetailsPrtops) {
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
              <Tag variant="solid" color="green">
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
          {partyData.merchant.location}
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
          Members: {partyData.members.length}/{partyData.maxPlayers}
        </p>
        <div className="flex flex-col mt-2 gap-3">
          {partyData.members.map(
            ({ id, imageUrl, name, joinedAt, isHost, status }) => (
              <PartyMemberCard
                key={id}
                userImageUrl={imageUrl}
                userName={`${name}`}
                joinedAt={dayjs(joinedAt).format("D/MMMM/YYYY HH:mm")}
                isHost={isHost && true}
                status={status}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
