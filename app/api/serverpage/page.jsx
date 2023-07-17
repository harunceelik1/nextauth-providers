import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../auth/[...nextauth]/route";

export default async function page() {
  const session = await getServerSession(authOptions);
  console.log("DENEME SESSION : ", session);
  return <div>{session.user.name}</div>;
}
