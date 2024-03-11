"use client";

import Image from "next/image";
import IAsteroidApproach from "@/interfaces/IAsteroidApproach";
import styles from "./asteroid.module.css";
import React, { useEffect, useRef, useState } from "react";
import { getFormatDateString } from "@/utils/getDate";
import { getDistance } from "@/utils/getDistance";
import { useRouter } from "next/navigation";

interface IAsteroid {
  asteroid: IAsteroidApproach;
  getNewAsteroids: () => void;
  isLast: boolean;
  isLun: boolean;
  cartData: IAsteroidApproach[];
  callback: (asteroid: IAsteroidApproach) => void;
}

function Asteroid({
  asteroid,
  getNewAsteroids,
  isLast,
  isLun,
  cartData,
  callback: callback,
}: IAsteroid) {
  const router = useRouter();
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const approach = asteroid.close_approach_data[0];
  const dateString = getFormatDateString(approach.close_approach_date);
  const diameter = Math.ceil(
    asteroid.estimated_diameter.meters.estimated_diameter_min
  );
  const img_width = diameter > 50 ? 50 : 34;

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
      <h3
        className={styles.approach_date}
        onClick={() => router.push(`/${asteroid.id}`)}
      >
        {dateString}
      </h3>
      <div className={styles.approach_container}>
        <p className={styles.approach}>
          {getDistance(isLun, approach.miss_distance)}
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
          <p className={styles.diameter}>Ø {diameter} М</p>
        </div>
      </div>
      <div>
        <button
          onClick={() => callback(asteroid)}
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
