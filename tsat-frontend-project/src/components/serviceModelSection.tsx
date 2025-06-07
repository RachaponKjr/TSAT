"use client";
import React, { useCallback, useEffect, useState } from "react";
import modelcar from "@/assets/images/car-model.png";
import Image from "next/image";
import api from "@/server/api";
import { CarCatogory } from "@/types/car-model";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { Plus, X } from "lucide-react";
import Link from "next/link";
import Tabs from "./tabs";
import ServiceModelCar from "@/app/_components/service-modelcar";

export default function ServiceModelSection({
  headText,
}: {
  headText: string;
}) {
  const [carModel, setCarMode] = useState<CarCatogory[]>([]);
  const getCarModel = useCallback(async () => {
    await api.carModel
      .getCarModel()
      .then(({ data }) => setCarMode(data.data))
      .catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    void getCarModel();
  }, [getCarModel]);

  console.log(carModel);

  return (
    <div className="text-[#8F2F34] text-center lg:mt-6 px-6 text-[clamp(20px,2vw,30px)] font-bold container mx-auto">
      <span dangerouslySetInnerHTML={{ __html: headText }} />
      <div className="text-black lg:px-16 px-4 my-4 lg:mt-8 lg:mb-16 grid grid-cols-3 gap-6">
        {carModel.slice(0, 6).map((model, index) => (
          <div key={index}>
            <Dialog>
              <DialogTrigger className="cursor-pointer w-full max-w-full">
                <div
                  key={index}
                  className="flex h-[50px] lg:h-[200px] w-full gap-0 items-center"
                >
                  <Image
                    unoptimized
                    src={`http://150.95.26.51:3131${
                      model.image ?? "default.jpg"
                    }`}
                    alt={model.name || "modelcar"}
                    width={500}
                    height={500}
                    className=" object-cover"
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
                          model.image ?? "default.jpg"
                        }`}
                        alt={model.name || "modelcar"}
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
                          หมวดหมู่บริการ ของ {model.name}
                        </h4>
                        <div className="grid grid-cols-2 gap-4 md:gap-y-4 md:gap-x-32">
                          {model.categoryService.map((category: string) => (
                            <h6
                              key={category}
                              className="font-medium md:text-xl"
                            >
                              {category}
                            </h6>
                          ))}
                        </div>
                      </div>
                      <div className="w-full space-y-6">
                        <div className="flex w-full justify-between">
                          <h4 className="text-[#8F2F34] text-xl md:text-3xl font-semibold">
                            ตัวอย่างงานบริการ {model.name}
                          </h4>
                          <Link
                            href={"/customer"}
                            className="hidden md:flex gap-2 items-center cursor-pointer font-semibold justify-center border border-[#8F2F34] text-[#8F2F34] hover:bg-[#8F2F34] hover:text-white duration-300 rounded-md h-[42px] w-[145px] max-w-full"
                          >
                            ดูทั้งหมด
                            <Plus />
                          </Link>
                        </div>

                        {model.carSubModels.length > 0 && (
                          <Tabs
                            className="px-0 w-full items-start"
                            tabs={model.carSubModels.map((subModel) => ({
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
          </div>
        ))}
      </div>
    </div>
  );
}
