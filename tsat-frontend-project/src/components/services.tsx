
import api from '@/server/api';
import CardServices from './cardServices';
import React from 'react';
import { Service } from '@/types/service';
import { CarModel } from '@/types/car-model';
import { Work } from '@/types/customer-work';

export default async function Services({ headText, description }: { headText: string, description: string }) {
  const res = await api.service.getService()
  const cardata = await api.carModel.getCarModel();
  const carModel: CarModel = cardata as unknown as CarModel;
  const { data: customerWork } = await api.customerWork.getCustomerWork() as { data: { works: Work[] } };
  const service = (res.data as {
    service: Service[]
  }).service;
  return (
    <div className="bg-[#F5F5F5]">
      <div className="p-4 xl:px-24 xl:py-6 container mx-auto">
        <div className="text-[clamp(24px,2vw,30px)] font-bold text-[#8F2F34] " dangerouslySetInnerHTML={{ __html: headText }} />
        <div className="text-[#333333] text-[clamp(16px,2vw,20px)] mt-4" dangerouslySetInnerHTML={{ __html: description }} />
        <CardServices carModel={carModel} customerWork={customerWork.works} services={service} />
      </div>
    </div>
  );
}
