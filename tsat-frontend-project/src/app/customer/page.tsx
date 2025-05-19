import React from 'react';
import HeaderCustomerSection from '@/components/headerCustomerSection';
import SwiperClientModel from './_components/swiper-client-model';
import api from '@/server/api';
import { CMSCustomerProps } from '../dashboard/cms/_components/customer-page';
import ItemBox from '@/components/ui/item-box';

export default async function Customer() {
  const cmsResponse = await api.cms.getCMSCustomer();
  const { data: cms } = cmsResponse as { data: CMSCustomerProps };
  const { data: customerWork } = await api.customerWork.getCustomerWork() as { data: any };

  return (
    <div>
      <HeaderCustomerSection 
        headText={cms?.data?.text_line_1 ?? ''} 
        description1={cms?.data?.text_line_2 ?? ''} 
        description2={cms?.data?.text_line_3 ?? ''} 
      />
      <div className='py-10 px-10 xl:px-24 relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-[50%] before:bg-gradient-to-t before:from-[#FFFFFF] before:to-[#999999] before:opacity-20'>
        <SwiperClientModel />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 px-4 py-6 lg:px-[100px]'>
        {(customerWork?.works ?? []).map((item: any, index: number) => (
          <ItemBox item={item} key={index} />
        ))}
      </div>
    </div>
  );
}

