/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import HeadAddBlogs from "./_components/head-add-blogs";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { JSONContent } from "@tiptap/react";
import { Input } from "@/components/ui/input";
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
import { CarCatogory } from "@/types/car-model";
import ImageUpload from "@/components/image-upload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/cookie";
import { Switch } from "antd";
import { SubCarModel } from "../../edit-review/_components/add-review";
import {
  Tag,
  X,
  Plus,
  Save,
  FileText,
  Car,
  Image as ImageIcon,
} from "lucide-react";
import { ServiceResponse } from "../../edit-service/_components/table-service";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Page = () => {
  const [editorContent, setEditorContent] = useState<JSONContent | null>(null);
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [carModel, setCarModel] = useState<CarCatogory[]>([]);
  const [service, setService] = useState<ServiceResponse[]>([]);
  const [services, setServices] = useState([]);
  const [subService, setSubService] = useState([]);
  const [carSubModel, setCarSubModel] = useState<SubCarModel[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<{
    title: string;
    content: JSONContent | null;
    carModel: { name: string; id: string };
    service: { name: string; id: string };
    imageUrl: string;
    subService: { name: string; id: string };
    tags: string[];
    carSubModel: { name: string; id: string };
    isShow: boolean;
  }>({
    title: "",
    content: null,
    carModel: { name: "", id: "" },
    carSubModel: { name: "", id: "" },
    tags: [],
    service: { name: "", id: "" },
    imageUrl: "",
    subService: { name: "", id: "" },
    isShow: false,
  });

  const getCarModel = useCallback(async () => {
    try {
      const { data: res } = await api.carModel.getCarModel();
      const carModels = (res as { data: CarCatogory[] }).data;
      setCarModel(carModels);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const getService = useCallback(async () => {
    try {
      const { data } = await api.service.getService();
      setService(data.service);
    } catch (error) {
      console.error("Error fetching service:", error);
    }
  }, []);

  const getSubServices = useCallback(async () => {
    try {
      const { data } = await api.service.getSubServices();
      setServices(data.data);
    } catch (error) {
      console.error("Error fetching service:", error);
    }
  }, []);

  const addTags = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      const newTags = [...tags, tag.trim()];
      setTags(newTags);
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  // Toggle บริการหลัก
  const onCheckMainService = (id: string) => {
    setTags((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Toggle บริการย่อย
  const onCheckSubService = (id: string) => {
    setTags((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const getSubCarModel = useCallback(async (id: string) => {
    try {
      const { data } = await api.carModel.getSubCarModel(id);
      setCarSubModel(data?.carSubModels);
    } catch (error) {
      console.error("Error fetching sub car models:", error);
    }
  }, []);
  const getSubService = useCallback(async (id: string) => {
    try {
      const { data } = await api.service.getSubService(id);
      setSubService(data?.subService);
    } catch (error) {
      console.error("Error fetching sub car models:", error);
    }
  }, []);

  const handleSubmit = async () => {
    if (!data.title || !data.carModel.id || !editorContent || !image) {
      toast.error("กรุณากรอกข้อมูลให้ครบ", { className: "!text-red-500" });
      return;
    }

    setIsSubmitting(true);
    const cookie = await getCookie("access_token");

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("carModelId", data.carModel.id);
    formData.append("content", JSON.stringify(editorContent));
    formData.append("serviceId", data.service.id);
    formData.append("subServiceId", data.subService.id);
    formData.append("isShow", data.isShow ? "true" : "false");
    formData.append("tags", JSON.stringify(tags));
    formData.append("image", image);
    formData.append("carSubModelId", data.carSubModel.id);

    try {
      await fetch("http://150.95.26.51:3131/api/v1/customer-work/create-work", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            toast.success("สร้างบทความสําเร็จ", {
              className: "!text-green-500",
            });
            router.back();
          }
        })
        .catch((e) => {
          toast.error("เกิดข้อผิดพลาดในการสร้าง Blog");
        });
    } catch {
      toast.error("เกิดข้อผิดพลาดในการสร้าง Blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    void getCarModel();
    void getService();
    void getSubServices();
    if (data?.carModel.id) {
      void getSubCarModel(data.carModel.id);
    }
    if (data?.service.id) {
      void getSubService(data.service.id);
    }
  }, [
    data.carModel.id,
    data.service.id,
    getCarModel,
    getService,
    getSubCarModel,
    getSubService,
    getSubServices,
  ]);

  console.log(tags, "Tag");

  return (
    <div className="space-y-4 sm:space-y-6 pb-6">
      <HeadAddBlogs />

      {/* Form Container */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-4 sm:p-6">
          {/* Section Headers for Mobile */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-2">
              <FileText size={20} className="text-[#8F2F34]" />
              ข้อมูลบทความ
            </h2>
            <p className="text-sm text-gray-600">กรอกข้อมูลพื้นฐานของบทความ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Blog Title */}
            <div className="md:col-span-1">
              <div className="flex flex-col items-start gap-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    ชื่อบทความ
                  </span>
                </div>
                <Input
                  name="name"
                  value={data.title}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full h-10 sm:h-[2.5rem]"
                  placeholder="ชื่อ Blog"
                />
              </div>
            </div>

            {/* Car Model */}
            <div className="md:col-span-1">
              <div className="flex flex-col items-start gap-2">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Car size={14} />
                  เลือกรุ่นรถ
                </span>
                <Select
                  onValueChange={(value) =>
                    setData((prev) => ({
                      ...prev,
                      carModel: { name: "", id: value },
                    }))
                  }
                >
                  <SelectTrigger className="w-full h-10 sm:h-[2.5rem]">
                    <SelectValue placeholder="เลือกรุ่นรถ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {carModel.map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Sub Car Model */}
            <div className="md:col-span-1">
              <div className="flex flex-col items-start gap-2">
                <span className="text-sm font-medium text-gray-700">
                  เลือกรุ่นรถย่อย
                </span>
                <Select
                  onValueChange={(value) =>
                    setData((prev) => ({
                      ...prev,
                      carSubModel: { name: "", id: value },
                    }))
                  }
                >
                  <SelectTrigger className="w-full h-10 sm:h-[2.5rem]">
                    <SelectValue placeholder="กรุณาเลือกรุ่นรถรอง" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>ทำการเลือกรุ่นรถหลักก่อน</SelectLabel>
                      {carSubModel &&
                        carSubModel.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* service */}
            <div className="md:col-span-1">
              <div className="flex flex-col items-start gap-2">
                <span className="text-sm font-medium text-gray-700">
                  เลือกบริการ
                </span>
                <Select
                  onValueChange={(value) =>
                    setData((prev) => ({
                      ...prev,
                      service: { name: "", id: value },
                    }))
                  }
                >
                  <SelectTrigger className="w-full h-10 sm:h-[2.5rem]">
                    <SelectValue placeholder="กรุณาเลือกรุ่นรถรอง" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>ทำการเลือกบริการ</SelectLabel>
                      {service &&
                        service.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.title}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Subservice */}
            <div className="md:col-span-1">
              <div className="flex flex-col items-start gap-2">
                <span className="text-sm font-medium text-gray-700">
                  เลือกบริการย่อย
                </span>
                <Select
                  onValueChange={(value) =>
                    setData((prev) => ({
                      ...prev,
                      subService: { name: "", id: value },
                    }))
                  }
                >
                  <SelectTrigger className="w-full h-10 sm:h-[2.5rem]">
                    <SelectValue placeholder="กรุณาเลือกรุ่นรถรอง" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>ทำการเลือกบริการหลักก่อน</SelectLabel>
                      {subService &&
                        subService.map(
                          (item: { id: string; subServiceName: string }) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.subServiceName}
                            </SelectItem>
                          )
                        )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Show on Homepage */}
            <div className="md:col-span-1 flex gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">
                  เลือก บริการเพิ่มเติม
                </span>
                <Dialog>
                  <DialogTrigger>
                    <button className="px-4 py-2 bg-[#8F2F34] text-white rounded-lg">
                      เลือกบริการเพิ่มเติม
                    </button>
                  </DialogTrigger>

                  <DialogContent className="max-w-2xl">
                    <div className="flex flex-col gap-6 p-4">
                      {/* บริการหลัก */}
                      <div className="flex flex-col">
                        <span className="text-lg font-semibold mb-2">
                          บริการหลัก
                        </span>
                        <div className="grid grid-cols-2 gap-4">
                          {service.map((item: any) => (
                            <label
                              key={item.id}
                              className="flex items-center gap-2 border p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={tags.includes(item.serviceName)}
                                onChange={() =>
                                  onCheckMainService(item.serviceName)
                                }
                              />
                              <span>{item.serviceName}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* บริการย่อย */}
                      <div className="flex flex-col">
                        <span className="text-lg font-semibold mb-2">
                          บริการย่อย
                        </span>
                        <div className="grid grid-cols-2 gap-4">
                          {services.map((item: any) => (
                            <label
                              key={item.id}
                              className="flex items-center gap-2 border p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={tags.includes(item.subServiceName)}
                                onChange={() =>
                                  onCheckSubService(item.subServiceName)
                                }
                              />
                              <span>{item.subServiceName}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              {/* Tag service more */}
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">
                  แสดงรีวิวงาน Service หน้าเเรก
                </span>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={data.isShow || false}
                    onChange={() =>
                      setData((prev) => ({ ...prev, isShow: !prev.isShow }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* Tags Section */}
            <div className="md:col-span-2">
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Tag size={14} />
                  แท็ก Blog
                </span>

                {/* Tag Input */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    name="tagInput"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && tagInput.trim()) {
                        e.preventDefault();
                        addTags(tagInput);
                        setTagInput("");
                      }
                    }}
                    className="flex-1 h-10 sm:h-[2.5rem]"
                    placeholder="เพิ่มแท็ก แล้วกด Enter หรือคลิกเพิ่ม"
                  />
                  <button
                    onClick={() => {
                      if (tagInput.trim()) {
                        addTags(tagInput);
                        setTagInput("");
                      }
                    }}
                    className="flex items-center gap-1 border border-green-400 text-green-600 px-4 py-2 rounded-md font-medium cursor-pointer text-sm hover:bg-green-50 transition-colors"
                  >
                    <Plus size={14} />
                    <span>เพิ่ม</span>
                  </button>
                </div>

                {/* Tags Display */}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <div
                        key={index}
                        className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm flex items-center gap-2 border border-blue-200"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(index)}
                          className="text-red-500 hover:text-red-700 ml-1"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Cover Image */}
            <div className="md:col-span-1">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <ImageIcon size={14} />
                  เพิ่มภาพหน้าปก
                </span>
                <ImageUpload onChange={setImage} />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => router.back()}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-6 py-2.5 rounded-lg transition-colors font-medium"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>กำลังบันทึก...</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>บันทึก</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-4 sm:p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-2">
              <FileText size={20} className="text-[#8F2F34]" />
              เนื้อหาบทความ
            </h2>
            <p className="text-sm text-gray-600">เขียนเนื้อหาบทความของคุณ</p>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <SimpleEditor
              setEditorContent={(
                content: React.SetStateAction<JSONContent | null>
              ) => {
                setEditorContent(content);
                setData((prev) => ({ ...prev, content: content }));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
