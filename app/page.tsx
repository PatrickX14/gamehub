import { Typography } from "antd";
import Title from "antd/es/typography/Title";

const styles: { [key: string]: React.CSSProperties } = {
  title: {
    textAlign: "center",
  },
  titleDescription: { textAlign: "center" },
};

export default function Home() {
  return (
    <div>
      <main>
        <div>
          <Title level={2} style={styles.title}>
            Board Game Reservations
          </Title>
          <Typography style={styles.titleDescription}>
            Reserve your favorite board games and enjoy quality time with
            friends and family
          </Typography>
        </div>
      </main>
    </div>
  );
}
