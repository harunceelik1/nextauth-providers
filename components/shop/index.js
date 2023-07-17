"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function ShopPage() {
  const [titles, setTitles] = useState([]);

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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 bg-orange-600">
        {titles.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded shadow p-4 text-center"
          >
            <div className=" h-20 mb-2 flex items-center justify-center">
              <Image
                src="/assets/images/sneaker.png"
                alt="Sneaker"
                width={100}
                height={100}
              />
            </div>
            <p>{item.id}</p>
            <h1 className="text-xl font-bold mb-2">{item.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
