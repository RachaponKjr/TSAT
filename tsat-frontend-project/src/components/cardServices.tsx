import React from 'react';
import SubCardServices from './subCardServices';

export default function CardServices() {
  return (
    <div className="w-full mt-12 ">
      {/* Desktop View */}
      <div className="hidden sm:block">
        <div className="w-full h-[400px] rounded-2xl bg-[#903035] p-6 flex items-center">
          <div>
            <img
              src="../images/kilo-check.png"
              className="w-[600px]"
              alt="Description of image"
            />
            <div className="text-white mt-4 text-2xl font-bold">
              เช็คระยะ 10,000 กม.
            </div>
            <div className="text-xl mt-4 text-white">
              ดูแลเบื้องต้น เพิ่มความมั่นใจ เหมาะสำหรับการดูแลประจำปี
              ให้รถขับลื่น มั่นใจทุกการเดินทาง
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block sm:hidden">
        <div className="flex justify-center">
          <div className="bg-[#903035] rounded-xl px-3 py-4 w-full text-white text-center flex flex-col items-center">
            <img
              src="../images/kilo-mobile.png"
              className="mb-2 object-contain"
              alt="icon"
            />
            <div className="text-base font-medium leading-tight">เช็คระยะ</div>
            <div className="text-lg font-bold leading-tight">10,000 กม.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
