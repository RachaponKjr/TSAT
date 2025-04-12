import { Tag } from 'antd';
import React from 'react';
import { FaFacebookF, FaInstagram, FaLine } from 'react-icons/fa';

export default function headerBlog() {
  return (
    <div className="mt-12 px-6 md:px-72">
      <div className="mt-24">
        <div className="text-[#666666] text-3xl font-bold">
          Porsche Cayenne ทรุดตัว!? อย่าตกใจ มาดูสาเหตุกัน!
        </div>

        <div className="flex justify-between">
          <div className="mt-4">
            <Tag color="#8F2F34" className="mr-2 font-bold">
              Porsche
            </Tag>
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
