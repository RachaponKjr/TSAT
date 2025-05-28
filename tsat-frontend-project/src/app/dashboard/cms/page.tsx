/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Settings, ChevronDown } from 'lucide-react'
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
            label: 'จัดการหน้าแรก (Home)',
            shortLabel: 'หน้าแรก'
        },
        {
            id: 'index2',
            label: 'จัดการหน้าเซอร์วิส (Service)',
            shortLabel: 'เซอร์วิส'
        },
        {
            id: 'index3',
            label: 'จัดการหน้าสินค้า (Product)',
            shortLabel: 'สินค้า'
        },
        {
            id: 'index4',
            label: 'จัดการหน้าลูกค้า (Customer)',
            shortLabel: 'ลูกค้า'
        },
        {
            id: 'index5',
            label: 'จัดการหน้าเกี่ยวกับเรา (About)',
            shortLabel: 'เกี่ยวกับเรา'
        },
        {
            id: 'index6',
            label: 'จัดการหน้าติดต่อเรา (Contact)',
            shortLabel: 'ติดต่อเรา'
        }
    ]

    const getCurrentTabLabel = () => {
        const currentTab = tabs.find(tab => tab.id === activeTab)
        return currentTab ? currentTab.label : 'เลือกหน้า'
    }

    const getCurrentShortLabel = () => {
        const currentTab = tabs.find(tab => tab.id === activeTab)
        return currentTab ? currentTab.shortLabel : 'เลือกหน้า'
    }

    const renderContent = () => {
        switch(activeTab) {
            case 'index1': return <HomePage />
            case 'index2': return <ServicePage />
            case 'index3': return <ProductPage />
            case 'index4': return <CustomerPage />
            case 'index5': return <AboutPage />
            case 'index6': return <ContactPage />
            default: return <HomePage />
        }
    }

    return (
        <div className='flex flex-col w-full gap-4 sm:gap-6'>
            {/* Header Section */}
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 w-full'>
                {/* Page Title */}
                <div className='flex items-center justify-center lg:justify-start gap-2'>
                    <Settings className='text-[#8F2F34] hidden sm:block' size={24} />
                    <h6 className='text-lg sm:text-xl font-bold text-[#333333]'>
                        หน้าจัดการเว็บไซต์
                    </h6>
                </div>

                {/* Tab Selector */}
                <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4'>
                    <span className='font-semibold text-sm sm:text-base text-gray-700 hidden sm:block'>
                        เลือกหน้าจัดการ :
                    </span>
                    
                    <Select value={activeTab} onValueChange={(e) => setActiveTab(e)}>
                        <SelectTrigger className='w-full sm:w-[220px] h-10 sm:h-[2.5rem] bg-white border-gray-300'>
                            <div className='flex items-center gap-2 w-full'>
                                <Settings size={16} className='text-[#8F2F34] sm:hidden flex-shrink-0' />
                                <SelectValue>
                                    <span className='sm:hidden'>{getCurrentShortLabel()}</span>
                                    <span className='hidden sm:inline'>{getCurrentTabLabel()}</span>
                                </SelectValue>
                            </div>
                        </SelectTrigger>
                        <SelectContent className='w-full sm:w-[280px]'>
                            <SelectGroup>
                                <SelectLabel className='font-semibold text-[#8F2F34]'>
                                    หน้าจัดการ
                                </SelectLabel>
                                {tabs.map((tab, index) => (
                                    <SelectItem 
                                        key={index} 
                                        value={tab.id}
                                        className='py-2 px-3 hover:bg-gray-50 focus:bg-[#8F2F34]/10'
                                    >
                                        <div className='flex flex-col'>
                                            <span className='font-medium'>{tab.shortLabel}</span>
                                            <span className='text-xs text-gray-500 hidden sm:block'>
                                                {tab.label}
                                            </span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Current Page Indicator - Mobile */}
            <div className='sm:hidden bg-[#8F2F34]/5 border border-[#8F2F34]/20 rounded-lg p-3'>
                <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-[#8F2F34] rounded-full'></div>
                    <span className='text-sm font-medium text-[#8F2F34]'>
                        กำลังจัดการ: {getCurrentTabLabel()}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
                <div className='p-4 sm:p-6'>
                    {renderContent()}
                </div>
            </div>

            {/* Navigation Tabs - Alternative Mobile View (Optional) */}
            <div className='sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10'>
                <div className='flex overflow-x-auto px-2 py-2 gap-1'>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                                activeTab === tab.id
                                    ? 'bg-[#8F2F34] text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {tab.shortLabel}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bottom Spacer for Mobile Navigation */}
            <div className='sm:hidden h-16'></div>
        </div>
    )
}

export default page