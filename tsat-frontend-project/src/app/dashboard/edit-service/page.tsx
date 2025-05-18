
import React from 'react'
import AddService from './_components/add-service'
import TableService from './_components/table-service'

const page = () => {
    return (
        <div className='flex flex-col h-full '>
            <div className='flex flex-row justify-between h-10 items-center'>
                <h1 className='text-xl font-semibold'>จัดการ Service ต่างๆ</h1>
                <AddService />
            </div>
            <div className=' grow'>
                <TableService />
            </div>
        </div>
    )
}

export default page