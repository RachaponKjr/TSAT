import { PlusIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import batteries from '@/assets/images/batteries.png'

const mockServices = [
  {
    title: 'อะไหล่แท้ทุกชิ้น การันตีคุณภาพ',
    image: '../images/batteries.png',
  },
  {
    title: 'ของเหลวสารหล่อลื่น เกรดพรีเมี่ยม ราคามาตรฐาน คุ้มค่าการใช้งาน',
    image: '../images/batteries.png',
  },
  {
    title: 'คุณภาพการซ่อมและดูแลรักษามาตรฐาน (TSAT PMS )',
    image: '../images/batteries.png',
  },
  {
    title: 'การันตีคุณภาพ ด้วยผลงานกว่า 1,500 คัน',
    image: '../images/batteries.png',
  },
];

export default function HeroWithCards() {
  return (
    <div className="relative h-max w-full ">
      {/* ภาพพื้นหลัง */}
      <img
        src="../images/car.png"
        alt="Car"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0  bg-opacity-50 z-10" />
      <div className="relative container mx-auto z-20 w-full flex flex-col items-center justify-start h-max px-6 py-10 text-white text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">
          เหตุผลที่เราเป็นที่1
        </h1>

        <div className="text-base sm:text-xl mb-10 leading-relaxed">
          TSAT เราเริ่มจากการเป็นผู้ใช้รถ Porsche และรถสมรรถนะสูงที่นำเข้าทั่วไปในสมัยก่อนมานานกว่า 10 ปี<br />และจากผู้ใช้รถ มาสู่ผู้เชี่ยวชาญในการซ่อมบำรุงรักษา<br /><br /> ตั้งแต่ปี 2017 จนถึงวันนี้ เราผ่านงานซ่อมรถ Porsche ทุกรุ่นมามากกว่า 1000 คัน<br /> เรากล้าการันตีว่าอู่ของเราเป็นอู่ที่มีความมุ่งมั่นจริงใจ ทั้งในด้านคุณภาพงานซ่อม และ ในด้านการให้บริการ<br />สำหรับท่านเจ้าของรถ Porsche ทุกท่าน ที่ดีที่สุดในประเทศไทย
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full  md:px-14">
          {mockServices.map((service, index) => (
            <div
              key={index}
              className="bg-white/90 rounded-xl p-4 text-black shadow-lg w-full flex flex-col aspect-[8/10]"
            >
              <h2 className="text-sm lg:text-xl font-semibold grow">{service.title}</h2>
              <div className='w-full h-[50%] relative'>
                <Image src={batteries} alt={service.title} fill className='object-contain object-bottom' />
              </div>
            </div>
          ))}
        </div>
        <button className="mt-6 w-full md:max-w-[250px] py-4 bg-[#333333]/30 border border-white text-white rounded-lg flex gap-2 items-center justify-center hover:bg-[#903035] transition duration-300">
          เพิ่มเติมเกี่ยวกับเรา
          <PlusIcon size={20} />
        </button>
      </div>
    </div>
  );
}
