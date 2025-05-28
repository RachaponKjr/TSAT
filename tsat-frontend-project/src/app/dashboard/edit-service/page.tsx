import React from 'react'
import { Settings, Wrench } from 'lucide-react'
import AddService from './_components/add-service'
import TableService from './_components/table-service'

const page = () => {
    return (
        <div className='flex flex-col h-full gap-4 sm:gap-6'>
            {/* Header Section */}
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 pb-2 sm:pb-0'>
                {/* Page Title */}
                <div className='flex items-center justify-center lg:justify-start gap-2 sm:gap-3'>
                    <div className='p-2 bg-[#8F2F34]/10 rounded-lg hidden sm:flex'>
                        <Wrench className='text-[#8F2F34]' size={20} />
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-lg sm:text-xl font-bold text-[#333333]'>
                            จัดการ Service ต่างๆ
                        </h1>
                        <p className='text-xs sm:text-sm text-gray-500 hidden sm:block'>
                            เพิ่ม แก้ไข และจัดการบริการต่างๆ
                        </p>
                    </div>
                </div>

                {/* Action Button */}
                <div className='h-[48px]'>
                    <AddService />
                </div>
            </div>

            {/* Mobile Header for Table */}
            <div className='sm:hidden bg-[#8F2F34]/5 border border-[#8F2F34]/20 rounded-lg p-3'>
                <div className='flex items-center gap-2'>
                    <Settings size={16} className='text-[#8F2F34]' />
                    <span className='text-sm font-medium text-[#8F2F34]'>
                        รายการบริการ
                    </span>
                </div>
            </div>

            {/* Table Section */}
            <div className='flex-1 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden'>
                <div className='h-full overflow-y-auto'>
                    <TableService />
                </div>
            </div>

            {/* Mobile Bottom Spacer */}
            <div className='sm:hidden h-4'></div>
        </div>
    )
}

export default page