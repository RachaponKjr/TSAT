import React from 'react';

export default function headerAboutSection() {
  return (
    <div className="relative">
      <div className="relative hidden md:block min-h-screen flex items-center justify-center">
        <img
          src="../images/about-desktop.png"
          className="w-full object-cover h-1/3"
          alt="Description of image"
        />
        <div className="absolute top-4 left-1/2  mt-24 transform -translate-x-1/2 text-center">
          <div className="text-[#666666] text-3xl font-bold">เกี่ยวกับเรา</div>
          <div
            style={{ textShadow: '2px 2px 4px rgba(35, 11, 11, 0.25)' }}
            className="text-3xl text-[#8F2F34] font-bold mt-12"
          >
            ดูแลรถคุณ...เหมือนดูแลรถเราเอง
          </div>
          <div className="text-3xl text-[#333333] font-bold mt-12">
            Top Service Auto Technic (TSAT) ไม่ใช่แค่อู่ซ่อมรถทั่วไป
            เราคือทีมช่างผู้เชี่ยวชาญที่หลงใหลในสมรรถนะและความสมบูรณ์แบบของ
            Porsche ด้วยประสบการณ์กว่า 15 ปี
            เราทุ่มเทให้ทุกการดูแลมีมาตรฐานระดับศูนย์บริการสากล
          </div>
        </div>
      </div>

      {/* Mobile Only Section */}
      <div className="block md:hidden relative">
        <img
          src="../images/about-tel.png"
          alt="Mobile Image"
          className="w-full h-full"
        />
        <div className="absolute w-full top-2/7 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4">
          <h1 className="text-[#666666] max-w-[400px] text-2xl font-bold leading-tight">
            เกี่ยวกับเรา
          </h1>
          <h1 className="text-[#8F2F34] mt-6 max-w-[400px] text-3xl font-bold leading-tight">
            ดูแลรถคุณ...เหมือนดูแลรถเราเอง
          </h1>
          <p className="text-[#333333] max-w-[400px] font-bold text-xl mt-3 leading-relaxed">
            Top Service Auto Technic (TSAT) ไม่ใช่แค่อู่ซ่อมรถทั่วไป
            เราคือทีมช่างผู้เชี่ยวชาญที่หลงใหลในสมรรถนะและความสมบูรณ์แบบของ
            Porsche ด้วยประสบการณ์กว่า 15 ปี
            เราทุ่มเทให้ทุกการดูแลมีมาตรฐานระดับศูนย์บริการสากล
          </p>
        </div>
      </div>
    </div>
  );
}
