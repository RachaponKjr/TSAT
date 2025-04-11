import { Button } from 'antd';
import React from 'react';

export default function cardImageWithTag() {
  return (
    <div className="card relative">
      <div className="w-full h-60 overflow-hidden rounded-xl">
        <img
          src="../images/example.png"
          alt="Card Image"
          className="w-full  object-cover"
        />
      </div>
      <div className="absolute top-2 left-2">
        <Button
          type="primary"
          size="large"
          style={{
            backgroundColor: '#8F2F34',
            borderColor: '#8F2F34',
          }}
        >
          Macan
        </Button>
      </div>
      <div className="text-2xl font-bold text-[#333333] py-2">
        ลูกค้าท่านใดที่ขับ Porsche แล้วเจอปัญหา แอร์ไม่เย็น หรือเย็น...แต่ไม่ฉ่ำ
        ลองแวะมาตรวจ เช็คอาการที่ Top Service Auto Technic กันดู!
      </div>
    </div>
  );
}
