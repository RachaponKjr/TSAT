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
import logo from '@/assets/images/logo.png'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const path = usePathname();

  const menuItems = [
    { label: 'หน้าหลัก', href: '/' },
    { label: 'บริการ', href: '/services' },
    { label: 'ผลิตภัณฑ์', href: '/products' },
    { label: 'ลูกค้าของเรา', href: '/customer' },
    { label: 'เกี่ยวกับเรา', href: '/about' },
    { label: 'ติดต่อเรา', href: '/contact' },
  ];
  console.log(path);
  return (
    <div className="text-white py-0 shadow-[0px_12px_24px_0px_#00000008] md:py-6 md:px-24 text-base md:text-3xl bg-[#333333] md:bg-white">
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
          <div className="bg-[#333333] text-[10px] md:text-md py-2 px-4">
            <PhoneOutlined className="mr-2 text-lg md:text-3xl" />
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
        {/* <img
          src="../images/logo.png"
          alt="Description of image"
          className="w-full py-6  md:hidden"
        /> */}
        <Image src={logo} alt="Description of image" width={500} height={500} className='py-2 md:hidden' />
      </div>
      {/* Desktop Menu */}
      <div className=" items-center justify-between gap-8 hidden md:flex">
        {/* Logo Section */}
        <div className="bg-white px-4">
          <Image src={logo} alt="Description of image" width={500} height={500} className='py-2' />
        </div>

        {/* Contact & Menu Section */}
        <div className="flex-1">
          <div className="flex justify-end mb-4">
            <div className="flex text-lg">
              <div className="bg-[#333333] rounded-tl-full text-[15px] font-bold rounded-bl-full py-1 px-4">
                <PhoneOutlined className="mr-2" />
                02-069-9966 / 089-986-9966
              </div>
              <div className="flex gap-4 items-center bg-[#8F2F34] rounded-tr-full rounded-br-full py-1 px-4">
                <MailOutlined className="ml-2 text-2xl" />
                <FacebookOutlined className="text-2xl" />
                <InstagramOutlined className="text-2xl" />
              </div>
            </div>
          </div>
          <nav className="text-black">
            <ul className="flex gap-4 text-lg font-semibold justify-end w-max place-self-end border-b-3 h-10">
              {menuItems.map((item, index) => (
                <li key={index} className="relative group ">
                  <Link
                    href={item.href}
                    className={`text-gray-500 hover:text-[#8F2F34] px-2 flex justify-center ${path === item.href ? '!text-[#8F2F34] before:absolute before:w-full before:h-[3px] before:bg-[#8F2F34] before:-bottom-[3px]' : ''}`}
                  >
                    {item.label}
                  </Link>
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
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-white"
                  >
                    {item.label}
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
