/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { getCookie } from '@/lib/cookie'
import api from '@/server/api'
import { ResBlog } from '@/server/api/customer-work'
import { Button } from 'antd'
import { Plus, X, BookOpen, AlertTriangle, Edit } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

const page = () => {
    const [dataBlogs, setDataBlogs] = useState<ResBlog[]>([])
    const [selectedBlog, setSelectedBlog] = useState<ResBlog | null>(null)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const getBlogs = useCallback(async () => {
        try {
            const { data } = await api.customerWork.getCustomerWork()
            setDataBlogs(data?.works)
        } catch (error) {
            console.log(error)
        }
    }, [])

    const deleteBlog = useCallback(async (id: string) => {
        const accept_token = await getCookie('access_token')
        try {
            const res = await fetch(`http://150.95.26.51:3131/api/v1/customer-work/delete-work/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accept_token}`
                }
            })
            if (res.status === 200) {
                toast.success('ลบบทความสําเร็จ', { className: '!text-green-500' })
                setIsDeleteOpen(false)
                setSelectedBlog(null)
                getBlogs()
            } else {
                toast.error('ลบบทความไม่สําเร็จ', { className: '!text-red-500' })
            }
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาด', { className: '!text-red-500' })
        }
    }, [getBlogs])

    const handleDeleteClick = (blog: BlogItem) => {
        setSelectedBlog(blog)
        setIsDeleteOpen(true)
    }

    useEffect(() => {
        getBlogs()
    }, [getBlogs])

    // Empty State
    if (dataBlogs.length === 0) {
        return (
            <div className='space-y-6'>
                {/* Header */}
                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
                    <div className='flex items-center gap-2 sm:gap-3'>
                        <div className='p-2 bg-[#8F2F34]/10 rounded-lg hidden sm:flex'>
                            <BookOpen className='text-[#8F2F34]' size={20} />
                        </div>
                        <div>
                            <h6 className='text-lg sm:text-xl font-bold text-[#333333]'>
                                จัดการบทความ
                            </h6>
                            <p className='text-xs sm:text-sm text-gray-500 hidden sm:block'>
                                เพิ่ม แก้ไข และจัดการบทความต่างๆ
                            </p>
                        </div>
                    </div>
                    <Link 
                        href={'/dashboard/edit-blogs/add'} 
                        className='flex items-center justify-center gap-2 bg-[#8F2F34] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#C65359] transition-colors font-medium'
                    >
                        <Plus size={16} />
                        <span className='text-sm'>เพิ่มบทความ</span>
                    </Link>
                </div>

                {/* Empty State */}
                <div className='flex flex-col items-center justify-center py-16 text-gray-500'>
                    <BookOpen size={64} className='mb-6 text-gray-300' />
                    <h3 className='text-xl font-semibold mb-2 text-gray-600'>
                        ยังไม่มีบทความ
                    </h3>
                    <p className='text-center mb-6 text-gray-500'>
                        เริ่มต้นสร้างบทความแรกของคุณเพื่อแชร์เรื่องราวและประสบการณ์
                    </p>
                    <Link 
                        href={'/dashboard/edit-blogs/add'} 
                        className='flex items-center gap-2 bg-[#8F2F34] text-white px-6 py-3 rounded-lg hover:bg-[#C65359] transition-colors font-medium'
                    >
                        <Plus size={18} />
                        <span>สร้างบทความแรก</span>
                    </Link>
                </div>
            </div>
        )
    }


    return (
        <>
            <div className='space-y-4 sm:space-y-6'>
                {/* Header */}
                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
                    <div className='flex items-center gap-2 sm:gap-3'>
                        <div className='p-2 bg-[#8F2F34]/10 rounded-lg hidden sm:flex'>
                            <BookOpen className='text-[#8F2F34]' size={20} />
                        </div>
                        <div >
                            <h6 className='text-lg sm:text-xl font-bold text-[#333333]'>
                                จัดการบทความ
                            </h6>
                            <p className='text-xs sm:text-sm text-gray-500 hidden sm:block'>
                                {dataBlogs.length} บทความทั้งหมด
                            </p>
                        </div>
                    </div>
                    <Link 
                        href={'/dashboard/edit-blogs/add'} 
                        className='flex items-center justify-center gap-2 bg-[#8F2F34] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#C65359] transition-colors font-medium'
                    >
                        <Plus size={16} />
                        <span className='text-sm'>เพิ่มบทความ</span>
                    </Link>
                </div>

                {/* Mobile Header */}
                <div className='sm:hidden bg-[#8F2F34]/5 border border-[#8F2F34]/20 rounded-lg p-3'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <BookOpen size={16} className='text-[#8F2F34]' />
                            <span className='text-sm font-medium text-[#8F2F34]'>
                                บทความทั้งหมด
                            </span>
                        </div>
                        <span className='text-sm font-bold text-[#8F2F34]'>
                            {dataBlogs.length} บทความ
                        </span>
                    </div>
                </div>

                {/* Blog Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6'>
                    {dataBlogs.map((item: ResBlog, index: number) => (
                        <div key={item.id} className='group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden'>
                            {/* Image Container */}
                            <div className='relative aspect-video bg-gray-100 overflow-hidden'>
                                <Badge className='absolute top-2 left-2 z-10 bg-white/90 text-gray-700 shadow-sm'>
                                    {item.carModel || "ไม่พบ"}
                                </Badge>
                                
                                {/* Delete Button */}
                                <button
                                    onClick={() => handleDeleteClick(item)}
                                    className='absolute top-2 right-2 z-10 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors shadow-sm opacity-100 md:opacity-0 group-hover:opacity-100'
                                >
                                    <X size={16} />
                                </button>

                                {/* Edit Button - Optional */}
                                <Link
                                    href={`/dashboard/edit-blogs/edit/${item.id}`}
                                    className='absolute top-2 right-12 z-10 w-8 h-8 bg-[#8F2F34] hover:bg-[#C65359] text-white rounded-full flex items-center justify-center transition-colors shadow-sm opacity-100 md:opacity-0 group-hover:opacity-100'
                                >
                                    <Edit size={14} />
                                </Link>

                                <Image 
                                    unoptimized 
                                    src={`http://150.95.26.51:3131${item.images}`} 
                                    alt={item.title || "blog image"} 
                                    fill 
                                    className='object-cover group-hover:scale-105 transition-transform duration-200' 
                                />
                            </div>

                            {/* Content */}
                            <div className='p-3 sm:p-4'>
                                <h4 className='font-semibold text-gray-800 text-sm sm:text-base line-clamp-2 leading-tight'>
                                    {item.title}
                                </h4>
                                
                                {/* Optional: Add more metadata */}
                                <div className='mt-2 pt-2 border-t border-gray-100 hidden sm:block'>
                                    <div className='flex items-center justify-between text-xs text-gray-500'>
                                        <span>บทความ #{index + 1}</span>
                                        <span className='text-[#8F2F34] font-medium'>
                                            {item.carModel || "ไม่พบ"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className='max-w-[95vw] sm:max-w-lg p-4 sm:p-6'>
                    <div className='flex flex-col items-center text-center'>
                        <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4'>
                            <AlertTriangle className='text-red-500' size={32} />
                        </div>
                        
                        <h2 className='text-lg sm:text-xl font-semibold text-gray-800 mb-2'>
                            ยืนยันการลบบทความ
                        </h2>
                        
                        <p className='text-gray-600 mb-4 text-sm sm:text-base'>
                            คุณแน่ใจว่าต้องการลบบทความนี้หรือไม่?
                        </p>
                        
                        {selectedBlog && (
                            <div className='bg-gray-50 p-3 rounded-lg mb-6 w-full'>
                                <p className='text-sm font-medium text-gray-800 truncate'>
                                    "{selectedBlog.title}"
                                </p>
                                <p className='text-xs text-gray-500 mt-1'>
                                    หมวดหมู่: {selectedBlog.carModel}
                                </p>
                            </div>
                        )}

                        <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
                            <DialogClose asChild>
                                <Button 
                                    size='large' 
                                    className='!border !border-gray-300 !text-gray-700 !bg-white hover:!bg-gray-50 !h-12 w-full sm:w-auto px-6'
                                >
                                    ยกเลิก
                                </Button>
                            </DialogClose>
                            <Button 
                                onClick={() => selectedBlog && deleteBlog(selectedBlog.id)} 
                                size='large' 
                                className='!bg-red-500 hover:!bg-red-600 !border-red-500 hover:!border-red-600 !h-12 w-full sm:w-auto !text-white px-6'
                            >
                                ลบบทความ
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default page