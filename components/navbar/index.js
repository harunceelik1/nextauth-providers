"use client";
import React, { useEffect, useState, useContext } from "react";
import styles from "./styles.module.css";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { SidebarContext } from "@/app/sidebar/SidebarContext";
import { CartContext } from "@/app/card/page";

import { BsBag } from "react-icons/bs";
import { PiSignOutBold } from "react-icons/pi";
import { GrUpdate } from "react-icons/gr";

export default function Navbar() {
  //header state
  const [isActive, setIsActive] = useState(false);

  const { data: session, status } = useSession();
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  // console.log("VŞLZXŞLKVŞXLZ", session?.user?.image);
  const { itemAmount } = useContext(CartContext);
  const handleSignOut = async (e) => {
    signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });

  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md " : "bg-none py-6 "
      }  transition-all fixed w-full z-10 `}
    >
      <div className="container mx-auto flex items-center justify-between h-full ">
        <Link href="/">
          <Image
            src="/assets/images/shoop.webp"
            width={36}
            height={36}
            alt="logo"
          />
        </Link>

        <div className="flex gap-4">
          {status === "authenticated" ? (
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer flex relative "
            >
              <BsBag className="text-2xl " />
              <div className="bg-red-500 absolute -right-2 -bottom-1 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
                {itemAmount}
              </div>
            </div>
          ) : (
            <></>
          )}
          <div>
            {status === "authenticated" ? (
              <div className="">
                <button onClick={handleSignOut}>
                  <PiSignOutBold className="text-2xl" />
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div>
            {status === "authenticated" && !session?.user?.image ? (
              <Link href="/update">
                <button>
                  <GrUpdate className="text-2xl" />
                </button>
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
