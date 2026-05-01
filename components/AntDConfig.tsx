import { ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";

interface AntDConfigProps {
  children: React.ReactNode;
}
export function AntDConfig({ children }: AntDConfigProps) {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          components: {
            Select: {
              hoverBorderColor: "#FACC14",
              activeBorderColor: "#EAB308",
              activeOutlineColor: "rgba(250, 204, 20, 0.18)",

              multipleItemBg: "#FEF3C7",
              multipleItemBorderColor: "#FDE68A",

              optionActiveBg: "#FEF9C3",
              optionSelectedBg: "#FDE68A",

              selectorBg: "#FFFFFF",
              clearBg: "#FFFFFF",
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
}
