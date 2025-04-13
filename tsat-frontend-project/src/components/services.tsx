'use client';

import CardServices from './cardServices';
import React from 'react';

export default function Services() {

  return (
    <div className="bg-[#F5F5F5]">
      <div className="p-6 md:px-24 md:py-24">
        <div className="text-3xl font-bold text-[#8F2F34] ">
          เลือกจากบริการที่ท่านสนใจ
        </div>
        <div className="text-[#333333] text-xl mt-6">
          ให้คำปรึกษาฟรีตรวจเช็คและประเมินปัญหาฟรีไม่มีค่าธรรมเนียมแรกเข้าใดๆ
          <br />
          พร้อมแจ้งรายละเอียดปัญหาด้วยใบเสนอราคา ให้ลูกค้าตัดสินใจก่อนทุกครั้ง
          สบายใจได้เมื่อเข้ารับบริการที่ TSAT
        </div>

        <CardServices />
        {/* <SubCardServices /> */}

        {/* Modal
        <Modal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          centered
          width={800}
          className="p-0"
        >
          <div className="p-0">
            <img
              src="../images/service.png"
              className="w-full h-[400px] object-cover"
            />
            <div className="p-6">
              <h3 className="text-3xl font-semibold text-[#8F2F34] mb-4">
                เช็คระยะ
              </h3>
              <p className=" text-base text-gray-700">
                ตรวจเช็ค ด้วยโปรแกรม PIWIS TESTER ที่สามารถวิเคราะห์
                และตรวจเช็คข้อบกพร่องของระบบต่างๆ ภายในรถได้อย่างครบทุกจุด ถึง
                21 รายการ ตามมาตรฐานเดียวกับศูนย์รถปอร์เช่ (Porsche) ทั่วโลก
                รวมทั้งความพร้อมในการสต็อกอะไหล่และอุปกรณ์ตรวจเช็คต่างๆ
                ที่พร้อมให้บริการด้วยมาตรฐานสูงในแบบของ ศูนย์บริการ Top service
              </p>
            </div>
            <hr className="w-full h-2 mt-4 border-t-2 border-[#cccccc]" />
          </div>
          <div className={`${isMobile ? 'px-4' : 'px-4'}`}>
            <Carousel
              dots={false}
              infinite
              arrows={false}
              slidesToShow={isMobile ? 1 : 2}
              autoplay
              autoplaySpeed={3000}
            >
              {carouselItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center px-2"
                >
                  <img
                    src={item}
                    alt={`Carousel item ${index + 1}`}
                    style={{
                      maxWidth: isMobile ? '100%' : '290px',
                      height: 'auto',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      display: 'block',
                      margin: '0 auto',
                    }}
                  />
                  <div className="mt-2 text-white text-base md:text-xl text-center">
                    Cayenne S E-Hybrid Coupé
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
          <hr className="w-full h-2 mt-4 border-t-2 border-[#cccccc]" />
          <div className="p-6">
            <h3 className="text-3xl font-semibold text-[#8F2F34] mb-4">
              ตัวอย่างงานบริการเช็คระยะ
            </h3>
            <CardModalWithTag />
          </div>
        </Modal> */}
      </div>
    </div>
  );
}
