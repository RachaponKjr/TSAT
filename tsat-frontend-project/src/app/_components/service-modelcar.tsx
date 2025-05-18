/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import ItemBox from '@/components/ui/item-box';
import api from '@/server/api';
import React, { useEffect, useState, useCallback } from 'react'

interface SubCarModel {
    carModel: string
    carSubModel: string
    id: string
    images: string
    tags: string[]
    title: string
}

const ServiceModelCar = ({ subCarModelId }: { subCarModelId: string }) => {
    const [subCarModel, setSubCarModel] = useState<SubCarModel[]>([])
    const getBySubCarModelId = useCallback(async () => {
        try {
            const res = await api.customerWork.getBySubCarModel(subCarModelId);
            if (res.status === 200) {
                setSubCarModel(res.data.data.works)
            }
        } catch (error) {
            console.log(error);
        }
    }, [subCarModelId])

    useEffect(() => {
        getBySubCarModelId()
    }, [getBySubCarModelId])

    return (
        <div
            className='w-full grid grid-cols-3 justify-center gap-4 mt-4'
        >
            {subCarModel.length === 0 ? (
                <h1 className='col-span-3 text-center '>ไม่พบข้อมูล</h1>
            ) : (
                subCarModel.map((subCarModel: SubCarModel) => (
                    <ItemBox item={subCarModel} key={subCarModel.id} />
                ))
            )}
            {/* <ItemBox /> */}
        </div>
    )
}

export default ServiceModelCar