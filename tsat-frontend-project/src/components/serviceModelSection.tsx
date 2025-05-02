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
    <div className="text-[#8F2F34] text-center lg:mt-6 px-6 text-[clamp(20px,2vw,30px)] font-bold container mx-auto">
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
