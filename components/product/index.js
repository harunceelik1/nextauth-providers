import React, { useContext } from "react";
import Image from "next/image";
import { BiPlus } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import Link from "next/link";
import { CartContext } from "@/app/card/page";
export default function Product({ product }) {
  const { addToCart } = useContext(CartContext);
  // console.log(product);
  const { id, image, category, title, price } = product;
  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 mt-8 relative overflow-hidden group transition rounded-lg ">
        <div className="w-full h-full flex justify-center items-center  ">
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <Image
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
              src={image}
              width={80}
              height={80}
              alt="products"
            ></Image>
          </div>
          <div></div>
        </div>
        <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0  group-hover:opacity-100 transition-all  duration-300">
          <button onClick={() => addToCart(product, id)}>
            <div className="flex justify-center bg-red-500 items-center text-white w-12 h-12">
              <BiPlus className="text-3xl" />
            </div>
          </button>
          <Link
            href={`/shop/${id}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      <div className="text-sm capitalize text-gray-500 mb-1">
        <div>{category}</div>
        <Link href={`/shop/${id}`}>
          <h2 className="font-semibold mb-1">{title}</h2>
        </Link>
        <div className="font-semibold">$ {price}</div>
      </div>
    </div>
  );
}
