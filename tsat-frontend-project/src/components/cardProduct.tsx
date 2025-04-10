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
      <div className="text-black mx-auto grid grid-cols-8 px-60">
        {products.map((item, index) => (
          <div
            key={index}
            className="flex items-center col-span-4 mx-auto mt-12"
          >
            <img src={item.image} alt={`Product ${index}`} />
            <div className="w-72">
              <div className="font-bold text-4xl">{item.title}</div>
              <div className="mt-4">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
