import { Empty } from "antd";
import { SectionCard } from "./Cards";
import { UserPartyDetails } from "./UserPartyDetails";
import { Party } from "@/app/lib/api/users/party";

interface props {
  partiesData: Party[];
}

export function UserPartyList({ partiesData }: props) {
  return (
    <SectionCard
      title={"Party Summary"}
      description={"View your party history"}
    >
      <div className="px-3 py-3">
        <div className="grid grid-cols-1 gap-6 mt-6">
          {partiesData.length > 0 ? (
            <>
              {partiesData.map((party, index) => (
                <UserPartyDetails key={index} partyData={party} />
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
