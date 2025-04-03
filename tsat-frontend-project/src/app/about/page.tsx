import Navbar from '@/components/navbar';
import React from 'react';
import { DatePicker } from 'antd';

export default function page() {
  return (
    <div>
      <Navbar />
      <DatePicker />
    </div>
  );
}
