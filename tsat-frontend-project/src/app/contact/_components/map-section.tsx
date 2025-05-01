'use client'
import Image from 'next/image'
import React from 'react'

import location1 from '@/assets/images/kkk.png'
import location2 from '@/assets/images/location2.png'
import Tabs from '@/components/tabs'

import map1 from '@/assets/images/map1.png'

const MapSection = () => {
    const tabs = [
        {
            id: 'index1',
            label: 'แผนที่โดยรวม',
            content: <Image src={map1} alt="" quality={100} width={600} height={600} />
        },
        {
            id: 'index2',
            label: 'เส้นทางที่ 1',
            content: <Image src={map1} alt="" quality={100}  width={600} height={600} />
        },
        {
            id: 'index3',
            label: 'เส้นทางที่ 2',
            content: <Image src={map1} alt="" quality={100} width={600} height={600} />
        },
        {
            id: 'index4',
            label: 'เส้นทางที่ 3',
            content: <Image src={map1} alt="" quality={100} width={600} height={600} />
        },
        {
            id: 'index5',
            label: 'เส้นทางที่ 4',
            content: <Image src={map1} alt="" quality={100} width={600} height={600} />
        },
        {
            id: 'index6',
            label: 'เส้นทางที่ 5',
            content: <Image src={map1} alt="" quality={100} width={600} height={600} />
        },
    ]
    return (
        <div className='px-4 mt-8 md:mt-14 flex flex-col gap-6 container mx-auto'>
            <div className='grid grid-cols-2 gap-4 md:gap-8 w-full md:w-[500px] md:place-self-center'>
                <div className='flex flex-col justify-center items-center gap-1'>
                    <span className='text-sm md:text-[clamp(18px,2vw,22px)] text-[#8F2F34] font-semibold'>สาขานิมิตรใหม่ 61</span>
                    <Image src={location1} alt="" width={600} height={600} />
                </div>
                <div className='flex flex-col justify-center items-center gap-1'>
                    <span className='text-sm md:text-[clamp(18px,2vw,22px)] text-[#999999] font-semibold'>สาขารัชดาภิเษก 19</span>
                    <Image src={location2} alt="" width={600} height={600} className='grayscale' />
                </div>
            </div>
            <button className='flex md:hidden h-[50px] w-[295px] place-content-center place-self-center bg-[#8F2F34] text-white px-3 !py-2 rounded-sm items-center gap-1 hover:bg-[#C65359]'>
                แผนที่การเดินทางผ่าน Google Map →
            </button>
            <button className='md:flex hidden h-[50px] w-max place-content-center place-self-center bg-[#8F2F34] text-white px-3 !py-2 rounded-sm items-center gap-1 hover:bg-[#C65359]'>
                แผนที่การเดินทางมาที่อู่นิมิตรใหม่ 61 ผ่าน Google Map →
            </button>
            <Tabs tabs={tabs} className='px-0 space-y-4 mb-8' />
        </div>
    )
}

export default MapSection