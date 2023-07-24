"use client";

import React, { useContext, useEffect, useState } from "react";
import { getDetailProducts } from "@/app/api/shop/route";
import Image from "next/image";
import { CartContext } from "@/app/card/page";

export default function DetailProducts({ params }) {
  // const [titles, setTitles] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [data, setData] = useState([]);
  const { title, price, description, image } = data;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getDetailProducts(params.id); // id'ye göre API çağrısı yapılıyor

        setData(response);
      } catch (error) {
        console.error("Error occurred while fetching data:", error);
      }
    };

    fetchProducts(); // useEffect içerisinde tanımlanan fonksiyonun çağrılması
  }, [params.id]); // id parametresine bağımlı olarak useEffect'in tekrar çalışması
  console.log(data);
  if (!data) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading..
      </section>
    );
  }
  // const { title, price, description, image } = products;
  // console.log("sasasas" + params.id);
  // console.log("HAHHA" + products);
  // const totalPrice = titles.reduce((accumulator, item) => {
  //   return accumulator + item.price;
  // }, 0);
  // console.log(totalPrice);

  return (
    <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <Image
              src={image}
              width={200}
              height={200}
              className="max-w-[200px] lg:max-w-sm"
              alt="img"
            ></Image>
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
              {" "}
              {title}
            </h1>
            <div className="text-xl text-red-500 font-medium mb-6 items-center ">
              ${price}
            </div>
            <p className="mb-8">{description}</p>
            <button
              onClick={() => addToCart(data, data.id)}
              className="bg-primary py-4 px-8 text-white hover:text-black  hover:bg-gray-400  transition-all duration-300"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
