import styles from "./header.module.css";
import Link from "next/link";

import React from "react";

function Header() {
  return (
    <header className={styles.header}>
      <Link href={"/"}>
        <h1 className={styles.title}>ARMAGEDDON 2023</h1>
      </Link>

      <p>ООО “Команда им. Б. Уиллиса”.</p>
      <p>Взрываем астероиды с 1998 года.</p>
    </header>
  );
}

export default Header;
