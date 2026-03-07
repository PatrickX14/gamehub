import { PartyCard, PartyCardProps } from "./partyCard";

interface props {
  partiesData: PartyCardProps[];
}

export function UserPartyList({ partiesData }: props) {
  return (
    <div className="bg-[#F9FAFB] rounded-md shadow-md overflow-hidden">
      {/* Header */}

      <div className="flex items-center justify-between px-6 py-4 border-b border-[#364049]/10">
        <div>
          <h2 className="text-primary font-semibold text-lg">
            Purchase Information
          </h2>
          <p className="text-secondary text-sm">View your order history</p>
        </div>
      </div>

      <div className="px-3 py-3">
        <div className="grid grid-cols-1 gap-6 mt-6">
          {partiesData.map((party, i) => (
            <PartyCard key={i} {...party} />
          ))}
        </div>
      </div>
    </div>
  );
}
