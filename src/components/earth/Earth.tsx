import styles from "./earth.module.css";
import Image from "next/image";

function Earth() {
  return (
    <div className={styles.imageContainer}>
      <Image
        className={styles.imagePlanet}
        src="/planeta.png"
        alt="planeta"
        width={200}
        height={200}
        priority
      ></Image>
    </div>
  );
}

export default Earth;
