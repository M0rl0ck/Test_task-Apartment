"use client";

import Image from "next/image";
import IAsteroidApproach from "@/interfaces/IAsteroidApproach";
import styles from "./asteroid.module.css";
import { getFormatDateString } from "@/utils/getDate";
import { useContext } from "react";
import { IsLunContext } from "@/context/Context";

interface IAsteroid {
  asteroid: IAsteroidApproach;
}

function Ordered_asteroid({ asteroid }: IAsteroid) {
  const approach = asteroid.close_approach_data[0];
  const date = new Date(approach.close_approach_date);
  const dateString = getFormatDateString(date);
  const diametr = Math.ceil(
    asteroid.estimated_diameter.meters.estimated_diameter_min
  );
  const img_width = diametr > 50 ? 50 : 34;
  const isLun = useContext(IsLunContext);

  return (
    <div className={styles.container}>
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
        {asteroid.is_potentially_hazardous_asteroid && <span>⚠️ Опасен</span>}
      </div>
    </div>
  );
}

export default Ordered_asteroid;
