import React from 'react';
import { Button, Carousel } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default function CarouselReview() {
  const carouselItems = [
    'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=pexels-pixabay-210019.jpg&fm=jpg',
    'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=pexels-pixabay-210019.jpg&fm=jpg',
    'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=pexels-pixabay-210019.jpg&fm=jpg',
    'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=pexels-pixabay-210019.jpg&fm=jpg',
    'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=pexels-pixabay-210019.jpg&fm=jpg',
    'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=pexels-pixabay-210019.jpg&fm=jpg',
  ];

  return (
    <div>
      <div className="bg-white  py-24 ">
        <div className="px-24 ">
          <div className="flex justify-between items-center mb-12">
            <div>
              <div className="text-2xl text-[#8F2F34] ">
                เลือกดูบริการจาก Model Porsche ของท่าน
              </div>
              <div className="text-black text-xl mt-6">
                TSAT คือที่สุดของการดูแล Porsche
                ที่ตอบโจทย์ทุกความต้องการของคนรักรถหรู <br />
                เราคือทีมมืออาชีพที่เชี่ยวชาญด้าน Porsche โดยเฉพาะ
                ด้วยประสบการณ์ยาวนานและความใส่ใจในทุกรายละเอียด
              </div>
            </div>
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
  );
}
