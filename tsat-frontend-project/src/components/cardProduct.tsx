import React from 'react';

export default function CardProduct() {
  const products = new Array(5).fill({
    title: 'Voltronic 5w40',
    description:
      'น้ำมันเครื่องสังเคราะห์แท้จากเยอรมนี ปกป้องเครื่องยนต์ ทนความร้อนสูง พร้อมดึงสมรรถนะเต็มพิกัด',
    image: '../images/battery.png',
  });

  return (
    <div>
      <div className="text-[#8F2F34] text-center mt-12 text-2xl font-bold">
        ผลิตภัณฑ์
      </div>
      <div className="text-black mx-auto grid md:grid-cols-8 md:px-60 gap-8 px-4">
        {products.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center md:col-span-4 mx-auto mt-8 max-w-xs md:max-w-full"
          >
            <img
              src={item.image}
              alt={`Product ${index}`}
              className="w-32 md:w-auto mb-4 md:mb-0 md:mr-6"
            />
            <div className="text-center md:text-left mb-12">
              <div className="font-bold text-2xl md:text-4xl">{item.title}</div>
              <div className="mt-2 md:mt-4 text-sm md:text-base">
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
