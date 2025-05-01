import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import SwiperReview from './swiper-review'
import api from '@/server/api'

async function ReviewCustomer({ bgColor }: { bgColor?: string }) {
    const { data } = await api.customerReview.getCustomerReview() as { data: any };
    console.log(data);
    return (
        <div className='py-10 px-0 xl:px-24 space-y-4 '
            style={{ backgroundColor: bgColor || 'white' }} // Default to white if no bgColor is provided
        >
            <div className='container mx-auto'>
                <div className='flex md:justify-between items-center px-6 text-[#8F2F34]'>
                    <h4 className='text-lg lg:text-3xl font-semibold'>รีวิวจริง จากลูกค้าของเรา</h4>
                    <button className='border hidden border-[#8F2F34] py-3 px-6 rounded-md md:flex gap-2 font-semibold cursor-pointer'>ดูผลงานบริการทั้งหมด <PlusOutlined /></button>
                </div>
                <div className='lg:pl-0'>
                    <SwiperReview reviews={data.reviews} />
                </div>
                <div className='px-4 pt-6 md:hidden flex'>
                    <button className='border border-[#8F2F34] text-[#8F2F34] py-3 px-6 rounded-md  gap-2 font-semibold cursor-pointer w-full h-[55px] place-content-center items-center'>ดูผลงานบริการทั้งหมด <PlusOutlined /></button>
                </div>
            </div>
        </div>
    )
}

export default ReviewCustomer