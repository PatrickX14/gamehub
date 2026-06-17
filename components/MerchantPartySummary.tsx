"use client";
import { Button, Tag } from "antd";
import { SectionCard } from "./Cards";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { useRouter } from "next/navigation";
import { PartyMemberCard } from "./PartyMemberCard";

dayjs.extend(utc);
dayjs.extend(timezone);

const partyMembers = [
  {
    userImageUrl:
      "https://api.dicebear.com/9.x/adventurer/svg?seed=MeepleHaven",
    userName: "Member1",
    joinedAt: "2026-06-17T13:07:08.138Z",
    isHost: true,
  },
  {
    userImageUrl:
      "https://api.dicebear.com/9.x/adventurer/svg?seed=MeepleHaven",
    userName: "Member2",
    joinedAt: "2026-06-17T13:07:08.138Z",
  },
];

export function MerchantPartySummary() {
  const router = useRouter();
  return (
    <SectionCard title={"Party summary"} description={""}>
      <p className="text-primary">Hosted By: Kitjapong</p>
      <p className="text-primary">
        Party Status:{" "}
        <span>
          <Tag variant="solid" color={"green"}>
            Open
          </Tag>
        </span>
      </p>
      <p className="text-primary">Board Game: Gloomhaven</p>
      <p className="text-primary">
        Created At: {dayjs(new Date()).format("DD/MM/YYYY HH:mm")}
      </p>
      {/* Party Members */}
      <div className="mt-6">
        <p className="text-primary">Members: 2/4</p>
        <div className="flex flex-col gap-3 mt-3">
          {partyMembers.map(
            ({ userImageUrl, userName, joinedAt, isHost }, index) => (
              <PartyMemberCard
                key={index}
                userImageUrl={userImageUrl}
                userName={userName}
                joinedAt={joinedAt}
                isHost={isHost ? isHost : undefined}
              />
            ),
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          type="primary"
          className="mt-6"
          onClick={() => router.push("/admin/reservations/1")}
        >
          Go to reservation
        </Button>
      </div>
    </SectionCard>
  );
}
