"use client";
import { Button, Tag } from "antd";
import { SectionCard } from "./Cards";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { useRouter } from "next/navigation";
import { PartyMemberCard } from "./PartyMemberCard";
import { PartyDetails } from "@/app/lib/api/merchant/party";

dayjs.extend(utc);
dayjs.extend(timezone);

type MerchantPartySummaryProps = {
  partyData: PartyDetails;
};

export function MerchantPartySummary({ partyData }: MerchantPartySummaryProps) {
  const router = useRouter();
  return (
    <SectionCard title={"Party summary"} description={""}>
      <p className="text-primary">Hosted By: {partyData.hostName}</p>
      <p className="text-primary">
        Party Status:{" "}
        <span>
          <Tag
            variant="solid"
            color={
              partyData.status === "OPEN"
                ? "green"
                : partyData.status === "FULL"
                  ? "orange"
                  : "red"
            }
          >
            {partyData.status}
          </Tag>
        </span>
      </p>
      <p className="text-primary">Board Game: {partyData.boardgameName}</p>
      <p className="text-primary">
        Created At: {dayjs(partyData.createdAt).format("DD/MM/YYYY HH:mm")}
      </p>
      {/* Party Members */}
      <div className="mt-6">
        <p className="text-primary">
          Members: {partyData.members.length}/{partyData.maxPlayers + 1}
        </p>
        <div className="flex flex-col gap-3 mt-3">
          {partyData.members.map(
            ({ userImageUrl, name, joinedAt, status }, index) => (
              <PartyMemberCard
                key={index}
                userImageUrl={userImageUrl}
                userName={name}
                joinedAt={joinedAt}
                partyId={0}
                userId={0}
                hostName={""}
                status={status}
                isHost={false}
                accessToken={""}
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
