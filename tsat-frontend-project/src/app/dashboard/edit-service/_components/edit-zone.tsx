"use client";
import ImageBoxUpload from "@/components/image-upload";
import InputWithLabel from "@/components/input-label";
import TextareaWithLabel from "@/components/textarea-with-label";
import React, { useState } from "react";
import { ServiceResponse } from "./table-service";
import ImageMultiUpload from "@/components/image-multi";
import api from "@/server/api";
import { toast } from "sonner";

const EditZone = ({
  service,
  getService,
}: {
  service: ServiceResponse;
  getService: () => void;
}) => {
  const [serviceData, setServiceData] = useState<ServiceResponse>(service);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setServiceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIconChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setServiceData((prev) => ({
        ...prev,
        icon: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleBgIconChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setServiceData((prev) => ({
        ...prev,
        bgIcon: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const submitUpdate = async () => {
    try {

      const res = await api.service.updateService({
        id: service.id,
        data: serviceData,
      });
      if (res.status === 200) {
        toast.success("อัพเดทข้อมูลสำเร็จ");
        getService();
      } else {
        toast.error("อัพเดทข้อมูลไม่สำเร็จ");
      }
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("เกิดข้อผิดพลาดในการอัพเดท");
    }
  };

  return (
    <>
      <InputWithLabel
        label="ชื่อ Service"
        name="serviceName"
        onChange={handleChange}
        value={serviceData.serviceName}
        placeholder="ชื่อ Service"
      />
      <InputWithLabel
        label="ชื่อย่อ Service"
        name="title"
        onChange={handleChange}
        value={serviceData.title}
        placeholder="ชื่อย่อ Service"
      />
      <TextareaWithLabel
        label="รายละเอียด Service"
        name="serviceDetail"
        onChange={handleChange}
        className="col-span-2"
        value={serviceData.serviceDetail}
        placeholder="รายละเอียด Service"
      />
      <TextareaWithLabel
        label="คำอธิบาย Service"
        name="explain"
        onChange={handleChange}
        className="col-span-2"
        value={serviceData.explain}
        placeholder="คำอธิบาย Service"
      />
      <div className="flex flex-col items-start gap-2 col-span-2">
        <span className="text-sm font-medium text-gray-700">
          ภาพ ตัวอย่างงาน
        </span>
        <ImageMultiUpload value={serviceData.images} readOnly={true} />
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="text-sm font-medium text-gray-700">ไอคอน Service</span>
        <ImageBoxUpload value={serviceData.icon} onChange={handleIconChange} />
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="text-sm font-medium text-gray-700">
          ไอคอนพื้นหลัง Service
        </span>
        <ImageBoxUpload
          value={serviceData.bgIcon}
          onChange={handleBgIconChange}
        />
      </div>
      <div className="flex flex-col justify-end items-end gap-2">
        <button
          onClick={submitUpdate}
          className="flex items-center place-self-end gap-2 border border-green-400 text-green-500 w-full justify-center h-[48px] py-2 rounded-md font-semibold cursor-pointer text-sm hover:bg-green-50 transition-colors"
        >
          อัพเดท
        </button>
      </div>
    </>
  );
};

export default EditZone;
