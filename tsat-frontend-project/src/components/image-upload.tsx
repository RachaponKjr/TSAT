'use client';
import React, { useRef, useState } from 'react';

interface ImageBoxUploadProps {
  onChange?: (file: File) => void;
}

const ImageBoxUpload: React.FC<ImageBoxUploadProps> = ({ onChange }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    onChange?.(file);
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
        className="w-40 h-40 cursor-pointer border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden bg-gray-50 hover:border-blue-400 transition"
      >
        {preview ? (
          <img
            src={preview}
            alt="preview"
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
