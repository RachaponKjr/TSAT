
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Work } from '@/types/customer-work';

function ItemBox({ item }: { item: Work }) {

  if (!item) {
    return null;
  }

  const firstTag = item.carModel.name;
  const subCarModel = item.carSubModel?.name;

  return (
    <Link href={`/customer/${item.id}`} className="flex flex-row md:flex-col gap-3">
      <div className="min-w-[114px] md:w-full aspect-[8/6] lg:aspect-[16/8] rounded-lg relative overflow-hidden">
        {subCarModel ? (
          <div className="px-2 py-1 absolute top-4 left-4 bg-[#8F2F34] rounded-sm text-[clamp(12px,1.5vw,16px)] z-10 text-white hidden md:block">
            {subCarModel}
          </div>
        ) : firstTag ? (
          <div className="px-1 py-1 absolute top-4 left-4 bg-[#8F2F34] rounded-sm text-[clamp(12px,1.5vw,16px)] z-10 text-white hidden md:block">
            {firstTag}
          </div>
        ) : null}
        <Image
          unoptimized
          src={`http://150.95.25.111:3131${item.images}`}
          alt={item.title || ''}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <p className="text-[#333333] font-semibold text-sm lg:text-xl line-clamp-2 md:line-clamp-3">
          {item.title}
        </p>
        {firstTag && (
          <div className="px-1 py-1 w-max bg-[#8F2F34] text-white rounded-sm text-sm z-10 md:hidden block">
            {firstTag}
          </div>
        )}
      </div>
    </Link>
  );
}

export default ItemBox;
