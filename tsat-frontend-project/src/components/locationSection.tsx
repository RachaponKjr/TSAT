import React from 'react';
import ContactSection from './contactSection';
import CardLocation from './cardLocation';

export default function locationSection() {
  return (
    <div className="bg-white">
      <div className="py-6 md:mt-0 md:py-12 md:space-y-4 flex flex-col md:gap-[30px] gap-6 px-12">
        <div className="text-[clamp(20px,2vw,30px)] font-bold text-center  text-[#8F2F34] container mx-auto">
          นัดหมายหรือเลือกเข้าใช้บริการบำรุงรักษารถของท่าน
        </div>
        <div className='container mx-auto'>
          <ContactSection />
        </div>
        <CardLocation />
      </div>
    </div>
  );
}
