/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import ImageBoxUpload from '@/components/image-upload'
import InputWithLabel from '@/components/input-label'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import api from '@/server/api'
import { CarModel } from '@/types/car-model'
import { PlusIcon, Car, Trash2, Edit, AlertTriangle, Image as ImageIcon } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import DelItem from '../edit-review/_components/del-item'
import { getCookie } from '@/lib/cookie'

// แยก Component สำหรับแต่ละ Car Model Item
const CarModelItem = ({ 
  item, 
  onDeleteCarModel, 
  onDeleteSubCarModel,
  subName,
  setSubName,
  subImage,
  setSubImage
}) => {
  // State แยกกันแต่ละ item
  const [delOpen, setDelOpen] = useState(false)
  const [addSubOpen, setAddSubOpen] = useState(false)
  const [subDelOpen, setSubDelOpen] = useState(false)
  const [selectedSubItem, setSelectedSubItem] = useState(null)

  const addSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const cookie = await getCookie('access_token')
      const form = new FormData()
      form.append('name', subName)
      form.append('carModelId', item.id)
      form.append('image', subImage as File)
      await fetch('http://150.95.26.51:3131/api/v1/sub-car-model/create', {
        method: 'POST',
        body: form,
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      }).then(res => {
        if (res.status === 200) {
          toast.success('เพิ่มรถสําเร็จ', { className: '!text-green-500' })
          setAddSubOpen(false)
          setSubName('')
          setSubImage(undefined)
          onDeleteCarModel() // refresh data
        }
      }).catch(() => {
        toast.error('เกิดข้อผิดพลาดในการเพิ่มรถ', {
          className: '!text-red-500'
        })
      })
    } catch {
      toast.error('เกิดข้อผิดพลาดในการเพิ่มรถ', { className: '!text-red-500' })
    }
  }

  const handleDeleteSub = (subItem) => {
    setSelectedSubItem(subItem)
    setSubDelOpen(true)
  }

  const handleSubDeleteComplete = () => {
    setSubDelOpen(false)
    setSelectedSubItem(null)
    onDeleteSubCarModel()
  }

  const handleCarModelDeleteComplete = () => {
    setDelOpen(false)
    onDeleteCarModel()
  }

  return (
    <div className='bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-6 bg-gray-50 border-b border-gray-200'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-[#8F2F34]/10 rounded-lg flex items-center justify-center'>
            <Car className='text-[#8F2F34]' size={20} />
          </div>
          <div>
            <h3 className='font-semibold text-gray-800 text-base sm:text-lg'>{item.name}</h3>
            <p className='text-sm text-gray-500'>
              {item.carSubModels.length} รุ่นย่อย
            </p>
          </div>
        </div>
        
        {/* Delete Car Model Button */}
        <Dialog open={delOpen} onOpenChange={setDelOpen}>
          <DialogTrigger>
            <button className='flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium text-sm'>
              <Trash2 size={14} />
              <span className='hidden sm:inline'>ลบข้อมูลทั้งหมด</span>
              <span className='sm:hidden'>ลบ</span>
            </button>
          </DialogTrigger>
          <DialogContent className='max-w-[95vw] sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-4 sm:p-6 bg-white'>
            <DelItem 
              id={item.id} 
              apiPath='car-model' 
              onComplete={handleCarModelDeleteComplete} 
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Content */}
      <div className='p-4 sm:p-6'>
        {/* Sub Models Header */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4'>
          <div className='flex items-center gap-2'>
            <h4 className='font-medium text-gray-700'>ข้อมูลรถย่อย</h4>
            <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full'>
              {item.carSubModels.length} รายการ
            </span>
          </div>
          
          {/* Add Sub Model Button */}
          <Dialog open={addSubOpen} onOpenChange={setAddSubOpen}>
            <DialogTrigger>
              <button className='flex items-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium text-sm'>
                <PlusIcon size={14} />
                <span>เพิ่มรถย่อย</span>
              </button>
            </DialogTrigger>
            <DialogContent className='max-w-[95vw] sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-4 sm:p-6 bg-white'>
              <div className='mb-4'>
                <h3 className='text-lg font-semibold flex items-center gap-2'>
                  <PlusIcon size={20} className='text-green-500' />
                  เพิ่มข้อมูลรุ่นรถย่อย
                </h3>
                <p className='text-sm text-gray-600 mt-1'>สำหรับ {item.name}</p>
              </div>
              
              <form className='flex flex-col gap-4' onSubmit={addSubmit}>
                <InputWithLabel 
                  onChange={(e) => setSubName(e.target.value)} 
                  type='text' 
                  value={subName} 
                  label='ชื่อรุ่นรถ' 
                  name='name' 
                  placeholder='กรุณากรอกชื่อรุ่นรถ' 
                />
                <div className='flex flex-col gap-2'>
                  <div className='flex gap-1 items-center'>
                    <ImageIcon size={16} className='text-gray-500' />
                    <span className="text-sm font-medium text-gray-700">เพิ่มรูปรถ</span>
                    <span className="text-sm font-medium text-red-500">* ไม่จําเป็น</span>
                  </div>
                  <ImageBoxUpload onChange={setSubImage} />
                </div>
                <div className='flex flex-col sm:flex-row gap-3 pt-4'>
                  <button 
                    type="button"
                    onClick={() => setAddSubOpen(false)}
                    className='px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium'
                  >
                    ยกเลิก
                  </button>
                  <button 
                    type="submit" 
                    className='flex-1 sm:flex-none px-6 py-3 bg-[#8F2F34] hover:bg-[#C65359] text-white rounded-lg transition-colors font-medium'
                  >
                    บันทึก
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Sub Models List */}
        {item.carSubModels.length === 0 ? (
          <div className='text-center py-8 text-gray-500'>
            <Car size={32} className='mx-auto mb-2 text-gray-300' />
            <p className='text-sm'>ยังไม่มีรุ่นรถย่อย</p>
          </div>
        ) : (
          <div className='space-y-2'>
            {item.carSubModels.map((subItem, index) => (
              <div key={subItem.id || index} className='flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors'>
                <div className='flex items-center gap-2'>
                  <span className='text-xs font-medium text-gray-500'>#{index + 1}</span>
                  <span className='font-medium text-gray-800'>{subItem.name}</span>
                </div>
                <button 
                  onClick={() => handleDeleteSub(subItem)}
                  className='flex items-center gap-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors text-sm font-medium'
                >
                  <Trash2 size={12} />
                  <span>ลบ</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Delete Sub Model Dialog */}
        <Dialog open={subDelOpen} onOpenChange={setSubDelOpen}>
          <DialogContent className='max-w-[95vw] sm:max-w-[500px] p-4 sm:p-6 bg-white'>
            <div className='flex flex-col items-center text-center'>
              <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4'>
                <AlertTriangle className='text-red-500' size={32} />
              </div>
              
              <h2 className='text-lg font-semibold text-gray-800 mb-2'>
                ยืนยันการลบ
              </h2>
              
              <p className='text-gray-600 mb-4'>
                คุณต้องการลบรุ่นรถย่อยนี้หรือไม่?
              </p>
              
              {selectedSubItem && (
                <p className='text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg mb-6 max-w-full truncate'>
                  "{selectedSubItem.name}"
                </p>
              )}

              <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
                <button
                  onClick={() => setSubDelOpen(false)}
                  className='px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium'
                >
                  ยกเลิก
                </button>
                {selectedSubItem && (
                  <DelItem 
                    id={selectedSubItem.id} 
                    apiPath='sub-car-model/delete' 
                    onComplete={handleSubDeleteComplete}
                    renderTrigger={(onClick) => (
                      <button
                        onClick={onClick}
                        className='px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium'
                      >
                        ลบรุ่นรถ
                      </button>
                    )}
                  />
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

const page = () => {
  const [carModel, setCarModel] = useState<CarModel[]>([])
  const [name, setName] = useState<string>('')
  const [subName, setSubName] = useState<string>('')
  const [addOpen, setAddOpen] = useState(false)
  const [imageModel, setImageModel] = useState<File>()
  const [imageName, setImageName] = useState<File>()
  const [subImage, setSubImage] = useState<File>()
  
  const getModeCar = useCallback(async () => {
    await api.carModel.getCarModel()
      .then(res => {
        if (res.data && res.data.data) {
          setCarModel(res.data.data)
        }
      })
      .catch(err => console.log(err))
  }, [])

  const addCarModel = async () => {
    if (!name.trim() || !imageModel || !imageName) {
      toast.error('กรุณากรอกข้อมูลให้ครบถ้วน', { className: '!text-red-500' })
      return
    }

    try {
      const cookie = await getCookie('access_token')
      const form = new FormData()
      form.append('name', name)
      form.append('image_model', imageModel as File)
      form.append('image_name', imageName as File)
      await fetch('http://150.95.26.51:3131/api/v1/car-model/create', {
        method: 'POST',
        body: form,
        credentials:"include",
        headers: {
          Authorization: `Bearer ${cookie}`
        }
      }).then(res => {
        if (res.status === 200) {
          toast.success('เพิ่มรถสําเร็จ', { className: '!text-green-500' })
          setAddOpen(false)
          setName('')
          setImageModel(undefined)
          setImageName(undefined)
          getModeCar()
        }
      }).catch(() => toast.error('เกิดข้อผิดพลาดในการเพิ่มรถ', { className: '!text-red-500' }))
    } catch {
      toast.error('เกิดข้อผิดพลาดในการเพิ่มรถ', { className: '!text-red-500' })
    }
  }

  const delCarModel = async () => {
    void getModeCar()
  }

  const delSubCarModel = async () => {
    void getModeCar()
  }

  useEffect(() => {
    void getModeCar()
  }, [getModeCar])

  return (
    <div className='space-y-4 sm:space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
        <div className='flex items-center gap-2 sm:gap-3'>
          <div className='p-2 bg-[#8F2F34]/10 rounded-lg hidden sm:flex'>
            <Car className='text-[#8F2F34]' size={20} />
          </div>
          <div>
            <h3 className='text-lg sm:text-xl font-bold text-[#333333]'>
              จัดการข้อมูลรถ
            </h3>
            <p className='text-xs sm:text-sm text-gray-500 hidden sm:block'>
              {carModel.length} รุ่นรถทั้งหมด
            </p>
          </div>
        </div>
        
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger>
            <button className='flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium'>
              <PlusIcon size={16} />
              <span>เพิ่มข้อมูลรถ</span>
            </button>
          </DialogTrigger>
          <DialogContent className='max-w-[95vw] sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-4 sm:p-6'>
            <div className='mb-4'>
              <h3 className='text-lg font-semibold flex items-center gap-2'>
                <PlusIcon size={20} className='text-green-500' />
                เพิ่มข้อมูลรถ
              </h3>
              <p className='text-sm text-gray-600 mt-1'>เพิ่มรุ่นรถใหม่</p>
            </div>
            
            <div className='flex flex-col gap-4'>
              <InputWithLabel 
                onChange={(e) => setName(e.target.value)} 
                type='text' 
                value={name} 
                label='ชื่อรถ' 
                name='name' 
                placeholder='กรุณากรอกชื่อรถ' 
              />
              
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='flex flex-col gap-2'>
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <ImageIcon size={14} />
                    เพิ่มรูปรถ
                  </span>
                  <ImageBoxUpload onChange={setImageModel} />
                </div>
                <div className='flex flex-col gap-2'>
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <ImageIcon size={14} />
                    เพิ่มรูปชื่อรถ
                  </span>
                  <ImageBoxUpload onChange={setImageName} />
                </div>
              </div>
              
              <div className='flex flex-col sm:flex-row gap-3 pt-4'>
                <button
                  onClick={() => setAddOpen(false)}
                  className='px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium'
                >
                  ยกเลิก
                </button>
                <button 
                  onClick={addCarModel} 
                  className='flex-1 sm:flex-none px-6 py-3 bg-[#8F2F34] hover:bg-[#C65359] text-white rounded-lg transition-colors font-medium'
                >
                  บันทึก
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Mobile Summary */}
      <div className='sm:hidden bg-[#8F2F34]/5 border border-[#8F2F34]/20 rounded-lg p-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Car size={16} className='text-[#8F2F34]' />
            <span className='text-sm font-medium text-[#8F2F34]'>
              รุ่นรถทั้งหมด
            </span>
          </div>
          <span className='text-sm font-bold text-[#8F2F34]'>
            {carModel.length} รุ่น
          </span>
        </div>
      </div>

      {/* Car Models List */}
      {carModel.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-16 text-gray-500'>
          <Car size={64} className='mb-6 text-gray-300' />
          <h3 className='text-xl font-semibold mb-2 text-gray-600'>
            ยังไม่มีข้อมูลรถ
          </h3>
          <p className='text-center mb-6 text-gray-500'>
            เริ่มต้นเพิ่มข้อมูลรถคันแรกของคุณ
          </p>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger>
              <button className='flex items-center gap-2 bg-[#8F2F34] text-white px-6 py-3 rounded-lg hover:bg-[#C65359] transition-colors font-medium'>
                <PlusIcon size={18} />
                <span>เพิ่มรถคันแรก</span>
              </button>
            </DialogTrigger>
          </Dialog>
        </div>
      ) : (
        <div className='space-y-4 sm:space-y-6'>
          {carModel.map((item, index) => (
            <CarModelItem
              key={item.id || index}
              item={item}
              onDeleteCarModel={delCarModel}
              onDeleteSubCarModel={delSubCarModel}
              subName={subName}
              setSubName={setSubName}
              subImage={subImage}
              setSubImage={setSubImage}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default page