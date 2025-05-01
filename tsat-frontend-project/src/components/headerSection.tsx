import React from 'react';

import mainPic from '@/assets/images/main-pic.png';
import Image from 'next/image';

export default function headerSection() {
  return (
    <div className="relative h-[600px] md:h-[927px]"
      style={{
        backgroundImage: `url(${mainPic.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full  flex flex-col md:relative md:h-max container mx-auto">
        {/* ข้อความ */}
        <div className="px-4 text-center flex flex-col gap-5 pt-5 w-max max-w-full text-white md:absolute md:top-10 md:left-1/2 md:transform md:-translate-x-1/2 md:z-20 order-1">
          <h2 className="text-[#333333] text-3xl md:text-[clamp(36px,6vw,42px)] font-semibold text-shadow-[1.4px_2.79px_2.79px_rgba(0,0,0,1)]">
            Top Service Auto Technic (TSAT)
          </h2>
          <p className="text-lg md:text-[clamp(24px,2vw,35px)] text-shadow-[1.4px_2.79px_2.79px_rgba(0,0,0,1)]">
            ศูนย์บริการ ซ่อมบำรุงรักษา รถปอร์เช่ (Porsche) ที่ใหญ่และทันสมัยที่สุด
            <br /> การันตีงานซ่อม มากกว่า 1,500 คัน ดูแลรถลูกค้า เหมือนรถเราเอง
          </p>
        </div>
      </div>
    </div>
  );
}
