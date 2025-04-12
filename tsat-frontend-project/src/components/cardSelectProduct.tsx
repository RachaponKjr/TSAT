import React from 'react';

const mockProducts = [
  {
    name: 'น้ำมันเครื่องเกรดพรีเมี่ยม',
    image: '../images/oil.png',
  },
  {
    name: 'น้ำมันเบรกคุณภาพสูง',
    image: '../images/oil.png',
  },
  {
    name: 'น้ำมันเกียร์สังเคราะห์',
    image: '../images/oil.png',
  },
  {
    name: 'น้ำมันหล่อลื่นสำหรับดีเซล',
    image: '../images/oil.png',
  },
  {
    name: 'น้ำมันสำหรับเครื่องยนต์เบนซิน',
    image: '../images/oil.png',
  },
];

export default function CardSelectProduct() {
  return (
    <div>
      <div className="bg-white py-24">
        <div className="px-6 md:px-24">
          <div className="text-3xl font-bold mb-12 text-center text-[#8F2F34]">
            เลือกดูผลิตภัณฑ์
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-8">
            {mockProducts.map((product, index) => (
              <div key={index} className="relative w-full aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute text-white text-lg font-bold inset-0 flex items-center justify-center text-center px-2">
                  <span className="text-sm sm:text-base md:text-xl leading-snug">
                    {product.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
