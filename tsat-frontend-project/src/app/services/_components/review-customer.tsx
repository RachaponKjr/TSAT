import React from 'react'
import CardItemReview from './card-item-review'
import { PlusOutlined } from '@ant-design/icons'
import SwiperReview from './swiper-review'

function ReviewCustomer({ bgColor }: { bgColor?: string }) {
    return (
        <div className='py-10 px-0 lg:px-24 space-y-4'
            style={{ backgroundColor: bgColor || 'white' }} // Default to white if no bgColor is provided
        >
            <div className='flex lg:justify-between items-center px-6 text-[#8F2F34]'>
                <h4 className='text-lg lg:text-3xl font-semibold'>รีวิวจริง จากลูกค้าของเรา</h4>
                <button className='border hidden border-[#8F2F34] py-3 px-6 rounded-md md:flex gap-2 font-semibold cursor-pointer'>ดูผลงานบริการทั้งหมด <PlusOutlined /></button>
            </div>
            <div className='pl-6 lg:pl-0'>
                <SwiperReview />
            </div>
        </div>
    )
}

export default ReviewCustomer