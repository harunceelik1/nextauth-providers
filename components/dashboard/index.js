"use client";
import Loading from "@/components/loading";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function DashboardPage() {
  const [newName, setNewName] = useState();
  const { data: session, status, update } = useSession();
  console.log("useSession hook session object", session);

  if (status === "loading") {
    return <Loading />;
  } else if (status === "authenticated") {
    return (
      <div className="mt-5 flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p className="text-lg mb-4">Merhaba, {session?.user.name}</p>

        <div>
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              width={24}
              height={24}
              alt="githubImage"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
