import ImageUpload from '@/components/image-upload'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus } from 'lucide-react'
import React from 'react'

const HeaderTop = () => {
  return (
    <div className='text-xl font-bold text-[#333333] flex justify-between items-center w-full max-w-full h-max'>
      <h6>รายการสินค้า</h6>
      <div className='flex items-center gap-4 h-[2.5rem]'>
        <Select>
          <SelectTrigger className="w-[180px] !h-full">
            <SelectValue placeholder="หมวดหมู่" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>หมวดหมู่สินค้า</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Dialog>
          <DialogTrigger asChild>
            <div className='flex items-center justify-center gap-2 cursor-pointer rounded-sm border px-6 h-full'>
              <span className='text-[#333333] text-sm'>เพิ่มสินค้า</span>
              <Plus color='#333333' size={16} />
            </div>
          </DialogTrigger>
          <DialogContent className='max-w-[600px] p-4'>
            <h6 className='text-lg font-semibold'>เพิ่มรายการสินค้า</h6>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col items-start gap-2'>
                <span>หมวดหมู่</span>
                <Select>
                  <SelectTrigger className="w-full !h-full">
                    <SelectValue placeholder="หมวดหมู่" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>หมวดหมู่สินค้า</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className='flex flex-col items-start gap-2'>
              <span>ชื่อสินค้า</span>
              <Input className='w-full h-[2.5rem]' placeholder='ชื่อสินค้า' />
            </div>
            <div className='flex flex-col items-start gap-2'>
              <span>รายละเอียด</span>
              <textarea className='w-full min-h-[6rem] max-h-[6rem] border rounded-md p-2' placeholder='รายละเอียด'></textarea>
            </div>
            <div className='flex flex-col items-start gap-2'>
              <span>ภาพสินค้า</span>
              <ImageUpload />
            </div>
            <button className='bg-[#8F2F34] h-[3rem] text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-[#C65359] justify-center cursor-pointer'><span>บันทึก</span></button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default HeaderTop