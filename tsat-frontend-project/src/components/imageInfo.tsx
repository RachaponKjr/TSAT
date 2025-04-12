import React from 'react';

const mockServices = [
  {
    title: 'อะไหล่แท้ทุกชิ้น การันตีคุณภาพ',
    image: '../images/batteries.png',
  },
  {
    title: 'อะไหล่แท้ทุกชิ้น การันตีคุณภาพ',
    image: '../images/batteries.png',
  },
  {
    title: 'อะไหล่แท้ทุกชิ้น การันตีคุณภาพ',
    image: '../images/batteries.png',
  },
  {
    title: 'อะไหล่แท้ทุกชิ้น การันตีคุณภาพ',
    image: '../images/batteries.png',
  },
];

export default function HeroWithCards() {
  return (
    <div className="relative min-h-screen w-full">
      {/* ภาพพื้นหลัง */}
      <img
        src="../images/car.png"
        alt="Car"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0  bg-opacity-50 z-10" />
      <div className="relative z-20 flex flex-col items-center justify-start min-h-screen px-6 text-white text-center pt-24 block lg:hidden">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6">
          ยินดีต้อนรับสู่ศูนย์บริการของเรา
        </h1>

        <div className="text-base sm:text-xl mb-10 leading-relaxed">
          TSAT เราเริ่มจากการเป็นผู้ใช้รถ Porsche
          และรถสมรรถนะสูงที่นำเข้าทั่วไปในสมัยก่อนมานานกว่า 10 ปี
          <br />
          จากผู้ใช้รถ มาสู่ผู้เชี่ยวชาญในการซ่อมบำรุงรักษา ตั้งแต่ปี 2017
          จนถึงวันนี้ เราผ่านงานซ่อมรถ Porsche ทุกรุ่นมามากกว่า 1000 คัน
          <br />
          เรากล้าการันตีว่าอู่ของเราเป็นอู่ที่มีความมุ่งมั่นจริงใจ
          ทั้งในด้านคุณภาพงานซ่อม และ ในด้านการให้บริการ
          <br />
          สำหรับท่านเจ้าของรถ Porsche ทุกท่าน ที่ดีที่สุดในประเทศไทย
        </div>
        <div className="grid grid-cols-2 gap-4 w-full max-w-3xl">
          {mockServices.map((service, index) => (
            <div
              key={index}
              className="bg-white/90 rounded-xl p-4 text-black shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <img src={service.image} className="mx-auto w-40 h-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
