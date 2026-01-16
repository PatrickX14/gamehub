"use client";
import { Button, Menu, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import { usePathname, useRouter } from "next/navigation";

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    display: "flex",
    alignItems: "center",
    padding: "20px 24px 26px 24px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  menuWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  menu: {
    borderBottom: "none",
    gap: 24,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  title: { margin: 0, color: "#FCCB1D" },
};

export function UserHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const items = [
    { key: "/reservation", label: "Reservation" },
    { key: "/store", label: "Store" },
    { key: "/party", label: "Find Party" },
  ];
  const selectedKey =
    items.find((item) => pathname.startsWith(item.key))?.key ?? "";

  return (
    <Header style={styles.header}>
      {/* Logo */}
      <div style={styles.logo}>
        <Title level={3} style={styles.title}>
          🎲 Game Hub
        </Title>
      </div>

      {/* Center Menu */}
      <div style={styles.menuWrapper}>
        <Menu
          mode="horizontal"
          items={items}
          style={styles.menu}
          selectedKeys={[selectedKey]}
          onClick={({ key }) => router.push(key)}
        />
      </div>

      {/* Right Actions */}
      <div style={styles.actions}>
        <Typography>Welcome, Guest!</Typography>
        <Button type="primary">Sign In</Button>
      </div>
    </Header>
  );
}
