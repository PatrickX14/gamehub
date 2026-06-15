import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GroupIcon from "@mui/icons-material/Group";

export type PartyCardProps = {
  partyId: number;
  gameName: string;
  hostName: string;
  location: string;
  startAt: string;
  currentMembers: number;
  maxMembers: number;
  status: string;
  onJoin?: () => void;
  hideJoinButton?: boolean;
};

export function PartyCard({
  partyId,
  gameName,
  hostName,
  location,
  startAt,
  currentMembers,
  maxMembers,
  status,
  onJoin,
  hideJoinButton,
}: PartyCardProps) {
  const fillPercent = Math.min((currentMembers / maxMembers) * 100, 100);
  const isFull = currentMembers >= maxMembers;
  const statusStyle: Record<string, string> = {
    OPEN: "bg-blue-100 text-blue-600",
    FULL: "bg-green-100 text-green-600",
    CLOSED: "bg-red-100 text-red-500",
  };
  return (
    <div className="bg-[#F9FAFB] rounded-2xl p-3 shadow-xl">
      {/* Status */}
      <div className="flex justify-end mb-2">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${statusStyle[status] ?? "bg-gray-100 text-gray-500"}`}
        >
          {status}
        </span>
      </div>

      {/* Game name and host */}
      <div className="flex items-center gap-4">
        <SportsEsportsIcon
          sx={{
            backgroundColor: "#FACC14",
            color: "#EEF2F6",
            borderRadius: "4px",
            fontSize: "40px",
          }}
        />
        <div>
          <p className="text-xl font-bold text-primary">{gameName}</p>
          <p className="text-secondary">Hosted by {hostName}</p>
        </div>
      </div>

      {/* Time and location */}
      <div className="flex flex-col gap-2 mt-3">
        <p className="text-sm text-primary">
          <LocationPinIcon sx={{ color: "#FACC14" }} /> {location}
        </p>
        <p className="text-sm text-primary">
          <CalendarTodayIcon sx={{ color: "#FACC14" }} /> {startAt}
        </p>
      </div>

      {/* Players progress */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <p className="text-sm text-primary flex items-center gap-1">
            <GroupIcon sx={{ color: "#FACC14", fontSize: "18px" }} /> Players
          </p>
          <p className="text-sm font-semibold text-primary">
            {currentMembers}/{maxMembers}
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: `${fillPercent}%`,
              backgroundColor: isFull ? "#EF4444" : "#FACC14",
            }}
          />
        </div>
      </div>
      {/* Join button */}
      {hideJoinButton ? null : (
        <button
          onClick={onJoin}
          disabled={isFull}
          className={`w-full mt-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
            isFull
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#FACC14] text-primary hover:bg-[#EAB308] cursor-pointer"
          }`}
        >
          {isFull ? "Party Full" : "Join Party"}
        </button>
      )}
    </div>
  );
}
