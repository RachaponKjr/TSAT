import Image from 'next/image'
import React from 'react'

const ProductItem = () => {
    return (
        <div className='w-full aspect-square border rounded-xl p-2 space-y-2'>
            <Image src={''} alt='' width={400} height={400} className='bg-neutral-100 rounded-lg' />
            <h4 className='line-clamp-2 text-base font-semibold'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</h4>
            <div className='flex items-center gap-2 text-sm'>
                <span>
                    หมวดหมู่:
                </span>
                <span>
                    Lorem, ipsum.
                </span>
            </div>
            <div className='flex gap-2'>
                <button className='border border-green-400 text-green-500 w-full py-2 rounded-md font-semibold cursor-pointer text-sm'>ดูรายละเอียด</button>
                <button className='border border-red-400 text-red-500 w-full py-2 rounded-md font-semibold cursor-pointer text-sm'>ลบสินค้า</button>
            </div>
        </div>
    )
}

export default ProductItem