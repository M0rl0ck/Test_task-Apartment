import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;
  const { searchParams } = new URL(request.url);
  const ID = searchParams.get("id");
  const res = await fetch(
    `https://api.nasa.gov/neo/rest/v1/neo/${ID}?api_key=${API_KEY}`,
    {
      next: { revalidate: 600 },
    }
  );
  const data = await res.json();

  return NextResponse.json(data);
}
