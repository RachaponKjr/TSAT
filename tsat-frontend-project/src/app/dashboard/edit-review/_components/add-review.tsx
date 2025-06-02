'use client'
import InputWithLabel from '@/components/input-label'
import TextareaWithLabel from '@/components/textarea-with-label'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectItem } from '@/components/ui/select'
import api from '@/server/api'
import { SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel } from '@/components/ui/select'
import { Plus } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import ImageBoxUpload from '@/components/image-upload'
import { CarModel } from '@/types/car-model'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { getCookie } from '@/lib/cookie'


export interface ReqReview {
    customerName?: string
    review?: string
    carModelId?: string
    carSubModelId?: string
}

export interface SubCarModel {
    id: string
    name: string
    image: string
}

const AddReview = () => {
    const [carModel, setCarModel] = useState<CarModel[]>([])
    const [carSubModel, setCarSubModel] = useState<SubCarModel[]>([])
    const [image, setImage] = useState<File | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [ReqData, setReqData] = useState<ReqReview>()
    const router = useRouter()
    const getCarModel = useCallback(async () => {
        try {
            const { data } = await api.carModel.getCarModel()
            setCarModel(data.data)
        } catch (error) {
            console.error('Error fetching car models:', error)
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setReqData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const getSubCarModel = useCallback(async (id: string) => {
        try {
            const { data } = await api.carModel.getSubCarModel(id)
            setCarSubModel(data?.carSubModels)
        } catch (error) {
            console.error('Error fetching sub car models:', error)
        }
    }, [])

    const addReview = useCallback(async () => {
        try {
            const cookie = await getCookie('access_token')
            const formData = new FormData()
            formData.append('customerName', ReqData?.customerName || '')
            formData.append('review', ReqData?.review || '')
            formData.append('carModelId', ReqData?.carModelId || '')
            formData.append('carSubModelId', ReqData?.carSubModelId || '')
            if (image) {
                formData.append('image', image)
            }
            const res = await fetch('http://150.95.26.51:3131/api/v1/customer-review/create', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${cookie}`,
                },
            })
            if (res.status === 200) {
                toast.success('เพิ่มรีวิวสำเร็จ', { className: '!text-green-500' })
                setReqData({})
                setImage(null)
                setCarSubModel([])
                setIsOpen(false)
                router.refresh()
            } else {
                toast.error('เพิ่มรีวิวไม่สำเร็จ', { className: '!text-red-500' })
            }
        } catch (error) {
            console.error('Error adding review:', error)
        }
    }, [ReqData?.carModelId, ReqData?.carSubModelId, ReqData?.customerName, ReqData?.review, image, router])

    useEffect(() => {
        void getCarModel()
        if (ReqData?.carModelId) {
            void getSubCarModel(ReqData.carModelId)
        }
    }, [ReqData?.carModelId, getCarModel, getSubCarModel])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className=' h-full'>
                <div className='flex items-center justify-center gap-2 cursor-pointer rounded-sm border px-6 h-full'>
                    <span className='text-[#333333] text-sm'>เพิ่มรีวิว</span>
                    <Plus color='#333333' size={16} />
                </div>
            </DialogTrigger>
            <DialogContent className='max-w-[600px] max-h-[90vh] overflow-y-auto p-4'>
                <InputWithLabel onChange={handleChange} value={ReqData?.customerName} label='ชื่อลูกค้า' name='customerName' />
                <TextareaWithLabel onChange={handleChange} value={ReqData?.review} label='ข้อความรีวิว' name='review' />
                <div className='grid grid-cols-2 gap-4 w-full'>
                    <Select onValueChange={(value) => setReqData((prev) => ({ ...prev, carModelId: value }))}>
                        <SelectTrigger className='w-full !h-full'>
                            <SelectValue placeholder='กรุณาเลือกรุ่นรถหลัก' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>กรุณาเลือกรุ่นรถ</SelectLabel>
                                {carModel.map((item) => (
                                    <SelectItem key={item.id} value={item.id}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => setReqData((prev) => ({ ...prev, carSubModelId: value }))}>
                        <SelectTrigger className='w-full !h-full'>
                            <SelectValue placeholder='กรุณาเลือกรุ่นรถรอง' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>ทำการเลือกรุ่นรถหลักก่อน</SelectLabel>
                                {carSubModel && carSubModel.map((item) => (
                                    <SelectItem key={item.id} value={item.id}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <ImageBoxUpload onChange={setImage} />
                <button
                    type='button'
                    className='flex items-center h-12 justify-center gap-2 cursor-pointer rounded-sm border px-6 bg-[#8F2F34] w-full'
                    onClick={addReview}
                >
                    <span className='text-[#FFFFFF] text-sm'>เพิ่มรีวิว</span>
                </button>
            </DialogContent>
        </Dialog>
    )
}

export default AddReview