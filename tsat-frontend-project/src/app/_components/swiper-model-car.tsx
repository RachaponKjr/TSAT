'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation } from 'swiper/modules'; // import โมดูล Grid
import 'swiper/css';
import Image from 'next/image';

import 'swiper/css/grid';
import { CarCatogory } from '@/types/car-model';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Plus, X } from 'lucide-react';
import Tabs from '@/components/tabs';
import ArrowL from '@/components/icons/arrow-l';
import ArrowR from '@/components/icons/arrow-r';
import ServiceModelCar from './service-modelcar';
import Link from 'next/link';

function SwiperModelCar({ data, slidesPerView = 4 }: { data: CarCatogory[], slidesPerView?: number }) {
  return (
    <div className='w-full h-full relative'>
      <div className='hidden md:block absolute top-14 -left-16 z-20 cursor-pointer p-4 swiper-button-prev-model'>
        <ArrowL size={32} color='#8F2F34' />
      </div>
      <Swiper
        modules={[Grid, Navigation]}
        navigation={{
          nextEl: '.swiper-button-next-model',
          prevEl: '.swiper-button-prev-model',
        }}
        breakpoints={{
          0: {
            slidesPerView: 3,
            spaceBetween: 15,
            grid: {
              rows: 2,
              fill: 'row'
            },
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 45,
            grid: {
              rows: 1,
            },
          },
        }}
        className="w-full max-w-full"
      >
        {data.map((item: CarCatogory) =>
        (
          <>
            <SwiperSlide key={item.id} className='w-[100vw] h-full'>
              <Dialog>
                <DialogTrigger
                  className='cursor-pointer w-full max-w-full'
                >
                  <div className='flex flex-col w-full gap-0 items-center'>
                    <div className='h-full relative'>
                      <Image
                        src={`http://150.95.25.111:3131/${item.image ?? 'default.jpg'}`}
                        alt={item.name || 'modelcar'}
                        width={500}
                        height={500}
                        className=' object-cover'
                      />
                    </div>
                    <Image
                      src={`http://150.95.25.111:3131/${item.imageName ?? 'default.jpg'}`}
                      alt={item.name || 'modelcar'}
                      width={200}
                      height={200}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className='overflow-y-auto h-full md:max-h-[95vh] md:max-w-[80vw]'>
                  <DialogClose asChild>
                    <button className="absolute top-4 right-4 bg-white border border-[#999999] rounded-full w-8 aspect-square flex items-center justify-center z-30">
                      <X size={20} />
                    </button>
                  </DialogClose>
                  <div className='w-full max-w-full h-max flex flex-col items-center justify-center py-6'>
                    <div className='relative h-max w-full max-w-full flex justify-center'>
                      <div className='absolute top-0 left-0 w-full h-[60%] bg-gradient-to-t from-[#999999] to-[#ffffff] opacity-20' />
                      <Image
                        src={`http://150.95.25.111:3131/${item.image ?? 'default.jpg'}`}
                        alt={item.name || 'modelcar'}
                        className='relative object-contain z-10'
                        objectPosition='bottom'
                        quality={100}
                        width={500}
                        height={500}
                      />
                      <Image
                        src={`http://150.95.25.111:3131/${item.imageName ?? 'default.jpg'}`}
                        alt={item.name || 'modelcar'}
                        className='absolute -top-4 object-contain'
                        quality={100}
                        width={500}
                        height={500}
                      />
                    </div>
                    <div className='w-full h-max max-w-full px-4 md:px-20 flex flex-col gap-8 '>
                      <div className='w-full flex flex-col gap-6'>
                        <h4
                          className='text-[#8F2F34] text-xl md:text-3xl font-semibold'
                        >หมวดหมู่บริการ ของ {item.name}
                        </h4>
                        <div className='grid grid-cols-2 gap-4 md:gap-y-4 md:gap-x-32'>
                          {item.categoryService.map((category: string) => (
                            <h6
                              key={category}
                              className='font-medium md:text-xl'
                            >
                              {category}
                            </h6>
                          ))}
                        </div>
                      </div>
                      <div className='w-full space-y-6'>
                        <div className='flex w-full justify-between'>
                          <h4
                            className='text-[#8F2F34] text-xl md:text-3xl font-semibold'
                          >ตัวอย่างงานบริการ {item.name}</h4>
                          <Link href={'/customer'} className='hidden md:flex gap-2 items-center cursor-pointer font-semibold justify-center border border-[#8F2F34] text-[#8F2F34] hover:bg-[#8F2F34] hover:text-white duration-300 rounded-md h-[42px] w-[145px] max-w-full'>
                            ดูทั้งหมด
                            <Plus />
                          </Link>
                        </div>

                        {item.carSubModels.length > 0 && (
                          <Tabs className='px-0 w-full items-start' tabs={item.carSubModels.map((subModel) => ({ id: subModel.id, label: subModel.name, content: <ServiceModelCar subCarModelId={subModel.id} /> }))} defaultActive={0} />
                        )}

                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </SwiperSlide>
          </>
        )
        )
        }
      </Swiper>
      <div className='hidden md:block absolute top-14 -right-16 z-20 cursor-pointer p-4 swiper-button-next-model'>
        <ArrowR size={32} color='#8F2F34' />
      </div>
    </div>
  );
}

export default SwiperModelCar;
