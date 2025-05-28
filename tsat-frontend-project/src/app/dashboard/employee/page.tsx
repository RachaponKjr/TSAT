import api from '@/server/api'
import React from 'react'
import { Users, UserPlus, Shield } from 'lucide-react'
import TableUser from './_components/table-user'
import AddEmployee from './_components/add-empolyee'

const page = async () => {
    const getUser = await api.auth.getUser()
    const userData = getUser.data.data

    return (
        <div className='flex flex-col h-full gap-4 sm:gap-6'>
            {/* Header Section */}
            <div className='flex flex-row justify-between items-center gap-3 sm:gap-4 pb-2 sm:pb-0'>
                {/* Page Title */}
                <div className='flex items-center gap-2 sm:gap-3'>
                    <div className='p-2 bg-[#8F2F34]/10 rounded-lg hidden sm:flex'>
                        <Users className='text-[#8F2F34]' size={20} />
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-lg sm:text-xl font-bold text-[#333333]'>
                            จัดการข้อมูลพนักงาน
                        </h1>
                        <p className='text-xs sm:text-sm text-gray-500 hidden sm:block'>
                            {userData?.length || 0} พนักงานทั้งหมด
                        </p>
                    </div>
                </div>

                {/* Action Button */}
                <div className='flex justify-end sm:justify-start'>
                    <AddEmployee />
                </div>
            </div>

            {/* Stats Cards - Mobile Only */}
            <div className='grid grid-cols-2 sm:hidden gap-3'>
                <div className='bg-white p-3 rounded-lg border border-gray-200 shadow-sm'>
                    <div className='flex items-center gap-2'>
                        <Users size={16} className='text-[#8F2F34]' />
                        <span className='text-xs font-medium text-gray-600'>ทั้งหมด</span>
                    </div>
                    <p className='text-lg font-bold text-gray-800 mt-1'>
                        {userData?.length || 0} คน
                    </p>
                </div>
                
                <div className='bg-white p-3 rounded-lg border border-gray-200 shadow-sm'>
                    <div className='flex items-center gap-2'>
                        <Shield size={16} className='text-blue-500' />
                        <span className='text-xs font-medium text-gray-600'>ผู้ดูแล</span>
                    </div>
                    <p className='text-lg font-bold text-gray-800 mt-1'>
                        {userData?.filter(user => user.role === 'ADMIN' || user.role === 'OWNER').length || 0} คน
                    </p>
                </div>
            </div>

            {/* Mobile Header for Table */}
            <div className='sm:hidden bg-[#8F2F34]/5 border border-[#8F2F34]/20 rounded-lg p-3'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <Users size={16} className='text-[#8F2F34]' />
                        <span className='text-sm font-medium text-[#8F2F34]'>
                            รายการพนักงาน
                        </span>
                    </div>
                    <span className='text-sm font-bold text-[#8F2F34]'>
                        {userData?.length || 0} คน
                    </span>
                </div>
            </div>

            {/* Table Section */}
            <div className='flex-1'>
                <TableUser userData={userData} />
            </div>

            {/* Mobile Bottom Spacer */}
            <div className='sm:hidden h-4'></div>
        </div>
    )
}

export default page