import { PlusIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import car from '@/assets/images/car.png'

import cause_1 from '@/assets/images/cause_1.png'
import cause_2 from '@/assets/images/cause_2.png'
import cause_3 from '@/assets/images/cause_3.png'
import cause_4 from '@/assets/images/cause_4.png'
import Link from 'next/link';

const mockServices = [
  {
    title: 'อะไหล่แท้ทุกชิ้น <br/> การันตีคุณภาพ',
    image: cause_1,
  },
  {
    title: 'ของเหลวสารหล่อลื่น <br/> เกรดพรีเมี่ยม <br/> ราคามาตรฐาน <br/> คุ้มค่าการใช้งาน',
    image: cause_2,
  },
  {
    title: 'คุณภาพการซ่อมและดูแลรักษามาตรฐาน <br/> (TSAT PMS )',
    image: cause_3,
  },
  {
    title: 'การันตีคุณภาพ <br/> ด้วยผลงานกว่า 1,500 คัน',
    image: cause_4,
  },
];

export default function HeroWithCards({ headText, description1, description2 }: { headText: string, description1: string, description2: string }) {
  return (
    <div className="relative h-max w-full ">
      <Image
        src={car}
        alt='Car'
        fill
        className='absolute top-0 left-0 w-full h-full object-cover z-0'
      />
      <div className="absolute inset-0  bg-opacity-50 z-10" />
      <div className="relative container mx-auto z-20 w-full flex flex-col items-center justify-start h-max px-6 py-6 text-white text-center">
        <h1 className="text-3xl sm:text-[clamp(24px,5vw,36px] font-bold mb-4" dangerouslySetInnerHTML={{ __html: headText }} />
        <div className="text-base sm:text-[clamp(16px,2.5vw,20px] mb-6 flex flex-col gap-4 leading-relaxed">
          <p dangerouslySetInnerHTML={{ __html: description1 }} />
          <p dangerouslySetInnerHTML={{ __html: description2 }} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full  md:px-14">
          {mockServices.map((service, index) => (
            <div
              key={index}
              className="bg-white/90 rounded-xl text-black shadow-lg w-full p-2 flex flex-col aspect-[8/10]"
            >
              <h2 className="text-[clamp(14px,4vw,24px] font-semibold grow p-2 text-start" dangerouslySetInnerHTML={{ __html: service.title }} />
              <div className='w-full h-[50%] relative'>
                <Image src={service.image} alt={service.title} fill className='object-contain object-bottom' />
              </div>
            </div>
          ))}
        </div>
        <Link href={'/about'} className="mt-6 w-full md:max-w-[245px] h-[54px] bg-[#333333]/30 border text-lg font-semibold border-white text-white rounded-sm flex gap-2 items-center justify-center hover:bg-white hover:text-[#8F2F34] transition duration-300">
          เพิ่มเติมเกี่ยวกับเรา
          <PlusIcon size={20} />
        </Link>
      </div>
    </div>
  );
}
