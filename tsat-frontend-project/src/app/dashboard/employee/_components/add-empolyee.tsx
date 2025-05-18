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

const AddEmployee = () => {
    const [user, setUser] = useState({
        username: '',
        password: '',
        role: ''
    })
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const handleRoleChange = (value: string) => {
        setUser({ ...user, role: value })
    }

    const addEmployee = async () => {
        try {
            const res = await api.auth.createUser(user)
            if (res.status === 201) {
                toast.success('เพิ่มพนักงานสําเร็จ', { className: '!text-green-500' })
                setUser({
                    username: '',
                    password: '',
                    role: ''
                })
                setIsOpen(false)
                router.refresh()
            } else {
                toast.error('เพิ่มพนักงานไม่สําเร็จ', { className: '!text-red-500' })
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
                <button className='bg-green-300 text-green-900 font-semibold p-2 rounded-lg cursor-pointer'>
                    เพิ่มพนักงาน
                </button>
            </DialogTrigger>
            <DialogContent className='max-w-[600px] max-h-[90vh] overflow-y-auto p-4'>
                <DialogTitle>เพิ่มพนักงาน</DialogTitle>
                <InputWithLabel
                    type='text'
                    name='username'
                    onChange={handleChange}
                    label='ชื่อ พนักงาน'
                    placeholder='ชื่อ พนักงาน'
                />
                <InputWithLabel
                    type='password'
                    name='password'
                    onChange={handleChange}
                    label='รหัสผ่าน'
                    placeholder='รหัสผ่าน'
                />
                <div className='w-full'>
                    <label className="text-sm font-medium text-gray-700">สิทธิการใช้งาน</label>
                    <Select value={user.role} onValueChange={handleRoleChange}>
                        <SelectTrigger className='w-full !h-full'>
                            <SelectValue placeholder='เลือกสิทธิการใช้งาน' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>สิทธิการใช้งาน</SelectLabel>
                                <SelectItem value='OWNER'>OWNER</SelectItem>
                                <SelectItem value='ADMIN'>ADMIN</SelectItem>
                                <SelectItem value='USER'>USER</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <button onClick={addEmployee} className='bg-green-300 text-green-900 font-semibold p-2 rounded-lg cursor-pointer mt-4'>
                    เพิ่ม
                </button>
            </DialogContent>
        </Dialog>
    )
}

export default AddEmployee
