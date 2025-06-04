'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import CardItemReview from './card-item-review';
import { Work } from '@/types/customer-work';
function SwiperReview({ reviews }: { reviews: Work[] }) {
    return (
        <Swiper
            breakpoints={{
                0: {
                    slidesPerView: 1.2,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
            }}
            className='w-full max-w-full xl:!overflow-visible !p-5 xl:!p-0 h-[320px] md:h-max'
        >
            {reviews.slice(0, 3).map((item: Work, index: number) => (
                <SwiperSlide key={index} className='h-[233px]  md:h-max'>
                    <CardItemReview item={item} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default SwiperReview