import React from 'react';

export default function headerCustomerSection() {
  return (
    <div className="mt-12">
      <div className="hidden md:block  flex items-center justify-center">
        <div className="  mt-24  text-center">
          <div className="text-[#666666] text-3xl font-bold">ลูกค้าของเรา</div>
          <div
            style={{ textShadow: '2px 2px 4px rgba(35, 11, 11, 0.25)' }}
            className="text-3xl text-[#8F2F34] font-bold mt-12"
          >
            รถของคุณคือเรื่องสำคัญของเรา
          </div>
          <div className="text-3xl px-40 text-[#333333] font-bold mt-12">
            เราภูมิใจที่ได้ดูแลให้รถคู่ใจของท่านอยู่ในสภาพสมบูรณ์แบบ
            พร้อมออกวิ่งได้เต็มสมรรถนะ Porsche
            ของคุณจะได้รับการดูแลอย่างดีที่สุดที่ TSAT
          </div>
        </div>
      </div>

      {/* Mobile Only Section */}
      <div className="block md:hidden ">
        <div className="text-center px-4">
          <h1 className="text-[#666666] w-[400px] mx-auto text-2xl font-bold leading-tight">
            ผลิตภัณฑ์ของเรา
          </h1>
          <h1 className="text-[#8F2F34] mt-6 w-[400px] mx-auto text-3xl font-bold leading-tight">
            Porsche ของคุณสมควรได้รับสิ่งที่ดีที่สุด และเราจัดให้ครบ
          </h1>
          <p className="text-[#333333] w-[400px] mx-auto font-bold text-xl mt-3 leading-relaxed">
            เราคัดสรรเฉพาะ อะไหล่แท้ และ ของเหลวเกรดพรีเมียม
            ที่ออกแบบมาเพื่อสมรรถนะสูงสุดของ Porsche โดยเฉพาะ
            เราการันตีมาตรฐานระดับศูนย์บริการ เพื่อให้รถของคุณแรงเต็มพิกัด
            พร้อมลุยทุกเส้นทาง
          </p>
        </div>
      </div>
    </div>
  );
}
