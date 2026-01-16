import Title from "antd/es/typography/Title";
import { Button, Menu, Typography } from "antd";
import { Header } from "antd/es/layout/layout";

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  menu: {
    flex: 1,
    width: "70%",
    justifyContent: "center",
    paddingTop: "10px",
    paddingBottom: "10px",
    gap: 20,
  },
  headerContainer: {
    width: "15%",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
};

export function UserHeader() {
  const items: Array<any> = [
    { key: 1, label: "Reservations" },
    { key: 2, label: "Store" },
    { key: 3, label: "Find Party" },
  ];
  return (
    <header>
      <Header style={styles.header}>
        <div style={{ width: "15%" }}>
          <Title style={{ margin: 0 }} level={3}>
            🎲 Game Hub
          </Title>
        </div>
        <Menu mode="horizontal" items={items} style={styles.menu} />
        <div style={styles.headerContainer}>
          <Typography>Welcome, Guest!</Typography>
          <Button type="primary">Sign In</Button>
        </div>
      </Header>
    </header>
  );
}
