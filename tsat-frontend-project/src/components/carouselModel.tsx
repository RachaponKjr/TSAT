'use client';
import React from 'react';
import SwiperModelCar from '@/app/_components/swiper-model-car';

export default function CarouselReview() {


  // useEffect(() => {
  //   const checkMobile = () => setIsMobile(window.innerWidth < 768);
  //   checkMobile();
  //   window.addEventListener('resize', checkMobile);
  //   return () => window.removeEventListener('resize', checkMobile);
  // }, []);

  return (
    <div className="bg-white py-8 relative">
      <div className="px-4 sm:px-16 md:px-24">
        <div className="items-center">
          <div>
            <div className="text-3xl sm:text-2xl md:text-3xl font-semibold text-[#8F2F34]">
              เลือกดูบริการจาก Model Porsche ของท่าน
            </div>
            <div className="text-black text-lg sm:text-xl md:text-2xl font-medium mt-6">
              TSAT คือที่สุดของการดูแล Porsche
              ที่ตอบโจทย์ทุกความต้องการของคนรักรถหรู <br />
              เราคือทีมมืออาชีพที่เชี่ยวชาญด้าน Porsche โดยเฉพาะ
              ด้วยประสบการณ์ยาวนานและความใส่ใจในทุกรายละเอียด
            </div>
          </div>
          <SwiperModelCar />
          {/* <Button
            className="hover:bg-white hover:text-black transition-all duration-300 w-full"
          >
            ดูทั้งหมด <PlusOutlined />
          </Button> */}
        </div>
      </div>
    </div>
  );
}
