/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import ImageBoxUpload from '@/components/image-upload'
import InputWithLabel from '@/components/input-label'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import api from '@/server/api'
import { CarModel } from '@/types/car-model'
import { PlusIcon } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import DelItem from '../edit-review/_components/del-item'

const page = () => {
    const [carModel, setCarModel] = useState<CarModel[]>([])
    const [name, setName] = useState<string>('')
    const [subName, setSubName] = useState<string>('')
    const [delOpen, setDelOpen] = useState(false)
    const [subDelOpen, setSubDelOpen] = useState(false)
    const [addOpen, setAddOpen] = useState(false)
    const [addSubOpen, setAddSubOpen] = useState(false)
    const [imageModel, setImageModel] = useState<File>()
    const [imageName, setImageName] = useState<File>()
    const [subImage, setSubImage] = useState<File>()
    const getModeCar = useCallback(async () => {
        await api.carModel.getCarModel()
            .then(res => {
                if (res.data && res.data.data) {
                    setCarModel(res.data.data)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const addCarModel = async () => {
        try {
            const form = new FormData()
            form.append('name', name)
            form.append('image_model', imageModel as File)
            form.append('image_name', imageName as File)
            await fetch('http://localhost:3130/api/v1/car-model/create', {
                method: 'POST',
                body: form
            }).then(res => {
                if (res.status === 200) {
                    toast.success('เพิ่มรถสําเร็จ', { className: '!text-green-500' })
                    setAddOpen(false)
                    getModeCar()
                }
            }).catch(() => toast.error('เกิดข้อผิดพลาดในการเพิ่มรถ', { className: '!text-red-500' }))
        } catch {
            toast.error('เกิดข้อผิดพลาดในการเพิ่มรถ', { className: '!text-red-500' })
        }
    }

    const addSubmit = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
        e.preventDefault()
        try {
            const form = new FormData()
            form.append('name', subName)
            form.append('carModelId', id)
            form.append('image', subImage as File)
            await fetch('http://localhost:3130/api/v1/sub-car-model/create', {
                method: 'POST',
                body: form
            }).then(res => {
                if (res.status === 200) {
                    toast.success('เพิ่มรถสําเร็จ', { className: '!text-green-500' })
                    setAddSubOpen(false)
                    getModeCar()
                }
            }).catch(() => {
                toast.error('เกิดข้อผิดพลาดในการเพิ่มรถ', {
                    className: '!text-red-500'
                })
            })
        } catch {
            toast.error('เกิดข้อผิดพลาดในการเพิ่มรถ', { className: '!text-red-500' })
        }
    }

    const delCarModel = async () => {
        void getModeCar()
        setDelOpen(false)
    }

    const delSubCarModel = async () => {
        void getModeCar()
        setSubDelOpen(false)
    }

    useEffect(() => {
        void getModeCar()
    }, [getModeCar])

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-center'>
                <h3 className='text-xl font-bold text-[#333333] flex justify-between items-center max-w-full h-max'>จัดการข้อมูลรถ</h3>
                <Dialog open={addOpen} onOpenChange={setAddOpen}>
                    <DialogTrigger>
                        <button className='px-4 py-2 rounded-lg bg-green-300 text-sm text-green-900 cursor-pointer w-max'>เพิ่มข้อมูลรถ</button>
                    </DialogTrigger>
                    <DialogContent className='max-w-[600px] max-h-[90vh] overflow-y-auto p-4'>
                        <h3 className='text-lg font-semibold'>เพิ่มข้อมูลรถ</h3>
                        <div className='flex flex-col gap-4'>
                            <InputWithLabel onChange={(e) => setName(e.target.value)} type='text' value={name} label='ชื่อรถ' name='name' placeholder='กรุณากรอกชื่อรถ' />
                            <div className='flex gap-4'>
                                <div className='flex flex-col gap-1'>
                                    <span className="text-sm font-medium text-gray-700">เพิ่มรูปรถ</span>
                                    <ImageBoxUpload onChange={setImageModel} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <span className="text-sm font-medium text-gray-700">เพิ่มรูปชื่อรถ</span>
                                    <ImageBoxUpload onChange={setImageName} />
                                </div>
                            </div>
                            <button onClick={addCarModel} className='px-4 py-3 rounded-lg bg-[#8F2F34] text-sm text-white cursor-pointer'>บันทึก</button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className='flex flex-col gap-4'>
                {carModel.map((item, index) => (
                    <div key={index} className='p-4 shadow-sm rounded-lg flex flex-col gap-2'>
                        <div className='flex items-center justify-between'>
                            <h3>{item.name}</h3>
                            <Dialog open={delOpen} onOpenChange={setDelOpen}>
                                <DialogTrigger>
                                    <button className='px-4 py-2 rounded-lg bg-[#8F2F34] text-sm text-white cursor-pointer'>ลบ ข้อมูลทั้งหมด</button>
                                </DialogTrigger>
                                <DialogContent className='max-w-[600px] max-h-[90vh] overflow-y-auto p-4 bg-white'>
                                    <DelItem id={item.id} apiPath='car-model' onComplete={() => void delCarModel()} />
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div>
                            <div className='flex gap-2 items-center'>
                                <span>ข้อมูลรถย่อย</span>
                                <Dialog open={addSubOpen} onOpenChange={setAddSubOpen}>
                                    <DialogTrigger>
                                        <button className='px-3 py-1.5 rounded-lg bg-green-300 font-semibold text-[12px] text-green-900 cursor-pointer flex gap-1 items-center'>เพิ่มข้อมูลรถย่อย <PlusIcon size={14} /></button>
                                    </DialogTrigger>
                                    <DialogContent className='max-w-[600px] max-h-[90vh] overflow-y-auto p-4 bg-white'>
                                        <h3 className='text-lg font-semibold'>เพิ่มข้อมูลรุ่นรถย่อย</h3>
                                        <form className='flex flex-col gap-4' onSubmit={(e) => addSubmit(e, item.id)}>
                                            <InputWithLabel onChange={(e) => setSubName(e.target.value)} type='text' value={subName} label='ชื่อรุ่นรถ' name='name' placeholder='กรุณากรอกชื่อรุ่นรถ' />
                                            <div className='flex gap-4'>
                                                <div className='flex flex-col gap-1'>
                                                    <span className="text-sm font-medium text-gray-700">เพิ่มรูปรถ</span>
                                                    <ImageBoxUpload onChange={setSubImage} />
                                                </div>
                                            </div>
                                            <button type="submit" className='px-4 py-3 rounded-lg bg-[#8F2F34] text-sm text-white cursor-pointer'>บันทึก</button>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <ul className='list-item list-inside px-4 [&>div]:border-b border-[#8F2F34] [&>div]:py-2 [&>li]:text-[#333333]'>
                                {item.carSubModels.length === 0 ? <span className='!mt-4'>ไม่มีข้อมูล</span>
                                    :
                                    item.carSubModels.map((subItem, index) => (
                                        <div key={index} className='flex justify-between items-center'>
                                            <li>ชื่อรุ่น : {subItem.name}</li>
                                            <Dialog open={subDelOpen} onOpenChange={setSubDelOpen}>
                                                <DialogTrigger>
                                                    <button className='px-4 py-2 rounded-lg text-sm text-[#8F2F34] cursor-pointer'>ลบ</button>
                                                </DialogTrigger>
                                                <DialogContent className='max-w-[600px] max-h-[90vh] overflow-y-auto p-4 bg-white'>
                                                    <DelItem id={subItem.id} apiPath='sub-car-model/delete' onComplete={() => void delSubCarModel()} />
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    ))

                                }
                            </ul>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default page