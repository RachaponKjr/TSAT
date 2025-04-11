import React from 'react';
import { Button, Carousel } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default function CarouselReview() {
  const carouselItems = [
    'https://media.discordapp.net/attachments/1237012614111039579/1360250694543610110/car-model.png?ex=67fa6fad&is=67f91e2d&hm=a6766f01a43465f3b1b5bdf11e8c50fbbd5cb3486d175b17a80a4fcc701e0663&=&format=webp&quality=lossless&width=576&height=456',
    'https://media.discordapp.net/attachments/1237012614111039579/1360250694543610110/car-model.png?ex=67fa6fad&is=67f91e2d&hm=a6766f01a43465f3b1b5bdf11e8c50fbbd5cb3486d175b17a80a4fcc701e0663&=&format=webp&quality=lossless&width=576&height=456',
    'https://media.discordapp.net/attachments/1237012614111039579/1360250694543610110/car-model.png?ex=67fa6fad&is=67f91e2d&hm=a6766f01a43465f3b1b5bdf11e8c50fbbd5cb3486d175b17a80a4fcc701e0663&=&format=webp&quality=lossless&width=576&height=456',
    'https://media.discordapp.net/attachments/1237012614111039579/1360250694543610110/car-model.png?ex=67fa6fad&is=67f91e2d&hm=a6766f01a43465f3b1b5bdf11e8c50fbbd5cb3486d175b17a80a4fcc701e0663&=&format=webp&quality=lossless&width=576&height=456',
    'https://media.discordapp.net/attachments/1237012614111039579/1360250694543610110/car-model.png?ex=67fa6fad&is=67f91e2d&hm=a6766f01a43465f3b1b5bdf11e8c50fbbd5cb3486d175b17a80a4fcc701e0663&=&format=webp&quality=lossless&width=576&height=456',
    'https://media.discordapp.net/attachments/1237012614111039579/1360250694543610110/car-model.png?ex=67fa6fad&is=67f91e2d&hm=a6766f01a43465f3b1b5bdf11e8c50fbbd5cb3486d175b17a80a4fcc701e0663&=&format=webp&quality=lossless&width=576&height=456',
  ];

  return (
    <div className="bg-white py-24 relative">
      <div className="px-24">
        <div className="flex justify-between items-center mb-12">
          <div>
            <div className="text-3xl font-bold text-[#8F2F34]">
              เลือกดูบริการจาก Model Porsche ของท่าน
            </div>
            <div className="text-black text-2xl mt-6">
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

      {/* Section ที่ Carousel และ Base Background อยู่ด้วยกัน */}
      <div className="relative px-24 z-10">
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
            </div>
          ))}
        </Carousel>

        <img
          src="../images/base-model.png"
          className="absolute left-0 bottom-[-120px] w-full object-cover z-0"
          alt="Base shadow"
        />
      </div>
    </div>
  );
}
