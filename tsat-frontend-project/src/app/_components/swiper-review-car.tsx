'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import ArrowL from '@/components/icons/arrow-l';
import ArrowR from '@/components/icons/arrow-r';
import { Navigation } from 'swiper/modules';
import { Work } from '@/types/customer-work';
import Link from 'next/link';

function SwiperReviewCar({ workservice }: { workservice: Work[] }) {
    return (
        <div className='w-full h-full relative'>
            <div className='hidden lg:block absolute top-14 -left-16 z-20 cursor-pointer p-4 swiper-button-prev-service'>
                <ArrowL size={32} />
            </div>
            <Swiper
                modules={[Navigation]}
                navigation={{
                    nextEl: '.swiper-button-next-service',
                    prevEl: '.swiper-button-prev-service',
                }}
                breakpoints={{
                    0: {
                        slidesPerView: 2.2,
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
                    item.isShow &&
                    <SwiperSlide key={item.id || index}>
                        <Link href={`/customer/${item.id}`} className='w-full space-y-2 cursor-pointer'>
                            <div className='w-full aspect-video relative rounded-lg overflow-hidden'>
                                <Image
                                    src={`http://150.95.26.51:3131${item.images}`}
                                    alt={`${item.carModel} review`}
                                    fill
                                    unoptimized
                                    className='bg-neutral-100 object-cover'
                                />
                            </div>
                            <h4 className='text-[12px] md:text-lg line-clamp-2 text-white font-semibold'>
                                {item.title}
                            </h4>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className='hidden lg:block absolute top-14 -right-16 z-20 cursor-pointer p-4 swiper-button-next-service'>
                <ArrowR size={32} />
            </div>
        </div>
    )
}

export default SwiperReviewCar