import { Button } from 'antd';
import React from 'react';

const mockCards = [
  {
    tag: 'Macan',
    image: '../images/example.png',
    description:
      'ลูกค้าท่านใดที่ขับ Porsche แล้วเจอปัญหาแอร์ไม่เย็น ลองแวะมาตรวจเช็คอาการกับเรา!',
  },
  {
    tag: 'Cayenne',
    image: '../images/example.png',
    description: 'งานบำรุงรักษาระบบเบรก เปลี่ยนผ้าเบรกและเช็คระบบอย่างครบถ้วน',
  },
  {
    tag: '911',
    image: '../images/example.png',
    description: 'เปลี่ยนถ่ายของเหลว และตรวจสอบเครื่องยนต์แบบละเอียด',
  },
];

export default function CardImageWithTag() {
  return (
    <div className="px-4 sm:px-6  py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {mockCards.map((card, index) => (
          <div
            key={index}
            className="relative bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="w-full h-24 sm:h-24 md:h-24 overflow-hidden">
              <img
                src={card.image}
                alt={card.tag}
                className="w-full h-24 object-cover"
              />
              <div className="absolute top-2 left-2">
                <Button
                  type="primary"
                  size="small"
                  style={{
                    backgroundColor: '#8F2F34',
                    borderColor: '#8F2F34',
                  }}
                >
                  {card.tag}
                </Button>
              </div>
            </div>

            <div className="p-4">
              <div className="text-sm sm:text-base font-medium text-[#333333] leading-snug">
                {card.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
