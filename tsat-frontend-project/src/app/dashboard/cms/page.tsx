/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useState } from 'react'
import HomePage from './_components/home-page'
import ServicePage from './_components/service-page'
import ProductPage from './_components/product-page'
import CustomerPage from './_components/customer-page'
import AboutPage from './_components/about-page'
import ContactPage from './_components/contact-page'

const page = () => {
    const [activeTab, setActiveTab] = useState<string>('index1')
    const tabs = [
        {
            id: 'index1',
            label: 'จัดการหน้าเเรก (Home)',
        },
        {
            id: 'index2',
            label: 'จัดการหน้าเซอร์วิส (Service)',
        },
        {
            id: 'index3',
            label: 'จัดการหน้าสินค้า (Product)',
        },
        {
            id: 'index4',
            label: 'จัดการหน้าลูกค้า (Customer)',
        },
        {
            id: 'index5',
            label: 'จัดการหน้าเกี่ยวกับเรา (About)',
        },
        {
            id: 'index6',
            label: 'จัดการหน้าติดต่อเรา (Contact)',
        }
    ]
    return (
        <div className='flex flex-col w-full gap-2'>
            <div className='flex justify-between items-center w-full max-w-full'>
                <div className='text-xl font-bold text-[#333333] flex justify-between items-center w-full max-w-full h-max'>
                    <h6>หน้าจัดการเว็บไซต์</h6>
                </div>
                <div className='flex gap-4 min-w-max items-center'>
                    <span className='font-semibold'>เลือกหน้าจัดการ : </span>
                    <Select onValueChange={(e) => setActiveTab(e)}>
                        <SelectTrigger value={activeTab} className='w-[180px] !h-full'>
                            <SelectValue placeholder='หมวดหมู่' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>หน้าจัดการ</SelectLabel>
                                {tabs.map((tab, index) => (
                                    <SelectItem key={index} value={tab.id}>{tab.label}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {activeTab === 'index1' ? <HomePage /> : null}
            {activeTab === 'index2' ? <ServicePage /> : null}
            {activeTab === 'index3' ? <ProductPage /> : null}
            {activeTab === 'index4' ? <CustomerPage /> : null}
            {activeTab === 'index5' ? <AboutPage /> : null}
            {activeTab === 'index6' ? <ContactPage /> : null}
        </div>
    )
}

export default page