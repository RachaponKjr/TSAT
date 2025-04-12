import React from 'react';

const cardData = [
  {
    id: 1,
    image: '../images/kilo-check.png',
    title: 'เช็คระยะ 10,000 กม.',
    description:
      'ดูแลเบื้องต้น เพิ่มความมั่นใจ เหมาะสำหรับการดูแลประจำปี ให้รถขับลื่น มั่นใจทุกการเดินทาง',
    imageAlt: 'เช็คระยะ 10,000 กม.',
    mobileImage: '../images/kilo-mobile.png',
    mobileTitle: 'เช็คระยะ',
    mobileDistance: '10,000 กม.',
  },
  {
    id: 2,
    image: '../images/kilo-check.png',
    title: 'เช็คระยะ 20,000 กม.',
    description:
      'ตรวจเช็คระบบหลักของรถให้สมบูรณ์ พร้อมเปลี่ยนอะไหล่ตามอายุใช้งาน เพิ่มความมั่นใจระยะยาว',
    imageAlt: 'เช็คระยะ 20,000 กม.',
    mobileImage: '../images/kilo-mobile.png',
    mobileTitle: 'เช็คระยะ',
    mobileDistance: '20,000 กม.',
  },
  {
    id: 3,
    image: '../images/kilo-check.png',
    title: 'เช็คระยะ 40,000 กม.',
    description:
      'บริการเช็คลึกทุกระบบ ตรวจสอบสมรรถนะรถอย่างละเอียด เหมาะสำหรับรถที่วิ่งใช้งานมาก',
    imageAlt: 'เช็คระยะ 40,000 กม.',
    mobileImage: '../images/kilo-mobile.png',
    mobileTitle: 'เช็คระยะ',
    mobileDistance: '40,000 กม.',
  },
];

export default function CardServices({
  onCardClick,
}: {
  onCardClick?: () => void;
}) {
  return (
    <div className="w-full mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((card) => (
          <div key={card.id}>
            {/* Desktop View */}
            <div
              className="hidden sm:block cursor-pointer"
              onClick={onCardClick}
            >
              <div className="w-full h-[400px] bg-[#903035] rounded-2xl p-6 flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300">
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  className="h-40 w-auto mx-auto object-contain"
                />
                <div className="text-white mt-4 text-2xl font-bold text-center">
                  {card.title}
                </div>
                <div className="text-white mt-2 text-base text-center">
                  {card.description}
                </div>
              </div>
            </div>

            {/* Mobile View */}
            <div className="block sm:hidden" onClick={onCardClick}>
              <div className="bg-[#903035] rounded-xl px-3 py-4 text-white text-center flex flex-col items-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
                <img
                  src={card.mobileImage}
                  className="mb-2 object-contain h-16 w-16"
                  alt={card.imageAlt}
                />
                <div className="text-sm font-medium leading-tight">
                  {card.mobileTitle}
                </div>
                <div className="text-lg font-bold leading-tight">
                  {card.mobileDistance}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
