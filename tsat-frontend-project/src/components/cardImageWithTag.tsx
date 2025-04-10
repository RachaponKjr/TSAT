import { Button } from 'antd';
import React from 'react';

export default function cardImageWithTag() {
  return (
    <div className="card relative">
      <div className="w-full h-48 overflow-hidden rounded-xl">
        <img
          src="https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?cs=srgb&dl=pexels-pixabay-210019.jpg&fm=jpg"
          alt="Card Image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-2 left-2">
        <Button
          type="primary"
          size="large"
          style={{
            backgroundColor: '#8F2F34',
            borderColor: '#8F2F34',
          }}
        >
          Macan
        </Button>
      </div>
      <div className="text-xl text-black py-2">
        Porche Cayenne ทรุดตัว อย่าตกใจ
      </div>
    </div>
  );
}
