"use client";
import { useEffect } from "react";
import Image from "next/image";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { PartyCardProps, PartyStatus } from "./partyCard";

const STATUS_STYLES: Record<PartyStatus, string> = {
    Gathering: "bg-blue-100 text-blue-600",
    Booked: "bg-green-100 text-green-600",
    Full: "bg-red-100 text-red-500",
    "In Progress": "bg-yellow-100 text-yellow-600",
    Completed: "bg-gray-100 text-gray-500",
};

interface PartyDetailModalProps {
    party: PartyCardProps | null;
    onClose: () => void;
}

export function PartyDetailModal({ party, onClose }: PartyDetailModalProps) {
    // Close on Escape key
    useEffect(() => {
        if (!party) return;
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [party, onClose]);

    // Prevent body scroll when open
    useEffect(() => {
        if (party) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => { document.body.style.overflow = ""; };
    }, [party]);

    if (!party) return null;

    const { gameImageUrl, gameName, hostName, location, date, message, participantAvatarUrls, maxParticipants, status } = party;
    const slots = Array.from({ length: maxParticipants }, (_, i) => participantAvatarUrls[i] ?? null);
    const joinedCount = participantAvatarUrls.filter(Boolean).length;
    const spotsLeft = maxParticipants - joinedCount;
    const canJoin = status === "Gathering" || status === "Booked";

    return (
        /* Backdrop */
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={onClose}
        >
            {/* Modal panel */}
            <div
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-modal-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Game banner */}
                <div className="relative h-44 w-full bg-[#2B2B2B]">
                    <Image
                        src={gameImageUrl}
                        alt={gameName}
                        fill
                        className="object-cover opacity-80"
                    />
                    {/* Gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Status badge */}
                    <span className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${STATUS_STYLES[status]}`}>
                        {status}
                    </span>

                    {/* Game name over banner */}
                    <div className="absolute bottom-4 left-4">
                        <h2 className="text-white font-bold text-xl leading-tight drop-shadow">{gameName}</h2>
                        <p className="text-white/80 text-xs mt-0.5">
                            Hosted by <span className="font-semibold text-[#FACC14]">{hostName}</span>
                        </p>
                    </div>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-colors cursor-pointer"
                    >
                        <CloseIcon sx={{ fontSize: 17 }} />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 flex flex-col gap-4">
                    {/* Details */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-sm text-[#627384]">
                            <PlaceIcon sx={{ fontSize: 16 }} />
                            <span>{location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#627384]">
                            <AccessTimeIcon sx={{ fontSize: 16 }} />
                            <span>{date}</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-[#627384]">
                            <ChatBubbleOutlineIcon sx={{ fontSize: 16 }} className="mt-0.5 shrink-0" />
                            <span>{message}</span>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Participants */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-sm font-semibold text-[#364049]">
                                Players ({joinedCount}/{maxParticipants})
                            </p>
                            <p className="text-xs text-[#627384]">
                                {spotsLeft > 0 ? `${spotsLeft} spot${spotsLeft > 1 ? "s" : ""} left` : "No spots left"}
                            </p>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {slots.map((avatarUrl, i) =>
                                avatarUrl ? (
                                    <div
                                        key={i}
                                        className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow bg-[#FACC14] flex items-center justify-center"
                                    >
                                        <Image
                                            src={avatarUrl}
                                            alt={`participant-${i}`}
                                            width={44}
                                            height={44}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                ) : (
                                    <div
                                        key={i}
                                        className="w-11 h-11 rounded-full border-2 border-dashed border-gray-300 bg-gray-100 flex items-center justify-center"
                                    >
                                        <PersonIcon sx={{ fontSize: 20 }} className="text-gray-400" />
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* Join button */}
                    <button
                        disabled={!canJoin}
                        className="w-full h-12 rounded-full text-sm font-semibold transition-all duration-150 cursor-pointer
                            disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
                            bg-[#FACC14] text-[#364049] hover:bg-yellow-400"
                    >
                        {status === "Full" ? "Party Full"
                            : status === "Completed" ? "Completed"
                                : status === "In Progress" ? "In Progress"
                                    : "Request to Join"}
                    </button>
                </div>
            </div>
        </div>
    );
}
