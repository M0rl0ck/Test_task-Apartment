import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./cart.module.css";
import { getEnding } from "@/utils/getEnding";
import IAsteroidApproach from "@/interfaces/IAsteroidApproach";

interface ICart {
  cartData: IAsteroidApproach[];
}

function Cart({ cartData }: ICart) {
  const [ending, setEnding] = useState("");
  const router = useRouter();
  useEffect(() => {
    setEnding(getEnding(cartData.length));
  }, [cartData.length]);

  const orderHandle = () => {
    if (cartData.length) {
      router.push("/order");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.cart}>
        <div>
          <h3>Корзина</h3>
          <p>{`${cartData.length} астероид${ending}`}</p>
        </div>

        <button className={styles.button} onClick={orderHandle}>
          Отправить
        </button>
      </div>
    </div>
  );
}

export default Cart;
