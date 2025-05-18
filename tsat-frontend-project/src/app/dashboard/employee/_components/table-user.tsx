'use client'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import InputWithLabel from '@/components/input-label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import DelItem from '../../edit-review/_components/del-item'
import { useRouter } from 'next/navigation'
import api from '@/server/api'
import { toast } from 'sonner'

interface Props {
    id: string
    username: string
    role: string
    password?: string
}

export interface UpdateUserProps {
    username: string
    role: string
    password?: string
}

const TableUser = ({ userData }: { userData: Props[] }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isDelOpen, setIsDelOpen] = React.useState(false);
    const [updateUser, setUpdateUser] = React.useState<UpdateUserProps | null>({
        username: userData[0].username,
        role: userData[0].role,
        password: '',
    })
    const router = useRouter()

    const handleRoleChange = (value: string) => {
        if (updateUser) {
            setUpdateUser({ ...updateUser, role: value })
        }
    }

    const updateUserSubmit = async (id: string) => {
        if (updateUser) {
            try {
                const res = await api.auth.updateUser({ id, userData: updateUser as UpdateUserProps })
                if (res.status === 200) {
                    toast.success('แก้ไขสําเร็จ', { className: '!text-green-500' })
                    setIsOpen(false)
                    router.refresh()
                } else {
                    toast.error('แก้ไขไม่สําเร็จ', { className: '!text-red-500' })
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[10px]">ลําดับ</TableHead>
                    <TableHead className="w-[100px]">ชื่อ พนักงาน</TableHead>
                    <TableHead className="w-[100px]">สิทธิการใช้งาน</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.isArray(userData) ? userData.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium max-w-16">{index + 1}</TableCell>
                        <TableCell className="font-medium max-w-[100px]">{item.username}</TableCell>
                        <TableCell className="font-medium max-w-[100px]">{item.role}</TableCell>
                        <TableCell className="font-medium flex justify-end gap-4 w-full">
                            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                <DialogTrigger>
                                    <button className='text-[#333333] cursor-pointer p-2 rounded-lg'>แก้ไข</button>
                                </DialogTrigger>
                                <DialogContent className='max-w-[600px] max-h-[90vh] overflow-y-auto p-4'>
                                    <DialogTitle>แก้ไขข้อมูลพนักงาน</DialogTitle>
                                    <InputWithLabel
                                        type='text'
                                        name='username'
                                        onChange={(e) => {
                                            setUpdateUser({ ...updateUser, username: e.target.value });
                                        }}
                                        value={updateUser?.username}
                                        label='ชื่อ พนักงาน'
                                        placeholder='ชื่อ พนักงาน'
                                    />
                                    <InputWithLabel
                                        type='password'
                                        name='password'
                                        onChange={(e) => {
                                            setUpdateUser({
                                                ...updateUser,
                                                password: e.target.value,
                                            });
                                        }}
                                        label='รหัสผ่าน'
                                        placeholder='รหัสผ่าน'
                                    />
                                    <div className='w-full'>
                                        <label className="text-sm font-medium text-gray-700">สิทธิการใช้งาน</label>
                                        <Select value={updateUser?.role} onValueChange={handleRoleChange}>
                                            <SelectTrigger className='w-full !h-full'>
                                                <SelectValue placeholder='หมวดหมู่' />
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
                                    <button onClick={() => { updateUserSubmit(item.id) }} className='bg-green-300 text-green-900 font-semibold p-2 rounded-lg cursor-pointer'>บันทึก</button>
                                </DialogContent>
                            </Dialog>
                            <Dialog open={isDelOpen} onOpenChange={setIsDelOpen}>
                                <DialogTrigger>
                                    <button className='text-red-500 p-2 rounded-lg cursor-pointer'>ลบ</button>
                                </DialogTrigger>
                                <DialogContent className='max-w-[600px] max-h-[90vh] overflow-y-auto p-4'>
                                    <DelItem apiPath='user/delete-user' id={item.id} onComplete={() => { setIsDelOpen(false); }} />
                                </DialogContent>
                            </Dialog>
                        </TableCell>
                    </TableRow>
                )) : null}
            </TableBody>
        </Table>
    )
}

export default TableUser