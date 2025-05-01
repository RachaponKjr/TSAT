'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import CardItemReview from './card-item-review';
function SwiperReview({ reviews }: { reviews: any }) {
    return (
        <Swiper
            breakpoints={{
                0: {
                    slidesPerView: 1.2,
                    spaceBetween: 0,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 0,
                },
            }}
            className='w-full max-w-full h-[320px] md:h-max'
        >
            {reviews.map((item: any, index: number) => (
                <SwiperSlide key={index} className='p-4 h-[233px] md:h-max'>
                    <CardItemReview item={item} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default SwiperReview