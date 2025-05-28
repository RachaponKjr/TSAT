/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import InputWithLabel from '@/components/input-label'
import api from '@/server/api'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { 
  Facebook, 
  Instagram, 
  Phone, 
  Mail, 
  Save, 
  Settings, 
  MessageCircle,
  ExternalLink,
  User,
  AlertCircle
} from 'lucide-react'

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
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    const getContent = useCallback(async () => {
        try {
            setIsLoading(true)
            const { data: res } = await api.content.getContact();
            setContent(res.data[0])
        } catch (error) {
            toast.error('ไม่สามารถโหลดข้อมูลได้', { className: '!text-red-500' })
        } finally {
            setIsLoading(false)
        }
    }, [])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        } as Content))
    }

    const updateContent = useCallback(async () => {
        if (!content) return

        setIsSaving(true)
        try {
            const res = await api.content.updateContact({ data: content, id: content.id })
            if (res.status === 200) {
                toast.success('อัพเดทข้อมูลสําเร็จ', { className: '!text-green-500' })
            }
        } catch (error) {
            toast.error('อัพเดทข้อมูลไม่สําเร็จ', { className: '!text-red-500' })
        } finally {
            setIsSaving(false)
        }
    }, [content])

    useEffect(() => {
        void getContent();
    }, [getContent])

    if (isLoading) {
        return (
            <div className='flex items-center justify-center py-16'>
                <div className='flex flex-col items-center gap-4'>
                    <div className='w-8 h-8 border-4 border-[#8F2F34] border-t-transparent rounded-full animate-spin'></div>
                    <p className='text-gray-600'>กำลังโหลดข้อมูล...</p>
                </div>
            </div>
        )
    }

    return (
        <div className='space-y-6'>
            {/* Header */}
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
                <div className='flex items-center gap-2 sm:gap-3'>
                    <div className='p-2 bg-[#8F2F34]/10 rounded-lg hidden sm:flex'>
                        <Settings className='text-[#8F2F34]' size={20} />
                    </div>
                    <div>
                        <h6 className='text-lg sm:text-xl font-bold text-[#333333]'>
                            ข้อมูลช่องทางการติดต่อ
                        </h6>
                        <p className='text-xs sm:text-sm text-gray-500 hidden sm:block'>
                            จัดการข้อมูลการติดต่อและโซเชียลมีเดีย
                        </p>
                    </div>
                </div>
            </div>

            {/* Mobile Header */}
            <div className='sm:hidden bg-[#8F2F34]/5 border border-[#8F2F34]/20 rounded-lg p-3'>
                <div className='flex items-center gap-2'>
                    <Settings size={16} className='text-[#8F2F34]' />
                    <span className='text-sm font-medium text-[#8F2F34]'>
                        ตั้งค่าช่องทางติดต่อ
                    </span>
                </div>
            </div>

            {/* Form Container */}
            <div className='bg-white rounded-lg border border-gray-200 shadow-sm'>
                <div className='p-4 sm:p-6'>
                    <div className='space-y-6'>
                        {/* Social Media Section */}
                        <div>
                            <div className='flex items-center gap-2 mb-4'>
                                <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
                                    <User className='text-blue-600' size={16} />
                                </div>
                                <h3 className='font-semibold text-gray-800'>โซเชียลมีเดีย</h3>
                            </div>
                            
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6'>
                                {/* Facebook */}
                                <div className='space-y-3'>
                                    <div className='flex items-center gap-2'>
                                        <Facebook className='text-blue-600' size={18} />
                                        <span className='font-medium text-gray-700'>Facebook</span>
                                    </div>
                                    <div className='space-y-3'>
                                        <InputWithLabel
                                            label="ชื่อผู้ใช้ Facebook"
                                            name="facebook"
                                            value={content?.facebook || ''}
                                            onChange={onChange}
                                            placeholder="topserviceautotechnic"
                                        />
                                        <InputWithLabel
                                            label="ลิงค์ Facebook"
                                            name="link_facebook"
                                            value={content?.link_facebook || ''}
                                            onChange={onChange}
                                            placeholder="https://www.facebook.com/topserviceautotechnic"
                                        />
                                    </div>
                                </div>

                                {/* Instagram */}
                                <div className='space-y-3'>
                                    <div className='flex items-center gap-2'>
                                        <Instagram className='text-pink-600' size={18} />
                                        <span className='font-medium text-gray-700'>Instagram</span>
                                    </div>
                                    <div className='space-y-3'>
                                        <InputWithLabel
                                            label="ชื่อผู้ใช้ Instagram"
                                            name="instagram"
                                            value={content?.instagram || ''}
                                            onChange={onChange}
                                            placeholder="topserviceautotechnic"
                                        />
                                        <InputWithLabel
                                            label="ลิงค์ Instagram"
                                            name="link_instagram"
                                            value={content?.link_instagram || ''}
                                            onChange={onChange}
                                            placeholder="https://www.instagram.com/topserviceautotechnic"
                                        />
                                    </div>
                                </div>

                                {/* Line */}
                                <div className='space-y-3 lg:col-span-2'>
                                    <div className='flex items-center gap-2'>
                                        <MessageCircle className='text-green-600' size={18} />
                                        <span className='font-medium text-gray-700'>Line</span>
                                    </div>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                                        <InputWithLabel
                                            label="Line ID"
                                            name="line"
                                            value={content?.line || ''}
                                            onChange={onChange}
                                            placeholder="@topserviceautotechnic"
                                        />
                                        <InputWithLabel
                                            label="ลิงค์ Line"
                                            name="link_line"
                                            value={content?.link_line || ''}
                                            onChange={onChange}
                                            placeholder="https://line.me/ti/p/~topserviceautotechnic"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information Section */}
                        <div className='border-t border-gray-200 pt-6'>
                            <div className='flex items-center gap-2 mb-4'>
                                <div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center'>
                                    <Phone className='text-green-600' size={16} />
                                </div>
                                <h3 className='font-semibold text-gray-800'>ข้อมูลการติดต่อ</h3>
                            </div>
                            
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6'>
                                {/* Email */}
                                <div className='space-y-3'>
                                    <div className='flex items-center gap-2'>
                                        <Mail className='text-blue-600' size={18} />
                                        <span className='font-medium text-gray-700'>อีเมล</span>
                                    </div>
                                    <div className='space-y-3'>
                                        <InputWithLabel
                                            label="อีเมล"
                                            name="mail"
                                            value={content?.mail || ''}
                                            onChange={onChange}
                                            placeholder="customer@topserviceautotechnic.com"
                                            type="email"
                                        />
                                        <InputWithLabel
                                            label="ลิงค์อีเมล"
                                            name="link_email"
                                            value={content?.link_email || ''}
                                            onChange={onChange}
                                            placeholder="mailto:customer@topserviceautotechnic.com"
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className='space-y-3'>
                                    <div className='flex items-center gap-2'>
                                        <Phone className='text-green-600' size={18} />
                                        <span className='font-medium text-gray-700'>เบอร์โทรศัพท์</span>
                                    </div>
                                    <div className='space-y-3'>
                                        <InputWithLabel
                                            label="เบอร์โทรหลัก"
                                            name="phone"
                                            value={content?.phone || ''}
                                            onChange={onChange}
                                            placeholder="02-123-4567"
                                            type="tel"
                                        />
                                        <InputWithLabel
                                            label="เบอร์โทรสำรอง"
                                            name="phone2"
                                            value={content?.phone2 || ''}
                                            onChange={onChange}
                                            placeholder="08-1234-5678"
                                            type="tel"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tips Section */}
                        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
                            <div className='flex items-start gap-3'>
                                <AlertCircle className='text-blue-600 flex-shrink-0 mt-0.5' size={18} />
                                <div className='space-y-1'>
                                    <h4 className='font-medium text-blue-800'>เคล็ดลับ</h4>
                                    <ul className='text-sm text-blue-700 space-y-1'>
                                        <li>• ตรวจสอบให้แน่ใจว่าลิงค์ทั้งหมดถูกต้องและเข้าถึงได้</li>
                                        <li>• ใช้ลิงค์ที่สั้นและจำง่ายสำหรับโซเชียลมีเดีย</li>
                                        <li>• อัพเดทข้อมูลให้ทันสมัยเสมอ</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className='flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200'>
                            <button 
                                onClick={updateContent}
                                disabled={isSaving || !content}
                                className='flex items-center justify-center gap-2 bg-[#8F2F34] hover:bg-[#C65359] disabled:bg-gray-300 text-white py-3 px-6 rounded-lg font-medium transition-colors'
                            >
                                {isSaving ? (
                                    <>
                                        <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                        <span>กำลังบันทึก...</span>
                                    </>
                                ) : (
                                    <>
                                        <Save size={16} />
                                        <span>บันทึกข้อมูล</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Section - Optional */}
            <div className='bg-white rounded-lg border border-gray-200 shadow-sm'>
                <div className='p-4 sm:p-6'>
                    <div className='flex items-center gap-2 mb-4'>
                        <ExternalLink className='text-gray-600' size={18} />
                        <h3 className='font-semibold text-gray-800'>ตัวอย่างการแสดงผล</h3>
                    </div>
                    
                    <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm'>
                        {content?.facebook && (
                            <div className='flex items-center gap-2 p-2 bg-blue-50 rounded-lg'>
                                <Facebook className='text-blue-600' size={16} />
                                <span className='truncate'>{content.facebook}</span>
                            </div>
                        )}
                        {content?.instagram && (
                            <div className='flex items-center gap-2 p-2 bg-pink-50 rounded-lg'>
                                <Instagram className='text-pink-600' size={16} />
                                <span className='truncate'>{content.instagram}</span>
                            </div>
                        )}
                        {content?.line && (
                            <div className='flex items-center gap-2 p-2 bg-green-50 rounded-lg'>
                                <MessageCircle className='text-green-600' size={16} />
                                <span className='truncate'>{content.line}</span>
                            </div>
                        )}
                        {content?.phone && (
                            <div className='flex items-center gap-2 p-2 bg-gray-50 rounded-lg'>
                                <Phone className='text-gray-600' size={16} />
                                <span className='truncate'>{content.phone}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page