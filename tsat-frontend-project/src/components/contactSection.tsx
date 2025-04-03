import { PhoneOutlined } from '@ant-design/icons';
import React from 'react';

export default function contactSection() {
  return (
    <div className="flex flex-col items-center">
      <PhoneOutlined style={{ color: 'black' }} className="text-4xl mb-4" />
      <div className="text-lg font-semibold text-[#8F2F34]">02-069-9966</div>
    </div>
  );
}
