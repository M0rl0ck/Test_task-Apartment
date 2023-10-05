"use client";

import IAsteroidApproach from "@/interfaces/IAsteroidApproach";
import styles from "./page.module.css";
import { useContext } from "react";
import { CartDataContext, SetCartDataContext } from "@/context/Context";
import { useRouter } from "next/navigation";
import Ordered_asteroid from "@/components/asteroid/ordered_asteroid";

function Order() {
  const contentData = useContext(CartDataContext);
  const setData = useContext(SetCartDataContext);
  const router = useRouter();
  const handlClear = () => {
    if (!setData) {
      throw new Error("Error");
    }
    setData([]);
    router.push("/");
  };

  return (
    <>
      <div>
        <h2 className={styles.title}>Заказ отправлен!</h2>
        {contentData.map((asteroid: IAsteroidApproach) => (
          <Ordered_asteroid key={asteroid.id} asteroid={asteroid} />
        ))}
      </div>
      <div className={styles.button_container}>
        <div className={styles.button_wrapper}>
          <button className={styles.button} onClick={handlClear}>
            Готово
          </button>
        </div>
      </div>
    </>
  );
}

export default Order;
