import React from 'react';
import SubCardServices from './subCardServices';

export default function cardServices() {
  return (
    <div>
      <div className="w-full mt-12  h-[400px] rounded-2xl bg-[#903035]">
        <div className="px-8 py-6 ">
          <img
            src="../images/kilo-check.png"
            className="w-[600px]"
            alt="Description of image"
          />
          <div className="text-white mt-4 text-2xl font-bold">
            เช็คระยะ 10,000  กม.
          </div>
          <div className="text-xl mt-4">
            ดูแลเบื้องต้น เพิ่มความมั่นใจ เหมาะสำหรับการดูแลประจำปี ให้รถขับลื่น
            มั่นใจทุกการเดินทาง
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 py-6">
        <SubCardServices />
        <SubCardServices />
      </div>
    </div>
  );
}
