import React from 'react';
import oli from '@/assets/images/oil.png'

export default function CardSelectProduct() {
  return (
      <div className="bg-white py-8">
        <div className="px-6 md:px-24 space-y-4 lg:space-y-8">
          <div className="text-3xl font-bold text-center text-[#8F2F34]">
            เลือกดูผลิตภัณฑ์
          </div>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-x-2 gap-y-4 md:gap-4">
            {Array.from({ length: 5 }).map((product, index) => (
              <div key={index} className="relative w-full aspect-[16/12] lg:aspect-square rounded-lg"
                style={{
                  backgroundImage: `url(${oli.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >

                <div className="absolute text-white text-lg font-bold inset-0 flex items-center justify-center text-center px-2">
                  <span className="text-sm sm:text-base md:text-xl leading-snug">
                    Lorem, ipsum dolor.
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}
