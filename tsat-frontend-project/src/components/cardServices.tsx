import React from 'react';
import SubCardServices from './subCardServices';

const cardData = [
  {
    id: 1,
    image: '../images/kilo-check.png',
    title: 'เช็คระยะ 10,000 กม.',
    description:
      'ดูแลเบื้องต้น เพิ่มความมั่นใจ เหมาะสำหรับการดูแลประจำปี ให้รถขับลื่น มั่นใจทุกการเดินทาง',
    imageAlt: 'Description of image',
    mobileImage: '../images/kilo-mobile.png',
    mobileTitle: 'เช็คระยะ',
    mobileDistance: '10,000 กม.',
  },
  {
    id: 1,
    image: '../images/kilo-check.png',
    title: 'เช็คระยะ 10,000 กม.',
    description:
      'ดูแลเบื้องต้น เพิ่มความมั่นใจ เหมาะสำหรับการดูแลประจำปี ให้รถขับลื่น มั่นใจทุกการเดินทาง',
    imageAlt: 'Description of image',
    mobileImage: '../images/kilo-mobile.png',
    mobileTitle: 'เช็คระยะ',
    mobileDistance: '10,000 กม.',
  },
  {
    id: 1,
    image: '../images/kilo-check.png',
    title: 'เช็คระยะ 10,000 กม.',
    description:
      'ดูแลเบื้องต้น เพิ่มความมั่นใจ เหมาะสำหรับการดูแลประจำปี ให้รถขับลื่น มั่นใจทุกการเดินทาง',
    imageAlt: 'Description of image',
    mobileImage: '../images/kilo-mobile.png',
    mobileTitle: 'เช็คระยะ',
    mobileDistance: '10,000 กม.',
  },
];

export default function CardServices() {
  return (
    <div className="w-full mt-12">
      {/* Grid layout for desktop view */}
      <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((card) => (
          <div key={card.id}>
            {/* Desktop View */}
            <div className="hidden sm:block">
              <div className="w-full h-[400px] rounded-2xl bg-[#903035] p-6 flex items-center">
                <div>
                  <img
                    src={card.image}
                    className="w-[600px]"
                    alt={card.imageAlt}
                  />
                  <div className="text-white mt-4 text-2xl font-bold">
                    {card.title}
                  </div>
                  <div className="text-xl mt-4 text-white">
                    {card.description}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile View */}
            <div className="block sm:hidden">
              <div className="flex justify-center">
                <div className="bg-[#903035] rounded-xl px-3 py-4 w-full text-white text-center flex flex-col items-center">
                  <img
                    src={card.mobileImage}
                    className="mb-2 object-contain"
                    alt="icon"
                  />
                  <div className="text-base font-medium leading-tight">
                    {card.mobileTitle}
                  </div>
                  <div className="text-lg font-bold leading-tight">
                    {card.mobileDistance}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
