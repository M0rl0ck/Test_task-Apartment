"use client";

import Image from "next/image";
import IAsteroidApproach from "@/interfaces/IAsteroidApproach";
import styles from "./asteroid.module.css";
import React, { useEffect, useRef } from "react";

interface IAsteroid {
  asteroid: IAsteroidApproach;
  getNewAsteroids: () => void;
  isLast: boolean;
}

function Asteroid({ asteroid, getNewAsteroids, isLast }: IAsteroid) {
  const approach = asteroid.close_approach_data[0];
  const date = new Date(approach.close_approach_date);
  const dateString = date.toLocaleString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const diametr = Math.ceil(
    asteroid.estimated_diameter.meters.estimated_diameter_min
  );
  const img_width = diametr > 50 ? 50 : 34;

  const asterRef = useRef(null);

  useEffect(() => {
    if (!asterRef?.current) {
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        getNewAsteroids();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(asterRef.current);
  }, [getNewAsteroids, isLast]);

  return (
    <div className={styles.container} ref={asterRef}>
      <h3 className={styles.approach_date}>{dateString}</h3>
      <div className={styles.approach_container}>
        <p className={styles.approach}>
          {Math.ceil(approach.miss_distance.kilometers)} КМ
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
          <p>Ø {diametr} М</p>
        </div>
      </div>
      <div>
        <button className={styles.button}>Заказать</button>
        {asteroid.is_potentially_hazardous_asteroid && <span>⚠️ Опасен</span>}
      </div>
    </div>
  );
}

export default Asteroid;
