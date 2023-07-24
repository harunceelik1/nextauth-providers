import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://fakestoreapi.com/products";

// export async function GET() {
//   const res = await fetch(DATA_SOURCE_URL);

//   const data = await res.json();

//   return NextResponse.json(data);
// }

const getAllProducts = async () => {
  const res = await fetch(DATA_SOURCE_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const getDetailProducts = async (id) => {
  const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export { getAllProducts, getDetailProducts };
