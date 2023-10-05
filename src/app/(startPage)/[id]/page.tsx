"use client";

import { useContext, useEffect, useState } from "react";
import styles from "./page.module.css";
import IAsteroid from "@/interfaces/IAsteroid";
import Asteroid_page from "@/components/asteroid_page/asteroid_page";
import { IsLunContext } from "@/context/Context";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading/Loading";

interface IAsteroidId {
  params: {
    id: string;
  };
}

function AsteroidId({ params }: IAsteroidId) {
  const [data, setData] = useState<IAsteroid>();
  const isLun = useContext(IsLunContext);
  const route = useRouter();

  useEffect(() => {
    async function getAsteroid(id: string) {
      const responce = await fetch(`/api/getAsteroid?id=${id}`);
      const asteroidData = await responce.json();
      setData(asteroidData);
    }
    getAsteroid(params.id);
  }, []);

  return (
    <div onClick={() => route.back()} className={styles.container}>
      {data ? <Asteroid_page asteroid={data} isLun={isLun} /> : <Loading />}
    </div>
  );
}

export default AsteroidId;
