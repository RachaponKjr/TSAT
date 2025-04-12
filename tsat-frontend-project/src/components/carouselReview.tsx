'use client';

import React, { useState, useEffect } from 'react';
import { Button, Carousel } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const CarouselReview = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const carouselItems = [
    'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg',
    'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg',
    'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg',
    'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg',
    'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg',
    'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg',
  ];

  return (
    <div className="bg-[#8F2F34] py-16 md:py-24">
      <div className={`${isMobile ? 'px-4' : 'px-24'}`}>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 gap-4 md:gap-0">
          <div className="text-2xl md:text-3xl font-bold text-white text-center md:text-left">
            รีวิวงาน Service ของ TSAT
          </div>

          {/* ปุ่ม "ดูทั้งหมด" อยู่ข้างๆ ใน Desktop */}
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
              <img
                src={item}
                alt={`Carousel item ${index + 1}`}
                style={{
                  maxWidth: isMobile ? '100%' : '290px',
                  height: 'auto',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  display: 'block',
                  margin: '0 auto',
                }}
              />
              <div className="mt-2 text-white text-base md:text-xl text-center">
                Cayenne S E-Hybrid Coupé
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* สำหรับมือถือ ให้ปุ่ม "ดูทั้งหมด" อยู่ข้างล่าง */}
      {isMobile && (
        <div className="px-4 mt-8 text-center">
          <Button
            style={{
              border: '1px solid white',
              backgroundColor: 'transparent',
              color: 'white',
              fontSize: '1rem',
              padding: '0.75rem 2rem',
            }}
            className="hover:bg-white hover:text-black transition-all duration-300"
          >
            ดูทั้งหมด <PlusOutlined />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CarouselReview;
