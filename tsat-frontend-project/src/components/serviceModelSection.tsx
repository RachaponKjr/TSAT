'use client';
import React, { useCallback, useEffect, useState } from 'react';
import modelcar from '@/assets/images/car-model.png'
import Image from 'next/image';
import api from '@/server/api';
import { CarCatogory } from '@/types/car-model';
const mockModels = [
  { id: 1, image: '../images/car-model.png' },
  { id: 2, image: '../images/car-model.png' },
  { id: 3, image: '../images/car-model.png' },
  { id: 4, image: '../images/car-model.png' },
  { id: 5, image: '../images/car-model.png' },
  { id: 6, image: '../images/car-model.png' },
];

export default function ServiceModelSection({ headText }: { headText: string }) {
  const [carModel, setCarMode] = useState<CarCatogory[]>([]);
  const getCarModel = useCallback(async () => {
    await api.carModel.getCarModel().then(({ data }) => setCarMode(data.data)).catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    void getCarModel();
  }, [getCarModel]);

  return (
    <div className="text-[#8F2F34] text-center lg:mt-6 px-6 text-[clamp(20px,2vw,30px)] font-bold container mx-auto">
      <span dangerouslySetInnerHTML={{ __html: headText }} />
      <div className="text-black lg:px-16 px-4 mt-8 mb-16 grid grid-cols-3 gap-6">
        {carModel.slice(0, 6).map((model, index) => (
          <div key={index} className='flex flex-col w-full gap-0 items-center'>
            <div className='h-full relative'>
              <Image
                unoptimized
                src={`http://150.95.25.111:3131/${model.image ?? 'default.jpg'}`}
                alt={model.name || 'modelcar'}
                width={500}
                height={500}
                className=' object-cover'
              />
            </div>
            <Image
              unoptimized
              src={`http://150.95.25.111:3131/${model.imageName ?? 'default.jpg'}`}
              alt={model.name || 'modelcar'}
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
