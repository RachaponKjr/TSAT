import React from 'react';

export default function HeaderContact() {
  return (
    <div className="mt-12">
      <div className="hidden md:block  flex items-center justify-center">
        <div className="  mt-24  text-center">
          <div className="text-[#666666] text-3xl font-bold">ติดต่อเรา</div>

          <div className="text-3xl px-40 text-[#333333] font-bold mt-12">
            ศูนย์บริการ Top Service Auto Technic หรือ TSAT เปิดให้บริการทั้ง 2
            สาขา สาขานิมิตรใหม่ 61 และ สาขารัชดาภิเษก 19
          </div>
        </div>
      </div>

      {/* Mobile Only Section */}
      <div className="block md:hidden ">
        <div className="text-center px-4">
          <h1 className="text-[#666666] w-[400px] mx-auto text-2xl font-bold leading-tight">
            ติดต่อเรา
          </h1>

          <p className="text-[#333333] w-[400px] mx-auto font-bold text-xl mt-3 leading-relaxed">
            ศูนย์บริการ Top Service Auto Technic หรือ TSAT เปิดให้บริการทั้ง 2
            สาขา สาขานิมิตรใหม่ 61 และ สาขารัชดาภิเษก 19
          </p>
        </div>
      </div>
    </div>
  );
}
