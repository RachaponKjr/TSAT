'use client'

import React, { Dispatch, useCallback, useEffect, useState } from 'react'
import { Plus } from 'lucide-react'

import ImageUpload from '@/components/image-upload'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import api from '@/server/api'
import { toast } from 'sonner'

interface CategoryProduct {
  id: string
  name: string
  image: string
  createdAt: string
  updatedAt: string
}
interface CategoryService {
  id: string
  title: string
  createdAt: string
  updatedAt: string
}

const HeaderTop = ({ getProduct, setFilter }: { getProduct: () => Promise<void>, setFilter: Dispatch<string> }) => {
  const [categories, setCategories] = useState<CategoryProduct[]>([])
  const [categoryService, setCategoryService] = useState<CategoryService[]>([])
  const [open, setOpen] = useState(false);
  const [openService, setOpenService] = useState(false);
  const [data, setData] = useState({
    name: '',
    detail: '',
    categoryId: '',
  })
  const [serviceData, setServiceData] = useState({
    name: '',
    categoryServiceId: '',
  })
  const [image, setImage] = useState<File | null>(null)
  const [bgImage, setBgImage] = useState<File | null>(null)

  const fetchCategoriesService = useCallback(async () => {
    try {
      const res = await api.catagory.getCatagoryService()
      if (res.status === 200) {
        setCategoryService(res.data as CategoryService[])
      }
    } catch (e) {
      console.error('Failed to fetch categories', e)
    }
  }, [])

  const fetchCategories = useCallback(async () => {
    try {
      const res = await api.product.getCatagoryProduct()
      if (res.status === 200) {
        setCategories(res.data.data)
      }
    } catch (e) {
      console.error('Failed to fetch categories', e)
    }
  }, [])

  useEffect(() => {
    void fetchCategories()
    void fetchCategoriesService()
  }, [fetchCategories, fetchCategoriesService])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setData((prev) => ({ ...prev, categoryId: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (data.name === '' && data.detail === '' && data.categoryId === '' && image === null) {
      toast.error('กรุณากรอกข้อมูลให้ครบถ้วน', { className: '!text-red-500' })
    }
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('detail', data.detail)
    formData.append('categoryId', data.categoryId)
    formData.append('image', image as File)
    try {
      const res = await fetch('http://http://150.95.25.111:3131/api/v1/product/create-product', {
        method: 'POST',
        body: formData
      })
      if (res.status === 201) {
        toast.success('สร้างสินค้าสําเร็จ', { className: '!text-green-500' })
        setData({
          name: '',
          detail: '',
          categoryId: '',
        })
        getProduct()
        setOpen(false)
        setImage(null)
      } else {
        toast.error('สร้างสินค้าไม่สําเร็จ', { className: '!text-red-500' })
      }
    } catch (e) {
      console.log(e)
    }
  }

  const createCategoryService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', serviceData.name)
      formData.append('categoryServiceId', serviceData.categoryServiceId)
      formData.append('image', bgImage as File)
      const res = await fetch('http://http://150.95.25.111:3131/api/v1/product/create-category', {
        method: 'POST',
        body: formData
      })
      if (res.status === 200) {
        toast.success('สร้างหมวดหมู่บริการสําเร็จ', { className: '!text-green-500' })
        setServiceData({
          name: '',
          categoryServiceId: '',
        })
        fetchCategoriesService()
        setOpenService(false)
        setBgImage(null)
      } else {
        toast.error('สร้างหมวดหมู่บริการไม่สําเร็จ', { className: '!text-red-500' })
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='text-xl font-bold text-[#333333] flex justify-between items-center w-full max-w-full h-max'>
      <h6>รายการสินค้า</h6>
      <div className='flex items-center gap-4 h-[2.5rem]'>
        <Select onValueChange={(e) => setFilter(e)}>
          <SelectTrigger className='w-[180px] !h-full'>
            <SelectValue placeholder='หมวดหมู่' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>หมวดหมู่สินค้า</SelectLabel>
              <SelectItem value='all'>ทั้งหมด</SelectItem>
              {categories.map((item) => (
                <SelectItem key={item.id} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Dialog open={openService} onOpenChange={setOpenService}>
          <DialogTrigger asChild>
            <div className='flex items-center justify-center gap-2 cursor-pointer rounded-sm border px-6 h-full'>
              <span className='text-[#333333] text-sm'>เพิ่มหมวดหมู่</span>
              <Plus color='#333333' size={16} />
            </div>
          </DialogTrigger>
          <DialogContent className='max-w-[600px] p-4'>
            <h6 className='text-lg font-semibold'>เพิ่มหมวดหมู่สินค้า</h6>

            <form onSubmit={createCategoryService} className='flex flex-col gap-4'>
              <div className='flex flex-col items-start gap-2'>
                <span>ชื่อหมวดหมู่อะไหล่</span>
                <Input
                  name='name'
                  className='w-full h-[2.5rem]'
                  placeholder='ชื่อหมวดหมู่'
                  value={serviceData.name}
                  onChange={(e) => setServiceData({ ...serviceData, name: e.target.value })}
                />
              </div>
              <div className='flex flex-col items-start gap-2'>
                <span>หมวดหมู่บริการ</span>
                <Select
                  value={serviceData.categoryServiceId}
                  onValueChange={(value) =>
                    setServiceData({ ...serviceData, categoryServiceId: value })
                  }
                >
                  <SelectTrigger className="w-full !h-full">
                    <SelectValue placeholder="หมวดหมู่" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>หมวดหมู่บริการ</SelectLabel>
                      {categoryService.map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className='flex flex-col items-start gap-2'>
                <span>ภาพพื้นหลัง</span>
                <ImageUpload onChange={setBgImage} />
              </div>
              <button
                type='submit'
                className='bg-[#8F2F34] h-[3rem] text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-[#C65359] justify-center cursor-pointer'
              >
                <span>บันทึก</span>
              </button>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className='flex items-center justify-center gap-2 cursor-pointer rounded-sm border px-6 h-full'>
              <span className='text-[#333333] text-sm'>เพิ่มสินค้า</span>
              <Plus color='#333333' size={16} />
            </div>
          </DialogTrigger>
          <DialogContent className='max-w-[600px] p-4'>
            <h6 className='text-lg font-semibold'>เพิ่มรายการสินค้า</h6>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <div className='flex flex-col items-start gap-2'>
                <span>หมวดหมู่</span>
                <Select onValueChange={handleCategoryChange}>
                  <SelectTrigger className='w-full !h-[2.5rem]'>
                    <SelectValue placeholder='เลือกหมวดหมู่สินค้า' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className='flex flex-col items-start gap-2'>
                <span>ชื่อสินค้า</span>
                <Input
                  name='name'
                  className='w-full h-[2.5rem]'
                  placeholder='ชื่อสินค้า'
                  value={data.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className='flex flex-col items-start gap-2'>
                <span>รายละเอียด</span>
                <textarea
                  name='detail'
                  className='w-full min-h-[6rem] max-h-[6rem] border rounded-md p-2'
                  placeholder='รายละเอียด'
                  value={data.detail}
                  onChange={handleInputChange}
                />
              </div>

              <div className='flex flex-col items-start gap-2'>
                <span>ภาพสินค้า</span>
                <ImageUpload onChange={setImage} />
              </div>

              <button
                type='submit'
                className='bg-[#8F2F34] h-[3rem] text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-[#C65359] justify-center cursor-pointer'
              >
                <span>บันทึก</span>
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default HeaderTop
