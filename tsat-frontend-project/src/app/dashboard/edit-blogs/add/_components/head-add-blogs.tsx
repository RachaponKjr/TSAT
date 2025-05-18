'use client'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const HeadAddBlogs = () => {
    const router = useRouter()
    return (
        <div className='text-xl leading-none font-bold h-8 text-[#333333] flex justify-between gap-4 items-center w-full max-w-full'>
            <div className='flex items-center gap-2'>
                <ChevronLeft className='cursor-pointer' onClick={() => router.back()} />
                <h6>เพิ่มบทความ</h6>
            </div>
            
        </div>
    )
}

export default HeadAddBlogs