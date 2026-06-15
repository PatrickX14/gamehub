import { Category } from "@/app/lib/api/users/products";
import { GetProp, Select } from "antd";

type ShopProductFilterProps = {
  categories: Category[];
  onSelect: (selectedOptions: number[]) => void;
};

export function ShopProductFilter({
  onSelect,
  categories,
}: ShopProductFilterProps) {
  const options: GetProp<typeof Select, "options"> = categories.map(
    (category) => ({ label: category.category, value: category.id }),
  );
  return (
    <Select
      className="h-11 min-w-3xs"
      classNames={{
        root: "ring ring-[#627384]",
      }}
      placeholder="Select categories"
      mode="multiple"
      allowClear
      options={options}
      size="large"
      showSearch={{ optionFilterProp: "label" }}
      onChange={(category) => onSelect(category)}
    />
  );
}
