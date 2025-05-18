/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import api from '@/server/api';
import { Service } from '@/types/service';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from './ui/dialog';
import { CarCatogory, CarModel } from '@/types/car-model';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ItemBox from './ui/item-box';
import { PlusIcon, X } from 'lucide-react';
import ArrowR from './icons/arrow-r';
import ArrowL from './icons/arrow-l';
import { Navigation, Pagination } from 'swiper/modules';
import Link from 'next/link';

export default function CardServices({
  onCardClick,
  services,
  carModel,
  customerWork
}: {
  onCardClick?: () => void;
  services: Service[]
  carModel: CarCatogory[]
  customerWork: any
}) {
  const [modelCar, setModelCar] = useState<CarCatogory[]>([])
  const swiperRef = useRef<any>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const getModelCar = useCallback(async () => {
    const res = await api.carModel.getCarModel();
    if (res.status === 200) {
      if (res.data && typeof res.data === 'object' && 'data' in res.data) {
        setModelCar((res.data as { data: CarCatogory[] }).data);
      }
    }
  }, [])

  if (!services || services.length === 0) {
    return <div className="text-white">ไม่มีบริการที่จะแสดง</div>;
  }

  useEffect(() => {
    void getModelCar();
  }, [getModelCar]);

  return (
    <div className="w-full mt-6 flex flex-col gap-5 xl:gap-8">
      <div className="grid grid-cols-3 lg:grid-cols-3 gap-2 xl:gap-8">
        {services.slice(0, 3).map((cardData, index) => (
          <Dialog key={index}>
            <DialogTrigger className="w-full flex items-stretch">
              <div className="w-full bg-gradient-to-b cursor-pointer from-[#C65359] to-[#8F2F34] rounded-md md:rounded-xl p-4 lg:p-6 flex flex-col gap-2 md:gap-5 items-center md:items-start">
                <div className='w-[50px] md:w-[80px] aspect-square relative'>
                  <Image src={cardData.icon} alt={cardData.title} fill className="object-contain" />
                </div>
                <div className="space-y-2 text-white text-center md:text-start">
                  <h5 className="text-[17px] lg:text-[22px] font-semibold">{cardData.title}</h5>
                  <span className="hidden lg:block text-base lg:text-xl font-medium ">{cardData.explain}</span>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className='overflow-y-auto h-full gap-[28px] md:max-h-[95vh] pb-8 md:max-w-[80vw]'>
              <DialogClose asChild>
                <button className="absolute top-4 right-4 bg-white border border-[#999999] rounded-full w-8 aspect-square flex items-center justify-center z-30">
                  <X size={20} />
                </button>
              </DialogClose>
              {/* ภาพด้านบน */}
              <Swiper
                slidesPerView={1}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                navigation={{
                  nextEl: '.swiper-button-next-service',
                  prevEl: '.swiper-button-prev-service',
                }}
                className='w-full min-h-[245px] md:min-h-[390px] relative'
                modules={[Pagination, Navigation]}
              >
                {cardData.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={`http://tsat-back:3131${image}`}
                      alt={cardData.title}
                      fill
                      objectFit='cover'
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className='flex justify-between items-center w-full h-max px-4 md:px-8'>
                {/* pagination */}
                <div className='flex gap-2 items-center'>
                  {cardData.images.map((_: any, index: number) => (
                    <div
                      key={index}
                      onClick={() => swiperRef.current?.slideTo(index)}
                      className={`
                      w-[24px] h-[6px] -skew-x-[24deg] cursor-pointer
                      ${index === activeIndex ? 'bg-[#8F2F34]' : 'bg-gray-400'}
                      transition-all
                      `}
                    />
                  ))}
                </div>
                <div className='flex gap-4 items-center'>
                  <ArrowL size={32} color='#8F2F34' className='cursor-pointer swiper-button-prev-service' />
                  <ArrowR size={32} color='#8F2F34' className='cursor-pointer swiper-button-next-service' />
                </div>
              </div>
              {/* กล่อง scroll ทั้งหมด */}
              <div className="w-full px-4 md:px-16 space-y-10 box-border">
                {/* หัวข้อ */}
                <div className="space-y-4">
                  <h2 className="text-[clamp(24px,4vw,30px)] font-bold text-[#8F2F34]">{cardData.serviceName}</h2>
                  <p
                    className="text-[clamp(16px,4vw,18px)] text-[#333333] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: cardData.serviceDetail }}
                  />
                </div>

                {/* Swiper คุมขนาด */}
                <div className="space-y-4 w-full relative border-y border-[#cccccc] py-[30px]">
                  <h3 className="text-2xl text-center md:text-left font-semibold text-[#8F2F34]">บริการเช็คระยะ Porsche ของท่าน</h3>
                  <div className="w-full ">
                    <div className="flex gap-4 min-w-max px-2">
                      <div className=' grid grid-cols-3 grid-rows-2 gap-4 w-full'>
                        {modelCar.map((item, index: number) => (
                          <div className='flex flex-col max-w-full aspect-video relative'>
                            <Image src={`http://tsat-back:3131/${item.image}`} alt={item.name} fill objectFit='contain' />
                            <Image src={`http://tsat-back:3131/${item.imageName}`} alt={item.name} width={150} height={150} className='absolute -bottom-5 left-1/2 -translate-x-1/2' />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ตัวอย่างงาน */}
                <div className="flex flex-col gap-5 w-full">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-semibold text-[#8F2F34]">ตัวอย่างงานบริการลูกค้า</h3>
                    <Link href={'/customer'} className=" hidden md:flex gap-1 h-[42px] w-[145px] hover:bg-[#8F2F34] hover:text-white justify-center items-center font-semibold rounded-sm duration-300 border border-[#8F2F34] text-[#8F2F34]">
                      ดูทั้งหมด <PlusIcon size={16} />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    {customerWork.works.slice(0, 3).map((item: any, index: number) => (
                      <ItemBox item={item} key={index} />
                    ))}
                  </div>
                  <Link href={'/customer'} className="h-[55px] md:hidden flex justify-center gap-2 items-center font-semibold rounded-sm border hover:bg-[#8F2F34] hover:text-white border-[#8F2F34] text-[#8F2F34]">
                    ดูทั้งหมด
                    <PlusIcon size={16} />
                  </Link>
                </div>
              </div>
            </DialogContent>


          </Dialog>
        ))}
      </div>
      <div className='grid grid-cols-2 lg:grid-cols-6 gap-5 xl:gap-8'>
        {services.slice(3, 9).map((item, index) => (
          <>
            <Dialog>
              <DialogTrigger className='cursor-pointer'>
                <div className="w-full h-full lg:h-max bg-gradient-to-b from-[#C65359] to-[#8F2F34] rounded-md md:rounded-xl p-4 lg:p-6 flex flex-row lg:flex-col gap-2 md:gap-5 items-center">
                  <div className='w-[50px] md:w-[80px] aspect-square relative'>
                    <Image src={item.icon} alt={item.title} fill className="object-contain" />
                  </div>
                  <div className=" text-white text-center">
                    <h5 className="text-[17px] md:text-lg lg:text-[22px] font-semibold">{item.title}</h5>
                    <span className="hidden lg:block text-base md:text-lg lg:text-xl font-medium">{item.explain}</span>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className='overflow-y-auto h-svh md:max-h-[95vh] md:max-w-[80vw]'>
                <DialogClose asChild>
                  <button className="absolute top-4 right-4 bg-white border border-[#999999] rounded-full w-8 aspect-square flex items-center justify-center z-30">
                    <X size={20} />
                  </button>
                </DialogClose>
                <Swiper
                  slidesPerView={1}
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                  navigation={{
                    nextEl: '.swiper-button-next-service',
                    prevEl: '.swiper-button-prev-service',
                  }}
                  className='w-full min-h-[245px] md:min-h-[390px] relative'
                  modules={[Pagination, Navigation]}
                >
                  {item.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        src={`http://tsat-back:3131${image}`}
                        alt={item.title}
                        fill
                        objectFit='cover'
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className='flex justify-between items-center w-full h-max px-4 md:px-8'>
                  {/* pagination */}
                  <div className='flex gap-2 items-center'>
                    {item.images.map((_: any, index: number) => (
                      <div
                        key={index}
                        onClick={() => swiperRef.current?.slideTo(index)}
                        className={`
                      w-[24px] h-[6px] -skew-x-[24deg] cursor-pointer
                      ${index === activeIndex ? 'bg-[#8F2F34]' : 'bg-gray-400'}
                      transition-all
                      `}
                      />
                    ))}
                  </div>
                  <div className='flex gap-4 items-center'>
                    <ArrowL size={32} color='#8F2F34' className='cursor-pointer swiper-button-prev-service' />
                    <ArrowR size={32} color='#8F2F34' className='cursor-pointer swiper-button-next-service' />
                  </div>
                </div>

                {/* กล่อง scroll ทั้งหมด */}
                <div className="w-full px-4 md:px-16 py-8 space-y-10 box-border">
                  {/* หัวข้อ */}
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold text-[#8F2F34]">{item.serviceName}</h2>
                    <p
                      className="text-lg text-[#333333] leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.serviceDetail }}
                    />
                  </div>

                  {/* Swiper คุมขนาด */}
                  <div className="space-y-4 w-full relative border-y border-[#cccccc] py-[30px]">
                    <h3 className="text-2xl text-center md:text-left font-semibold text-[#8F2F34]">บริการเช็คระยะ Porsche ของท่าน</h3>
                    <div className="w-full ">
                      <div className="flex gap-4 min-w-max px-2">
                        <div className=' grid grid-cols-3 grid-rows-2 gap-4 w-full'>
                          {modelCar.map((item, index: number) => (
                            <div className='flex flex-col max-w-full aspect-video relative'>
                              <Image src={`http://tsat-back:3131/${item.image}`} alt={item.name} fill objectFit='contain' />
                              <Image src={`http://tsat-back:3131/${item.imageName}`} alt={item.name} width={150} height={150} className='absolute -bottom-5 left-1/2 -translate-x-1/2' />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ตัวอย่างงาน */}
                  <div className="flex flex-col gap-5 w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-semibold text-[#8F2F34]">ตัวอย่างงานบริการลูกค้า</h3>
                      <Link href={'/customer'} className=" hidden md:flex gap-1 h-[42px] w-[145px] hover:bg-[#8F2F34] hover:text-white justify-center items-center font-semibold rounded-sm duration-300 border border-[#8F2F34] text-[#8F2F34]">
                        ดูทั้งหมด <PlusIcon size={16} />
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                      {customerWork.works.slice(0, 3).map((item: any, index: number) => (
                        <ItemBox item={item} key={index} />
                      ))}
                    </div>
                    <Link href={'/customer'} className="h-[55px] md:hidden flex justify-center gap-2 items-center font-semibold rounded-sm border hover:bg-[#8F2F34] hover:text-white border-[#8F2F34] text-[#8F2F34]">
                      ดูทั้งหมด
                      <PlusIcon size={16} />
                    </Link>
                  </div>
                </div>
              </DialogContent>
            </Dialog >
          </>
        ))}
      </div>
    </div >
  );
}
