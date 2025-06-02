import { ResBlog } from '@/server/api/customer-work';
import React from 'react';
import { FaFacebookF, FaInstagram, FaLine } from 'react-icons/fa';

export default function HeaderBlog({ headText, data }: { headText: string, data: ResBlog }) {
  const combined = [
    ...(data?.carModel ? [data?.carModel] : []),
    ...(data?.subCarModel ? [data?.subCarModel] : []),
    ...(data?.service ? [data?.service] : []),
    ...(data?.subService ? [data?.subService] : []),
    ...data?.tags || [],
  ];
  return (
    <div className="mt-12 px-6 md:px-72">
      <div className="mt-16">
        <div className="text-[#666666] text-3xl font-bold">
          <h1 className=''>{headText}</h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between">
          <div className="mt-4 mb-2 flex flex-wrap w-full gap-2">
            {combined.map((tab, index) => (
              <div key={index} className="px-1 py-1 w-max bg-[#8F2F34] text-white rounded-sm text-sm z-10 block">
                {tab}
              </div>
            ))}
          </div>

          <div className="flex space-x-4 mt-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF size={24} color="#666666" />
            </a>
            <a href="https://line.me" target="_blank" rel="noopener noreferrer">
              <FaLine size={24} color="#666666" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={24} color="#666666" />
            </a>
          </div>
        </div>
      </div>
      <hr className="w-full h-2 mt-4 border-t-2 border-[#cccccc]" />
    </div>
  );
}
