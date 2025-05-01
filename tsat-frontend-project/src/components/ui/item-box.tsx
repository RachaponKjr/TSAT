import React from 'react';
import Image from 'next/image';

function ItemBox({ item }: { item: any }) {
  console.log(item, 'item');

  if (!item) {
    return null; // ถ้าไม่มี item ก็ไม่ render อะไรเลย ป้องกันพัง
  }

  const firstTag = item.tags?.[0] || '';

  return (
    <div className="flex flex-row md:flex-col gap-3">
      <div className="min-w-[114px] md:w-full aspect-[16/8] rounded-lg relative overflow-hidden">
        {firstTag && (
          <div className="px-1 py-1 absolute top-4 left-4 bg-[#8F2F34] rounded-sm text-[clamp(14px,1.5vw,18px)] z-10 text-white hidden md:block">
            {firstTag}
          </div>
        )}
        <Image
          src={`http://localhost:3130${item.images}`}
          alt={item.title || ''}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-[#333333] font-semibold text-sm lg:text-2xl line-clamp-2 md:line-clamp-none">
          {item.title}
        </p>
        {firstTag && (
          <div className="px-1 py-1 w-max bg-[#8F2F34] text-white rounded-sm text-sm z-10 md:hidden block">
            {firstTag}
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemBox;
