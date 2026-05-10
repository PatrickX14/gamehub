import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";

export type PartyStatus =
  | "Gathering"
  | "Booked"
  | "Full"
  | "In Progress"
  | "Completed";

export interface PartyCardProps {
  gameImageUrl: string;
  gameName: string;
  hostName: string;
  location: string;
  /** e.g. "24/10/2025 17:30 - 19:30" */
  date: string;
  message: string;
  /** Array of participant avatar URLs (filled seats) */
  participantAvatarUrls: (string | null)[];
  /** Total max participants slots to show */
  maxParticipants: number;
  status: PartyStatus;
}

const STATUS_STYLES: Record<PartyStatus, string> = {
  Gathering: "bg-blue-100 text-blue-600",
  Booked: "bg-green-100 text-green-600",
  Full: "bg-red-100 text-red-500",
  "In Progress": "bg-yellow-100 text-yellow-600",
  Completed: "bg-gray-100 text-gray-500",
};

export function PartyCard({
  gameImageUrl,
  gameName,
  hostName,
  location,
  date,
  message,
  participantAvatarUrls,
  maxParticipants,
  status,
  onClick,
}: PartyCardProps & { onClick?: () => void }) {
  // Build slot array: filled slots from participantAvatarUrls, empty slots up to maxParticipants
  const slots = Array.from(
    { length: maxParticipants },
    (_, i) => participantAvatarUrls[i] ?? null,
  );

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-2xl border border-gray-200 shadow-sm transition-transform duration-150 ease-in-out hover:-translate-y-2 hover:shadow-md flex items-stretch overflow-hidden cursor-pointer"
    >
      {/* Game thumbnail */}
      <div className="relative w-24 shrink-0">
        <Image
          src={gameImageUrl}
          alt={gameName}
          fill
          className="object-cover"
        />
      </div>

      {/* Info section */}
      <div className="flex flex-col justify-center gap-1 px-4 py-3 flex-1 min-w-0">
        <p className="text-[#364049] font-bold text-base leading-tight">
          {gameName}
        </p>
        <p className="text-sm text-[#627384]">
          Hosted by:{" "}
          <span className="text-[#364049] font-medium">{hostName}</span>
        </p>
        <p className="text-sm text-[#627384]">Location: {location}</p>
        <p className="text-sm text-[#627384]">Date and time: {date}</p>
        <p className="text-sm text-[#627384]">Message: {message}</p>
      </div>

      {/* Right side: status + avatars */}
      <div className="flex flex-col items-end justify-between px-4 py-3 shrink-0">
        {/* Status badge */}
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_STYLES[status]}`}
        >
          {status}
        </span>

        {/* Participant slots grid (2 columns) */}
        <div className="grid grid-rows-2 grid-flow-col gap-1.5 mt-2">
          {slots.map((avatarUrl, i) =>
            avatarUrl ? (
              <div
                key={i}
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-sm bg-[#FACC14] flex items-center justify-center"
              >
                <Image
                  src={avatarUrl}
                  alt={`participant-${i}`}
                  width={36}
                  height={36}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div
                key={i}
                className="w-9 h-9 rounded-full border-2 border-dashed border-gray-300 bg-gray-100 flex items-center justify-center"
              >
                <PersonIcon sx={{ fontSize: 18 }} className="text-gray-400" />
              </div>
            ),
          )}
        </div>
      </div>
    </button>
  );
}
