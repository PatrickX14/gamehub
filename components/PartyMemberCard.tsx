"use client";
import { Button, Tag } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { MemberStatus } from "@/app/lib/api/users/party";

dayjs.extend(utc);
dayjs.extend(timezone);

type MerchantPartyMemberCardProps = {
  userImageUrl: string;
  userName: string;
  joinedAt: string;
  status: MemberStatus;
  isHost?: boolean;
};

export function PartyMemberCard({
  userImageUrl,
  userName,
  joinedAt,
  isHost,
  status,
}: MerchantPartyMemberCardProps) {
  return (
    <div className="flex justify-between items-center bg-white border border-black/10 rounded-md px-6 py-4">
      <div className="flex gap-6 items-center">
        <Image
          src={userImageUrl}
          alt={"party member image"}
          width={50}
          height={50}
          unoptimized
        />
        <p>{userName}</p>
      </div>
      {status === "PENDING" ? (
        <div className="flex flex-col gap-3">
          <Button color="green" variant="solid">
            Accept
          </Button>
          <Button color="red" variant="solid">
            Reject
          </Button>
        </div>
      ) : isHost ? (
        <Tag variant="solid" color={"green"}>
          Host
        </Tag>
      ) : (
        <p>{dayjs(joinedAt).format("DD/MM/YYYY HH:mm")}</p>
      )}
    </div>
  );
}
