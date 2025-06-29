"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper/modules"; // import โมดูล Grid
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

import "swiper/css/grid";
import { CarCatogory } from "@/types/car-model";
import api from "@/server/api";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Plus, X } from "lucide-react";
import Tabs from "@/components/tabs";
import ServiceModelCar from "@/app/_components/service-modelcar";

function SwiperClientModel() {
  const [carModel, setCarModel] = useState<CarCatogory[]>([]);
  const getModel = useCallback(async () => {
    try {
      await api.carModel.getCarModel().then((res) => {
        const data = (res.data as { data: CarCatogory[] }).data;
        setCarModel(data);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    void getModel();
  }, [getModel]);
  return (
    <div className="relative w-full">
      <div className="absolute top-1/2 -left-8 xl:-left-12 -translate-y-1/2 z-50 cursor-pointer">
        <svg
          className=" swiper-button-prev-custom"
          width="36"
          height="24"
          viewBox="0 0 28 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.98325 6.75L7.18325 10.95L6.1145 12L0.114502 6L6.1145 0L7.18325 1.05L2.98325 5.25H27.1145V6.75H2.98325Z"
            fill="#8F2F34"
          />
        </svg>
      </div>
      <div className="absolute top-1/2 -right-8 xl:-right-12 -translate-y-1/2 z-50 cursor-pointer">
        <svg
          className="swiper-button-next-custom"
          width="36"
          height="24"
          viewBox="0 0 28 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.0165 6.75L20.8165 10.95L21.8853 12L27.8853 6L21.8853 0L20.8165 1.05L25.0165 5.25H0.885254V6.75H25.0165Z"
            fill="#8F2F34"
          />
        </svg>
      </div>
      <Swiper
        navigation={{
          nextEl: ".swiper-button-next-custom", // << ใช้ class
          prevEl: ".swiper-button-prev-custom", // << ใช้ class
        }}
        modules={[Grid, Navigation]} // เพิ่มโมดูล Grid ลงใน modules prop
        breakpoints={{
          0: {
            slidesPerView: 1, // 3 คอลัมน์บน mobile
            spaceBetween: 15, // ระยะห่างระหว่าง slides
          },
          768: {
            slidesPerView: 4, // สำหรับ desktop
            spaceBetween: 45,
            grid: {
              rows: 1, // กลับมาเป็น slider แบบปกติ
            },
          },
        }}
        className="w-full"
      >
        {carModel.map((item, index) => (
          <SwiperSlide key={index}>
            <Dialog>
              <DialogTrigger className="cursor-pointer w-full max-w-full">
                <div className="flex h-[200px] w-full gap-0 items-center">
                  <Image
                    unoptimized
                    src={`http://150.95.26.51:3131${item.image}`}
                    alt="modelcar"
                    width={500}
                    height={500}
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="overflow-y-auto h-full md:max-h-[95vh] md:max-w-[80vw]">
                <DialogClose asChild>
                  <button className="absolute top-4 right-4 bg-white border border-[#999999] rounded-full w-8 aspect-square flex items-center justify-center z-30">
                    <X size={20} />
                  </button>
                </DialogClose>
                <div className="w-full max-w-full h-max flex flex-col items-center justify-center py-6">
                  <div className="relative p-4 h-max w-full max-w-full flex justify-center">
                    <div className="absolute top-0 left-0 w-full h-[60%]  bg-gradient-to-t from-[#999999] to-[#ffffff] opacity-20" />
                    <Image
                      src={`http://150.95.26.51:3131${
                        item.image ?? "default.jpg"
                      }`}
                      alt={item.name || "modelcar"}
                      className="relative object-contain z-10"
                      objectPosition="bottom"
                      quality={100}
                      width={400}
                      height={400}
                      unoptimized
                    />
                  </div>
                  <div className="w-full h-max max-w-full px-4 md:px-20 flex flex-col gap-8 ">
                    <div className="w-full flex flex-col gap-6">
                      <h4 className="text-[#8F2F34] text-xl md:text-3xl font-semibold">
                        หมวดหมู่บริการ ของ {item.name}
                      </h4>
                      <div className="grid grid-cols-2 gap-4 md:gap-y-4 md:gap-x-32">
                        {item.categoryService.map((category: string) => (
                          <h6 key={category} className="font-medium md:text-xl">
                            {category}
                          </h6>
                        ))}
                      </div>
                    </div>
                    <div className="w-full space-y-6">
                      <div className="flex w-full justify-between">
                        <h4 className="text-[#8F2F34] text-xl md:text-3xl font-semibold">
                          ตัวอย่างงานบริการ {item.name}
                        </h4>
                        <Link
                          href={"/customer"}
                          className="hidden md:flex gap-2 items-center cursor-pointer font-semibold justify-center border border-[#8F2F34] text-[#8F2F34] hover:bg-[#8F2F34] hover:text-white duration-300 rounded-md h-[42px] w-[145px] max-w-full"
                        >
                          ดูทั้งหมด
                          <Plus />
                        </Link>
                      </div>

                      {item.carSubModels.length > 0 && (
                        <Tabs
                          className="px-0 w-full items-start"
                          tabs={item.carSubModels.map((subModel) => ({
                            id: subModel.id,
                            label: subModel.name,
                            content: (
                              <ServiceModelCar subCarModelId={subModel.id} />
                            ),
                          }))}
                          defaultActive={0}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperClientModel;
