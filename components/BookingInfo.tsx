import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MapIcon from "@mui/icons-material/Map";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";

export interface BookingInfoProps {
  storeName?: string;
  storeAddress?: string;
  date?: string;
  time?: string;
  mapUrl?: string;
  status?: "upcoming" | "past";
}

export default function BookingInfo({
  storeName = "GameHub Center",
  storeAddress = "123 Gaming Street, District 1, Ho Chi Minh City",
  date = "October 12, 2026",
  time = "14:00 - 18:00",
  mapUrl = "https://maps.google.com",
  status = "upcoming",
}: BookingInfoProps) {
  const isPast = status === "past";

  return (
    <div className={`bg-[#F9FAFB] rounded-md shadow-md p-6 border border-[#364049]/10 font-sans h-full relative transition-opacity duration-300 ${isPast ? 'opacity-70' : ''}`}>
      {/* Status Badge */}
      <div className={`absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm ${isPast
        ? 'bg-slate-200 text-slate-600 border border-slate-300'
        : 'bg-[#FACC14]/20 text-yellow-700 border border-[#FACC14]/50'
        }`}>
        {isPast ? <CheckCircleIcon fontSize="small" /> : <ScheduleIcon fontSize="small" />}
        {isPast ? "Completed" : "Upcoming"}
      </div>

      <h2 className="text-2xl font-bold text-primary mb-6 pr-32">Booking Information</h2>

      <div className="flex flex-col gap-6">
        {/* Location Section */}
        <div className="flex items-start gap-4">
          <div className={`p-2 rounded-full border border-[#364049]/20 flex-shrink-0 bg-white shadow-sm mt-1`}>
            <LocationOnIcon className={isPast ? "text-slate-400" : "text-[#FACC14]"} />
          </div>
          <div className="flex flex-col">
            <h3 className="text-primary font-semibold text-lg">{storeName}</h3>
            <p className="text-secondary mt-1 leading-relaxed">{storeAddress}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date Section */}
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-full border border-[#364049]/20 flex-shrink-0 bg-white shadow-sm`}>
              <CalendarTodayIcon className={isPast ? "text-slate-400" : "text-[#FACC14]"} />
            </div>
            <div className="flex flex-col">
              <p className="text-secondary text-sm font-medium uppercase tracking-wider">Date</p>
              <p className="text-primary font-semibold mt-0.5">{date}</p>
            </div>
          </div>

          {/* Time Section */}
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-full border border-[#364049]/20 flex-shrink-0 bg-white shadow-sm`}>
              <AccessTimeIcon className={isPast ? "text-slate-400" : "text-[#FACC14]"} />
            </div>
            <div className="flex flex-col">
              <p className="text-secondary text-sm font-medium uppercase tracking-wider">Time</p>
              <p className="text-primary font-semibold mt-0.5">{time}</p>
            </div>
          </div>
        </div>

        {/* Map Button */}
        <div className="mt-4 border-t border-[#364049]/10 pt-6">
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 w-full sm:w-max font-bold py-3 px-6 rounded-md transition-colors shadow-sm cursor-pointer ${isPast
              ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
              : 'bg-[#FACC14] hover:bg-[#eab308] text-[#364049]'
              }`}
          >
            <MapIcon />
            {isPast ? "View Past Location" : "Open Google Maps"}
          </a>
        </div>
      </div>
    </div>
  );
}
