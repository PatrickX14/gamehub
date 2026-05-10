import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
type PartyCardProps = {
  gameName: string;
  hostName: string;
  location: string;
  startAt: string;
  currentMembers: number;
  maxMembers: number;
  status: string;
};

export function PartyCard() {
  return (
    <div className="bg-[#F9FAFB] rounded-2xl p-3 shadow-xl">
      {/* Status */}
      <div></div>

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
          <p className="text-xl font-bold text-primary">Catan</p>
          <p className="text-secondary">Hosted by Kylian Mbappé</p>
        </div>
      </div>
      {/* Time and location */}
      <div className="flex flex-col gap-2 mt-3">
        <p className="text-sm text-primary">
          <LocationPinIcon sx={{ color: "#FACC14" }} /> Game Haven Cafe
        </p>
        <p className="text-sm text-primary">
          <CalendarTodayIcon sx={{ color: "#FACC14" }} /> May 15, 2026 at 18:00
        </p>
      </div>
    </div>
  );
}
