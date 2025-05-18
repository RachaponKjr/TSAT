import Image from 'next/image'
import React from 'react'

import banner from '@/assets/images/banner-tsat.png'
import bannermobile from '@/assets/images/banner-contact.png'

const BannerBottom = () => {
    return (
        <div className='container mx-auto py-5 lg:py-10 px-4 xl:px-0'>
            <div className='w-full max-w-full h-[496px] lg:h-max rounded-[10px] lg:rounded-4xl relative overflow-hidden'>
                <Image src={banner} alt="banner" width={1600} height={1600} className='hidden lg:block w-full h-full object-cover' />
                <Image src={bannermobile} alt="banner" width={1600} height={1600} className='lg:hidden w-full h-full' />
                <div className='max-w-full absolute top-0 bottom-0 left-0 right-0 flex md:items-center justify-end px-10 py-10 md:py-0'>
                    <div className='w-full lg:max-w-[550px] text-[#8F2F34] flex flex-col gap-7'>
                        <span className='text-[clamp(20px,2.5vw,30px)] font-semibold text-center lg:text-start'>ที่ TSAT เราไม่ใช่แค่ศูนย์บริการ<br />
                            เราคือพาร์ทเนอร์ที่ดูแลรถคุณด้วยความใส่ใจ</span>
                        <div className='w-full flex flex-col lg:flex-row h-max gap-6 text-[clamp(14px,2.5vw,16px]'>
                            <button className='min-h-[54px] flex-1 rounded-sm lg:text-lg bg-white/60 lg:bg-white border font-semibold border-[#8F2F34]'>เลือกดูบริการ</button>
                            <button className='min-h-[54px] flex-1 rounded-sm lg:text-lg bg-white/60 lg:bg-white border font-semibold border-[#8F2F34]'>เลือกดูบริการ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannerBottom