import { Form, Input } from "antd";
import { SectionCard } from "./Cards";
import FormItem from "antd/es/form/FormItem";
import { InputNumber } from "antd";

export function PaymentPartyCreationCard() {
  return (
    <SectionCard
      title={"Party"}
      description={"Create party alongside confirmation"}
      canToggle
    >
      <div className="flex gap-6">
        <FormItem label={"Looking for * players"} name={"partyMemberCount"}>
          <InputNumber mode="spinner" min={1} max={30} />
        </FormItem>

        <FormItem label={"Message"} className="grow" name={"partyDescription"}>
          <Input />
        </FormItem>
      </div>
    </SectionCard>
  );
}
