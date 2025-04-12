'use client';

import {
  FacebookOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  MenuOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    'หน้าหลัก',
    'บริการ',
    'ผลิตภัณฑ์',
    'ลูกค้าของเรา',
    'เกี่ยวกับเรา',
    'ติดต่อเรา',
  ];

  return (
    <div className="text-white py-0  md:py-6 md:px-6 md:px-24 text-base md:text-3xl bg-[#333333] md:bg-white">
      <div className="w-full md:hidden h-8 bg-[#333333]"></div>
      <div className="flex justify-between items-center">
        {/* Mobile Menu Button */}
        <div className="md:hidden ml-4  cursor-pointer">
          <div className=" text-white  text-3xl">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
          </div>
        </div>

        <div className="flex justify-end md:hidden">
          <div className="bg-[#333333] text-md py-2 px-4">
            <PhoneOutlined className="mr-2 text-3xl" />
            02-069-9966 / 089-986-9966
          </div>
          <div className="flex gap-4 items-center  bg-[#8F2F34] py-2 px-4">
            <MailOutlined className="ml-2 text-2xl" />
            <FacebookOutlined className="text-2xl" />
            <InstagramOutlined className="text-2xl" />
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="bg-white px-4">
        <img
          src="../images/logo.png"
          alt="Description of image"
          className="w-full py-6  md:hidden"
        />
      </div>
      {/* Desktop Menu */}
      <div className="flex items-center justify-between gap-8 hidden md:flex">
        {/* Logo Section */}
        <div className="bg-white px-4">
          <img
            src="../images/logo.png"
            alt="Description of image"
            className="py-6 w-auto"
          />
        </div>

        {/* Contact & Menu Section */}
        <div className="flex-1">
          <div className="flex justify-end mb-4">
            <div className="flex text-lg">
              <div className="bg-[#333333] rounded-tl-full rounded-bl-full py-2 px-4">
                <PhoneOutlined className="mr-2" />
                02-069-9966 / 089-986-9966
              </div>
              <div className="flex gap-4 items-center bg-[#8F2F34] rounded-tr-full rounded-br-full py-2 px-4">
                <MailOutlined className="ml-2 text-2xl" />
                <FacebookOutlined className="text-2xl" />
                <InstagramOutlined className="text-2xl" />
              </div>
            </div>
          </div>
          <nav className="text-black">
            <ul className="flex gap-8 text-lg justify-end">
              {menuItems.map((item, index) => (
                <li key={index} className="relative group">
                  <a
                    href="#"
                    className="text-gray-500 hover:text-[#8F2F34] border-b-2 border-transparent group-hover:border-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="mt-6 md:hidden text-white space-y-4">
          <nav className="text-center p-4">
            <ul className="flex flex-col gap-4 text-base">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
