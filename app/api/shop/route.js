import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";

export async function GET() {
  const res = await fetch(DATA_SOURCE_URL);

  const data = await res.json();

  return NextResponse.json(data);
}
