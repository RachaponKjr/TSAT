'use client'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import InputWithLabel from '@/components/input-label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import DelItem from '../../edit-review/_components/del-item'
import { useRouter } from 'next/navigation'
import api from '@/server/api'
import { toast } from 'sonner'
import {
    Edit,
    Trash2,
    User,
    Shield,
    Key,
    AlertTriangle,
    Crown,
    UserCheck
} from 'lucide-react'

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
    const [selectedUser, setSelectedUser] = React.useState<Props | null>(null);
    const [isEditOpen, setIsEditOpen] = React.useState(false);
    const [isDelOpen, setIsDelOpen] = React.useState(false);
    const [updateUser, setUpdateUser] = React.useState<UpdateUserProps>({
        username: '',
        role: '',
        password: '',
    })
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const router = useRouter()

    const handleEditClick = (user: Props) => {
        setSelectedUser(user);
        setUpdateUser({
            username: user.username,
            role: user.role,
            password: '',
        });
        setIsEditOpen(true);
    }

    const handleDeleteClick = (user: Props) => {
        setSelectedUser(user);
        setIsDelOpen(true);
    }

    const handleRoleChange = (value: string) => {
        setUpdateUser({ ...updateUser, role: value })
    }

    const updateUserSubmit = async () => {
        if (!selectedUser || !updateUser) return;

        setIsSubmitting(true);
        try {
            const res = await api.auth.updateUser({
                id: selectedUser.id,
                userData: updateUser as UpdateUserProps
            })
            if (res.status === 200) {
                toast.success('แก้ไขสําเร็จ', { className: '!text-green-500' })
                setIsEditOpen(false)
                setSelectedUser(null)
                router.refresh()
            } else {
                toast.error('แก้ไขไม่สําเร็จ', { className: '!text-red-500' })
            }
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาด', { className: '!text-red-500' })
        } finally {
            setIsSubmitting(false);
        }
    }

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'OWNER':
                return <Crown className='text-yellow-500' size={16} />
            case 'ADMIN':
                return <Shield className='text-blue-500' size={16} />
            case 'USER':
                return <UserCheck className='text-green-500' size={16} />
            default:
                return <User className='text-gray-500' size={16} />
        }
    }

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'OWNER':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case 'ADMIN':
                return 'bg-blue-100 text-blue-800 border-blue-200'
            case 'USER':
                return 'bg-green-100 text-green-800 border-green-200'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    // Mobile Card Component
    const UserCard = ({ user, index }: { user: Props, index: number }) => (
        <div className='bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow'>
            <div className='flex items-start justify-between mb-3'>
                <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center'>
                        <User className='text-gray-600' size={20} />
                    </div>
                    <div>
                        <h3 className='font-semibold text-gray-800'>{user.username}</h3>
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role)}`}>
                            {getRoleIcon(user.role)}
                            <span>{user.role}</span>
                        </div>
                    </div>
                </div>
                <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full'>
                    #{index + 1}
                </span>
            </div>

            <div className='flex gap-2'>
                <button
                    onClick={() => handleEditClick(user)}
                    className='flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors text-sm font-medium'
                >
                    <Edit size={14} />
                    <span>แก้ไข</span>
                </button>
                <button
                    onClick={() => handleDeleteClick(user)}
                    className='flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors text-sm font-medium'
                >
                    <Trash2 size={14} />
                    <span>ลบ</span>
                </button>
            </div>
        </div>
    )

    if (!userData || userData.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center py-16 text-gray-500'>
                <User size={48} className='mb-4 text-gray-300' />
                <p className='text-lg font-medium mb-2'>ยังไม่มีพนักงาน</p>
                <p className='text-sm text-center'>เพิ่มพนักงานใหม่เพื่อเริ่มต้นจัดการ</p>
            </div>
        )
    }

    return (
        <>
            {/* Desktop Table */}
            <div className='hidden md:block bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden'>
                <Table>
                    <TableHeader>
                        <TableRow className='bg-gray-50'>
                            <TableHead className="w-16 text-center font-semibold">#</TableHead>
                            <TableHead className="font-semibold">ชื่อพนักงาน</TableHead>
                            <TableHead className="font-semibold text-center">สิทธิการใช้งาน</TableHead>
                            <TableHead className="w-32 text-center font-semibold">จัดการ</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userData.map((item, index) => (
                            <TableRow key={item.id} className='hover:bg-gray-50'>
                                <TableCell className="text-center font-medium text-gray-600">
                                    {index + 1}
                                </TableCell>
                                <TableCell className="font-medium">
                                    <div className='flex items-center gap-3'>
                                        <div className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center'>
                                            <User className='text-gray-600' size={16} />
                                        </div>
                                        <span>{item.username}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getRoleBadgeColor(item.role)}`}>
                                        {getRoleIcon(item.role)}
                                        <span>{item.role}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className='flex items-center justify-center gap-2'>
                                        <button
                                            onClick={() => handleEditClick(item)}
                                            className='flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md transition-colors text-sm font-medium'
                                        >
                                            <Edit size={12} />
                                            <span>แก้ไข</span>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(item)}
                                            className='flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md transition-colors text-sm font-medium'
                                        >
                                            <Trash2 size={12} />
                                            <span>ลบ</span>
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile Cards */}
            <div className='md:hidden space-y-3'>
                {userData.map((user, index) => (
                    <UserCard key={user.id} user={user} index={index} />
                ))}
            </div>

            {/* Edit Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className='max-w-[95vw] md:max-w-[500px] max-h-[90vh] overflow-y-auto p-4 md:p-6'>
                    <div className='mb-4'>
                        <DialogTitle className='flex items-center gap-2 text-lg font-semibold'>
                            <Edit size={20} className='text-blue-500' />
                            แก้ไขข้อมูลพนักงาน
                        </DialogTitle>
                        {selectedUser && (
                            <p className='text-sm text-gray-600 mt-1'>
                                {selectedUser.username}
                            </p>
                        )}
                    </div>

                    <div className='space-y-4'>
                        <div>
                            <InputWithLabel
                                type='text'
                                name='username'
                                onChange={(e) => {
                                    setUpdateUser({ ...updateUser, username: e.target.value });
                                }}
                                value={updateUser.username}
                                label='ชื่อพนักงาน'
                                placeholder='ชื่อพนักงาน'
                            />
                        </div>

                        <div>
                            <InputWithLabel
                                type='password'
                                name='password'
                                onChange={(e) => {
                                    setUpdateUser({
                                        ...updateUser,
                                        password: e.target.value,
                                    });
                                }}
                                value={updateUser.password}
                                label='รหัสผ่านใหม่'
                                placeholder='กรอกรหัสผ่านใหม่ (ถ้าต้องการเปลี่ยน)'
                            />
                            <p className='text-xs text-gray-500 mt-1'>
                                หากไม่ต้องการเปลี่ยนรหัสผ่าน ให้เว้นว่างไว้
                            </p>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 flex items-center gap-1 mb-2">
                                <Shield size={14} />
                                สิทธิการใช้งาน
                            </label>
                            <Select value={updateUser.role} onValueChange={handleRoleChange}>
                                <SelectTrigger className='w-full h-10'>
                                    <SelectValue placeholder='เลือกสิทธิการใช้งาน' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>สิทธิการใช้งาน</SelectLabel>
                                        <SelectItem value='OWNER' className='flex items-center gap-2'>
                                            <div className='flex items-center gap-2'>
                                                <Crown size={14} className='text-yellow-500' />
                                                <span>OWNER - เจ้าของระบบ</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value='ADMIN' className='flex items-center gap-2'>
                                            <div className='flex items-center gap-2'>
                                                <Shield size={14} className='text-blue-500' />
                                                <span>ADMIN - ผู้ดูแลระบบ</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value='USER' className='flex items-center gap-2'>
                                            <div className='flex items-center gap-2'>
                                                <UserCheck size={14} className='text-green-500' />
                                                <span>USER - ผู้ใช้งานทั่วไป</span>
                                            </div>
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className='flex flex-col sm:flex-row gap-3 pt-4'>
                            <button
                                onClick={() => setIsEditOpen(false)}
                                className='px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium'
                            >
                                ยกเลิก
                            </button>
                            <button
                                onClick={updateUserSubmit}
                                disabled={isSubmitting}
                                className='flex-1 sm:flex-none flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-6 py-2.5 rounded-lg transition-colors font-medium'
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                        <span>กำลังบันทึก...</span>
                                    </>
                                ) : (
                                    <>
                                        <Key size={16} />
                                        <span>บันทึก</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={isDelOpen} onOpenChange={setIsDelOpen}>
                <DialogContent className='max-w-[95vw] md:max-w-[500px] p-4 md:p-6'>
                    <div className='flex flex-col items-center text-center'>
                        <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4'>
                            <AlertTriangle className='text-red-500' size={32} />
                        </div>

                        <h2 className='text-lg font-semibold text-gray-800 mb-2'>
                            ยืนยันการลบพนักงาน
                        </h2>

                        <p className='text-gray-600 mb-4'>
                            คุณต้องการลบพนักงานนี้หรือไม่?
                        </p>

                        {selectedUser && (
                            <div className='bg-gray-50 p-3 rounded-lg mb-6 w-full'>
                                <div className='flex items-center justify-center gap-2'>
                                    <User size={16} className='text-gray-600' />
                                    <span className='font-medium text-gray-800'>
                                        {selectedUser.username}
                                    </span>
                                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(selectedUser.role)}`}>
                                        {getRoleIcon(selectedUser.role)}
                                        <span>{selectedUser.role}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
                            <button
                                onClick={() => setIsDelOpen(false)}
                                className='px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium'
                            >
                                ยกเลิก
                            </button>
                            {selectedUser && (
                                <DelItem
                                    apiPath='user/delete-user'
                                    id={selectedUser.id}
                                    onComplete={() => {
                                        setIsDelOpen(false);
                                        setSelectedUser(null);
                                        router.refresh();
                                    }}
                                    renderTrigger={(onClick) => (
                                        <button
                                            onClick={onClick}
                                            className='px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium'
                                        >
                                            ลบพนักงาน
                                        </button>
                                    )}
                                />
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default TableUser