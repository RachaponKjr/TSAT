import Image from 'next/image'
import React from 'react'

function CardItemReview({ item }: { item: any }) {
    return (
        <div
            style={{ boxShadow: 'rgba(0, 0, 0, 0.25) 3px 8px 24px, rgba(0, 0, 0, 0.01) 0px 10px 10px' }}
            className=' bg-white rounded-[20px] p-5 w-full h-full text-xl flex flex-col justify-between gap-4'>
            <div className='space-y-4'>
                <div className='overflow-hidden w-full aspect-video relative rounded-[10px]'>
                    <Image src={`http://tsat-back:3131${item.image}`} alt="modelcar" fill className=' object-cover' />
                </div>
                <h6 className=' font-semibold text-sm md:text-[clamp(14px,2vw,16px)] line-clamp-3'>{item.review}</h6>
            </div>
            <span className=' text-sm md:text-[clamp(14px,2vw,16px)] line-clamp-1'>{item.customerName} — {item.carModel} {item.carSubModel}</span>
        </div>
    )
}

export default CardItemReview