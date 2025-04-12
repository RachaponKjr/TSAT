import Navbar from '@/components/navbar';
import CardImageWithTag from '@/components/cardImageWithTag';
import React from 'react';
import { Button, Carousel } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Footer from '@/components/footer';

export default function customer() {
  const carouselItems = [
    'https://file.aiquickdraw.com/imgcompressed/img/compressed_f7e7d187e98a983bf686bdea282d7959.webp',
    'https://file.aiquickdraw.com/imgcompressed/img/compressed_f7e7d187e98a983bf686bdea282d7959.webp',
    'https://file.aiquickdraw.com/imgcompressed/img/compressed_f7e7d187e98a983bf686bdea282d7959.webp',
    'https://file.aiquickdraw.com/imgcompressed/img/compressed_f7e7d187e98a983bf686bdea282d7959.webp',
    'https://file.aiquickdraw.com/imgcompressed/img/compressed_f7e7d187e98a983bf686bdea282d7959.webp',
    'https://file.aiquickdraw.com/imgcompressed/img/compressed_f7e7d187e98a983bf686bdea282d7959.webp',
  ];
  return (
    <div>
      <Navbar />
      <div className="relative">
        <div className="relative  flex items-center justify-center">
          <div className="  mt-12   text-center">
            <div className="text-[#666666] text-3xl font-bold">
              ลูกค้าของเรา
            </div>
            <div className="text-[#8F2F34] mt-12 text-4xl font-bold">
              รถของคุณคือคือเรื่องสำคัญของเรา
              <div className="text-2xl  text-[#666666] mt-12">
                ศูนย์บริการ ซ่อมบำรุงรักษา รถปอร์เช่ (Porsche)
                ที่ใหญ่เเละทันสมัยที่สุด <br /> การันตีงานซ่อม มากกว่า 1,500 คัน
                ดูแลรถลูกค้า เหมือนรถเราเอง
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-white  py-24 ">
          <div className="px-24 ">
            <div className="flex justify-between items-center mb-12">
              <Button
                style={{
                  border: '1px solid white',
                  backgroundColor: 'transparent',
                  color: 'white',
                  fontSize: '1.25rem',
                  padding: '1.5rem 6rem',
                }}
                className="hover:bg-white hover:text-black transition-all duration-300"
              >
                ดูทั้งหมด <PlusOutlined />
              </Button>
            </div>
          </div>

          <div className="px-24">
            <Carousel dots={false} infinite arrows={true} slidesToShow={4}>
              {carouselItems.map((item, index) => (
                <div
                  key={index}
                  className="px-2 flex flex-col items-center justify-center"
                >
                  <img
                    src={item}
                    alt={`Carousel item ${index + 1}`}
                    style={{
                      maxWidth: '290px',
                      height: 'auto',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      display: 'block',
                      margin: '0 auto',
                    }}
                  />
                  <div className="mt-2 text-white text-xl text-center">
                    Cayenne S E-Hybrid Coupé
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>

      <CardImageWithTag />

      <Footer />
    </div>
  );
}
