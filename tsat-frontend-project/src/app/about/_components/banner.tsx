import Image from 'next/image'
import React from 'react'

import banner from '@/assets/images/banner-tsat.png'

const BannerBottom = () => {
    return (
        <div className='container mx-auto py-10 px-4 xl:px-0'>
            <div className='w-full max-w-full h-max rounded-4xl relative overflow-hidden'>
                <Image src={banner} alt="banner" width={1600} height={1600} />
                <div className='w-full max-w-full absolute top-0 bottom-0 left-0 right-0 flex items-center justify-end px-10'>
                    <div className='max-w-[550px] text-[#8F2F34] flex flex-col gap-7'>
                        <span className='text-[clamp(16px,2.5vw,30px)] font-semibold'>ที่ TSAT เราไม่ใช่แค่ศูนย์บริการ<br />
                            เราคือพาร์ทเนอร์ที่ดูแลรถคุณด้วยความใส่ใจ</span>
                        <div className='w-full flex gap-6 text-[clamp(14px,2.5vw,16px]'>
                            <button className='xl:h-[54px] h-[42px] flex-1 rounded-sm bg-white border border-[#8F2F34]'>เลือกดูบริการ</button>
                            <button className='xl:h-[54px] h-[42px] flex-1 rounded-sm bg-white border border-[#8F2F34]'>เลือกดูบริการ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BannerBottom