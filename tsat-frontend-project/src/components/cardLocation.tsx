import { Button } from 'antd';
import React from 'react';

const mockLocations = [
  {
    name: 'สาขานิมิตรใหม่ 61',
    image: '../images/kkk.png',
    mapLink: '#',
  },
  {
    name: 'สาขารามอินทรา 88',
    image: '../images/kkk.png',
    mapLink: '#',
  },
];

export default function CardLocation() {
  return (
    <div className="relative py-12">
      <div className="relative z-10 grid grid-cols-2 gap-8  lg:px-24">
        {mockLocations.map((location, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 backdrop-blur-sm rounded-xl w-full max-w-[90%] sm:max-w-full mx-auto"
          >
            <img
              src={location.image}
              alt={location.name}
              className="mb-4 w-full h-auto rounded-lg"
            />
            <div className="text-2xl font-semibold text-[#8F2F34] mb-4">
              {location.name}
            </div>
            <Button
              type="primary"
              style={{
                backgroundColor: '#8F2F34',
                borderColor: '#8F2F34',
                fontSize: '1rem',
                padding: '0.75rem 2rem',
              }}
              className="hover:bg-[#A33A3F] rounded-full hover:border-[#A33A3F] transition-all duration-300"
              href={location.mapLink}
            >
              แผนที่
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
