"use client";
import { Button, notification, Tag } from "antd";
import dayjs from "dayjs";
import { approvePartyMember, MemberStatus } from "@/app/lib/api/users/party";
import Image from "next/image";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { useRouter } from "next/navigation";

dayjs.extend(utc);
dayjs.extend(timezone);

type PartyMemberCardProps = {
  partyId: number;
  userId: number;
  hostName: string;
  userImageUrl: string;
  userName: string;
  joinedAt: string;
  status: MemberStatus;
  isHost: boolean;
  accessToken: string;
};

export function PartyMemberCard({
  userImageUrl,
  hostName,
  userName,
  joinedAt,
  status,
  isHost,
  accessToken,
  partyId,
  userId,
}: PartyMemberCardProps) {
  const router = useRouter();
  const [notiApi, contextHolder] = notification.useNotification();
  const showHostTag = hostName === userName;
  const showJoinedTime = joinedAt !== "" && status === "ACCEPTED";

  async function onApprovalClick(isAprrove: boolean) {
    try {
      await approvePartyMember(accessToken, partyId, userId, isAprrove);
      router.refresh();
      notiApi.success({
        title: "Success",
        description: `${userName} is now in your party`,
        placement: "topRight",
      });
    } catch (err) {
      console.log(err);
      notiApi.error({
        title: "Failed to approve player",
        description: "Error occur please try again later",
        placement: "topRight",
      });
    }
  }

  return (
    <div className="flex justify-between items-center bg-white border border-black/10 rounded-md px-6 py-4">
      {contextHolder}
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
      <div>
        {showHostTag ? (
          <Tag variant="solid" color="green">
            Host
          </Tag>
        ) : isHost && !showJoinedTime ? (
          <div className="flex flex-col gap-3">
            <Button
              color="primary"
              variant="solid"
              onClick={() => onApprovalClick(true)}
            >
              Accept
            </Button>
            <Button
              color="red"
              variant="solid"
              onClick={() => onApprovalClick(false)}
            >
              Reject
            </Button>
          </div>
        ) : showJoinedTime ? (
          <p>{dayjs(joinedAt).format("DD/MM/YYYY HH:mm")}</p>
        ) : (
          <Tag variant="solid" color="orange">
            Pending
          </Tag>
        )}
      </div>
    </div>
  );
}
