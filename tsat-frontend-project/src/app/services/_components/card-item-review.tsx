import { Work } from '@/types/customer-work'
import Image from 'next/image'
import React from 'react'

function CardItemReview({ item }: { item: Work }) {
    console.log('item', item)
    return (
        <div
            style={{ boxShadow: 'rgba(0, 0, 0, 0.25) 3px 8px 24px, rgba(0, 0, 0, 0.01) 0px 10px 10px' }}
            className=' bg-white rounded-[20px] p-5 w-full h-full text-xl flex flex-col justify-between gap-4'>
            <div className='space-y-4'>
                <div className='overflow-hidden w-full aspect-video relative rounded-[10px]'>
                    <Image unoptimized src={`http://150.95.26.51:3131${item.images}`} alt="modelcar" fill className=' object-cover' />
                </div>
                {/* <h6 className=' font-semibold text-sm md:text-[clamp(14px,2vw,16px)] line-clamp-3'>{item.}</h6> */}
            </div>
            <span className=' text-sm md:text-[clamp(14px,2vw,16px)] line-clamp-1'>
                {item.title} — {item.carModel?.name}
                {item.carSubModel?.name && ` ${item.carSubModel.name}`}
            </span>
        </div>
    )
}

export default CardItemReview