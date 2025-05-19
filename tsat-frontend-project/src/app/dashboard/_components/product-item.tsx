'use client'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Product } from '@/types/product'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import Image from 'next/image'
import React, { useState } from 'react'
import DelItem from '../edit-review/_components/del-item'

const ProductItem = ({ item, getProduct }: { item: Product, getProduct: () => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onComplete = () => {
        void getProduct();
        setIsOpen(false);
    }

    return (
        <div className='w-full aspect-square border rounded-xl p-2 space-y-2'>
            <Image unoptimized src={`http://150.95.25.111:3131${item.imageProduct}`} alt='' width={400} height={400} className='bg-neutral-100 rounded-lg' />
            <h4 className='line-clamp-2 text-sm font-semibold'>{item.name}</h4>
            <div className='text-[13px] line-clamp-1'>
                <span>หมวดหมู่ : </span>
                <span className='font-semibold'>{item.category.name}</span>
            </div>
            <div className='flex gap-2'>
                <Popover>
                    <PopoverTrigger className='border border-green-400 text-green-500 w-full py-2 rounded-md font-semibold cursor-pointer text-sm'>
                        ดูรายละเอียด
                    </PopoverTrigger>
                    <PopoverContent side='top' align='start' className='duration-300 left-0 mb-2 bg-black/80 text-white p-4 max-w-[14rem] place-self-start rounded-lg text-sm'>{item.detail}</PopoverContent>
                </Popover>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger className='w-full'>
                        <button className='border border-red-400 text-red-500 w-full py-2 rounded-md font-semibold cursor-pointer text-sm'>ลบสินค้า</button>
                    </DialogTrigger>
                    <DialogContent className='max-w-[600px] max-h-[90vh] overflow-y-auto p-4'>
                        <DelItem id={item.id} apiPath='product/delete-product' onComplete={onComplete} />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default ProductItem