import React from 'react';
import ContactSection from './contactSection';
import CardLocation from './cardLocation';

export default function locationSection() {
  return (
    <div className="bg-white">
      <div className="p-6 mt-12 md:mt-0 md:p-24 ">
        <div className="text-3xl font-bold mb-12 text-center  text-[#8F2F34] ">
          นัดหมายหรือเลือกเข้าใช้บริการบำรุงรักษารถของท่าน
        </div>
        <ContactSection />
        <CardLocation />
      </div>
    </div>
  );
}
