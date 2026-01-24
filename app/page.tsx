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
          <p style={styles.title}>Board Game Reservations</p>
          <p style={styles.titleDescription}>
            Reserve your favorite board games and enjoy quality time with
            friends and family
          </p>
        </div>
      </main>
    </div>
  );
}
