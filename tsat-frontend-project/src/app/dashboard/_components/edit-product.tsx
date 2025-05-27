'use client'
import ImageBoxUpload from '@/components/image-upload'
import InputWithLabel from '@/components/input-label'
import TextareaWithLabel from '@/components/textarea-with-label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getCookie } from '@/lib/cookie'
import api from '@/server/api'
import { Product } from '@/types/product'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

interface CategoryProps {
    id: string;
    name: string;
    image: string;
    categoryServiceId: string
}

const EditProduct = ({ data }: { data: Product }) => {
    const [image, setImage] = useState<File | null>(null);
    const [editdata, setEditData] = useState<Product | null>(data);
    const [categorys, setCategorys] = useState([]);

    const getCategory = useCallback(async () => {
        await api.product.getCatagoryProduct().then((res) => {
            if (res.status === 200) {
                setCategorys(res.data.data)
            }
        })
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditData((prevData) => {
            if (!prevData) return prevData;
            return {
                ...prevData,
                [name]: value,
            };
        });
    }

    const updateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const cookie = await getCookie('access_token');
        const formData = new FormData();
        formData.append('name', editdata?.name as string);
        formData.append('detail', editdata?.detail as string);
        formData.append('categoryId', editdata?.categoryId as string);
        if (image) {
            formData.append('image', image as File);
        }
        await fetch(`http://150.95.25.111:3131/api/v1/product/update-product/${editdata?.id}`, {
            method: 'PUT',
            body: formData,
            headers: {
                Authorization: `Bearer ${cookie}`,
            }
        }).then((res) => {
            if (res.status === 200) {
                toast.success('แก้ไขสินค้าสําเร็จ', { className: '!text-green-500' })
            }
        }).catch((e) => {
            console.log(e)
            toast.error('แก้ไขสินค้าไม่สําเร็จ', { className: '!text-red-500' })
        })
    }

    useEffect(() => {
        void getCategory();
    }, [getCategory]);

    console.log(editdata)
    return (
        <form onSubmit={updateProduct} className='space-y-4'>
            <InputWithLabel onChange={handleInputChange} label='ชื่อสินค้า' name='name' value={editdata?.name} />
            <TextareaWithLabel label='รายละเอียด' name='description' value={editdata?.detail} />
            <div>
                <label className='text-sm font-semibold'>หมวดหมู่</label>
                <Select
                    value={editdata?.categoryId}
                    onValueChange={(value) => {
                        setEditData((prevData) => {
                            if (!prevData) return prevData;
                            return {
                                ...prevData,
                                categoryId: value,
                            };
                        })
                    }}
                >
                    <SelectTrigger className='w-full !h-full'>
                        <SelectValue placeholder='หมวดหมู่' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>หมวดหมู่</SelectLabel>
                            {categorys?.map((item: CategoryProps) => (
                                <SelectItem key={item.id} value={item.id}>
                                    {item.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label className='text-sm font-semibold'>รูปสินค้า</label>
                <ImageBoxUpload onChange={setImage} value={editdata?.imageProduct} />
            </div>
            <button type='submit' className='border border-green-400 text-green-500 w-full py-3 hover:bg-green-500 hover:text-white duration-300 rounded-md font-semibold cursor-pointer text-sm'>บันทึก</button>
        </form>
    )
}

export default EditProduct