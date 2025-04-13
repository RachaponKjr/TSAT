import React from 'react';

export default function headerCustomerSection() {
  return (
    <div className="mt-8">
      <div className="hidden md:block  items-center justify-center">
        <div className=" flex flex-col gap-6 text-center">
          <div className="text-[#666666] text-3xl font-bold mb-2">ลูกค้าของเรา</div>
          <div
            style={{ textShadow: '2px 2px 4px rgba(35, 11, 11, 0.25)' }}
            className="text-3xl text-[#8F2F34] font-bold "
          >
            รถของคุณคือเรื่องสำคัญของเรา
          </div>
          <div className="text-3xl px-40 text-[#333333] font-bold ">
            เราภูมิใจที่ได้ดูแลให้รถคู่ใจของท่านอยู่ในสภาพสมบูรณ์แบบ
            พร้อมออกวิ่งได้เต็มสมรรถนะ Porsche
            ของคุณจะได้รับการดูแลอย่างดีที่สุดที่ TSAT
          </div>
        </div>
      </div>

      {/* Mobile Only Section */}
      <div className="block md:hidden ">
        <div className="text-center flex flex-col gap-6 px-4">
          <h1 className="text-[#666666] w-full mb-4 md:w-[400px] mx-auto text-2xl font-bold leading-tight">
            ลูกค้าของเรา
          </h1>
          <h1 className="text-[#8F2F34]  w-full md:w-[400px] mx-auto text-3xl font-bold leading-tight">
            รถของคุณคือเรื่องสำคัญของเรา
          </h1>
          <p className="text-[#333333] w-full md:w-[400px] mx-auto font-bold text-xl leading-relaxed">
            เราภูมิใจที่ได้ดูแลให้รถคู่ใจของท่านอยู่ในสภาพสมบูรณ์แบบ
            พร้อมออกวิ่งได้เต็มสมรรถนะ Porsche
            ของคุณจะได้รับการดูแลอย่างดีที่สุดที่ TSAT
          </p>
        </div>
      </div>
    </div>
  );
}
