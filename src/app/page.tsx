import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <header>Header</header>
      <main className={styles.main}>main</main>
      <footer>Footer</footer>
    </>
  );
}
