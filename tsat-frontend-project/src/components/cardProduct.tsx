import React from 'react';
import battely from '@/assets/images/battery.png';
import Image from 'next/image';
export default function CardProduct() {
  return (
    <div>
      <div className="text-[#8F2F34] text-center mt-12 text-2xl font-bold">
        ผลิตภัณฑ์
      </div>
      <div className="text-black mx-auto grid md:grid-cols-2 md:px-60 gap-8 px-4">
        {Array.from({ length: 6 }, (_, index) => (
          <>
            <div key={index} className=' flex items-center gap-4'>
              <Image src={battely} alt={""} width={600} height={600} />
              <div className='text-[#333333] space-y-2'>
                <h5 className='text-base md:text-2xl font-semibold'>Voltronic 5w40</h5>
                <p className='text-sm md:text-lg'>น้ำมันเครื่องสังเคราะห์แท้จากเยอรมนี ปกป้องเครื่องยนต์ ทนความร้อนสูง พร้อมดึงสมรรถนะเต็มพิกัด</p>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
