import React from 'react';

export default function headerCustomerSection() {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-center">
        <div className=" flex flex-col gap-4 px-4 text-center justify-center max-w-[800px]">
          <div className="text-[#666666] text-xl md:text-[clamp(24px,2vw,30px)] font-bold mb-2">ลูกค้าของเรา</div>
          <div
            style={{ textShadow: '2px 2px 4px rgba(35, 11, 11, 0.25)' }}
            className="text-2xl md:text-[clamp(30px,3vw,42px)] text-[#8F2F34] font-bold"
          >
            รถของคุณคือเรื่องสำคัญของเรา
          </div>
          <div className="text-base md:text-[clamp(18px,2vw,24px)] text-center text-[#333333] break-words font-bold leading-relaxed">
            เราภูมิใจที่ได้ดูแลให้รถคู่ใจของท่านอยู่ในสภาพสมบูรณ์แบบ
            พร้อมออกวิ่งได้เต็มสมรรถนะ Porsche
            ของคุณจะได้รับการดูแลอย่างดีที่สุดที่ TSAT
          </div>
        </div>
      </div>
    </div>
  );
}
