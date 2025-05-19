/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { getCookie } from '@/lib/cookie'
import api from '@/server/api'
import { Button } from 'antd'
import { Plus, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

const page = () => {
    const [dataBlogs, setDataBlogs] = useState([])
    const [open, setOpen] = useState(false)
    const getBlogs = useCallback(async () => {
        try {
            const { data } = await api.customerWork.getCustomerWork()
            setDataBlogs(data.works)
        } catch (error) {
            console.log(error)
        }
    }, [])
    const deleteBlog = useCallback(async (id: string) => {
        const accept_token = await getCookie('access_token')
        try {
            const res = await fetch(`http://tsat-back:3131/api/v1/customer-work/delete-work/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accept_token}`
                }
            })
            if (res.status === 200) {
                toast.success('ลบบทความสําเร็จ', { className: '!text-green-500' })
                setOpen(false)
                getBlogs()
            } else {
                toast.error('ลบบทความไม่สําเร็จ', { className: '!text-red-500' })
            }
        } catch (error) {
            console.log(error)
        }
    }, [getBlogs])

    useEffect(() => {
        getBlogs()
    }, [getBlogs])


    return (
        <div className='space-y-4'>
            <div className='text-xl font-bold text-[#333333] flex justify-between items-center w-full max-w-full h-max'>
                <h6>จัดการบทความ</h6>
                <div className='flex items-center gap-4 h-[2.5rem]'>
                    <Link href={'/dashboard/edit-blogs/add'} className='flex items-center justify-center gap-2 cursor-pointer rounded-sm border px-6 h-full'>
                        <span className='text-[#333333] text-sm'>เพิ่มบทความ</span>
                        <Plus color='#333333' size={16} />
                    </Link>
                </div>
            </div>
            <div className='grid grid-cols-5 gap-8'>
                {dataBlogs.map((item: any, index: number) => (
                    <div key={index + 1} className='h-max w-full flex-col flex gap-2'>
                        <div className='w-full aspect-video relative rounded-lg overflow-hidden'>
                            <Badge className='absolute top-2 left-2 z-10'>{item.carModel.name}</Badge>
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger>
                                    <X color='red' className='absolute top-2 right-2 z-10 cursor-pointer' />
                                </DialogTrigger>
                                <DialogContent className='max-w-lg p-4'>

                                    <h6 className='font-semibold text-[#333333] text-xl'>คุณแน่ใจว่าต้องการลบบทความนี้หรือมั้ย ?</h6>
                                    <div className='flex flex-col gap-2'>
                                        <Button onClick={() => deleteBlog(item.id)} size='large' className='!bg-[#8F2F34] !h-[48px] hover:bg-[#8F2F34]/80 !hover:border-[#8F2F34] w-full !text-white'>ยืนยัน</Button>
                                        <DialogClose className='w-full'>
                                            <Button size='large' className='!border w-full !h-[48px] !border-[#8F2F34] !text-[#8F2F34]'>ยกเลิก</Button>
                                        </DialogClose>
                                    </div>
                                </DialogContent>
                            </Dialog>
                            <Image src={`http://150.95.25.111:3131${item.images}`} alt="modelcar" fill className=' object-cover' />
                        </div>
                        <h4>{item.title}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default page