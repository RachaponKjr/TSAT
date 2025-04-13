import React from 'react';

export default function headerSection() {
  return (
    <div className="relative">
      <div className="relative hidden md:block min-h-screen items-center justify-center">
        <img
          src="../images/card-service-header.png"
          className="w-full object-cover h-1/3"
          alt="Description of image"
        />
        <div className="absolute top-4 left-1/2  mt-24 transform -translate-x-1/2 text-center">
          <div className="text-[#666666] text-3xl font-bold">บริการของเรา</div>
          <div
            style={{ textShadow: '2px 2px 4px rgba(35, 11, 11, 0.25)' }}
            className="text-3xl text-[#8F2F34] font-bold mt-12"
          >
            ขับ Porsche ต้องได้สิ่งที่ดีที่สุด เราดูแลให้ครบ
          </div>
          <div className="text-3xl text-[#333333] font-bold mt-12">
            บริการ Porsche ครบ จบในที่เดียว ด้วยเทคโนโลยีมาตรฐานศูนย์ อะไหล่แท้
            เกรดพรีเมียม ดูแลโดยทีมช่างผู้เชี่ยวชาญ
          </div>
        </div>
      </div>

      {/* Mobile Only Section */}
      <div className="block md:hidden relative w-full">
        <img
          src="../images/car-service-header-tel.png"
          alt="Mobile Image"
          className="w-full h-full"
        />
        <div className="absolute top-1/3 left-1/2 transform w-full -translate-x-1/2 -translate-y-1/2 text-center px-4">
          <h1 className="text-[#666666] w-full lg:w-[400px] text-2xl font-bold leading-tight">
            บริการของเรา
          </h1>
          <h1 className="text-[#8F2F34] mt-6 w-full lg:w-[400px] text-3xl font-bold leading-tight">
            ขับ Porsche ต้องได้สิ่งที่ดีที่สุด เราดูแลให้ครบ
          </h1>
          <p className="text-[#333333] w-full lg:w-[400px] font-bold text-xl mt-3 leading-relaxed">
            บริการ Porsche ครบ จบในที่เดียว ด้วยเทคโนโลยีมาตรฐานศูนย์ อะไหล่แท้
            เกรดพรีเมียม ดูแลโดยทีมช่างผู้เชี่ยวชาญ
          </p>
        </div>
      </div>
    </div>
  );
}
