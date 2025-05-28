'use client';
import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';

interface ImageMultiUploadProps {
  onChange?: (files: File[]) => void;
  value?: string[]; // base64 หรือ path
  readOnly?: boolean;
}

const ImageMultiUpload: React.FC<ImageMultiUploadProps> = ({
  onChange,
  value = [],
  readOnly = false,
}) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // sync ค่า value (จาก props) เข้ามาเมื่อโหลด component
  useEffect(() => {
    setPreviews(value);
  }, [value]);

  const handleClick = () => {
    if (!readOnly) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files ?? []);
    if (newFiles.length === 0) return;

    const readers = newFiles.map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(base64Images => {
      const allPreviews = [...previews, ...base64Images];
      setPreviews(allPreviews);

      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);

      onChange?.(updatedFiles);
    });

    // reset input เพื่อเลือกไฟล์เดิมได้ใหม่อีกครั้ง
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isBase64 = (str: string) => str.startsWith('data:image');

  return (
    <div>
      {!readOnly && (
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      )}

      <div className="flex flex-row flex-wrap gap-4">
        {!readOnly && (
          <div
            onClick={handleClick}
            className="w-40 h-40 cursor-pointer border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center overflow-hidden bg-gray-50 hover:border-blue-400 transition"
          >
            <span className="text-gray-400 text-sm">+ เพิ่มรูป</span>
          </div>
        )}

        {previews.map((src, index) => {
          const imageSrc = isBase64(src) ? src : `http://150.95.25.111:3131${src}`;
          return (
            <div key={`preview-${index}`} className="w-40 h-40 border rounded-xl overflow-hidden relative">
              <Image
                src={imageSrc}
                alt={`preview-${index}`}
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageMultiUpload;
