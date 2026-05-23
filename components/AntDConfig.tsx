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
          token: {
            colorInfo: "#FACC14", // affects .info() progress bar + border
            colorInfoBorder: "#EAB308",
            colorInfoBg: "#FEF9C3",
            colorPrimary: "#FACC14",
          },
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
            Notification: {
              // These are the actual valid tokens:
              colorBgElevated: "#FFFFFF", // notification card background
              colorText: "#364049",
            },
            Radio: {
              colorPrimary: "#FACC14",
              colorPrimaryHover: "#EAB308",
              buttonSolidCheckedActiveBg: "#FACC14",
              buttonSolidCheckedBg: "#FACC14",
              buttonSolidCheckedHoverBg: "#FACC14",
            },
            Pagination: {
              itemActiveBg: "#FACC14",
              itemActiveColor: "##364049",
              itemActiveColorHover: "#364049",
            },
            Button: {
              primaryColor: "#364049",
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </AntdRegistry>
  );
}
