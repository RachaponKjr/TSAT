import React from 'react';

import mainPic from '@/assets/images/main-pic.png';
import Image from 'next/image';

export default function headerSection() {
  return (
    <div className="relative">
      {/* <div className="relative md:block min-h-screen flex items-center justify-center">
        <img
          src="../images/main-pic.png"
          className="w-full object-cover h-1/3"
          alt="Description of image"
        />
        <div className="absolute top-4 left-1/2  mt-24 transform -translate-x-1/2 text-center">
          <div
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)' }}
            className="text-[#333333] text-6xl font-bold"
          >
            Top Service Auto Technic (TSAT)
          </div>
          <div
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)' }}
            className="text-3xl text-white mt-12"
          >
            ศูนย์บริการ ซ่อมบำรุงรักษา รถปอร์เช่ (Porsche)
            ที่ใหญ่เเละทันสมัยที่สุด <br /> การันตีงานซ่อม มากกว่า 1,500 คัน
            ดูแลรถลูกค้า เหมือนรถเราเอง
          </div>
        </div>
      </div>

      <div className="block md:hidden relative w-full">
        <img
          src="../images/main-pic-tel.png"
          alt="Mobile Image"
          className="w-full h-full"
        />
        <div className="absolute top-1/3 w-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4">
          <h1
            style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.4)' }}
            className="text-[#333333] w-full max-w-full md:w-[400px] text-3xl font-bold leading-tight"
          > 
            Top Service Auto Technic (TSAT)
          </h1>
          <p
            style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.4)' }}
            className="text-white w-full max-w-full md:w-[400px] text-md mt-3 leading-relaxed"
          >
            ศูนย์บริการ Porsche ซ่อมกว่า 1,500 คัน ใส่ใจเหมือนดูแลรถตัวเอง
          </p>
        </div>
      </div> */}
      <div className="w-full bg-[#48A2EB] flex flex-col md:relative md:h-max">
        {/* ข้อความ */}
        <div className="px-4 text-center pt-4 w-max max-w-full text-white md:absolute md:top-10 md:left-1/2 md:transform md:-translate-x-1/2 md:z-20 order-1">
          <h2 className="text-[#333333] text-3xl md:text-[42px] font-semibold">
            Top Service Auto Technic (TSAT)
          </h2>
          <p className="text-lg md:text-[35px]">
            ศูนย์บริการ ซ่อมบำรุงรักษา รถปอร์เช่ (Porsche) ที่ใหญ่และทันสมัยที่สุด
            <br /> การันตีงานซ่อม มากกว่า 1,500 คัน ดูแลรถลูกค้า เหมือนรถเราเอง
          </p>
        </div>

        {/* ภาพ */}
        <div className="order-2 md:order-none mt-4 md:mt-0">
          <Image
            src={mainPic}
            alt="Description of image"
            width={1920}
            height={1080}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
