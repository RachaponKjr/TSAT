'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation } from 'swiper/modules'; // import โมดูล Grid
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';

import 'swiper/css/grid';
import { CarCatogory } from '@/types/car-model';
import api from '@/server/api';


function SwiperClientModel() {
    const [carModel, setCarModel] = useState<CarCatogory[]>([]);
    const getModel = useCallback(async () => {
        try {
            await api.carModel.getCarModel().then((res) => {
                const data = (res.data as { data: CarCatogory[] }).data;
                setCarModel(data);
            })
        } catch (e) {
            console.log(e);
        }
    }, [])

    useEffect(() => {
        void getModel();
    }, [getModel])
    return (
        <div className='relative w-full'>
            <div className='absolute top-1/2 -left-8 xl:-left-12 -translate-y-1/2 z-50 cursor-pointer'>
                <svg className=' swiper-button-prev-custom' width="36" height="24" viewBox="0 0 28 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.98325 6.75L7.18325 10.95L6.1145 12L0.114502 6L6.1145 0L7.18325 1.05L2.98325 5.25H27.1145V6.75H2.98325Z" fill="#8F2F34" />
                </svg>
            </div>
            <div className='absolute top-1/2 -right-8 xl:-right-12 -translate-y-1/2 z-50 cursor-pointer'>
                <svg className='swiper-button-next-custom' width="36" height="24" viewBox="0 0 28 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.0165 6.75L20.8165 10.95L21.8853 12L27.8853 6L21.8853 0L20.8165 1.05L25.0165 5.25H0.885254V6.75H25.0165Z" fill="#8F2F34" />
                </svg>
            </div>
            <Swiper
                navigation={{
                    nextEl: '.swiper-button-next-custom', // << ใช้ class
                    prevEl: '.swiper-button-prev-custom', // << ใช้ class
                }}
                modules={[Grid, Navigation]} // เพิ่มโมดูล Grid ลงใน modules prop
                breakpoints={{
                    0: {
                        slidesPerView: 1,           // 3 คอลัมน์บน mobile
                        spaceBetween: 15,           // ระยะห่างระหว่าง slides
                    },
                    768: {
                        slidesPerView: 4,           // สำหรับ desktop
                        spaceBetween: 45,
                        grid: {
                            rows: 1,                // กลับมาเป็น slider แบบปกติ
                        },
                    },
                }}
                className="w-full"
            >
                {carModel.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className='flex flex-col items-center'>
                            <Image src={`http://tsat-backend:3130/${item.image}`} alt="modelcar" width={500} height={500} />
                            <Image src={`http://tsat-backend:3130/${item.imageName}`} alt="modelcar" width={200} height={200} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default SwiperClientModel;
