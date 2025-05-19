'use client'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import ImageMultiUpload from '@/components/image-multi'
import ImageBoxUpload from '@/components/image-upload'
import InputWithLabel from '@/components/input-label'
import TextareaWithLabel from '@/components/textarea-with-label'
import { toast } from 'sonner'

interface AddServiceProps {
    serviceName?: string
    title?: string
    serviceDetail?: string
    explain?: string
    images?: string[]
    icon?: string
}

const AddService = () => {
    const [serviceData, setServiceData] = useState<AddServiceProps>()
    const [images, setImages] = useState<File[]>([])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setServiceData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleImageChange = (files: File[]) => {
        setImages(files)
        const readers = files.map((file) => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result as string)
                reader.onerror = reject
                reader.readAsDataURL(file)
            })
        })

        Promise.all(readers).then((base64Images) => {
            setServiceData((prev) => ({
                ...prev,
                images: base64Images,
            }))
        })
    }

    const submitAdd = async () => {
        try {
            const formData = new FormData()
            formData.append('serviceName', serviceData?.serviceName || '')
            formData.append('title', serviceData?.title || '')
            formData.append('serviceDetail', serviceData?.serviceDetail || '')
            formData.append('explain', serviceData?.explain || '')
            formData.append('icon', serviceData?.icon || '')
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i])
            }

            const res = await fetch('http://tsat-back:3131/api/v1/service/create-service', {
                method: 'POST',
                body: formData,
            })
            if (res.status === 201) {
                toast.success('เพิ่มเซอร์วิสสำเร็จ', { className: '!text-green-500' })
                window.location.reload()
                setServiceData({})
                setImages([])
            } else {
                toast.error('เพิ่มเซอร์วิสไม่สำเร็จ', { className: '!text-red-500' })
            }
        } catch (error) {
            console.error('Error adding service:', error)
        }
    }
    return (
        <div className='block h-full'>
            <Dialog>
                <DialogTrigger className='h-full' asChild>
                    <div className='flex items-center justify-center gap-2 cursor-pointer rounded-sm border px-6 h-full'>
                        <span className='text-[#333333] text-sm'>เพิ่มเซอร์วิส</span>
                        <Plus color='#333333' size={16} />
                    </div>
                </DialogTrigger>
                <DialogContent className='max-w-[600px] max-h-[90vh] overflow-y-auto p-4'>
                    <InputWithLabel
                        label='ชื่อ Service'
                        name='serviceName'
                        onChange={handleChange}
                        value={serviceData?.serviceName}
                        placeholder='ชื่อหมวดหมู่'
                    />
                    <InputWithLabel
                        label='ชื่อย่อ Service'
                        name='title'
                        onChange={handleChange}
                        value={serviceData?.title}
                        placeholder='ชื่อหมวดหมู่'
                    />
                    <TextareaWithLabel
                        label='รายละเอียด Service'
                        name='serviceDetail'
                        onChange={handleChange}
                        className='col-span-2'
                        value={serviceData?.serviceDetail}
                        placeholder='ชื่อหมวดหมู่'
                    />
                    <TextareaWithLabel
                        label='คำอธิบาย Service'
                        name='explain'
                        onChange={handleChange}
                        className='col-span-2'
                        value={serviceData?.explain}
                        placeholder='ชื่อหมวดหมู่'
                    />
                    <div className='flex flex-col items-start gap-2 col-span-2'>
                        <span className='text-sm font-medium text-gray-700'>ภาพ ตัวอย่างงาน</span>
                        <ImageMultiUpload
                            onChange={handleImageChange}
                            value={serviceData?.images}
                        />
                    </div>
                    <div className='flex flex-col items-start gap-2'>
                        <span className='text-sm font-medium text-gray-700'>icon</span>
                        <ImageBoxUpload
                            value={serviceData?.icon}
                            onChange={(file) => {
                                const reader = new FileReader()
                                reader.onloadend = () => {
                                    setServiceData((prev) => ({
                                        ...prev,
                                        icon: reader.result as string,
                                    }))
                                }
                                reader.readAsDataURL(file)
                            }}
                        />
                    </div>
                    <DialogFooter>
                        <div className='flex flex-col w-full justify-end items-end gap-2'>
                            <button
                                type='button'
                                onClick={submitAdd}
                                className='flex items-center place-self-end gap-2 border border-green-400 text-green-500 w-full justify-center h-[48px] py-2 rounded-md font-semibold cursor-pointer text-sm'
                            >
                                เพิ่มเซอร์วิส
                            </button>
                            <DialogClose className='w-full'>
                                <button
                                    type='button'
                                    className='flex  items-center place-self-end gap-2 border border-red-400 text-red-500 w-full justify-center h-[48px] py-2 rounded-md font-semibold cursor-pointer text-sm'
                                >
                                    ยกเลิก
                                </button>
                            </DialogClose>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddService