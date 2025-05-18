'use client';

import React, { useState, useEffect } from 'react';
import { Button, Carousel } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Link from 'next/link';

const CarouselReview = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const carouselItems = [
    '../images/review.png',
    '../images/review.png',
    '../images/review.png',
    '../images/review.png',
    '../images/review.png',
    '../images/review.png',
  ];

  return (
    <div className="bg-[#f5f5f5] py-16 md:py-24">
      <div className={`${isMobile ? 'px-4' : 'px-24'}`}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 gap-4 md:gap-0">
          <div className="text-2xl md:text-3xl font-bold text-[#8F2F34] text-center md:text-left">
            รีวิวงาน Service ของ TSAT
          </div>

          {!isMobile && (
            <Button
              style={{
                border: '1px solid #8F2F34',
                backgroundColor: 'transparent',
                color: '#8F2F34',
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

      <div className={`${isMobile ? 'px-4' : 'px-32'}`}>
        <Carousel
          dots={false}
          infinite
          arrows={false}
          slidesToShow={isMobile ? 1 : 4}
          autoplay
          autoplaySpeed={3000}
        >
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center px-2"
            >
              <div className="bg-white rounded-xl py-4 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <img
                  src={item}
                  alt={`Carousel item ${index + 1}`}
                  style={{
                    maxWidth: isMobile ? '100%' : 'w-full',
                    height: 'auto',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    display: 'block',
                    margin: '0 auto',
                  }}
                />
                <div className="mt-12 text-[#8F2F34] text-base md:text-xl  px-4  font-semibold">
                  เช็คระยะ ลงโปรแกรมใหม่ รถขับดีขึ้นชัดเจน รู้สึกเหมือน
                  ได้รถใหม่กลับบ้าน
                </div>
                <div className="mt-2 text-gray-600 text-sm md:text-base  px-4">
                  K. John — Cayenne Turbo
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {isMobile && (
        <div className="px-4 mt-8 text-center">
          <Link
            href={'/customer'}
            className="hover:bg-white hover:text-[#8F2F34] transition-all duration-300"
          >
            ดูทั้งหมด <PlusOutlined />
          </Link>
        </div>
      )}
    </div>
  );
};

export default CarouselReview;
