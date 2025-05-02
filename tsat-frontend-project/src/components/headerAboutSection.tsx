import React from 'react';
import about from '@/assets/images/about-desktop.png'
export default function headerAboutSection() {
  return (
    <div className="relative">
      <div className="relative min-h-[35rem] md:min-h-[50rem] flex justify-cente text-center py-6"
        style={{ backgroundImage: `url(${about.src})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}
      >
        <div className="text-center max-w-[900px] flex px-4 flex-col gap-6 container mx-auto">
          <div className="text-[#666666] text-xl md:text-[clamp(20px,2vw,30px)] font-bold">เกี่ยวกับเรา</div>
          <div className='space-y-4'>
            <div
              style={{ textShadow: '2px 2px 4px rgba(35, 11, 11, 0.25)' }}
              className="text-2xl md:text-[42px] text-[#8F2F34] font-bold"
            >
              ดูแลรถคุณ...เหมือนดูแลรถเราเอง
            </div>
            <div className="text-base md:text-2xl text-[#333333] font-bold">
              Top Service Auto Technic (TSAT) ไม่ใช่แค่อู่ซ่อมรถทั่วไป
              เราคือทีมช่างผู้เชี่ยวชาญที่หลงใหลในสมรรถนะและความสมบูรณ์แบบของ
              Porsche ด้วยประสบการณ์กว่า 15 ปี
              เราทุ่มเทให้ทุกการดูแลมีมาตรฐานระดับศูนย์บริการสากล
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
