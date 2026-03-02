"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";

interface Game {
    name: string;
    imageUrl: string;
}

const DEMO_GAMES: Game[] = [
    { name: "Settlers of Catan", imageUrl: "/images/demoimages/Catan-2015-boxart.jpg" },
    { name: "Ticket to Ride", imageUrl: "/images/demoimages/Catan-2015-boxart.jpg" },
    { name: "Wingspan", imageUrl: "/images/demoimages/Catan-2015-boxart.jpg" },
    { name: "Pandemic", imageUrl: "/images/demoimages/Catan-2015-boxart.jpg" },
];

const DEMO_LOCATIONS = [
    "More Than a Game Cafe",
    "GameHaven Café, Bangkok",
    "Dice & Coffee, Chiang Mai",
    "Board Room, Phuket",
    "Meeple Hub, Bangkok",
];

interface CreatePartyModalProps {
    open: boolean;
    onClose: () => void;
}

export function CreatePartyModal({ open, onClose }: CreatePartyModalProps) {
    const [selectedGame, setSelectedGame] = useState<Game>(DEMO_GAMES[0]);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState(DEMO_LOCATIONS[0]);
    const [players, setPlayers] = useState("4");
    const [message, setMessage] = useState("");

    // Close on Escape
    useEffect(() => {
        if (!open) return;
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [open, onClose]);

    // Prevent body scroll
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    if (!open) return null;

    function handleGameChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const game = DEMO_GAMES.find(g => g.name === e.target.value);
        if (game) setSelectedGame(game);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // TODO: wire up real submission
        onClose();
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={onClose}
        >
            <div
                className="bg-[#F5F6F8] rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden animate-modal-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <div className="relative flex justify-end px-4 pt-4">
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-500 transition-colors cursor-pointer"
                    >
                        <CloseIcon sx={{ fontSize: 17 }} />
                    </button>
                </div>

                {/* Game image */}
                <div className="flex justify-center pb-2 mt-[-8px]">
                    <div className="relative w-34 h-40 rounded-xl overflow-hidden shadow-md">
                        <Image
                            src={selectedGame.imageUrl}
                            alt={selectedGame.name}
                            fill
                            className="object-cover transition-all duration-300"
                        />
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 pb-6 flex flex-col gap-4 mt-2">
                    {/* Game select */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-[#627384]">Game</label>
                        <select
                            value={selectedGame.name}
                            onChange={handleGameChange}
                            className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-sm text-[#364049] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FACC14]"
                        >
                            {DEMO_GAMES.map(g => (
                                <option key={g.name} value={g.name}>{g.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Date + Time row */}
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-xs font-medium text-[#627384]">Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                required
                                className="h-10 px-3 rounded-xl border border-gray-200 bg-white text-sm text-[#364049] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FACC14] w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-xs font-medium text-[#627384]">Time</label>
                            <input
                                type="time"
                                value={time}
                                onChange={e => setTime(e.target.value)}
                                required
                                className="h-10 px-3 rounded-xl border border-gray-200 bg-white text-sm text-[#364049] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FACC14] w-full"
                            />
                        </div>
                    </div>

                    {/* Location + Players row */}
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-xs font-medium text-[#627384]">Location</label>
                            <select
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                                className="h-10 px-3 rounded-xl border border-gray-200 bg-white text-sm text-[#364049] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FACC14] w-full"
                            >
                                {DEMO_LOCATIONS.map(l => (
                                    <option key={l} value={l}>{l}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1 w-24 shrink-0">
                            <label className="text-xs font-medium text-[#627384]">Players</label>
                            <select
                                value={players}
                                onChange={e => setPlayers(e.target.value)}
                                className="h-10 px-3 rounded-xl border border-gray-200 bg-white text-sm text-[#364049] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FACC14] w-full"
                            >
                                {[2, 3, 4, 5, 6, 7, 8].map(n => (
                                    <option key={n} value={String(n)}>{n}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-[#627384]">Message</label>
                        <textarea
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            placeholder="Looking for players..."
                            rows={4}
                            className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm text-[#364049] resize-none focus:outline-none focus:ring-2 focus:ring-[#FACC14]"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full h-12 rounded-full bg-[#FACC14] text-[#364049] text-sm font-semibold hover:bg-yellow-400 transition-colors duration-150 cursor-pointer mt-1"
                    >
                        Create a party
                    </button>
                </form>
            </div>
        </div>
    );
}
