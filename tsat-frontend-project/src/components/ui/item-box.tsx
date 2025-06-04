import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Work } from "@/types/customer-work";

function ItemBox({ item }: { item: Work }) {
  if (!item) {
    return null;
  }

  const tagCarModel = item.carModel;
  const tagSubCarModel = item.carSubModel;
  const tagService = item.service;
  const tagSubService = item.subService;
  const Alltags = item.tags || [];

  const allTags = [
    tagCarModel,
    tagSubCarModel,
    tagService,
    tagSubService,
    ...Alltags,
  ].filter(Boolean);

  return (
    <Link
      href={`/customer/${item.id}`}
      className="flex flex-row md:flex-col gap-3"
    >
      <div className="min-w-[160px] md:w-full aspect-[8/6] lg:aspect-[16/8] rounded-lg relative overflow-hidden">
        <div className="absolute top-4 left-4 hidden lg:flex flex-wrap gap-1 z-10">
          {allTags.map((tag: string, index: number) => (
            <div
              key={index}
              className="px-2 py-1 bg-[#8F2F34] rounded-sm text-[clamp(8px,1.5vw,10px)] text-white block"
            >
              {tag}
            </div>
          ))}
        </div>
        <Image
          unoptimized
          src={`http://localhost:3131${item.images}`}
          alt={item.title || ""}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <p className="text-[#333333] font-semibold text-[13px] lg:text-xl line-clamp-2 md:line-clamp-3">
          {item.title}
        </p>
        <div className="flex lg:hidden gap-1 flex-wrap">
          {allTags.map((tag: string, index: number) => (
            <div
              key={index}
              className="px-2 py-1 bg-[#8F2F34] rounded-sm text-[clamp(8px,1.5vw,10px)] text-white block"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default ItemBox;
