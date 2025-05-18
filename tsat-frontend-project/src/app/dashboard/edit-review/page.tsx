import CardItemReview from '@/app/services/_components/card-item-review'
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import api from '@/server/api'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import React from 'react'
import AddReview from './_components/add-review'
import { toast } from 'sonner'
import DelItem from './_components/del-item'

export interface Review {
    carModel: string
    carSubModel: string
    customerName: string
    id: string
    images: string
    review: string
}

const page = async () => {
    const customerReview = await api.customerReview.getCustomerReview()
    const { data } = customerReview
    if (!data) {
        return <div>ไม่พบข้อมูล</div>
    }
    return (
        <div>
            <div className='flex flex-row justify-between gap-4 h-10 items-stretch'>
                <h1 className='text-xl font-semibold'>แก้ไขรีวิว</h1>
                <div>
                    <AddReview />
                </div>
            </div>
            <div className='grid grid-cols-4 gap-4 mt-4'>
                {data?.reviews.map((item: Review) => (
                    <div key={item.id} className='col-span-1 relative'>
                        <Dialog>
                            <DialogTrigger className='absolute top-2 right-2 z-10 bg-red-500 rounded-full p-1 w-7 h-7 flex justify-center items-center cursor-pointer'>
                                <X color='white' />
                            </DialogTrigger>
                            <DialogContent className='max-w-[600px] max-h-[90vh] overflow-y-auto p-4'>
                                <DelItem id={item.id} apiPath='customer-review/delete'/>
                            </DialogContent>
                        </Dialog>
                        <CardItemReview item={item} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default page