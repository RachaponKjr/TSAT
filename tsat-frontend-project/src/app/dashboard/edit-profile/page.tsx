/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import InputWithLabel from '@/components/input-label'
import api from '@/server/api'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

export interface Content {
    id: string
    facebook: string
    link_facebook: string
    line: string
    link_line: string
    instagram: string
    link_instagram: string
    phone: string
    mail: string
    phone2: string
    link_email: string
}

const page = () => {
    const [content, setContent] = useState<Content>()
    const getContent = useCallback(async () => {
        const { data: res } = await api.content.getContact();
        setContent(res.data[0])
    }, [])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        } as Content))
    }

    const updateContent = useCallback(async () => {
        await api.content.updateContact({ data: content!, id: content!.id }).then((res) => {
            if (res.status === 200) {
                toast.success('อัพเดทข้อมูลสําเร็จ', { className: '!text-green-500' })
            }
        }).catch(() => {
            toast.error('อัพเดทข้อมูลไม่สําเร็จ', { className: '!text-red-500' })
        })
    }, [content])

    useEffect(() => {
        void getContent();
    }, [getContent])
    return (
        <div className='flex flex-col w-full gap-2'>
            <div className='flex flex-col gap-2 w-full max-w-full'>
                <div className='text-xl font-bold text-[#333333] flex justify-between items-center w-full max-w-full h-max'>
                    <h6>ข้อมูล ช่องทางการติดต่อ</h6>
                </div>
                <div className='grid grid-cols-2 gap-6'>
                    <InputWithLabel
                        label="Facebook"
                        name="facebook"
                        value={content?.facebook}
                        onChange={onChange}
                        placeholder="topserviceautotechnic"
                    />
                    <InputWithLabel
                        label="ลิงค์ Facebook"
                        name="link_facebook"
                        value={content?.link_facebook}
                        onChange={onChange}
                        placeholder="https://www.facebook.com/topserviceautotechnic"
                    />
                    <InputWithLabel
                        label="Line"
                        name="line"
                        value={content?.line}
                        onChange={onChange}
                        placeholder="@topserviceautotechnic"
                    />
                    <InputWithLabel
                        label="ลิงค์ Line"
                        name="link_line"
                        value={content?.link_line}
                        onChange={onChange}
                        placeholder="https://line.me/ti/p/~topserviceautotechnic"
                    />
                    <InputWithLabel
                        label="Instagram"
                        name="instagram"
                        value={content?.instagram}
                        onChange={onChange}
                        placeholder="topserviceautotechnic"
                    />
                    <InputWithLabel
                        label="ลิงค์ Instagram"
                        name="link_instagram"
                        value={content?.link_instagram}
                        onChange={onChange}
                        placeholder="https://line.me/ti/p/~topserviceautotechnic"
                    />
                    <InputWithLabel
                        label="Email"
                        name="mail"
                        value={content?.mail}
                        onChange={onChange}
                        placeholder="customer@topserviceautotechnic.com"
                    />
                    <InputWithLabel
                        label="ลิงค์ Email"
                        name="link_email"
                        value={content?.link_email}
                        onChange={onChange}
                        placeholder=""
                    />
                    <InputWithLabel
                        label="Phone"
                        name="phone"
                        value={content?.phone}
                        onChange={onChange}
                        placeholder="02-123-4567"
                    />
                    <InputWithLabel
                        label="Phone2"
                        name="phone2"
                        value={content?.phone2}
                        onChange={onChange}
                        placeholder="02-123-4567"
                    />
                </div>
                <button onClick={updateContent} className='bg-[#8F2F34] text-white py-3 px-6 rounded-md font-semibold cursor-pointer mt-4'>บันทึก</button>
            </div>
        </div>
    )
}

export default page