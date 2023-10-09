import styles from "./layout.module.css";
import Header from "@/components/header/header";
import { CartDataContextProvider } from "@/context/Context";

export default function StartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* <Earth /> */}
        <CartDataContextProvider>{children}</CartDataContextProvider>
      </main>
    </>
  );
}
