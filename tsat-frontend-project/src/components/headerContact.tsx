import React from 'react';
import { Phone } from './icons/phone';
import Line from './icons/line';
import Facebook from './icons/facebook';

export default function HeaderContact() {
  return (
    <div className="mt-6 px-4">
      <div className="flex items-center justify-center ">
        <div className="text-center flex flex-col gap-6 md:gap-8 max-w-[700px]">
          <div className='flex flex-col gap-2 md:gap-4'>
            <div className="text-[#666666] text-xl md:text-[clamp(20px,2vw,30px)] font-bold">ติดต่อเรา</div>
            <div className="text-[17px] md:text-[clamp(18px,2vw,24px)] text-[#333333] font-bold">
              ศูนย์บริการ Top Service Auto Technic หรือ TSAT เปิดให้บริการทั้ง 2
              สาขา สาขานิมิตรใหม่ 61 และ สาขารัชดาภิเษก 19
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <h6 className='text-xl md:text-[clamp(18px,2vw,24px)] text-[#333333] font-medium'>นัดหมายหรือเลือกเข้าใช้บริการบำรุงรักษารถของท่าน</h6>
            <div className='grid grid-cols-3'>
              <div className='flex flex-col items-center justify-center gap-1'>
                <Phone />
                <span className='text-sm md:text-[clamp(18px,2vw,22px)] text-[#8F2F34] font-bold'>02-069-9966</span>
              </div>
              <div className='flex flex-col items-center justify-center gap-1'>
                <Line />
                <span className='text-sm md:text-[clamp(18px,2vw,22px)] text-[#8F2F34] font-bold'>@TSAT</span>
              </div>
              <div className='flex flex-col items-center justify-center gap-1'>
                <Facebook />
                <span className='text-sm md:text-[clamp(18px,2vw,22px)] text-[#8F2F34] font-bold'>topserviceautotechnic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
