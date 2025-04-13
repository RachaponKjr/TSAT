/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image';
import React from 'react';

import kilocheck from '@/assets/images/kilo-check.png'
import kilocheckmobile from '@/assets/images/kilo-mobile.png'

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
  {
    id: 4,
    image: '../images/kilo-check.png',
    title: 'เช็คระยะ 40,000 กม.',
    description:
      'บริการเช็คลึกทุกระบบ ตรวจสอบสมรรถนะรถอย่างละเอียด เหมาะสำหรับรถที่วิ่งใช้งานมาก',
    imageAlt: 'เช็คระยะ 40,000 กม.',
    mobileImage: '../images/kilo-mobile.png',
    mobileTitle: 'เช็คระยะ',
    mobileDistance: '40,000 กม.',
  },
  {
    id: 5,
    image: '../images/kilo-check.png',
    title: 'เช็คระยะ 40,000 กม.',
    description:
      'บริการเช็คลึกทุกระบบ ตรวจสอบสมรรถนะรถอย่างละเอียด เหมาะสำหรับรถที่วิ่งใช้งานมาก',
    imageAlt: 'เช็คระยะ 40,000 กม.',
    mobileImage: '../images/kilo-mobile.png',
    mobileTitle: 'เช็คระยะ',
    mobileDistance: '40,000 กม.',
  },
  {
    id: 6,
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
    <div className="w-full mt-12 flex flex-col gap-6">
      <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-6">
        {Array.from({ length: 3 }, (_, index) => (
          <>
            <div key={index} className='w-full aspect-square lg:aspect-[16/12] bg-gradient-to-b from-[#C65359] to-[#8F2F34] rounded-lg px-4 lg:p-6 flex flex-col gap-5'>
              <Image src={kilocheck} alt={cardData[0].imageAlt} width={500} height={500} />
              <div className='space-y-2 text-white'>
                <h5 className='text-base lg:text-[22px] text-center lg:text-start font-semibold'>เช็คระยะ 10,000 กม.</h5>
                <span className='hidden lg:block text-base lg:text-xl font-medium'>ดูแลเบื้องต้น เพิ่มความมั่นใจ <br /> เหมาะสำหรับการดูแลประจำปี ให้รถขับลื่น<br /> มั่นใจทุกการเดินทาง</span>
              </div>
            </div>
          </>
        ))}
      </div>
      <div className='grid grid-cols-2 lg:grid-cols-6 gap-6'>
        {Array.from({ length: 6 }, (_, index) => (
          <>
            <div key={index} className='w-full aspect-[16/8] lg:aspect-[16/12] flex items-center flex-row lg:flex-col gap-2 text-white bg-gradient-to-b from-[#C65359] to-[#8F2F34] p-6 rounded-lg'>
              <Image src={kilocheckmobile} alt={cardData[0].imageAlt} width={70} height={70} />
              <h4 className='text-base lg:text-xl font-semibold'>เครื่องยนต์</h4>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
