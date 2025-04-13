'use client';

import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import SwiperReviewCar from '@/app/_components/swiper-review-car';
import ArrowL from './icons/arrow-l';
import ArrowR from './icons/arrow-r';

const CarouselReview = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="bg-[#8F2F34] py-8 md:py-8 relative">
      <div className={`${isMobile ? 'px-4' : 'px-24'}`}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 gap-4 md:gap-0">
          <div className="text-2xl md:text-3xl font-bold text-white text-center md:text-left">
            รีวิวงาน Service ของ TSAT
          </div>

          {!isMobile && (
            <Button
              style={{
                border: '1px solid white',
                backgroundColor: 'transparent',
                color: 'white',
                fontSize: '1.25rem',
                padding: '1.5rem 6rem',
              }}
              className="hover:bg-white hover:text-black transition-all duration-300"
            >
              ดูทั้งหมด <PlusOutlined />
            </Button>
          )}
        </div>
      </div>
      <div className='px-4 md:px-24'>
        <div className='hidden md:block absolute top-1/2 translate-y-1 left-0 z-20 cursor-pointer p-4'>
          <ArrowL size={32} />
        </div>
        <SwiperReviewCar />
        <div className='hidden md:block absolute top-1/2 translate-y-1 right-0 z-20 cursor-pointer p-4'>
          <ArrowR size={32} />
        </div>
      </div>

      {/* btn mobile */}
      <div className='flex gap-8 justify-center items-center mt-4 md:hidden px-8'>
        <ArrowL size={32} />
        <button className='grow py-3 border rounded-lg text-white'>
          ดูทั้งหมด <PlusOutlined />
        </button>
        <ArrowR size={32} />
      </div>

    </div >
  );
};

export default CarouselReview;
