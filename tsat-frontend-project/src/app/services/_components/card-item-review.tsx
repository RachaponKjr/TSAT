import React from 'react'

function CardItemReview() {
    return (
        <div className='shadow-md bg-white rounded-[20px] p-5 w-full aspect-[16/18] text-xl flex flex-col justify-between'>
            <div className='space-y-4'>
                <div className='bg-neutral-100 w-full aspect-video rounded-[10px]'></div>
                <h6 className=' font-semibold text-sm md:text-base'>“เจออู่ที่ดูแลรถเหมือนเป็นรถตัวเองสักที บริการรวดเร็ว แถมอธิบายละเอียดมาก ประทับใจสุด ๆ”</h6>
            </div>
            <span className=' text-sm md:text-base'>K. Jane — Panamera S</span>
        </div>
    )
}

export default CardItemReview