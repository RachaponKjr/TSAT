import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import SwiperReview from './swiper-review'
import api from '@/server/api'
import Link from 'next/link';
import { Work } from '@/types/customer-work';

async function ReviewCustomer({ bgColor, headText }: { bgColor?: string, headText: string }) {
    const { data } = await api.customerWork.getCustomerWork() as { data: { works: Work[] } };
    return (
        <div className='py-10 px-0 xl:px-24 space-y-4 '
            style={{ backgroundColor: bgColor || 'white' }} // Default to white if no bgColor is provided
        >
            <div className='container mx-auto'>
                <div className='flex md:justify-between items-center px-6 text-[#8F2F34]'>
                    <h4 className='text-lg lg:text-3xl font-semibold' dangerouslySetInnerHTML={{ __html: headText }} />
                    <Link href={'/customer'} className='border hidden border-[#8F2F34] h-[54px] flex items-center justify-center w-[243px] hover:bg-[#8F2F34] hover:text-white duration-300 rounded-sm md:flex gap-2 text-lg font-semibold cursor-pointer'>ดูผลงานบริการทั้งหมด <PlusOutlined /></Link>
                </div>
                <div className='lg:pl-0'>
                    <SwiperReview reviews={data.works} />
                </div>
                <div className='px-4 pt-6 md:hidden flex'>
                    <Link href={'/customer'} className='border border-[#8F2F34] text-[#8F2F34] flex justify-center hover:bg-[#8F2F34] hover:text-white duration-300 rounded-md  gap-2 font-semibold cursor-pointer w-full h-[55px]  items-center'>ดูผลงานบริการทั้งหมด <PlusOutlined /></Link>
                </div>
            </div>
        </div>
    )
}

export default ReviewCustomer