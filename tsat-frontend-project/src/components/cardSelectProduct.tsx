import React from 'react';

export default function cardSelectProduct() {
  return (
    <div>
      <div className="relative w-full pb-[100%]">
        <img
          src=" ../images/oil.png"
          alt="Product"
          className="absolute top-0 left-0 w-full w-32 object-cover rounded-2xl"
        />
        <div className="absolute text-white text-lg font-bold inset-0 flex items-center justify-center">
          <span className="text-2xl">น้ำมันเครื่องเกรดพรีเมี่ยม</span>
        </div>
      </div>
    </div>
  );
}
