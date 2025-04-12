'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Carousel } from 'antd';

export default function CarouselReview() {
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<any>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const carouselItems = new Array(6).fill(
    'https://media.discordapp.net/attachments/1237012614111039579/1360250694543610110/car-model.png?ex=67fa6fad&is=67f91e2d&hm=a6766f01a43465f3b1b5bdf11e8c50fbbd5cb3486d175b17a80a4fcc701e0663&=&format=webp&quality=lossless&width=576&height=456'
  );

  const ArrowSVG = ({ direction }: { direction: 'left' | 'right' }) => (
    <div
      onClick={() =>
        direction === 'left'
          ? carouselRef.current?.prev()
          : carouselRef.current?.next()
      }
      className={`absolute top-1/2 -translate-y-1/2 ${
        direction === 'left' ? 'left-0' : 'right-0'
      } z-20 cursor-pointer p-4`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="#8F2F34"
        width="36"
        height="36"
        className={`${
          direction === 'right' ? 'rotate-180' : ''
        } transition-transform duration-200`}
      >
        <path d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z" />
      </svg>
    </div>
  );

  return (
    <div className="bg-white py-24 relative">
      <div className="relative px-8 sm:px-16 md:px-24 z-10">
        <div className="relative">
          <ArrowSVG direction="left" />
          <ArrowSVG direction="right" />
          <Carousel
            ref={carouselRef}
            dots={false}
            arrows={false} // ปิด arrows เดิม
            infinite
            slidesToShow={isMobile ? 1 : 4} // แสดงแค่ 1 การ์ดสำหรับมือถือ
            slidesToScroll={1}
            responsive={[
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1, // สำหรับมือถือแสดงแค่ 1 การ์ด
                },
              },
            ]}
          >
            {carouselItems.map((item, index) => (
              <div
                key={index}
                className="px-2 flex flex-col items-center justify-center"
              >
                <img
                  src={item}
                  alt={`Carousel item ${index + 1}`}
                  style={{
                    maxWidth: '290px',
                    height: 'auto',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    display: 'block',
                    margin: '0 auto',
                  }}
                />
              </div>
            ))}
          </Carousel>
        </div>

        <img
          src="../images/base-model.png"
          className="absolute left-0 bottom-[-120px] w-full object-cover z-0"
          alt="Base shadow"
        />
      </div>
    </div>
  );
}
