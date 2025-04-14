import React from 'react';

import kk from '@/assets/images/kkk.png';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';


export default function CardLocation() {
  return (
    <div className="relative">
      <div className="relative z-10 grid grid-cols-2 gap-8  lg:px-24">
        <div className='space-y-4'>
          <Image src={kk} alt="" width={500} height={500} />
          <div className='flex flex-col justify-center items-center gap-1'>
            <span className='text-[#8F2F34] font-semibold md:text-2xl'>สาขานิมิตรใหม่ 61</span>
            <button className='bg-[#8F2F34] text-white px-3 py-1 rounded-full flex items-center gap-1 hover:bg-[#C65359]'>
              <span className=''>แผนที่</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
        <div className='space-y-4'>
          <Image src={kk} alt="" width={500} height={500} />
          <div className='flex flex-col justify-center items-center gap-1'>
            <span className='text-[#8F2F34] font-semibold md:text-2xl'>สาขานิมิตรใหม่ 61</span>
            <button className='bg-[#8F2F34] text-white px-3 py-1 rounded-full flex items-center gap-1 hover:bg-[#C65359]'>
              <span className=''>แผนที่</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
