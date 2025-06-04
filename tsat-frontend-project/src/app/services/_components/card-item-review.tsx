import { Work } from "@/types/customer-work";
import dayjs from "dayjs";
import "dayjs/locale/th";
import Image from "next/image";
import Link from "next/link";
import React from "react";

dayjs.locale("th");

function CardItemReview({ item }: { item: Work }) {
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
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.25) 3px 8px 24px, rgba(0, 0, 0, 0.01) 0px 10px 10px",
      }}
      className="bg-white rounded-[20px] p-3 w-full h-full text-xl flex flex-col justify-between gap-4"
    >
      <div className="space-y-4 relative">
        <div className="overflow-hidden w-full aspect-video relative rounded-[10px]">
          <Image
            unoptimized
            src={`http://localhost:3131${item.images}`}
            alt="modelcar"
            fill
            className="object-cover"
          />
          {/* ✅ render tags ตรงนี้ */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-1 z-10">
            {allTags.map((tag: string, index: number) => (
              <div
                key={index}
                className="px-2 py-1 bg-[#8F2F34] rounded-sm text-[clamp(8px,1.5vw,10px)] text-white block"
              >
                {tag}
              </div>
            ))}
          </div>
          <span className="text-[10px] text-white absolute bottom-4 left-4">สร้างเมื่อ : {dayjs(item.updated_at).format("D MMM YYYY")}
          </span>

        </div>

        {/* ข้อความ title */}
        <span className="text-sm md:text-[clamp(14px,2vw,16px)] line-clamp-2">
          {item.title}
        </span>
      </div>
    </Link>
  );
}

export default CardItemReview;
