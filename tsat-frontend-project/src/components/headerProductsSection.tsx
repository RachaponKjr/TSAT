import React from 'react';

export default function headerSection() {
  return (
    <div className="mt-12 container mx-auto">
      <div className="hidden md:block items-center justify-center">
        <div className="mt-6 text-center">
          <div className="text-[#666666] text-xl md:text-[clamp(24px,2vw,30px)] font-bold relative">
            <h6>
              ผลิตภัณฑ์ของเรา
            </h6>
          </div>
          <div
            style={{ textShadow: '2px 2px 4px rgba(35, 11, 11, 0.25)' }}
            className="text-2xl md:text-[clamp(30px,3vw,42px)] text-[#8F2F34] font-bold mt-6"
          >
            Porsche ของคุณสมควรได้รับสิ่งที่ดีที่สุด และเราจัดให้ครบ
          </div>
          <div className="text-base md:text-[Clamp(18px,2vw,24px)] px-40 text-[#333333] font-bold mt-6">
            เราคัดสรรเฉพาะ อะไหล่แท้ และ ของเหลวเกรดพรีเมียม
            ที่ออกแบบมาเพื่อสมรรถนะสูงสุดของ Porsche โดยเฉพาะ
            เราการันตีมาตรฐานระดับศูนย์บริการ เพื่อให้รถของคุณแรงเต็มพิกัด
            พร้อมลุยทุกเส้นทาง
          </div>
        </div>
      </div>

      {/* Mobile Only Section */}
      <div className="block md:hidden max-w-full">
        <div className="text-center px-4">
          <h1 className="text-[#666666] w-full md:w-[400px] mx-auto text-xl font-bold leading-tight">
            ผลิตภัณฑ์ของเรา
          </h1>
          <h1 className="text-[#8F2F34] mt-6 w-full md:w-[400px] mx-auto text-2xl font-bold leading-tight">
            Porsche ของคุณสมควรได้รับสิ่งที่ดีที่สุด และเราจัดให้ครบ
          </h1>
          <p className="text-[#333333] w-full md:w-[400px] mx-auto font-bold text-base mt-3 leading-relaxed">
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
