import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;
  const { searchParams } = new URL(request.url);
  const START_DATE = searchParams.get("start");
  const END_DATE = searchParams.get("end");
  const res = await fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${START_DATE}&end_date=${END_DATE}&api_key=${API_KEY}`,
    {
      next: { revalidate: 600 }, // Revalidate every 600 seconds
    }
  );
  const data = await res.json();

  return START_DATE
    ? NextResponse.json(data.near_earth_objects[START_DATE])
    : "Need date param";
}
