import React from 'react';

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
    <div className="text-[#8F2F34] py-24  text-center mt-24 px-6 text-3xl font-bold">
      เลือกดูจากบริการ Model Porsche ของท่าน
      <div className="text-black mx-auto mt-8 grid grid-cols-3 gap-6 max-w-6xl">
        {mockModels.map((model) => (
          <div key={model.id} className="mx-auto">
            <img
              src={model.image}
              className="cursor-pointer"
              alt={`model-${model.id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
