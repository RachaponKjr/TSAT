'use client';
import React from 'react';
import SwiperModelCar from '@/app/_components/swiper-model-car';
import { CarCatogory } from '@/types/car-model';

export default function CarouselReview({ carModel, headText, description }: { carModel: CarCatogory, headText: string, description: string }) {
  const data = carModel.data.data as any;
  return (
    <div className="bg-white py-6 relative">
      {/* <div className='absolute bottom-0 hidden md:block left-0 w-full h-[35%] bg-gradient-to-t from-[#FFFFFF] to-[#999999] opacity-20' /> */}
      <div className="px-4 sm:px-16 md:px-4 xl:px-24 container mx-auto">
        <div className="items-center">
          <div>
            <div className="text-[clamp(24px,2vw,30px)] font-bold text-[#8F2F34]" dangerouslySetInnerHTML={{ __html: headText }} />
            <div className="text-[#333333] text-[clamp(16px,2vw,20px)]  my-4" dangerouslySetInnerHTML={{ __html: description }} />
          </div>
          {data.length === 0 ? <div className="text-black text-center md:text-left mt-4">ไม่มีข้อมูล</div> :
            <SwiperModelCar data={data} />
          }
        </div>
      </div>
    </div>
  );
}
