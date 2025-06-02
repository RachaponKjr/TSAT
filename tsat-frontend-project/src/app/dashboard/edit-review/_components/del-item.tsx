'use client'
import { DialogClose } from '@/components/ui/dialog'
import { getCookie } from '@/lib/cookie'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

type TaskOptions = {
    id: string;
    apiPath: string;
    onComplete?: () => void;
};

const DelItem = ({ id, apiPath, onComplete }: TaskOptions) => {
    const router = useRouter()
    const delReview = async (id: string) => {
        try {
            const accept_token = await getCookie('access_token')
            const res = await fetch(`http://150.95.26.51:3131/api/v1/${apiPath}/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accept_token}`,
                }
            })
            if (res.status === 200) {
                toast.success('ลบข้อมูลสำเร็จ', { className: '!text-green-500' })
                router.refresh()
                if (onComplete) {
                    onComplete()
                }
            } else {
                toast.error('ลบข้อมูลไม่สำเร็จ', { className: '!text-red-500' })
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className='flex flex-col gap-4'>
            <h6 className='text-lg font-semibold w-full'>คุณต้องการลบข้อมูลนี้หรือไม่</h6>
            <div className='flex flex-row items-center justify-end gap-2 h-12'>
                <button
                    onClick={() => {
                        void delReview(id) // Replace with the actual ID
                    }}
                    className='border border-[#8F2F34] h-full flex-1 cursor-pointer text-[#8F2F34] px-3 py-1 rounded-lg'
                >
                    ยืนยัน
                </button>
                <DialogClose className='flex-1 bg-[#8F2F34] h-full w-full rounded-lg hover:bg-[#C65359]'>
                    <button
                        className=' h-full cursor-pointer text-white px-3 py-1 ml-2'
                    >
                        ยกเลิก
                    </button>
                </DialogClose>
            </div>
        </div>
    )
}

export default DelItem