import React from 'react';
import { CatagoryProduct } from '@/app/page';
import Link from 'next/link';

export default function CardSelectProduct({ catagoryProduct }: { catagoryProduct: CatagoryProduct }) {
  return (
    <div className="bg-white py-8">
      <div className="px-4 xl:px-24 space-y-4 lg:space-y-8 container mx-auto">
        <div className="text-3xl font-bold text-center text-[#8F2F34]">
          เลือกดูผลิตภัณฑ์
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-x-2 gap-y-4 md:gap-4">
          {catagoryProduct.data.data.map((item: any, index: number) => (
            <Link href={`/products?index=${index}`} key={index} className="relative w-full aspect-[16/12] lg:aspect-square rounded-lg cursor-pointer hover:scale-[1.02] transition-all duration-300 ease-in-out"
              style={{
                backgroundImage: `url(http://tsat-backend:3130/${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >

              <div className="absolute text-white text-lg font-bold inset-0 flex items-center justify-center text-center px-2">
                <span className="text-sm sm:text-base md:text-xl text-center text-wrap leading-snug">
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
