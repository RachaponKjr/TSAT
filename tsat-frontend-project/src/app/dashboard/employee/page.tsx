import api from '@/server/api'
import React from 'react'
import TableUser from './_components/table-user'
import AddEmployee from './_components/add-empolyee'

const page = async () => {
    const getUser = await api.auth.getUser()
    return (
        <div className='flex flex-col h-full gap-4'>
            <div className='flex flex-row justify-between h-10 items-center'>
                <h1 className='text-xl font-semibold'>จัดการ Service ต่างๆ</h1>
                <AddEmployee />
            </div>
            <TableUser userData={getUser.data.data} />
        </div>
    )
}

export default page