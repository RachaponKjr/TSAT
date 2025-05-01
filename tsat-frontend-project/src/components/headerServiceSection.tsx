import React from 'react';
import sevice from '@/assets/images/card-service-header.png'
import Image from 'next/image';

export default function headerSection() {
  return (
    <div className="relative">
      <div className="relative block px-4 min-h-max md:!max-h-[600px] lg:min-h-[600px] mt-12 mb-6 items-center justify-center overflow-hidden">
        <div className=" text-center max-w-[350px] md:max-w-[900px] place-self-center mt-2 flex flex-col gap-4">
          <div className="text-[#666666] text-xl md:text-[clamp(20px,2vw,30px)] font-bold mb-2">บริการของเรา</div>
          <div
            style={{ textShadow: '2px 2px 4px rgba(35, 11, 11, 0.25)' }}
            className="text-2xl md:text-[clamp(30px,3vw,42px)] text-[#8F2F34] font-bold"
          >
            ขับ Porsche ต้องได้สิ่งที่ดีที่สุด เราดูแลให้ครบ
          </div>
          <div className="text-base md:text-[clamp(18px,2vw,24px)] text-[#333333] font-bold">
            บริการ Porsche ครบ จบในที่เดียว ด้วยเทคโนโลยีมาตรฐานศูนย์ อะไหล่แท้
            เกรดพรีเมียม ดูแลโดยทีมช่างผู้เชี่ยวชาญ
          </div>
        </div>
        <Image src={sevice} alt="sevice" width={1500} height={1500} className='scale-150 md:scale-100 md:place-self-center relative lg:-top-80 -top-15 !z-50'/>
      </div>
    </div>
  );
}
