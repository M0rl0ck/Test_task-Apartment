import styles from "./header.module.css";

import React from "react";

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>ARMAGEDDON 2023</h1>
      <p>ООО “Команда им. Б. Уиллиса”.</p>
      <p>Взрываем астероиды с 1998 года.</p>
    </header>
  );
}

export default Header;
