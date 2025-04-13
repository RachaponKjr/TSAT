'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import CardItemReview from './card-item-review';
function SwiperReview() {
    return (
        <Swiper
            breakpoints={{
                0: {
                    slidesPerView: 1.3,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 25,
                },
            }}
        >
            {Array.from({ length: 6 }).map((_, index) => (
                <SwiperSlide key={index} className='p-2'>
                    <CardItemReview />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default SwiperReview