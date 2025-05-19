'use client';

import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SwiperReviewCar from '@/app/_components/swiper-review-car';
import ArrowL from './icons/arrow-l';
import ArrowR from './icons/arrow-r';
import Link from 'next/link';

export interface WorkService {
  id: string;
  image: string;
  carModel: {
    id: string;
    name: string;
    image: string;
  };
  carSubModel: {
    id: string;
    name: string;
    image: string;
  };
}

export type WorksServiceProps = {
  status: number;
  data: WorkService[];
};

const CarouselReview = ({ workservice, headText }: { workservice: WorksServiceProps, headText: string }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="bg-[#8F2F34] py-8 md:py-8 relative">
      <div className={`px-4 xl:px-24 container mx-auto`}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4 md:gap-0">
          <div className="text-2xl md:text-[clamp(24px,6vw,30px)] font-bold text-white text-center md:text-left" dangerouslySetInnerHTML={{ __html: headText }} />

          {!isMobile && (
            <Link
              href={'/customer'}
              className="hover:bg-white hover:text-[#8F2F34] h-[54px] w-[243px] border border-white flex items-center justify-center rounded-sm text-white text-lg font-semibold gap-1 transition-all duration-300"
            >
              ดูทั้งหมด <PlusOutlined />
            </Link>
          )}
        </div>
      </div>
      <div className='px-4 md:px-24 container mx-auto'>
        {workservice.data.length === 0 ? <div className="text-white text-center md:text-left mt-4">ไม่มีข้อมูล</div> :
          <SwiperReviewCar workservice={workservice.data} />
        }
      </div>

      {/* btn mobile */}
      <div className='flex gap-8 justify-center items-center mt-4 md:hidden px-8 container mx-auto'>
        <ArrowL className='swiper-button-prev-service' size={32} />
        <Link href={'/customer'} className='grow flex justify-center items-center py-3 border rounded-lg text-white'>
          ดูทั้งหมด <PlusOutlined />
        </Link>
        <ArrowR className='swiper-button-next-service' size={32} />
      </div>

    </div >
  );
};

export default CarouselReview;
