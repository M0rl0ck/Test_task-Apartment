"use client";

import styles from "./page.module.css";
import IAsteroidApproach from "../../interfaces/IAsteroidApproach";
import { useCallback, useContext, useEffect, useState } from "react";
import Asteroid from "@/components/asteroid/asteroid";
import { getDateString, increaseDate } from "@/utils/getDate";
import Loading from "@/components/loading/Loading";
import Cart from "@/components/cart/Cart";
import {
  CartDataContext,
  IsLunContext,
  SetCartDataContext,
  SetIsLunContext,
} from "@/context/Context";

export default function Home() {
  const [data, setData] = useState<IAsteroidApproach[]>([]);
  const [newDate, setNewDate] = useState<string>(getDateString(new Date()));
  const [isLoading, setIsLoading] = useState(false);
  const cartData = useContext(CartDataContext);
  const setCartData = useContext(SetCartDataContext);
  const isLun = useContext(IsLunContext);
  const setIsLun = useContext(SetIsLunContext);

  if (!setIsLun) {
    throw new Error("error");
  }

  const handlOrder = (asteroid: IAsteroidApproach): void => {
    if (!setCartData) {
      throw new Error("Error ");
    }
    setCartData((prev) =>
      prev.some((el) => el.id === asteroid.id)
        ? prev.filter((el) => el.id !== asteroid.id)
        : [...prev, asteroid]
    );
  };

  const newAsteruids = useCallback(() => {
    setNewDate((prev) => increaseDate(prev, 1));
  }, []);

  useEffect(() => {
    async function getAsteroids() {
      const responce = await fetch(
        `/api/getAsteroids?start=${newDate}&end=${newDate}`
      );
      const data = await responce.json();
      return data;
    }
    const getData = async () => {
      setIsLoading(true);
      const data = await getAsteroids();
      setData((prev) => [...prev, ...data]);
      setIsLoading(false);
    };
    getData();
  }, [newDate]);

  return (
    <>
      <div className={styles.asteroids}>
        <h2 className={styles.title}>Ближайшие подлёты астероидов</h2>
        <p className={styles.dimension}>
          <span
            onClick={() => setIsLun(false)}
            className={isLun ? styles.measure : styles.active}
          >
            в километрах
          </span>
          <span> | </span>
          <span
            onClick={() => setIsLun(true)}
            className={isLun ? styles.active : styles.measure}
          >
            в лунных орбитах
          </span>
        </p>
        {data.map((asteroid: IAsteroidApproach, index) => (
          <Asteroid
            key={asteroid.id}
            asteroid={asteroid}
            getNewAsteroids={newAsteruids}
            isLast={index === data.length - 1}
            isLun={isLun}
            cartData={cartData}
            callback={handlOrder}
          />
        ))}
        {isLoading && <Loading />}
      </div>
      <Cart cartData={cartData} />
    </>
  );
}
