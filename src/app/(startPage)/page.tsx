"use client";

import styles from "./page.module.css";
import IAsteroidApproach from "../../interfaces/IAsteroidApproach";
import { useCallback, useEffect, useState } from "react";
import Asteroid from "@/components/asteroid/asteroid";
import { getDateString, increaseDate } from "@/utils/getDate";
import Loading from "@/components/loading/Loading";

export default function Home() {
  const [data, setData] = useState<IAsteroidApproach[]>([]);
  const [newDate, setNewDate] = useState<string>(getDateString(new Date()));
  const [isLoading, setIsLoading] = useState(false);

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
        {data.map((asteroid: IAsteroidApproach, index) => (
          <Asteroid
            key={asteroid.id}
            asteroid={asteroid}
            getNewAsteroids={newAsteruids}
            isLast={index === data.length - 1}
          />
        ))}
        {isLoading && <Loading />}
      </div>
      <div>Buttons</div>
    </>
  );
}
