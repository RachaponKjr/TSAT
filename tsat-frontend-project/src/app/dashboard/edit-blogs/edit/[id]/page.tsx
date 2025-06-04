/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import {
  EditorContent,
  EditorContext,
  JSONContent,
  useEditor,
} from "@tiptap/react";
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
import { useRouter, useParams } from "next/navigation";
import { getCookie } from "@/lib/cookie";
import { Switch } from "antd";
// import { SubCarModel } from "../../edit-review/_components/add-review";
import {
  Tag,
  X,
  Plus,
  Save,
  FileText,
  Car,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
// import { ServiceResponse } from "../../edit-service/_components/table-service";
import HeadAddBlogs from "../../add/_components/head-add-blogs";
import Image from "next/image";
import { ServiceResponse } from "@/app/dashboard/edit-service/_components/table-service";
import { SubCarModel } from "@/app/dashboard/edit-review/_components/add-review";

interface BlogData {
  id: string;
  title: string;
  content: JSONContent | null;
  carModel: { name: string; id: string };
  service: { name: string; id: string };
  subService: { name: string; id: string };
  carSubModel: { name: string; id: string };
  isShow: boolean;
  tags: string[];
  images?: string;
}

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const blogId = params?.id as string;

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [carModel, setCarModel] = useState<CarCatogory[]>([]);
  const [service, setService] = useState<ServiceResponse[]>([]);
  const [subService, setSubService] = useState([]);
  const [carSubModel, setCarSubModel] = useState<SubCarModel[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // เพิ่ม state นี้

  const [data, setData] = useState<{
    title: string;
    content: JSONContent | null;
    carModel: string;
    service: string;
    imageUrl: string;
    subService: string;
    tags: string[];
    carSubModel: string;
    isShow: boolean;
  }>({
    title: "",
    content: null,
    carModel: "",
    carSubModel: "",
    tags: [],
    service: "",
    imageUrl: "",
    subService: "",
    isShow: false,
  });

  // Fetch existing blog data
  const getBlogData = useCallback(async () => {
    if (!blogId) return;

    try {
      setIsLoading(true);
      const cookie = await getCookie("access_token");
      const response = await fetch(
        `http://150.95.26.51:3131/api/v1/customer-work/get-work/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );

      if (response.status === 200) {
        const result = await response.json();
        const blogData: BlogData = result.data;

        // อัปเดต state ทั้งหมดพร้อมกัน
        const newData = {
          title: blogData.title,
          content: blogData.content,
          carModel: blogData.carModel.id,
          carSubModel: blogData.carSubModel.id,
          service: blogData.service.id,
          subService: blogData.subService.id,
          isShow: blogData.isShow,
          imageUrl: blogData.images || "",
          tags: blogData.tags || [],
        };

        setData(newData);
        setTags(blogData.tags || []);
        setCurrentImageUrl(blogData.imageUrl || "");
        setIsDataLoaded(true); // เซ็ตว่าข้อมูลโหลดเสร็จแล้ว
      } else {
        toast.error("ไม่สามารถโหลดข้อมูลบทความได้");
        router.back();
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
      toast.error("เกิดข้อผิดพลาดในการโหลดข้อมูล");
    } finally {
      setIsLoading(false);
    }
  }, [blogId, router]);

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

  const addTags = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      const newTags = [...tags, tag.trim()];
      setTags(newTags);
      // อัปเดต data state ด้วย
      setData((prev) => ({ ...prev, tags: newTags }));
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
    // อัปเดต data state ด้วย
    setData((prev) => ({ ...prev, tags: newTags }));
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
      console.error("Error fetching sub service:", error);
    }
  }, []);

  const handleUpdate = async () => {
    if (!data.title || !data.carModel || !data.content) {
      toast.error("กรุณากรอกข้อมูลให้ครบ", { className: "!text-red-500" });
      return;
    }

    setIsSubmitting(true);
    const cookie = await getCookie("access_token");

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("carModelId", data.carModel);
    formData.append("content", JSON.stringify(data.content));
    formData.append("serviceId", data.service);
    formData.append("subServiceId", data.subService);
    formData.append("isShow", data.isShow ? "true" : "false");
    formData.append("tags", JSON.stringify(data.tags)); // ใช้ data.tags แทน tags
    formData.append("carSubModelId", data.carSubModel);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(
        `http://150.95.26.51:3131/api/v1/customer-work/update-work/${blogId}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("อัปเดตบทความสำเร็จ", {
          className: "!text-green-500",
        });
        router.back();
      } else {
        toast.error("เกิดข้อผิดพลาดในการอัปเดต Blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("เกิดข้อผิดพลาดในการอัปเดต Blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    void getBlogData();
    void getCarModel();
    void getService();
  }, [getBlogData, getCarModel, getService]);

  useEffect(() => {
    if (data?.carModel) {
      void getSubCarModel(data.carModel);
    }
    if (data?.service) {
      void getSubService(data.service);
    }
  }, [data.carModel, data.service, getSubCarModel, getSubService]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>กำลังโหลดข้อมูล...</span>
        </div>
      </div>
    );
  }


  return (
    <div className="space-y-4 sm:space-y-6 pb-6">
      <HeadAddBlogs />

      {/* Form Container */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-4 sm:p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-2">
              <FileText size={20} className="text-[#8F2F34]" />
              แก้ไขข้อมูลบทความ
            </h2>
            <p className="text-sm text-gray-600">แก้ไขข้อมูลพื้นฐานของบทความ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Blog Title */}
            <div className="md:col-span-1">
              <div className="flex flex-col items-start gap-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    ชื่อบทความ
                  </span>
                  <span className="text-xs text-red-500">(หรือชื่อลูกค้า)</span>
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
                  value={data.carModel}
                  onValueChange={(value) =>
                    setData((prev) => ({
                      ...prev,
                      carModel: value,
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
                  value={data.carSubModel}
                  onValueChange={(value) =>
                    setData((prev) => ({
                      ...prev,
                      carSubModel: value,
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

            {/* Service */}
            <div className="md:col-span-1">
              <div className="flex flex-col items-start gap-2">
                <span className="text-sm font-medium text-gray-700">
                  เลือกบริการ
                </span>
                <Select
                  value={data.service}
                  onValueChange={(value) =>
                    setData((prev) => ({
                      ...prev,
                      service: value,
                    }))
                  }
                >
                  <SelectTrigger className="w-full h-10 sm:h-[2.5rem]">
                    <SelectValue placeholder="กรุณาเลือกบริการ" />
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

            {/* Sub Service */}
            <div className="md:col-span-1">
              <div className="flex flex-col items-start gap-2">
                <span className="text-sm font-medium text-gray-700">
                  เลือกบริการย่อย
                </span>
                <Select
                  value={data.subService}
                  onValueChange={(value) =>
                    setData((prev) => ({
                      ...prev,
                      subService: value,
                    }))
                  }
                >
                  <SelectTrigger className="w-full h-10 sm:h-[2.5rem]">
                    <SelectValue placeholder="กรุณาเลือกบริการย่อย" />
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

            {/* Tags Section */}
            <div className="md:col-span-2">
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <Tag size={14} />
                  แท็ก Blog
                </span>

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

            {/* Show on Homepage */}
            <div className="md:col-span-1">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700">
                  แสดงหน้าแรก
                </span>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={data.isShow || false}
                    onChange={() =>
                      setData((prev) => ({ ...prev, isShow: !prev.isShow }))
                    }
                  />
                  <span className="text-xs text-red-500">
                    * ต้องเป็นบทความงานลูกค้า
                  </span>
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div className="md:col-span-1">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  <ImageIcon size={14} />
                  เพิ่มภาพหน้าปก
                </span>
                {currentImageUrl && !image && (
                  <div className="mb-2">
                    <Image
                      src={currentImageUrl}
                      alt="Current cover"
                      className="w-32 h-20 object-cover rounded border"
                    />
                    <p className="text-xs text-gray-500 mt-1">ภาพปัจจุบัน</p>
                  </div>
                )}
                <ImageUpload onChange={setImage} />
                {image && (
                  <p className="text-xs text-green-600">เลือกภาพใหม่แล้ว</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => router.back()}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleUpdate}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-6 py-2.5 rounded-lg transition-colors font-medium"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>กำลังอัปเดต...</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>อัปเดต</span>
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
              แก้ไขเนื้อหาบทความ
            </h2>
            <p className="text-sm text-gray-600">แก้ไขเนื้อหาบทความของคุณ</p>
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {/* รอให้ข้อมูลโหลดเสร็จก่อนแสดง SimpleEditor */}
            {isDataLoaded && (
              <SimpleEditor
                key={`editor-${blogId}`} // เพิ่ม key เพื่อ force re-render เมื่อ blogId เปลี่ยน
                content={data.content}
                setEditorContent={(content) =>
                  setData((prev) => ({ ...prev, content }))
                }
              />
            )}
            {!isDataLoaded && (
              <div className="flex items-center justify-center h-64">
                <div className="flex items-center gap-2 text-gray-600">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>กำลังโหลด Editor...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
