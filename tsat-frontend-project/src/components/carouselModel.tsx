'use client';
import React from 'react';
import SwiperModelCar from '@/app/_components/swiper-model-car';
import { CarCatogory } from '@/types/car-model';

export default function CarouselReview({ carModel, headText, description }: { carModel: CarCatogory, headText: string, description: string }) {
  const data = carModel.data.data as any;
  return (
    <div className="bg-white py-6 relative">
      <div className='absolute bottom-0 hidden md:block left-0 w-full h-[35%] bg-gradient-to-t from-[#FFFFFF] to-[#999999] opacity-20' />
      <div className="px-4 sm:px-16 md:px-4 xl:px-24 container mx-auto">
        <div className="items-center">
          <div>
            <div className="text-3xl sm:text-2xl md:text-[clamp(24px,6vw,30px)] font-semibold text-[#8F2F34]" dangerouslySetInnerHTML={{ __html: headText }} />
            <div className="text-black text-lg sm:text-xl md:text-[clamp(18px,2vw,24px)] font-medium mt-4" dangerouslySetInnerHTML={{ __html: description }} />
          </div>

          <SwiperModelCar data={data} />
        </div>
      </div>
    </div>
  );
}
