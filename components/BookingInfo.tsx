import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { BookingStatus } from "@/app/lib/api/users/reservation";
import { Tag } from "antd";

export interface BookingInfoProps {
  boardgameName: string;
  storeName: string;
  storeAddress: string;
  startAt: string;
  endAt: string;
  mapUrl?: string;
  status?: BookingStatus;
}

export default function BookingInfo({
  storeName,
  storeAddress,
  startAt,
  endAt,
  mapUrl,
  status,
  boardgameName,
}: BookingInfoProps) {
  const isPast = status === "COMPLETED";

  return (
    <div
      className={`bg-[#F9FAFB] rounded-md shadow-md p-6 border border-[#364049]/10 font-sans h-full relative transition-opacity duration-300 ${isPast ? "opacity-70" : ""}`}
    >
      {/* Status Badge */}
      <div
        className={`absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1.5`}
      >
        <Tag
          variant="solid"
          color={
            status === "PENDING_APPROVAL"
              ? "orange-inverse"
              : status === "CANCELLED"
                ? "red"
                : status === "CONFIRMED"
                  ? "green"
                  : status === "COMPLETED"
                    ? "green"
                    : "geekblue"
          }
        >
          {/* {isPast ? (
            <CheckCircleIcon fontSize="small" />
          ) : (
            <ScheduleIcon fontSize="small" />
          )} */}
          {/* {isPast ? "Completed" : "Upcoming"} */}
          {status?.replace("_", " ")}
        </Tag>
      </div>

      <h2 className="text-2xl font-bold text-primary mb-6 pr-32">
        {boardgameName}
      </h2>

      <div className="flex flex-col gap-6">
        {/* Location Section */}
        <div className="flex items-start gap-4">
          <div
            className={`p-2 rounded-full border border-[#364049]/20 flex-shrink-0 bg-white shadow-sm mt-1`}
          >
            <LocationOnIcon
              className={isPast ? "text-slate-400" : "text-[#FACC14]"}
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-primary font-semibold text-lg">{storeName}</h3>
            <p className="text-secondary mt-1 leading-relaxed">
              {storeAddress}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date Section */}
          <div className="flex items-center gap-4">
            <div
              className={`p-2 rounded-full border border-[#364049]/20 flex-shrink-0 bg-white shadow-sm`}
            >
              <CalendarTodayIcon
                className={isPast ? "text-slate-400" : "text-[#FACC14]"}
              />
            </div>
            <div className="flex flex-col">
              {/* <p className="text-secondary text-sm font-medium uppercase tracking-wider">
                Date and Time
              </p> */}
              <p className="text-primary font-semibold mt-0.5">
                {startAt} - {endAt}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        {status === "AWAITING_PAYMENT" ? (
          <div className="mt-4 flex justify-end border-t border-[#364049]/10 pt-6">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 w-full sm:w-max font-bold py-2 px-3 rounded-md transition-colors shadow-sm cursor-pointer bg-[#FACC14] hover:bg-[#eab308] text-[#364049]`}
            >
              Confirm & Pay
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}
