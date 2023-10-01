"use client";

import Image from "next/image";
import IAsteroidApproach from "@/interfaces/IAsteroidApproach";
import styles from "./asteroid.module.css";
import React, { useEffect, useRef, useState } from "react";
import { getFormatDateString } from "@/utils/getDate";

interface IAsteroid {
  asteroid: IAsteroidApproach;
  getNewAsteroids: () => void;
  isLast: boolean;
  isLun: boolean;
  cartData: IAsteroidApproach[];
  callbuck: (asteroid: IAsteroidApproach) => void;
}

function Asteroid({
  asteroid,
  getNewAsteroids,
  isLast,
  isLun,
  cartData,
  callbuck,
}: IAsteroid) {
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const approach = asteroid.close_approach_data[0];
  const date = new Date(approach.close_approach_date);
  const dateString = getFormatDateString(date);
  const diametr = Math.ceil(
    asteroid.estimated_diameter.meters.estimated_diameter_min
  );
  const img_width = diametr > 50 ? 50 : 34;

  const asterRef = useRef(null);

  useEffect(() => {
    setIsInCart(cartData.some((el) => el.id === asteroid.id));
  }, [cartData]);

  useEffect(() => {
    if (!asterRef?.current) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isLast && entry.isIntersecting) {
          getNewAsteroids();
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "50px",
      }
    );

    observer.observe(asterRef.current);
  }, [getNewAsteroids, isLast]);

  return (
    <div className={styles.container} ref={asterRef}>
      <h3 className={styles.approach_date}>{dateString}</h3>
      <div className={styles.approach_container}>
        <p className={styles.approach}>
          {isLun
            ? `${Math.ceil(approach.miss_distance.lunar)} лунных орбит`
            : `${Math.ceil(approach.miss_distance.kilometers).toLocaleString(
                "ru"
              )} км`}
        </p>
        <Image
          className={styles.asteroid_icon}
          src="/pngegg.png"
          alt="asteroid"
          width={img_width}
          height={img_width}
        />
        <div>
          <p>{asteroid.name}</p>
          <p className={styles.diametr}>Ø {diametr} М</p>
        </div>
      </div>
      <div>
        <button
          onClick={() => callbuck(asteroid)}
          className={
            isInCart ? styles.button + " " + styles.active : styles.button
          }
        >
          {isInCart ? "В КОРЗИНЕ" : "ЗАКАЗАТЬ"}
        </button>
        {asteroid.is_potentially_hazardous_asteroid && <span>⚠️ Опасен</span>}
      </div>
    </div>
  );
}

export default Asteroid;
