import React from 'react';

export default function headerSection() {
  return (
    <div className="relative">
      <div className="relative hidden md:block min-h-screen flex items-center justify-center">
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

      {/* Mobile Only Section */}
      <div className="block md:hidden relative">
        <img
          src="../images/main-pic-tel.png"
          alt="Mobile Image"
          className="w-full h-full"
        />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4">
          <h1
            style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.4)' }}
            className="text-[#333333] w-[400px] text-3xl font-bold leading-tight"
          >
            Top Service Auto Technic (TSAT)
          </h1>
          <p
            style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.4)' }}
            className="text-white w-[400px] text-md mt-3 leading-relaxed"
          >
            ศูนย์บริการ Porsche ซ่อมกว่า 1,500 คัน ใส่ใจเหมือนดูแลรถตัวเอง
          </p>
        </div>
      </div>
    </div>
  );
}
