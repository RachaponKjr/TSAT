'use client'
import React, { useCallback, useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import api from '@/server/api'
import dayjs from 'dayjs'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Edit, Trash2, Calendar, User, AlertTriangle } from 'lucide-react'
import EditZone from './edit-zone'
import { toast } from 'sonner'
import { getCookie } from '@/lib/cookie'

export interface ServiceResponse {
    createdAt: string
    explain: string
    icon: string
    id: string
    images: string[]
    serviceDetail: string
    serviceName: string
    title: string
    updatedAt: string
}

dayjs.locale('th')

const TableService = () => {
    const [services, setServices] = useState<ServiceResponse[]>([])
    const [selectedService, setSelectedService] = useState<ServiceResponse | null>(null)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const getService = useCallback(async () => {
        try {
            const { data } = await api.service.getService()
            if (!data) {
                console.error("No data found");
                return;
            }
            setServices(data.service)
        } catch (error) {
            console.error("Error fetching service data:", error);
        }
    }, [])

    const deleteService = async (id: string) => {
        const accept_token = await getCookie('access_token')
        try {
            const del = await fetch(`http://150.95.25.111:3131/api/v1/service/delete-service/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accept_token}`
                }
            })
            if (del.status === 200) {
                toast.success('ลบข้อมูลสำเร็จ', { className: '!text-green-500' })
                setIsDeleteOpen(false)
                setSelectedService(null)
                await getService()
            } else {
                toast.error('ลบข้อมูลไม่สำเร็จ', { className: '!text-red-500' })
            }
        } catch (error) {
            console.error("Error deleting service:", error);
            toast.error('เกิดข้อผิดพลาด', { className: '!text-red-500' })
        }
    }

    const handleEdit = (service: ServiceResponse) => {
        setSelectedService(service)
        setIsEditOpen(true)
    }

    const handleDelete = (service: ServiceResponse) => {
        setSelectedService(service)
        setIsDeleteOpen(true)
    }

    const handleEditComplete = () => {
        setIsEditOpen(false)
        setSelectedService(null)
        getService()
    }

    useEffect(() => {
        void getService()
    }, [getService])

    // Mobile Card Component
    const ServiceCard = ({ service, index }: { service: ServiceResponse, index: number }) => (
        <div className='bg-white border border-gray-200 rounded-lg p-4 shadow-sm'>
            <div className='flex items-start justify-between mb-3'>
                <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-1'>
                        <span className='text-xs font-medium text-gray-500'>#{index + 1}</span>
                        <User size={12} className='text-gray-400' />
                    </div>
                    <h3 className='font-semibold text-gray-800 text-sm line-clamp-2'>
                        {service.serviceName}
                    </h3>
                </div>
            </div>
            
            <div className='flex items-center justify-between text-xs text-gray-500 mb-3'>
                <div className='flex items-center gap-1'>
                    <Calendar size={12} />
                    <span>สร้าง: {dayjs(service.createdAt).format('DD/MM/YY')}</span>
                </div>
                <div className='flex items-center gap-1'>
                    <Calendar size={12} />
                    <span>แก้ไข: {dayjs(service.updatedAt).format('DD/MM/YY')}</span>
                </div>
            </div>

            <div className='flex gap-2'>
                <button
                    onClick={() => handleEdit(service)}
                    className='flex-1 flex items-center justify-center gap-1 bg-[#8F2F34] text-white px-3 py-2 rounded-lg hover:bg-[#C65359] transition-colors text-sm font-medium'
                >
                    <Edit size={14} />
                    <span>แก้ไข</span>
                </button>
                <button
                    onClick={() => handleDelete(service)}
                    className='flex-1 flex items-center justify-center gap-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium'
                >
                    <Trash2 size={14} />
                    <span>ลบ</span>
                </button>
            </div>
        </div>
    )

    if (services.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center py-12 text-gray-500'>
                <User size={48} className='mb-4 text-gray-300' />
                <p className='text-lg font-medium mb-2'>ยังไม่มีบริการ</p>
                <p className='text-sm text-center'>เพิ่มบริการใหม่เพื่อเริ่มต้นจัดการ</p>
            </div>
        )
    }

    return (
        <>
            {/* Desktop Table */}
            <div className='hidden md:block'>
                <Table className="w-full">
                    <TableHeader>
                        <TableRow className='bg-gray-50'>
                            <TableHead className="text-center w-16 font-semibold">#</TableHead>
                            <TableHead className="text-left font-semibold">Service Name</TableHead>
                            <TableHead className="text-center font-semibold min-w-[120px]">สร้างเมื่อ</TableHead>
                            <TableHead className="text-center font-semibold min-w-[120px]">อัพเดทเมื่อ</TableHead>
                            <TableHead className="text-center font-semibold min-w-[140px]">จัดการ</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services.map((service, index) => (
                            <TableRow key={service.id} className='hover:bg-gray-50'>
                                <TableCell className="text-center font-medium text-gray-600">
                                    {index + 1}
                                </TableCell>
                                <TableCell className="font-medium">
                                    <div className='max-w-[200px] truncate'>
                                        {service.serviceName}
                                    </div>
                                </TableCell>
                                <TableCell className="text-center text-sm text-gray-600">
                                    {dayjs(service.createdAt).format('DD/MM/YYYY')}
                                </TableCell>
                                <TableCell className="text-center text-sm text-gray-600">
                                    {dayjs(service.updatedAt).format('DD/MM/YYYY')}
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className='flex items-center justify-center gap-2'>
                                        <button
                                            onClick={() => handleEdit(service)}
                                            className='flex items-center gap-1 bg-[#8F2F34] text-white px-3 py-1.5 rounded-md hover:bg-[#C65359] transition-colors text-sm font-medium'
                                        >
                                            <Edit size={14} />
                                            <span>แก้ไข</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(service)}
                                            className='flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition-colors text-sm font-medium'
                                        >
                                            <Trash2 size={14} />
                                            <span>ลบ</span>
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile Cards */}
            <div className='md:hidden space-y-3 p-4'>
                {services.map((service, index) => (
                    <ServiceCard 
                        key={service.id} 
                        service={service} 
                        index={index} 
                    />
                ))}
            </div>

            {/* Edit Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className='max-w-[95vw] md:max-w-[800px] max-h-[90vh] overflow-y-auto p-4 md:p-6'>
                    <div className='mb-4'>
                        <h2 className='text-lg font-semibold flex items-center gap-2'>
                            <Edit size={20} className='text-[#8F2F34]' />
                            แก้ไขบริการ
                        </h2>
                        {selectedService && (
                            <p className='text-sm text-gray-600 mt-1'>
                                {selectedService.serviceName}
                            </p>
                        )}
                    </div>
                    {selectedService && (
                        <EditZone 
                            service={selectedService} 
                            getService={handleEditComplete} 
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className='max-w-[95vw] md:max-w-[500px] p-4 md:p-6'>
                    <div className='flex flex-col items-center text-center'>
                        <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4'>
                            <AlertTriangle className='text-red-500' size={32} />
                        </div>
                        
                        <h2 className='text-lg font-semibold text-gray-800 mb-2'>
                            ยืนยันการลบ
                        </h2>
                        
                        <p className='text-gray-600 mb-2'>
                            คุณต้องการลบบริการนี้หรือไม่?
                        </p>
                        
                        {selectedService && (
                            <p className='text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg mb-6 max-w-full truncate'>
                                "{selectedService.serviceName}"
                            </p>
                        )}

                        <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
                            <DialogClose asChild>
                                <button className='px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium'>
                                    ยกเลิก
                                </button>
                            </DialogClose>
                            <button
                                onClick={() => selectedService && deleteService(selectedService.id)}
                                className='px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium'
                            >
                                ลบบริการ
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default TableService