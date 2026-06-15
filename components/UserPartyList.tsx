import { PartyCard, PartyCardProps } from "@/components/PartyCard";
import { Empty } from "antd";
import { SectionCard } from "./Cards";

interface props {
  partiesData: PartyCardProps[];
}

export function UserPartyList({ partiesData }: props) {
  return (
    <SectionCard
      title={"Purchase Information"}
      description={"View your order history"}
    >
      <div className="px-3 py-3">
        <div className="grid grid-cols-1 gap-6 mt-6">
          {partiesData.length > 0 ? (
            <>
              {partiesData.map((party, i) => (
                <PartyCard
                  key={i}
                  currentMembers={party.currentMembers}
                  gameName={party.gameName}
                  hostName={party.hostName}
                  location={party.location}
                  partyId={party.partyId}
                  startAt={party.startAt}
                  status={party.status}
                  maxMembers={party.maxMembers}
                  hideJoinButton
                />
              ))}
            </>
          ) : (
            <Empty description={"There are no parties"} />
          )}
        </div>
      </div>
    </SectionCard>
  );
}
