import React from 'react';

export default function ArticleSection() {
  return (
    <div className="flex flex-col md:flex-row justify-between py-12 px-6 md:px-48 gap-8">
      <div className="w-full md:w-1/2">
        <img
          src="../images/porche.png"
          className="object-contain w-full"
          alt="Porsche"
        />
      </div>

      <div className="w-full md:w-2/3 flex justify-center items-center">
        <div className="text-base md:text-2xl text-[#666666] mt-4 max-w-[700px]">
          เราเน้นไปที่การซ่อมบำรุงรักษารถปอร์เช่ (Porsche)
          ด้วยอุปกรณ์ทางเทคนิคต่างๆ ครบถ้วน ทุกระบบ และอุปกรณ์พิเศษเฉพาะด้าน
          Piwis Tester 3 ที่ใช้ในการวิเคราะห์และอ่านค่ากล่องควบคุมระบบต่างๆ
          ในเครื่องยนต์ทุกรุ่น ที่ทันสมัยที่สุด ตามมาตราฐานเดียวกับ ศูนย์ปอร์เช่
          (Porsche) ทั่วโลก รวมทั้งความพร้อมในการ
          สต๊อกอะไหล่และอุปกรณ์ตรวจเช็คต่างๆ
          ที่พร้อมให้บริการด้วยมาตราฐานสูงในแบบของ ศูนย์บริการ Top Service หรือ
          TSAT เท่านั้น
        </div>
      </div>
    </div>
  );
}
