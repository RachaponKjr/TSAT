'use client'
import InputWithLabel from '@/components/input-label'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
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
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { 
    UserPlus, 
    User, 
    Key, 
    Shield, 
    Crown, 
    UserCheck, 
    Save,
    AlertTriangle
} from 'lucide-react'

const AddEmployee = () => {
    const [user, setUser] = useState({
        username: '',
        password: '',
        role: ''
    })
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState<{[key: string]: string}>({})
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value,
        })
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' })
        }
    }

    const handleRoleChange = (value: string) => {
        setUser({ ...user, role: value })
        if (errors.role) {
            setErrors({ ...errors, role: '' })
        }
    }

    const validateForm = () => {
        const newErrors: {[key: string]: string} = {}

        if (!user.username.trim()) {
            newErrors.username = 'กรุณากรอกชื่อพนักงาน'
        }

        if (!user.password.trim()) {
            newErrors.password = 'กรุณากรอกรหัสผ่าน'
        } else if (user.password.length < 6) {
            newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'
        }

        if (!user.role) {
            newErrors.role = 'กรุณาเลือกสิทธิการใช้งาน'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const resetForm = () => {
        setUser({
            username: '',
            password: '',
            role: ''
        })
        setErrors({})
    }

    const addEmployee = async () => {
        if (!validateForm()) return

        setIsSubmitting(true)
        try {
            const res = await api.auth.createUser(user)
            if (res.status === 201) {
                toast.success('เพิ่มพนักงานสําเร็จ', { className: '!text-green-500' })
                resetForm()
                setIsOpen(false)
                router.refresh()
            } else {
                toast.error('เพิ่มพนักงานไม่สําเร็จ', { className: '!text-red-500' })
            }
        } catch (error: any) {
            console.log(error)
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message, { className: '!text-red-500' })
            } else {
                toast.error('เกิดข้อผิดพลาดในการเพิ่มพนักงาน', { className: '!text-red-500' })
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'OWNER':
                return <Crown className='text-yellow-500' size={14} />
            case 'ADMIN':
                return <Shield className='text-blue-500' size={14} />
            case 'USER':
                return <UserCheck className='text-green-500' size={14} />
            default:
                return null
        }
    }

    const getRoleDescription = (role: string) => {
        switch (role) {
            case 'OWNER':
                return 'เจ้าของระบบ - สิทธิ์เต็ม'
            case 'ADMIN':
                return 'ผู้ดูแลระบบ - สิทธิ์จัดการ'
            case 'USER':
                return 'ผู้ใช้งานทั่วไป - สิทธิ์พื้นฐาน'
            default:
                return ''
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open)
            if (!open) {
                resetForm()
            }
        }}>
            <DialogTrigger>
                <button className='flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors font-medium'>
                    <UserPlus size={16} />
                    <span className='hidden sm:inline'>เพิ่มพนักงาน</span>
                    <span className='sm:hidden'>เพิ่ม</span>
                </button>
            </DialogTrigger>
            <DialogContent className='max-w-[95vw] sm:max-w-[500px] max-h-[90vh] overflow-y-auto p-4 sm:p-6'>
                <div className='mb-4'>
                    <DialogTitle className='flex items-center gap-2 text-lg font-semibold'>
                        <UserPlus size={20} className='text-green-500' />
                        เพิ่มพนักงานใหม่
                    </DialogTitle>
                    <p className='text-sm text-gray-600 mt-1'>
                        กรอกข้อมูลพนักงานและกำหนดสิทธิการใช้งาน
                    </p>
                </div>

                <div className='space-y-4'>
                    {/* Username Field */}
                    <div>
                        <div className='flex items-center gap-1 mb-2'>
                            <User size={14} className='text-gray-500' />
                            <label className="text-sm font-medium text-gray-700">
                                ชื่อพนักงาน <span className='text-red-500'>*</span>
                            </label>
                        </div>
                        <InputWithLabel
                            type='text'
                            name='username'
                            onChange={handleChange}
                            value={user.username}
                            placeholder='กรอกชื่อพนักงาน'
                            className={errors.username ? 'border-red-500' : ''}
                        />
                        {errors.username && (
                            <div className='flex items-center gap-1 mt-1'>
                                <AlertTriangle size={12} className='text-red-500' />
                                <p className='text-xs text-red-500'>{errors.username}</p>
                            </div>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <div className='flex items-center gap-1 mb-2'>
                            <Key size={14} className='text-gray-500' />
                            <label className="text-sm font-medium text-gray-700">
                                รหัสผ่าน <span className='text-red-500'>*</span>
                            </label>
                        </div>
                        <InputWithLabel
                            type='password'
                            name='password'
                            onChange={handleChange}
                            value={user.password}
                            placeholder='กรอกรหัสผ่าน (อย่างน้อย 6 ตัวอักษร)'
                            className={errors.password ? 'border-red-500' : ''}
                        />
                        {errors.password && (
                            <div className='flex items-center gap-1 mt-1'>
                                <AlertTriangle size={12} className='text-red-500' />
                                <p className='text-xs text-red-500'>{errors.password}</p>
                            </div>
                        )}
                        {!errors.password && user.password.length > 0 && user.password.length < 6 && (
                            <p className='text-xs text-orange-500 mt-1'>
                                รหัสผ่านควรมีอย่างน้อย 6 ตัวอักษร
                            </p>
                        )}
                    </div>

                    {/* Role Field */}
                    <div>
                        <div className='flex items-center gap-1 mb-2'>
                            <Shield size={14} className='text-gray-500' />
                            <label className="text-sm font-medium text-gray-700">
                                สิทธิการใช้งาน <span className='text-red-500'>*</span>
                            </label>
                        </div>
                        <Select value={user.role} onValueChange={handleRoleChange}>
                            <SelectTrigger className={`w-full h-10 ${errors.role ? 'border-red-500' : ''}`}>
                                <SelectValue placeholder='เลือกสิทธิการใช้งาน' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>สิทธิการใช้งาน</SelectLabel>
                                    <SelectItem value='OWNER'>
                                        <div className='flex items-center gap-2 w-full'>
                                            <Crown size={14} className='text-yellow-500' />
                                            <div className='flex flex-col'>
                                                <span className='font-medium'>OWNER</span>
                                                <span className='text-xs text-gray-500'>เจ้าของระบบ - สิทธิ์เต็ม</span>
                                            </div>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value='ADMIN'>
                                        <div className='flex items-center gap-2 w-full'>
                                            <Shield size={14} className='text-blue-500' />
                                            <div className='flex flex-col'>
                                                <span className='font-medium'>ADMIN</span>
                                                <span className='text-xs text-gray-500'>ผู้ดูแลระบบ - สิทธิ์จัดการ</span>
                                            </div>
                                        </div>
                                    </SelectItem>
                                    <SelectItem value='USER'>
                                        <div className='flex items-center gap-2 w-full'>
                                            <UserCheck size={14} className='text-green-500' />
                                            <div className='flex flex-col'>
                                                <span className='font-medium'>USER</span>
                                                <span className='text-xs text-gray-500'>ผู้ใช้งานทั่วไป - สิทธิ์พื้นฐาน</span>
                                            </div>
                                        </div>
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.role && (
                            <div className='flex items-center gap-1 mt-1'>
                                <AlertTriangle size={12} className='text-red-500' />
                                <p className='text-xs text-red-500'>{errors.role}</p>
                            </div>
                        )}
                        {user.role && (
                            <div className='mt-2 p-2 bg-gray-50 rounded-lg'>
                                <div className='flex items-center gap-2 text-sm'>
                                    {getRoleIcon(user.role)}
                                    <span className='text-gray-700'>
                                        {getRoleDescription(user.role)}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Info Box */}
                    <div className='bg-blue-50 border border-blue-200 rounded-lg p-3'>
                        <div className='flex items-start gap-2'>
                            <Shield className='text-blue-600 flex-shrink-0 mt-0.5' size={16} />
                            <div className='text-sm text-blue-700'>
                                <p className='font-medium mb-1'>คำแนะนำ:</p>
                                <ul className='text-xs space-y-1'>
                                    <li>• ใช้รหัสผ่านที่แข็งแกร่งและไม่ง่ายต่อการเดา</li>
                                    <li>• เลือกสิทธิการใช้งานให้เหมาะสมกับหน้าที่</li>
                                    <li>• ตรวจสอบข้อมูลให้ถูกต้องก่อนบันทึก</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200'>
                        <button
                            onClick={() => setIsOpen(false)}
                            className='px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium'
                        >
                            ยกเลิก
                        </button>
                        <button 
                            onClick={addEmployee}
                            disabled={isSubmitting}
                            className='flex-1 sm:flex-none flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-6 py-2.5 rounded-lg transition-colors font-medium'
                        >
                            {isSubmitting ? (
                                <>
                                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                    <span>กำลังเพิ่ม...</span>
                                </>
                            ) : (
                                <>
                                    <Save size={16} />
                                    <span>เพิ่มพนักงาน</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddEmployee