import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import ItemBox from './ui/item-box';
import api from '@/server/api';

export default async function CardImageWithTag() {
  const { data: customerWork } = await api.customerWork.getCustomerWork() as { data: any };

  return (
    <div className="bg-[#F5F5F5] py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between px-6 lg:px-24 items-start md:items-center gap-4 container mx-auto">
        <div className="text-xl md:text-[clamp(24px,2vw,30px)] font-bold text-[#8F2F34]">
          ตัวอย่างงานบริการลูกค้า
        </div>

        <div className="hidden md:block">
          <Button
            style={{
              border: '1px solid #8F2F34',
              backgroundColor: 'transparent',
              color: '#8F2F34',
              fontSize: '1.25rem',
              padding: '1.5rem 6rem',
            }}
            className="hover:bg-white hover:text-black transition-all duration-300"
          >
            ดูทั้งหมด <PlusOutlined />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 lg:px-24 container mx-auto">
        {customerWork.works.slice(0, 6).map((item : any, index : number) => (
          <>
            <ItemBox item={item} key={index} />
          </>
        ))}
      </div>

      <div className="block md:hidden text-center mt-12 container mx-auto px-4">
        <Button
          style={{
            border: '1px solid #8F2F34',
            backgroundColor: 'transparent',
            color: '#8F2F34',
            fontSize: '1.25rem',
            padding: '1.5rem 6rem',
            width: '100%',
          }}
          className="hover:bg-white hover:text-black transition-all duration-300"
        >
          ดูทั้งหมด <PlusOutlined />
        </Button>
      </div>
    </div>
  );
}
