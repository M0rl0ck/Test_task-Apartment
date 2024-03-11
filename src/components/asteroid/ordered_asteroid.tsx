"use client";

import Image from "next/image";
import IAsteroidApproach from "@/interfaces/IAsteroidApproach";
import styles from "./asteroid.module.css";
import { getFormatDateString } from "@/utils/getDate";
import { useContext } from "react";
import { IsLunContext } from "@/context/Context";
import { useRouter } from "next/navigation";
import { getDistance } from "@/utils/getDistance";

interface IAsteroid {
  asteroid: IAsteroidApproach;
}

function Ordered_asteroid({ asteroid }: IAsteroid) {
  const router = useRouter();
  const approach = asteroid.close_approach_data[0];
  const dateString = getFormatDateString(approach.close_approach_date);
  const diameter = Math.ceil(
    asteroid.estimated_diameter.meters.estimated_diameter_min
  );
  const img_width = diameter > 50 ? 50 : 34;
  const isLun = useContext(IsLunContext);

  return (
    <div
      className={styles.container + " " + styles.container_ordered}
      onClick={() => router.push(`/${asteroid.id}`)}
    >
      <h3 className={styles.approach_date}>{dateString}</h3>
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
        {asteroid.is_potentially_hazardous_asteroid && <span>⚠️ Опасен</span>}
      </div>
    </div>
  );
}

export default Ordered_asteroid;
