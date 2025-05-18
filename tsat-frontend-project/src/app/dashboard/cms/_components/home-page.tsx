'use client'

import TextareaWithLabel from '@/components/textarea-with-label'
import api from '@/server/api'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

export interface CMSHomeProps {
    data: any
    id: string
    text_line_1: string
    text_line_2: string
    text_line_3: string
    text_line_4: string
    text_line_5: string
    text_line_6: string
    text_line_7: string
    text_line_8: string
    text_line_9: string
    text_line_10: string
    text_line_11: string
    text_line_12: string
    text_line_13: string
}

const HomePage = () => {
    const [formData, setFormData] = useState<Partial<CMSHomeProps>>({})

    const getCMS = useCallback(async () => {
        try {
            const { data: res } = await api.cms.getCMSHome()
            setFormData(res.data)
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        void getCMS()
    }, [getCMS])

    const handleChange = (key: keyof CMSHomeProps) => (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [key]: e.target.value,
        }))
    }

    const transformNewlinesToBr = (value: string) => {
        return value.replace(/\n/g, '<br />')
    }

    const handleSave = async () => {
        if (!formData) return
        const transformedData: Partial<CMSHomeProps> = {}
        for (const key in formData) {
            const value = formData[key as keyof CMSHomeProps] || ''
            transformedData[key as keyof CMSHomeProps] = transformNewlinesToBr(value)
        }
        try {
            await api.cms.updateCMSHome(transformedData).then(() => {
                toast.success('บันทึกสําเร็จ', { className: '!text-green-500' })
            }).catch(() => {
                toast.error('เกิดข้อผิดพลาดในการบันทึก')
            })
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold text-center">หน้าหลัก (Home Page)</h4>
            <div className="grid grid-cols-2 gap-4">
                <TextareaWithLabel required label="ส่วนหัวเเรก" placeholder="พิมพ์ข้อมูล" value={formData.text_line_1 || ''} onChange={handleChange('text_line_1')} />
                <TextareaWithLabel required label="คำอธิบายเเรก" placeholder="พิมพ์ข้อมูล" value={formData.text_line_2 || ''} onChange={handleChange('text_line_2')} />
                <TextareaWithLabel required label="ส่วนรีวิว Service" placeholder="พิมพ์ข้อมูล" value={formData.text_line_3 || ''} onChange={handleChange('text_line_3')} />
                <TextareaWithLabel required label="ส่วนหัว Model Porsche" placeholder="พิมพ์ข้อมูล" value={formData.text_line_4 || ''} onChange={handleChange('text_line_4')} />
                <TextareaWithLabel required label="คำอธิบาย Model Porsche" placeholder="พิมพ์ข้อมูล" value={formData.text_line_5 || ''} onChange={handleChange('text_line_5')} />
                <TextareaWithLabel required label="ส่วนบริการ" placeholder="พิมพ์ข้อมูล" value={formData.text_line_6 || ''} onChange={handleChange('text_line_6')} />
                <TextareaWithLabel required label="คำอธิบายบริการ" placeholder="พิมพ์ข้อมูล" value={formData.text_line_7 || ''} onChange={handleChange('text_line_7')} />
                <TextareaWithLabel required label="ส่วนผลิตภัณฑ์" placeholder="พิมพ์ข้อมูล" value={formData.text_line_8 || ''} onChange={handleChange('text_line_8')} />
                <TextareaWithLabel required label="ส่วนหัวเหตุผล" placeholder="พิมพ์ข้อมูล" value={formData.text_line_9 || ''} onChange={handleChange('text_line_9')} />
                <TextareaWithLabel required label="คำอธิบายเหตุผล" placeholder="พิมพ์ข้อมูล" value={formData.text_line_10 || ''} onChange={handleChange('text_line_10')} />
                <TextareaWithLabel required label="ส่วนหัวตัวอย่างงาน" placeholder="พิมพ์ข้อมูล" value={formData.text_line_11 || ''} onChange={handleChange('text_line_11')} />
                <TextareaWithLabel required label="ส่วนหัวนัดหมาย" placeholder="พิมพ์ข้อมูล" value={formData.text_line_12 || ''} onChange={handleChange('text_line_12')} />
                <TextareaWithLabel required label="อื่น ๆ" placeholder="พิมพ์ข้อมูล" value={formData.text_line_13 || ''} onChange={handleChange('text_line_13')} />
            </div>
            <button
                onClick={handleSave}
                className="border border-[#8F2F34] h-[48px] bg-[#8F2F34] text-white w-full py-2 rounded-md font-semibold cursor-pointer text-sm"
            >
                บันทึก
            </button>
        </div>
    )
}

export default HomePage
