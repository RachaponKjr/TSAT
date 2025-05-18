import TextareaWithLabel from '@/components/textarea-with-label'
import api from '@/server/api'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

export interface CMSContactProps {
    data: any
    id: string
    text_line_1: string
    text_line_2: string
    text_line_3: string
}

const ContactPage = () => {
    const [formData, setFormData] = useState<Partial<CMSContactProps>>({})

    const getCMS = useCallback(async () => {
        try {
            const { data: res } = await api.cms.getCMSContact()
            setFormData(res.data)
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        void getCMS()
    }, [getCMS])

    const handleChange = (key: keyof CMSContactProps) => (
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
        const transformedData: Partial<CMSContactProps> = {}
        for (const key in formData) {
            const value = formData[key as keyof CMSContactProps] || ''
            transformedData[key as keyof CMSContactProps] = transformNewlinesToBr(value)
        }
        try {
            await api.cms.updateCMSContact(transformedData).then(() => {
                toast.success('บันทึกสําเร็จ', { className: '!text-green-500' })
            }).catch(() => {
                toast.error('เกิดข้อผิดพลาดในการบันทึก')
            })
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <div className='flex flex-col gap-4'>
            <h4 className='text-lg font-semibold text-center'>หน้าติดด่อเรา (Contact Page)</h4>
            <div className='grid grid-cols-2 gap-4'>
                <TextareaWithLabel onChange={handleChange('text_line_1')} value={formData.text_line_1} placeholder='พิมพ์ข้อมูล' label='ส่วนหัวเเรก' />
                <TextareaWithLabel onChange={handleChange('text_line_2')} value={formData.text_line_2} placeholder='พิมพ์ข้อมูล' label='คำอธิบายเเรก' />
                <TextareaWithLabel onChange={handleChange('text_line_3')} value={formData.text_line_3} placeholder='พิมพ์ข้อมูล' label='ส่วนรีวิวService' />
            </div>
            <button onClick={handleSave} className='border border-[#8F2F34] h-[48px] bg-[#8F2F34] text-white w-full py-2 rounded-md font-semibold cursor-pointer text-sm'>บันทึก</button>
        </div>
    )
}

export default ContactPage