"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface ImageBoxUploadProps {
  onChange?: (file: File) => void;
  value?: string; // สามารถเป็น base64 หรือ URL ได้
}

const ImageBoxUpload: React.FC<ImageBoxUploadProps> = ({ onChange, value }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // อัปเดต preview ถ้ามีการส่งค่า value เข้ามาใหม่ (กรณี controlled)
  useEffect(() => {
    if (value) {
      setPreview(value);
    }
  }, [value]);


  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
    };
    reader.readAsDataURL(file);

    onChange?.(file);
  };

  // กำหนด src ของรูป
  const getImageSrc = () => {
    if (!preview) return "";
  
    // ถ้าเป็น base64 → อย่าเติม URL
    if (preview.startsWith("data:image")) {
      return preview;
    }
  
    // ถ้าไม่ใช่ base64 → แปลว่าเป็น path จาก server
    return `http://150.95.26.51:3131${preview}`;
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        onClick={handleClick}
        className="w-40 h-40 cursor-pointer border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden bg-black/20 hover:border-blue-400 transition"
      >
        {preview ? (
          <Image
            src={getImageSrc()}
            alt="uploaded preview"
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">+ เพิ่มรูป</span>
        )}
      </div>
    </div>
  );
};

export default ImageBoxUpload;
