import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import ItemBox from './ui/item-box';
import api from '@/server/api';
import Link from 'next/link';
import { Work } from '@/types/customer-work';

export default async function CardImageWithTag({ headText }: { headText: string }) {
  const { data: customerWork } = await api.customerWork.getCustomerWork() as { data: { works: Work[] } };
  return (
    <div className="bg-[#F5F5F5] py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between px-6 lg:px-24 items-start md:items-center gap-4 container mx-auto">
        <div className="text-xl md:text-[clamp(24px,2vw,30px)] font-bold text-[#8F2F34]" dangerouslySetInnerHTML={{ __html: headText }} />
        <div className="hidden md:block">
          <Link
            href={'/customer'}
            className="text-[#8F2F34] gap-2 rounded-sm text-lg font-semibold hover:bg-[#8F2F34] hover:text-white transition-all duration-300 h-[54px] w-[243px] border border-[#8F2F34] flex items-center justify-center"
          >
            ดูทั้งหมด <PlusOutlined />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 lg:px-24 container mx-auto">
        {customerWork.works.length === 0 ? <div className="text-black text-center md:text-left mt-4">ไม่มีข้อมูล</div> :
          customerWork.works.slice(0, 6).filter((item: Work) => item.type === "WorkBlog").map((item: Work, index: number) => (
            <>
              <ItemBox item={item} key={index} />
            </>
          ))
        }
      </div>

      <div className="block md:hidden text-center mt-12 container mx-auto px-4">
        <Link
          href={'/customer'}
          className="text-[#8F2F34] gap-2 rounded-sm text-lg font-semibold hover:bg-[#8F2F34] h-[54px] hover:text-white border border-[#8F2F34] flex items-center justify-center transition-all duration-300"
        >
          ดูทั้งหมด <PlusOutlined />
        </Link>
      </div>
    </div>
  );
}
