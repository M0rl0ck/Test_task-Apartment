import { useEffect, useState } from "react";
import styles from "./cart.module.css";
import { getEnding } from "@/utils/getEnding";

function Cart() {
  const [count, setCount] = useState(0);
  const [ending, setEnding] = useState("");
  useEffect(() => {
    setEnding(getEnding(count));
  }, [count]);

  return (
    <div className={styles.container}>
      <div className={styles.cart}>
        <div>
          <h3>Корзина</h3>
          <p>{`${count} астероид${ending}`}</p>
        </div>

        <button
          className={styles.button}
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Отправить
        </button>
      </div>
    </div>
  );
}

export default Cart;
