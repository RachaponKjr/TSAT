import React from 'react';
import modelcar from '@/assets/images/car-model.png'
import Image from 'next/image';
const mockModels = [
  { id: 1, image: '../images/car-model.png' },
  { id: 2, image: '../images/car-model.png' },
  { id: 3, image: '../images/car-model.png' },
  { id: 4, image: '../images/car-model.png' },
  { id: 5, image: '../images/car-model.png' },
  { id: 6, image: '../images/car-model.png' },
];

export default function ServiceModelSection() {
  return (
    <div className="text-[#8F2F34] lg:py-24 py-[30px] text-center lg:mt-24 px-6 text-3xl font-bold">
      เลือกดูจากบริการ Model Porsche ของท่าน
      <div className="text-black lg:px-16 px-4 mt-8 grid grid-cols-3 gap-6">
        {mockModels.map((model) => (
          <div key={model.id} className="mx-auto">
            <Image
              src={modelcar}
              alt={`Model ${model.id}`}
              width={500}
              height={500}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
