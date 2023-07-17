"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BiPlus } from "react-icons/bi";
import Link from "next/navigation";
export default function ShopPage() {
  const [titles, setTitles] = useState([]);
  const deneme = [];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/shop", {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          setTitles(data);
        } else {
          console.error("API request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function dizi(sayi) {
    deneme.push(sayi);
    const totalDizi = deneme.reduce((sayac, sayi) => {
      return sayac + sayi;
    }, 0);
    console.log("toplam dizi", totalDizi);
  }

  const totalPrice = titles.reduce((accumulator, item) => {
    return accumulator + item.price;
  }, 0);
  console.log("Toplam fiyat :", totalPrice);
  console.log(deneme);
  return (
    // <div>
    //   <h1>ShopPage</h1>
    //   <ul>
    //     {titles.map((item) => (
    //       <li key={item.id}>{item.title}</li>
    //     ))}
    //   </ul>
    // </div>
    <div className="container mx-auto py-8 ">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3  ">
        {titles.map((item) => (
          <div
            key={item.id}
            className=" rounded-lg border border-b-gray-900 shadow p-10 text-center"
          >
            <div className="h-40 mb-10 flex items-center justify-center ">
              <Image src={item.image} alt="Sneaker" width={80} height={80} />
            </div>
            <div className="gap-2 ">
              <h1 className="text-xl font-bold mb-2 line-clamp-1 ">
                {item.title}
              </h1>
              <p>{item.price}</p>
              <p>{item.id}</p>
            </div>
            <div className="flex justify-between items-center ">
              <h1>Sa</h1>
              <button
                onClick={() => dizi(item.price)}
                className="mt-2 p-0 w-12 h-12 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
              >
                <BiPlus className="w-6 h-6 inline-block text-white  " />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
