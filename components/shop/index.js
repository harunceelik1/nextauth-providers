"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BiPlus } from "react-icons/bi";
import Link from "next/navigation";
import { useRouter } from "next/navigation";
import { getAllProducts } from "@/app/api/shop/route";
import Product from "../product";
import Loading from "../loading";

export default function ShopPage() {
  const [titles, setTitles] = useState([]);
  const deneme = [];
  const router = useRouter();
  const { id, title, price, image } = titles;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getAllProducts();
        setTitles(products);
      } catch (error) {
        console.error("Error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/api/shop", {
  //         method: "GET",
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         setTitles(data);
  //       } else {
  //         console.error("API request failed with status:", response.status);
  //       }
  //     } catch (error) {
  //       console.error("Error occurred while fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect( () => {
  //   const data = async ()=>{
  //     const [products] = await Promise.all([getAllProducts()]);
  //   setTitles(products);
  //   }
  // }, []);

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

  const handleClick = (id) => {
    router.push(`/shop/${id}`);
  };

  if (!titles) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <section className="py-16 ">
        <div className="container mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {titles.map((item) => {
              return <Product product={item} key={item.id} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
