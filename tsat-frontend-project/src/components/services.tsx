import React from 'react';
import CardServices from './cardServices';
import SubCardServices from './subCardServices';

export default function services() {
  return (
    <div className="bg-[#F5F5F5] ">
      <div className="px-24 py-24">
        <div className="text-3xl font-bold text-[#8F2F34] ">
          เลือกจากบริการที่ท่านสนใจ
        </div>
        <div className="text-[#333333] text-2xl mt-6">
          ให้คำปรึกษาฟรีตรวจเช็คและประเมินปัญหาฟรีไม่มีค่าธรรมเนียมแรกเข้าใดๆ
          <br />
          พร้อมแจ้งรายละเอียดปัญหาด้วยใบเสนอราคา ให้ลูกค้าตัดสินใจก่อนทุกครั้ง
          สบายใจได้เมื่อเข้ารับบริการที่ TSAT
        </div>
        <div className="flex gap-6 justify-center">
          <CardServices />
          <CardServices />
          <CardServices />
        </div>
      </div>
    </div>
  );
}
