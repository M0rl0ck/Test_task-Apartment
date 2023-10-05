import IAsteroid from "@/interfaces/IAsteroid";
import styles from "./asteroid_page.module.css";
import { getDistance } from "@/utils/getDistance";
import { getFormatFullDate } from "@/utils/getDate";

interface IAsteroid_page {
  asteroid: IAsteroid;
  isLun: boolean;
}

function Asteroid_page({ asteroid, isLun }: IAsteroid_page) {
  const diametr = Math.ceil(
    asteroid.estimated_diameter.meters.estimated_diameter_min
  );
  return (
    <>
      <h2 className={styles.title}>{asteroid.name}</h2>
      <p className={styles.diametr}>
        Минимальный размер: <span className={styles.no_wrap}>{diametr} М.</span>
      </p>
      <p className={styles.dangerous}>
        Опасность:{" "}
        {asteroid.is_potentially_hazardous_asteroid ? (
          <span>⚠️ Опасен.</span>
        ) : (
          <span>Не опасен.</span>
        )}
      </p>
      <p className={styles.approach_title}>Сближения астероида:</p>
      <ul className={styles.approaches_list}>
        {asteroid.close_approach_data.map((approach) => {
          return (
            <li className={styles.approach} key={approach.close_approach_date}>
              <p>
                Время сближения:{" "}
                <span className={styles.no_wrap}>
                  {getFormatFullDate(approach.close_approach_date_full)}
                </span>
              </p>
              <p>
                Скорость относительно Земли:{" "}
                <span className={styles.no_wrap}>{`${
                  approach.relative_velocity.kilometers_per_second.split(".")[0]
                } км/с`}</span>
              </p>
              <p>
                Дистанция сближения:{" "}
                <span className={styles.no_wrap}>
                  {getDistance(isLun, approach.miss_distance)}
                </span>
              </p>
              <p>Орбита вокруг: {approach.orbiting_body}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Asteroid_page;
