"use client";
import { useSession } from "next-auth/react";
import Login from "./login/page";
import Dashboard from "./dashboard/page";
import Loading from "@/components/loading";

export default function Home() {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  const renderContent = () => {
    if (status === "authenticated") {
      return <Dashboard />;
    } else if (status === "unauthenticated") {
      return <Login />;
    }
  };
  return renderContent();
}
