import { Button } from 'antd';
import React from 'react';

export default function cardLocation() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center">
        <img
          src="../images/kkk.png"
          alt="Contact Us"
          className="mb-4 w-3/4 h-auto"
        />
        <div className="text-2xl font-bold text-[#8F2F34] mb-4">
          สาขานิมิตรใหม่ 61
        </div>
        <Button
          type="primary"
          style={{
            backgroundColor: '#8F2F34',
            borderColor: '#8F2F34',
            fontSize: '1rem',
            padding: '0.75rem 2rem',
          }}
          className="hover:bg-[#A33A3F] rounded-full hover:border-[#A33A3F] transition-all duration-300"
        >
          แผนที่
        </Button>
      </div>
    </div>
  );
}
