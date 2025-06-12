"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Wrench,
  Save,
  X,
  AlertTriangle,
  Image as ImageIcon,
  FileText,
} from "lucide-react";
import React, { useState } from "react";
import ImageMultiUpload from "@/components/image-multi";
import ImageBoxUpload from "@/components/image-upload";
import InputWithLabel from "@/components/input-label";
import TextareaWithLabel from "@/components/textarea-with-label";
import { toast } from "sonner";
import { getCookie } from "@/lib/cookie";

interface AddServiceProps {
  serviceName?: string;
  title?: string;
  serviceDetail?: string;
  explain?: string;
  images?: string[];
  icon?: string;
  bgIcon?: string;
}

const AddService = () => {
  const [serviceData, setServiceData] = useState<AddServiceProps>({});
  const [images, setImages] = useState<File[]>([]);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [bgIcon, setBgIcon] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setServiceData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleImageChange = (files: File[]) => {
    setImages(files);
    const readers = files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((base64Images) => {
      setServiceData((prev) => ({
        ...prev,
        images: base64Images,
      }));
    });
  };

  const handleIconChange = (file: File) => {
    setIconFile(file);
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
    setBgIcon(file);
    // เพิ่ม reader ถ้าต้องการเก็บ base64 ใน serviceData
    const reader = new FileReader();
    reader.onloadend = () => {
      setServiceData((prev) => ({
        ...prev,
        bgIcon: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!serviceData.serviceName?.trim()) {
      newErrors.serviceName = "กรุณากรอกชื่อ Service";
    }

    if (!serviceData.title?.trim()) {
      newErrors.title = "กรุณากรอกชื่อย่อ Service";
    }

    if (!serviceData.serviceDetail?.trim()) {
      newErrors.serviceDetail = "กรุณากรอกรายละเอียด Service";
    }

    if (!serviceData.explain?.trim()) {
      newErrors.explain = "กรุณากรอกคำอธิบาย Service";
    }

    if (images.length === 0) {
      newErrors.images = "กรุณาเพิ่มภาพตัวอย่างงานอย่างน้อย 1 ภาพ";
    }

    if (!iconFile) {
      newErrors.icon = "กรุณาเพิ่มไอคอน Service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setServiceData({});
    setImages([]);
    setIconFile(null);
    setBgIcon(null);
    setErrors({});
  };

  const submitAdd = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const cookie = await getCookie("access_token");
      const formData = new FormData();
      
      // Add text fields
      formData.append("serviceName", serviceData?.serviceName || "");
      formData.append("title", serviceData?.title || "");
      formData.append("serviceDetail", serviceData?.serviceDetail || "");
      formData.append("explain", serviceData?.explain || "");

      // Add icon file
      if (iconFile) {
        formData.append("icon", iconFile);
      }

      // Add background icon file
      if (bgIcon) {
        formData.append("bgIcon", bgIcon);
      }

      // Add image files
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      const res = await fetch(
        "http://150.95.26.51:3131/api/v1/service/create-service",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );

      if (res.status === 201) {
        toast.success("เพิ่มเซอร์วิสสำเร็จ", { className: "!text-green-500" });
        resetForm();
        setIsOpen(false);
        window.location.reload();
      } else {
        toast.error("เพิ่มเซอร์วิสไม่สำเร็จ", { className: "!text-red-500" });
      }
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("เกิดข้อผิดพลาดในการเพิ่มเซอร์วิส", {
        className: "!text-red-500",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="block h-[52px]">
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            resetForm();
          }
        }}
      >
        <DialogTrigger className="h-full " asChild>
          <div className="flex items-center justify-center gap-2 cursor-pointer rounded-lg border border-gray-300 hover:border-[#8F2F34] hover:bg-gray-50 px-4 sm:px-6 py-2 h-full transition-colors">
            <Wrench className="text-[#8F2F34] hidden sm:block" size={16} />
            <span className="text-[#333333] text-sm font-medium">
              <span className="hidden sm:inline">เพิ่มเซอร์วิส</span>
              <span className="sm:hidden">เพิ่มเซอร์วิส</span>
            </span>
            <Plus color="#333333" size={16} />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-[95vw] sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Wrench size={20} className="text-[#8F2F34]" />
              เพิ่มเซอร์วิสใหม่
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              กรอกข้อมูลเซอร์วิสและภาพประกอบ
            </p>
          </div>

          <div className="space-y-4">
            {/* Basic Information Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <InputWithLabel
                  label="ชื่อ Service"
                  name="serviceName"
                  onChange={handleChange}
                  value={serviceData?.serviceName || ""}
                  placeholder="เช่น ซ่อมเครื่องยนต์"
                  className={errors.serviceName ? "border-red-500" : ""}
                />
                {errors.serviceName && (
                  <div className="flex items-center gap-1">
                    <AlertTriangle size={12} className="text-red-500" />
                    <p className="text-xs text-red-500">{errors.serviceName}</p>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <InputWithLabel
                  label="ชื่อย่อ Service"
                  name="title"
                  onChange={handleChange}
                  value={serviceData?.title || ""}
                  placeholder="เช่น Engine Repair"
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <div className="flex items-center gap-1">
                    <AlertTriangle size={12} className="text-red-500" />
                    <p className="text-xs text-red-500">{errors.title}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1 mb-2">
                  <FileText size={14} className="text-gray-500" />
                  <label className="text-sm font-medium text-gray-700">
                    รายละเอียด Service <span className="text-red-500">*</span>
                  </label>
                </div>
                <TextareaWithLabel
                  name="serviceDetail"
                  onChange={handleChange}
                  value={serviceData?.serviceDetail || ""}
                  placeholder="อธิบายรายละเอียดของเซอร์วิสนี้..."
                  className={`min-h-[100px] ${
                    errors.serviceDetail ? "border-red-500" : ""
                  }`}
                />
                {errors.serviceDetail && (
                  <div className="flex items-center gap-1">
                    <AlertTriangle size={12} className="text-red-500" />
                    <p className="text-xs text-red-500">
                      {errors.serviceDetail}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1 mb-2">
                  <FileText size={14} className="text-gray-500" />
                  <label className="text-sm font-medium text-gray-700">
                    คำอธิบาย Service <span className="text-red-500">*</span>
                  </label>
                </div>
                <TextareaWithLabel
                  name="explain"
                  onChange={handleChange}
                  value={serviceData?.explain || ""}
                  placeholder="อธิบายขั้นตอนหรือวิธีการทำงาน..."
                  className={`min-h-[100px] ${
                    errors.explain ? "border-red-500" : ""
                  }`}
                />
                {errors.explain && (
                  <div className="flex items-center gap-1">
                    <AlertTriangle size={12} className="text-red-500" />
                    <p className="text-xs text-red-500">{errors.explain}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Images Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1 mb-2">
                  <ImageIcon size={14} className="text-gray-500" />
                  <label className="text-sm font-medium text-gray-700">
                    ภาพตัวอย่างงาน <span className="text-red-500">*</span>
                  </label>
                </div>
                <div
                  className={`border-2 border-dashed rounded-lg p-2 ${
                    errors.images ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <ImageMultiUpload
                    onChange={handleImageChange}
                    value={serviceData?.images}
                  />
                </div>
                {errors.images && (
                  <div className="flex items-center gap-1">
                    <AlertTriangle size={12} className="text-red-500" />
                    <p className="text-xs text-red-500">{errors.images}</p>
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  อัพโหลดภาพตัวอย่างผลงานที่เกี่ยวข้องกับเซอร์วิสนี้
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1 mb-2">
                  <Wrench size={14} className="text-gray-500" />
                  <label className="text-sm font-medium text-gray-700">
                    ไอคอน Service <span className="text-red-500">*</span>
                  </label>
                </div>
                <div
                  className={`border-2 border-dashed rounded-lg p-2 ${
                    errors.icon ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <ImageBoxUpload
                    value={serviceData?.icon}
                    onChange={handleIconChange}
                  />
                </div>
                {errors.icon && (
                  <div className="flex items-center gap-1">
                    <AlertTriangle size={12} className="text-red-500" />
                    <p className="text-xs text-red-500">{errors.icon}</p>
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  อัพโหลดไอคอนที่จะแสดงแทนเซอร์วิสนี้
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1 mb-2">
                  <ImageIcon size={14} className="text-gray-500" />
                  <label className="text-sm font-medium text-gray-700">
                    ไอคอนพื้นหลัง Service
                  </label>
                </div>
                <div className="border-2 border-dashed rounded-lg p-2 border-gray-300">
                  <ImageBoxUpload
                    value={serviceData?.bgIcon}
                    onChange={handleBgIconChange}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  อัพโหลดไอคอนพื้นหลังสำหรับเซอร์วิสนี้ (ถ้ามี)
                </p>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Wrench
                  className="text-blue-600 flex-shrink-0 mt-0.5"
                  size={16}
                />
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">คำแนะนำ:</p>
                  <ul className="text-xs space-y-1">
                    <li>• ใช้ชื่อเซอร์วิสที่ชัดเจนและเข้าใจง่าย</li>
                    <li>• อัพโหลดภาพที่มีคุณภาพดีและเกี่ยวข้องกับเซอร์วิส</li>
                    <li>• เขียนคำอธิบายที่ละเอียดเพื่อให้ลูกค้าเข้าใจ</li>
                    <li>• ไอคอนควรมีขนาดเหมาะสมและมองเห็นชัดเจน</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <div className="flex flex-col sm:flex-row w-full gap-3">
              <DialogClose asChild>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  <X size={16} />
                  <span>ยกเลิก</span>
                </button>
              </DialogClose>
              <button
                type="button"
                onClick={submitAdd}
                disabled={isSubmitting}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>กำลังเพิ่ม...</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>เพิ่มเซอร์วิส</span>
                  </>
                )}
              </button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddService;