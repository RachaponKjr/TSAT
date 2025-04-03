import React from 'react';
import SubCardServices from './subCardServices';

export default function cardServices() {
  return (
    <div>
      <div className="w-[393px] mt-12 h-[285px] rounded-2xl bg-[#903035]">
        <div className="px-4 py-6 ">
          <div className="text-white w-20 h-20">icon</div>
          <div className="text-white text-xl font-bold">
            เช็คระยะ 10,000  กม.
          </div>
          <div className="text-white">ดูแลเบื้องต้น เพิ่มความมั่นใจ </div>
        </div>
      </div>{' '}
      <div className="grid grid-cols-2 gap-6 py-6">
        <SubCardServices />
        <SubCardServices />
      </div>
    </div>
  );
}
