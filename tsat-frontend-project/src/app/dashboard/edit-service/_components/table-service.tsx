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
            const del = await fetch(`http://http://150.95.25.111:3131/api/v1/service/delete-service/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accept_token}`
                }
            })
            if (del.status === 200) {
                toast.success('ลบข้อมูลสำเร็จ', { className: '!text-green-500' })
                await getService()
            } else {
                toast.error('ลบข้อมูลไม่สำเร็จ', { className: '!text-red-500' })
            }
        } catch (error) {
            console.error("Error deleting service:", error);
        }
    }

    useEffect(() => {
        void getService()
    }, [getService])
    return (
        <div className='mt-4'>
            <div className=' w-full '>
                <Table className="w-full flex flex-col">
                    <TableHeader className='w-full bg-neutral-300'>
                        <TableRow className='w-full flex flex-row items-center'>
                            <TableHead className="text-center flex items-center justify-center w-[50px]">#</TableHead>
                            <TableHead className="text-center flex items-center justify-center flex-1">Service Name</TableHead>
                            <TableHead className="text-center flex items-center justify-center flex-1">สร้างเมื่อ</TableHead>
                            <TableHead className="text-center flex items-center justify-center flex-1">อัพเดทเมื่อ</TableHead>
                            <TableHead className="text-center flex items-center justify-center flex-1">จัดการ</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className='w-full'>
                        {services.map((service, index) => (
                            <TableRow className='flex flex-row items-center' key={index}>
                                <TableCell className="text-center w-[50px]">{index + 1}</TableCell>
                                <TableCell className="text-center max-w-full overflow-hidden line-clamp-1 flex-1">{service.serviceName}</TableCell>
                                <TableCell className="text-center max-w-full overflow-hidden line-clamp-1 flex-1">{dayjs(service.createdAt).format('DD/MM/YYYY')}</TableCell>
                                <TableCell className="text-center max-w-full overflow-hidden line-clamp-1 flex-1">{dayjs(service.updatedAt).format('DD/MM/YYYY')}</TableCell>
                                <TableCell className="text-center max-w-full overflow-hidden line-clamp-1 flex-1">
                                    <div className='flex flex-row items-center justify-end gap-2'>
                                        <Dialog>
                                            <DialogTrigger>
                                                <button className='bg-[#8F2F34] cursor-pointer text-white px-3 py-1 rounded-lg hover:bg-[#C65359]'>Edit</button>
                                            </DialogTrigger>
                                            <DialogContent className='max-w-[600px] max-h-[90vh] overflow-y-auto grid grid-cols-2 p-4'>
                                                <EditZone service={service} getService={getService} />
                                            </DialogContent>
                                        </Dialog>
                                        <Dialog >
                                            <DialogTrigger>
                                                <button className='bg-[#8F2F34] cursor-pointer text-white px-3 py-1 rounded-lg hover:bg-[#C65359]'>Delete</button>
                                            </DialogTrigger>
                                            <DialogContent className='max-w-[600px] max-h-[90vh] overflow-y-auto p-4'>
                                                <div className='flex flex-col gap-4'>
                                                    <h6 className='text-lg font-semibold w-full'>คุณต้องการลบข้อมูลนี้หรือไม่</h6>
                                                    <div className='flex flex-row items-center h-12 gap-2'>
                                                        <button
                                                            type='button'
                                                            onClick={() => deleteService(service.id)}
                                                            className='border border-[#8F2F34] flex-1 h-full cursor-pointer px-3 py-1 rounded-lg  text-[#8F2F34]'
                                                        >
                                                            ยืนยัน
                                                        </button>
                                                        <DialogClose asChild>
                                                            <button
                                                                type='button'
                                                                className='bg-[#8F2F34] flex h-full items-center justify-center flex-1 cursor-pointer text-white px-3 py-1 rounded-lg hover:bg-[#C65359]'
                                                            >
                                                                ยกเลิก
                                                            </button>
                                                        </DialogClose>
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>

    )
}

export default TableService