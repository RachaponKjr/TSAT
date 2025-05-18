import TextareaWithLabel from '@/components/textarea-with-label'
import api from '@/server/api'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

export interface CMSProductProps {
    data: any
    id: string
    text_line_1: string
    text_line_2: string
    text_line_3: string
}

const ProductPage = () => {
    const [formData, setFormData] = useState<Partial<CMSProductProps>>({})

    const getCMS = useCallback(async () => {
        try {
            const { data: res } = await api.cms.getCMSProduct()
            setFormData(res.data)
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        void getCMS()
    }, [getCMS])

    const handleChange = (key: keyof CMSProductProps) => (
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
        const transformedData: Partial<CMSProductProps> = {}
        for (const key in formData) {
            const value = formData[key as keyof CMSProductProps] || ''
            transformedData[key as keyof CMSProductProps] = transformNewlinesToBr(value)
        }
        try {
            await api.cms.updateCMSProduct(transformedData).then(() => {
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
            <h4 className='text-lg font-semibold text-center'>หน้าสินค้า (Product Page)</h4>
            <div className='grid grid-cols-2 gap-4'>
                <TextareaWithLabel
                    placeholder="พิมพ์ข้อมูล"
                    label="ส่วนหัวเเรก"
                    value={formData.text_line_1 || ''}
                    onChange={handleChange('text_line_1')}
                />
                <TextareaWithLabel
                    placeholder="พิมพ์ข้อมูล"
                    label="คำอธิบายเเรก"
                    value={formData.text_line_2 || ''}
                    onChange={handleChange('text_line_2')}
                />
                <TextareaWithLabel
                    placeholder="พิมพ์ข้อมูล"
                    label="ส่วนรีวิว Service"
                    value={formData.text_line_3 || ''}
                    onChange={handleChange('text_line_3')}
                />
            </div>
            <button onClick={handleSave} className='border border-[#8F2F34] h-[48px] bg-[#8F2F34] text-white w-full py-2 rounded-md font-semibold cursor-pointer text-sm'>บันทึก</button>
        </div>
    )
}

export default ProductPage