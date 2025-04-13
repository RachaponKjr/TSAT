import React from 'react';
import ContactSection from './contactSection';
import CardLocation from './cardLocation';

export default function locationSection() {
  return (
    <div className="bg-white">
      <div className="p-6 md:mt-0 md:px-24 md:py-12 space-y-4 flex flex-col gap-4 ">
        <div className="text-xl lg:text-3xl font-bold text-center  text-[#8F2F34] ">
          นัดหมายหรือเลือกเข้าใช้บริการบำรุงรักษารถของท่าน
        </div>
        <ContactSection />
        <CardLocation />
      </div>
    </div>
  );
}
