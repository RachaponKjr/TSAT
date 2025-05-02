
import api from '@/server/api';
import CardServices from './cardServices';
import React from 'react';
import { Service } from '@/types/service';
import { CarModel } from '@/types/car-model';

export default async function Services() {
  const res = await api.service.getService()
  const cardata = await api.carModel.getCarModel();
  const carModel: CarModel = cardata as unknown as CarModel;
  const { data: customerWork } = await api.customerWork.getCustomerWork();
  const service = (res.data as {
    service: Service[]
  }).service;
  return (
    <div className="bg-[#F5F5F5]">
      <div className="p-4 xl:px-24 xl:py-6 container mx-auto">
        <div className="text-[clamp(24px,2vw,30px)] font-bold text-[#8F2F34] ">
          เลือกจากบริการที่ท่านสนใจ
        </div>
        <div className="text-[#333333] text-[clamp(16px,2vw,20px)] mt-4">
          ให้คำปรึกษาฟรีตรวจเช็คและประเมินปัญหาฟรีไม่มีค่าธรรมเนียมแรกเข้าใดๆ
          <br />
          พร้อมแจ้งรายละเอียดปัญหาด้วยใบเสนอราคา ให้ลูกค้าตัดสินใจก่อนทุกครั้ง
          สบายใจได้เมื่อเข้ารับบริการที่ TSAT
        </div>

        <CardServices carModel={carModel} customerWork={customerWork} services={service} />
      </div>
    </div>
  );
}
