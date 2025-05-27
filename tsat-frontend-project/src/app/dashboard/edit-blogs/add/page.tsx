/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useCallback, useEffect, useState } from 'react'
import HeadAddBlogs from './_components/head-add-blogs'
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'
import { JSONContent } from '@tiptap/react'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import api from '@/server/api'
import { CarCatogory } from '@/types/car-model'
import ImageUpload from '@/components/image-upload'
import { toast } from 'sonner'
import { json } from 'stream/consumers'
import { useRouter } from 'next/navigation'
import { getCookie } from '@/lib/cookie'
import { Checkbox, Switch } from 'antd'
import { SubCarModel } from '../../edit-review/_components/add-review'

type BlogType = 'WorkBlog' | 'ReviewBlog';

const Page = () => {
    const [editorContent, setEditorContent] = useState<JSONContent | null>(null)
    const router = useRouter()
    const [tags, setTags] = useState<string[]>([])
    const [tagInput, setTagInput] = useState<string>('')
    const [carModel, setCarModel] = useState<CarCatogory[]>([])
    const [carSubModel, setCarSubModel] = useState<SubCarModel[]>([])
    const [image, setImage] = useState<File | null>(null)
    const [data, setData] = useState<{
        title: string
        content: JSONContent | null
        carModelId: string
        type: BlogType
        carSubModelId: string
        isShow: boolean
    }>({
        title: '',
        content: null,
        carModelId: '',
        carSubModelId: '',
        type: 'WorkBlog',
        isShow: false
    })

    const getCarModel = useCallback(async () => {
        try {
            const { data: res } = await api.carModel.getCarModel()
            const carModels = (res as { data: CarCatogory[] }).data
            setCarModel(carModels)
        } catch (e) {
            console.log(e)
        }
    }, [])

    const addTags = (tag: string) => {
        if (tag && !tags.includes(tag)) {
            const newTags = [...tags, tag.trim()]
            setTags(newTags)
        }
    }

    const removeTag = (index: number) => {
        const newTags = [...tags]
        newTags.splice(index, 1)
        setTags(newTags)
    }

    const getSubCarModel = useCallback(async (id: string) => {
        try {
            const { data } = await api.carModel.getSubCarModel(id)
            setCarSubModel(data?.carSubModels)
        } catch (error) {
            console.error('Error fetching sub car models:', error)
        }
    }, [])

    const handleSubmit = async () => {
        if (!data.title || !data.carModelId || !editorContent || !image) {
            toast.error('กรุณากรอกข้อมูลให้ครบ', { className: '!text-red-500' })
            return
        }
        const cookie = await getCookie('access_token')

        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('carModelId', data.carModelId)
        formData.append('content', JSON.stringify(editorContent))
        formData.append('type', data.type)
        formData.append('isShow', data.isShow ? 'true' : 'false');
        formData.append('tags', JSON.stringify(tags))
        formData.append('image', image)
        formData.append('carSubModelId', data.carSubModelId)

        try {
            // Reset หรือ redirect
            await fetch('http://150.95.25.111:3131/api/v1/customer-work/create-work', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${cookie}`,
                }
            }).then((res) => {
                if (res.status === 200) {
                    toast.success('สร้างบทความสําเร็จ', { className: '!text-green-500' })
                    router.back()
                }
            }).catch((e) => {
                toast.error('เกิดข้อผิดพลาดในการสร้าง Blog')
            })
        } catch {
            toast.error('เกิดข้อผิดพลาดในการสร้าง Blog')
        }
    }

    useEffect(() => {
        void getCarModel()
        if (data?.carModelId) {
            void getSubCarModel(data.carModelId)
        }
    }, [data?.carModelId, getCarModel, getSubCarModel])

    console.log(data)
    return (
        <div className="space-y-4 min-h-[116vh]">
            <HeadAddBlogs />
            <div className="grid grid-cols-2 items-start gap-4">
                {/* ===== Blog Name ===== */}
                <div className="flex flex-col items-start gap-2">
                    <div className='flex items-center gap-2'>
                        <span>ชื่อบทความ</span>
                        <span className='text-red-500'> (หรือชื่อลูกค้า)</span>
                    </div>
                    <Input
                        name="name"
                        value={data.title}
                        onChange={(e) =>
                            setData((prev) => ({ ...prev, title: e.target.value }))
                        }
                        className="w-full h-[2.5rem]"
                        placeholder="ชื่อ Blog"
                    />
                </div>
                <div className="flex flex-col items-start gap-2">
                    <span>ชนิดบทความ</span>
                    <Select
                        value={data.type}
                        onValueChange={(value) =>
                            setData((prev) => ({ ...prev, type: value as BlogType }))
                        }
                    >
                        <SelectTrigger className="w-full !h-[2.5rem]">
                            <SelectValue placeholder="ชนิดบทความ" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="WorkBlog">
                                    บทความงานลูกค้า
                                </SelectItem>
                                <SelectItem value="ReviewBlog">
                                    บทความรีวิว
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* ===== Car Model ===== */}
                <div className="flex flex-col items-start gap-2">
                    <span>เลือกรุ่นรถ</span>
                    <Select
                        onValueChange={(value) =>
                            setData((prev) => ({ ...prev, carModelId: value }))
                        }
                    >
                        <SelectTrigger className="w-full !h-[2.5rem]">
                            <SelectValue placeholder="เลือกรุ่นรถ" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {carModel.map((item) => (
                                    <SelectItem key={item.id} value={item.id.toString()}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col items-start gap-2">
                    <span>เลือกรุ่นรถย่อย</span>
                    <Select onValueChange={(value) => setData((prev) => ({ ...prev, carSubModelId: value }))}>
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

                {/* ===== Tags ===== */}
                <div className="flex flex-col gap-2 w-full">
                    <span>แท็ก Blog</span>
                    <div className="flex gap-2">
                        <Input
                            name="tagInput"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && tagInput.trim()) {
                                    e.preventDefault()
                                    addTags(tagInput)
                                    setTagInput('')
                                }
                            }}
                            className="w-full h-[2.5rem]"
                            placeholder="เพิ่มแท็ก แล้วกด Enter หรือคลิกเพิ่ม"
                        />
                        <button
                            onClick={() => {
                                if (tagInput.trim()) {
                                    addTags(tagInput)
                                    setTagInput('')
                                }
                            }}
                            className="border border-green-400 text-green-500 px-4 rounded-md font-semibold cursor-pointer text-sm"
                        >
                            เพิ่ม
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <div
                                key={index}
                                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                            >
                                {tag}
                                <button
                                    onClick={() => removeTag(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-start h-full gap-2">
                    <span>เเสดงหน้าเเรก</span>
                    <div className='flex flex-1 items-center flex-row gap-4'>
                        <Switch checked={data.isShow || false} onChange={() => setData((prev) => ({ ...prev, isShow: !prev.isShow }))} />
                        <span className='text-sm text-red-500'>* ต้องเป็นบทความ งานลูกค้า</span>
                    </div>
                </div>
                {/* ===== Cover Image ===== */}
                <div className="flex flex-row items-end gap-4 ">
                    <div>
                        <span>เพิ่มภาพหน้าปก</span>
                        <ImageUpload onChange={setImage} />
                    </div>
                </div>
                <div className='place-self-end'>
                    <button onClick={handleSubmit} className='flex items-center py-2 place-self-end  bg-green-500 !text-white justify-center gap-2 cursor-pointer rounded-sm border px-8 h-full'>
                        <span className='text-lg'>บันทึก</span>
                    </button>
                </div>
            </div>

            {/* ===== Editor ===== */}
            <SimpleEditor setEditorContent={(content: React.SetStateAction<JSONContent | null>) => {
                setEditorContent(content)
                setData((prev) => ({ ...prev, content: content }))
            }} />

        </div >
    )
}

export default Page
