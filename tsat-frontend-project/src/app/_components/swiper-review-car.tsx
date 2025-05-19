'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { WorkService } from '@/components/carouselReview';
import ArrowL from '@/components/icons/arrow-l';
import ArrowR from '@/components/icons/arrow-r';
import { Navigation } from 'swiper/modules';
function SwiperReviewCar({ workservice }: { workservice: WorkService[] }) {
    return (
        <div className='w-full h-full relative'>
            <div className='hidden md:block absolute top-14 -left-16 z-20 cursor-pointer p-4 swiper-button-prev-service'>
                <ArrowL size={32} />
            </div>
            <Swiper
                    modules={[ Navigation]}
                    navigation={{
                      nextEl: '.swiper-button-next-service',
                      prevEl: '.swiper-button-prev-service',
                    }}
                breakpoints={{
                    0: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}
                className='w-full h-full relative'
            >
                {workservice.map((item, index) => (
                    <>
                        <SwiperSlide key={index}>
                            <div className='w-full space-y-2'>
                                <div className='w-full aspect-video relative rounded-lg overflow-hidden'>
                                    <Image src={`http://150.95.25.111:3131/${item.image}`} alt="modelcar" fill unoptimized className='bg-neutral-100 object-cover' />
                                </div>
                                <h4 className='text-[12px] md:text-xl text-white font-semibold'>{item.carModel.name} {item.carSubModel.name}</h4>
                            </div>
                        </SwiperSlide>
                    </>
                ))}
            </Swiper>
            <div className='hidden md:block absolute top-14 -right-16 z-20 cursor-pointer p-4 swiper-button-next-service'>
                <ArrowR size={32} />
            </div>
        </div>
    )
}

export default SwiperReviewCar