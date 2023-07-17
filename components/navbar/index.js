"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
export default function Navbar() {
  const { data: session, status } = useSession();

  console.log("VŞLZXŞLKVŞXLZ", session?.user?.image);

  const handleSignOut = async (e) => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div>
      <header className={styles.header}>
        <div>
          <Link href="/">
            <Image
              src="/assets/images/logo.png"
              width={48}
              height={48}
              alt="logo"
            />
          </Link>
        </div>
        <nav className={styles.nav}>
          {status === "authenticated" ? (
            <div>
              <button onClick={handleSignOut}>Sign Out </button>
              {!session?.user?.image ? (
                <Link href="/update">
                  <button>Update</button>
                </Link>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </nav>
      </header>
    </div>
  );
}
