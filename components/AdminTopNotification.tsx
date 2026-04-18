import EqualizerIcon from "@mui/icons-material/Equalizer";
import ListAltIcon from "@mui/icons-material/ListAlt";
import EventSeatIcon from "@mui/icons-material/EventSeat";

export default function AdminTopNotification() {
  return (
    <div className="flex justify-around bg-[#F9FAFB] py-10">
      <div className="flex gap-2 items-center">
        <p className="text-2xl font-semibold text-secondary">New Bookings</p>
        <div className="p-1.5 rounded-full bg-[#1ACC6D]">
          <EventSeatIcon className="text-primary" />
        </div>
        <p className="text-2xl font-semibold text-[#1ACC6D]">3</p>
      </div>
      <div className="flex gap-2 items-center">
        <p className="text-2xl font-semibold text-secondary">New Order</p>
        <div className="p-1.5 rounded-full bg-[#1ACC6D]">
          <ListAltIcon className="text-primary" />
        </div>
        <p className="text-2xl font-semibold text-[#1ACC6D]">3</p>
      </div>
      <div className="flex gap-2 items-center">
        <p className="text-2xl font-semibold text-secondary">Revenue</p>
        <div className="p-1.5 rounded-full bg-[#1ACC6D]">
          <EqualizerIcon className="text-primary" />
        </div>
        <p className="text-2xl font-semibold text-[#1ACC6D]">3</p>
      </div>
    </div>
  );
}
