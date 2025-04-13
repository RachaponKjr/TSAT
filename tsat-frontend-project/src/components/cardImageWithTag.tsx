import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import ItemBox from './ui/item-box';

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
  {
    tag: 'Panamera',
    image: '../images/example.png',
    description: 'บริการตรวจเช็คช่วงล่าง แก้ไขปัญหาเสียงดังขณะขับขี่',
  },
  {
    tag: 'Boxster',
    image: '../images/example.png',
    description: 'เปลี่ยนแบตเตอรี่ใหม่ พร้อมระบบเช็คแบตอัตโนมัติ',
  },
  {
    tag: 'Taycan',
    image: '../images/example.png',
    description: 'ตรวจสอบระบบไฟฟ้าและอัพเดตซอฟต์แวร์ล่าสุด',
  },
];

export default function CardImageWithTag() {
  return (
    <div className="bg-[#F5F5F5] py-8 md:py-10 space-y-4">
      <div className="flex flex-col lg:flex-row justify-between px-6 lg:px-24 items-start lg:items-center gap-4">
        <div className="text-xl md:text-3xl font-bold text-[#8F2F34]">
          ตัวอย่างงานบริการลูกค้า
        </div>

        <div className="hidden lg:block">
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
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:px-24">
        {mockCards.map((card, index) => (
          // <div
          //   key={index}
          //   className="relative bg-white rounded-xl shadow-md overflow-hidden"
          // >
          //   <div className="w-full h-44 sm:h-52 md:h-60 overflow-hidden">
          //     <img
          //       src={card.image}
          //       alt={card.tag}
          //       className="w-full h-full object-cover"
          //     />

          //     <div className="absolute top-2 left-2 ">
          //       <Button
          //         type="primary"
          //         size="small"
          //         style={{
          //           backgroundColor: '#8F2F34',
          //           borderColor: '#8F2F34',
          //         }}
          //       >
          //         {card.tag}
          //       </Button>
          //     </div>
          //   </div>

          //   <div className="p-3 sm:p-4">
          //     <div className="text-sm sm:text-base font-semibold text-[#333333] leading-snug">
          //       {card.description}
          //     </div>
          //   </div>
          // </div>
          <>
            <ItemBox key={index}/>
          </>
        ))}
      </div>

      <div className="block lg:hidden text-center mt-12">
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
      </div>
    </div>
  );
}
