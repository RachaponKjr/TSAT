import React from 'react';

export default function cardSelectProduct() {
  return (
    <div>
      <div className="relative w-full pb-[100%]">
        <img
          src="https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=pexels-pixabay-210019.jpg&fm=jpg"
          alt="Product"
          className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-lg font-bold">Product Name</span>
        </div>
      </div>
    </div>
  );
}
