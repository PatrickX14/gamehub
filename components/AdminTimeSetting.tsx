import { SectionCard } from "./Cards";
import { BusinessHours } from "./AdminSettings";
// import { Toggle } from "./Input";

export function AdminTimeSetting() {
  return (
    <SectionCard
      title={"Open-Close Hour"}
      description={"Manage open and close hour"}
    >
      {/* <Toggle
        label={"undefined"}
        description={"undefined"}
        checked={false}
        onChange={function (isChecked: boolean): void {
          throw new Error("Function not implemented.");
        }}
      /> */}
      <BusinessHours />
    </SectionCard>
  );
}
