"use client";

import InputWithLabel from "@/components/input-label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/server/api";
import { Wrench, Plus } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { ServiceResponse } from "./table-service";
import TextareaWithLabel from "@/components/textarea-with-label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export interface SubService {
  serviceId?: string;
  subServiceDetail?: string;
  subServiceName?: string;
}

const AddSubService = () => {
  const [service, setService] = useState<ServiceResponse[]>([]);
  const [subServiceData, setSubServiceData] = useState<SubService>({
    serviceId: "",
    subServiceDetail: "",
    subServiceName: "",
  });
  const [diaOpen, setDiaOpen] = useState<boolean>(false);
  const router = useRouter();
  const getService = useCallback(async () => {
    try {
      const { data } = await api.service.getService();
      setService(data.service);
    } catch (error) {
      console.error("Error fetching service:", error);
    }
  }, []);

  useEffect(() => {
    void getService();
  }, [getService]);

  const handleChange = (field: keyof SubService, value: string) => {
    setSubServiceData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveSubSerivce = async (e) => {
    e.preventDefault();
    await api.service
      .saveSubService(subServiceData)
      .then((res) => {
        if (res.status === 201) {
          setDiaOpen(false);
          toast("สร้าง เซอร์วิสย่อยสำเร็จ", { className: "!text-green-500" });
          window.location.reload();
        } else {
          toast("ไม่สามารถสร้างได้", { className: "!text-red-500" });
        }
      })
      .catch((e) => {
        toast("เกิดข้อผิดพลาดกับ Server", { className: "!text-red-500" });
      });
  };

  return (
    <div className="h-[52px]">
      <Dialog open={diaOpen} onOpenChange={setDiaOpen}>
        <DialogTrigger className="h-full" asChild>
          <div className="flex items-center justify-center gap-2 cursor-pointer rounded-lg border border-gray-300 hover:border-[#8F2F34] hover:bg-gray-50 px-4 sm:px-6 py-2 h-full transition-colors">
            <Wrench className="text-[#8F2F34] hidden sm:block" size={16} />
            <span className="text-[#333333] text-sm font-medium">
              เพิ่มเซอร์วิสย่อย
            </span>
            <Plus color="#333333" size={16} />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-[95vw] sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Wrench size={20} className="text-[#8F2F34]" />
              เพิ่มเซอร์วิสย่อยใหม่
            </h2>
            <p className="text-sm text-gray-600 mt-1">กรอกข้อมูลเซอร์วิสย่อย</p>
          </div>

          <form
            onSubmit={saveSubSerivce}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* เลือกหมวดหมู่ */}
            <div className="space-y-2 sm:col-span-2">
              <span>เลือกหมวดหมู่บริการ</span>
              <Select
                onValueChange={(value) => handleChange("serviceId", value)}
              >
                <SelectTrigger className="w-full h-10 sm:h-[2.5rem]">
                  <div className="flex items-center gap-2">
                    <SelectValue placeholder="หมวดหมู่" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>หมวดหมู่สินค้า</SelectLabel>
                    {service.map((item: ServiceResponse) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.serviceName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* ชื่อเซอร์วิสย่อย */}
            <InputWithLabel
              label="ชื่อ Service ย่อย"
              name="subServiceName"
              value={subServiceData.subServiceName}
              onChange={(e) => handleChange("subServiceName", e.target.value)}
              placeholder="เช่น ซ่อมเครื่องยนต์"
            />

            {/* รายละเอียดบริการย่อย */}
            <TextareaWithLabel
              label="เนื้อหา บริการย่อย"
              name="subServiceDetail"
              value={subServiceData.subServiceDetail}
              onChange={(e) => handleChange("subServiceDetail", e.target.value)}
              placeholder="เนื้อหา"
            />

            <button
              type="submit"
              className="h-12 bg-green-500 hover:bg-green-400 text-white rounded-lg sm:col-span-2"
            >
              บันทึก
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddSubService;
