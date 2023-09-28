import Earth from "@/components/earth/Earth";
import styles from "./layout.module.css";
import Header from "@/components/header/header";

export default function StartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Earth />
        {children}
      </main>
    </>
  );
}
