'use client'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Product } from '@/types/product'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import Image from 'next/image'
import React, { useState } from 'react'
import DelItem from '../edit-review/_components/del-item'
import EditProduct from './edit-product'
import { 
  Edit, 
  Trash2, 
  Eye, 
  Package, 
  Tag, 
  AlertTriangle,
  MoreVertical,
  Info
} from 'lucide-react'

const ProductItem = ({ item, getProduct }: { item: Product, getProduct: () => void }) => {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isDetailOpen, setIsDetailOpen] = useState(false)

    const onDeleteComplete = () => {
        void getProduct()
        setIsDeleteOpen(false)
    }

    const onEditComplete = () => {
        void getProduct()
        setIsEditOpen(false)
    }

    return (
        <div className='group w-full bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden'>
            {/* Image Container */}
            <div className='relative aspect-square bg-gray-100 overflow-hidden'>
                <Image 
                    unoptimized 
                    src={`http://150.95.26.51:3131${item.imageProduct}`} 
                    alt={item.name || 'Product image'} 
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-200' 
                />
                
                {/* Actions Overlay - Desktop */}
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100'>
                    <div className='flex gap-2'>
                        <button
                            onClick={() => setIsDetailOpen(true)}
                            className='w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors'
                            title='ดูรายละเอียด'
                        >
                            <Eye size={14} />
                        </button>
                        <button
                            onClick={() => setIsEditOpen(true)}
                            className='w-8 h-8 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full flex items-center justify-center transition-colors'
                            title='แก้ไข'
                        >
                            <Edit size={14} />
                        </button>
                        <button
                            onClick={() => setIsDeleteOpen(true)}
                            className='w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors'
                            title='ลบ'
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                </div>

                {/* Category Badge */}
                <div className='absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full'>
                    <div className='flex items-center gap-1'>
                        <Tag size={10} className='text-gray-600' />
                        <span className='text-xs font-medium text-gray-700 truncate max-w-[80px]'>
                            {item.category.name}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className='p-3 sm:p-4 space-y-2 sm:space-y-3'>
                {/* Product Name */}
                <div className='flex items-start gap-2'>
                    <Package size={14} className='text-gray-500 mt-0.5 flex-shrink-0' />
                    <h4 className='line-clamp-2 text-sm sm:text-base font-semibold text-gray-800 leading-tight'>
                        {item.name}
                    </h4>
                </div>

                {/* Category Info - Mobile */}
                <div className='sm:hidden flex items-center gap-1 text-xs text-gray-600'>
                    <Tag size={12} />
                    <span>หมวดหมู่:</span>
                    <span className='font-semibold text-gray-800'>{item.category.name}</span>
                </div>

                {/* Desktop Actions */}
                <div className='hidden sm:grid grid-cols-1 gap-2'>
                    <Popover open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                        <PopoverTrigger asChild>
                            <button className='flex items-center justify-center gap-2 border border-blue-400 text-blue-600 hover:bg-blue-50 w-full py-2 rounded-lg font-medium cursor-pointer text-sm transition-colors'>
                                <Eye size={14} />
                                <span>ดูรายละเอียด</span>
                            </button>
                        </PopoverTrigger>
                        <PopoverContent 
                            side='top' 
                            align='center' 
                            className='z-50 bg-gray-900 text-white p-3 max-w-[280px] rounded-lg text-sm shadow-lg border border-gray-700'
                            sideOffset={8}
                        >
                            <div className='space-y-2'>
                                <div className='flex items-center gap-2 font-medium'>
                                    <Info size={14} />
                                    <span>รายละเอียดสินค้า</span>
                                </div>
                                <p className='text-gray-200 leading-relaxed'>
                                    {item.detail || 'ไม่มีรายละเอียด'}
                                </p>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <div className='grid grid-cols-2 gap-2'>
                        <button
                            onClick={() => setIsEditOpen(true)}
                            className='flex items-center justify-center gap-1 border border-yellow-400 text-yellow-600 hover:bg-yellow-50 py-2 rounded-lg font-medium cursor-pointer text-sm transition-colors'
                        >
                            <Edit size={12} />
                            <span>แก้ไข</span>
                        </button>
                        <button
                            onClick={() => setIsDeleteOpen(true)}
                            className='flex items-center justify-center gap-1 border border-red-400 text-red-600 hover:bg-red-50 py-2 rounded-lg font-medium cursor-pointer text-sm transition-colors'
                        >
                            <Trash2 size={12} />
                            <span>ลบ</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Actions */}
                <div className='sm:hidden flex gap-2'>
                    <button
                        onClick={() => setIsDetailOpen(true)}
                        className='flex-1 flex items-center justify-center gap-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium text-sm transition-colors'
                    >
                        <Eye size={12} />
                        <span className='hidden sm:inline'>ดู</span>
                    </button>
                    <button
                        onClick={() => setIsEditOpen(true)}
                        className='flex-1 flex items-center justify-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium text-sm transition-colors'
                    >
                        <Edit size={12} />
                        <span className='hidden sm:inline'>แก้ไข</span>
                    </button>
                    <button
                        onClick={() => setIsDeleteOpen(true)}
                        className='flex-1 flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium text-sm transition-colors'
                    >
                        <Trash2 size={12} />
                        <span className='hidden sm:inline'>ลบ</span>
                    </button>
                </div>
            </div>

            {/* Edit Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className='max-w-[95vw] sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-4 sm:p-6'>
                    <div className='mb-4'>
                        <DialogTitle className='flex items-center gap-2 text-lg font-semibold'>
                            <Edit size={20} className='text-yellow-500' />
                            แก้ไขสินค้า
                        </DialogTitle>
                        <p className='text-sm text-gray-600 mt-1'>{item.name}</p>
                    </div>
                    <EditProduct data={item} onComplete={onEditComplete} />
                </DialogContent>
            </Dialog>

            {/* Detail Dialog - Mobile */}
            <Dialog open={isDetailOpen && window.innerWidth < 640} onOpenChange={setIsDetailOpen}>
                <DialogContent className='max-w-[95vw] p-4'>
                    <div className='space-y-3'>
                        <DialogTitle className='flex items-center gap-2 text-lg font-semibold'>
                            <Info size={20} className='text-blue-500' />
                            รายละเอียดสินค้า
                        </DialogTitle>
                        
                        <div className='flex items-center gap-2 text-sm text-gray-600'>
                            <Package size={14} />
                            <span className='font-medium'>{item.name}</span>
                        </div>
                        
                        <div className='flex items-center gap-2 text-sm text-gray-600'>
                            <Tag size={14} />
                            <span>หมวดหมู่: </span>
                            <span className='font-medium'>{item.category.name}</span>
                        </div>
                        
                        <div className='bg-gray-50 p-3 rounded-lg'>
                            <p className='text-sm text-gray-700 leading-relaxed'>
                                {item.detail || 'ไม่มีรายละเอียด'}
                            </p>
                        </div>
                        
                        <button
                            onClick={() => setIsDetailOpen(false)}
                            className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors'
                        >
                            ปิด
                        </button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className='max-w-[95vw] sm:max-w-[500px] p-4 sm:p-6'>
                    <div className='flex flex-col items-center text-center'>
                        <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4'>
                            <AlertTriangle className='text-red-500' size={32} />
                        </div>
                        
                        <h2 className='text-lg font-semibold text-gray-800 mb-2'>
                            ยืนยันการลบสินค้า
                        </h2>
                        
                        <p className='text-gray-600 mb-4'>
                            คุณต้องการลบสินค้านี้หรือไม่?
                        </p>
                        
                        <div className='bg-gray-50 p-3 rounded-lg mb-6 w-full'>
                            <div className='flex items-center gap-2 justify-center'>
                                <Package size={16} className='text-gray-600' />
                                <span className='font-medium text-gray-800 truncate'>
                                    {item.name}
                                </span>
                            </div>
                            <div className='flex items-center gap-1 justify-center mt-1 text-sm text-gray-500'>
                                <Tag size={12} />
                                <span>{item.category.name}</span>
                            </div>
                        </div>

                        <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
                            <DelItem 
                                id={item.id} 
                                apiPath='product/delete-product' 
                                onComplete={onDeleteComplete}
                                renderTrigger={(onClick) => (
                                    <button
                                        onClick={onClick}
                                        className='px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium'
                                    >
                                        ลบสินค้า
                                    </button>
                                )}
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ProductItem