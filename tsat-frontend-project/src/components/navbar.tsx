'use client';

import {
  InstagramOutlined,
  MailOutlined,
  MenuOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import logo from '@/assets/images/logo.png'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Line from './icons/line';
import Facebook from './icons/facebook';
import { Phone, X } from 'lucide-react';
import api from '@/server/api';
import { formatPhoneName } from '@/lib/format-phonenumber';
import { cn } from '../lib/utils';

export interface ContactProps {
  facebook: string;
  id: string;
  instagram: string;
  line: string;
  link_email: string;
  link_facebook: string;
  link_instagram: string;
  link_line: string;
  mail: string;
  phone: string;
  phone2: string;
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const path = usePathname();
  const [contact, setContact] = useState<ContactProps>();
  const menuItems = [
    { label: 'หน้าหลัก', href: '/' },
    { label: 'บริการ', href: '/services' },
    { label: 'ผลิตภัณฑ์', href: '/products' },
    { label: 'ลูกค้าของเรา', href: '/customer' },
    { label: 'เกี่ยวกับเรา', href: '/about' },
    { label: 'ติดต่อเรา', href: '/contact' },
  ];
  const getContact = useCallback(async () => {
    await api.content.getContact().then((res) => {
      const data = res.data as { data: ContactProps[] };
      setContact(data.data[0]);
    });
  }, []);

  useEffect(() => {
    getContact();
  }, [getContact]);


  return (
    <div className={cn(path === '/admin-login' || path.startsWith('/dashboard') ? 'hidden' : 'block', 'text-white py-0 shadow-[0px_12px_24px_0px_#00000008] md:py-6 md:px-4 lg::px-12 xl:px-24 text-base md:text-3xl bg-[#333333] md:bg-white container mx-auto')}>
      <div className="w-full md:hidden h-8 bg-[#333333]"></div>
      <div className="flex justify-start items-center">
        {/* Mobile Menu Button */}
        <div className="md:hidden ml-4  cursor-pointer">
          <div className=" text-white  text-3xl">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
          </div>
        </div>

        <div className="flex grow justify-end md:hidden">
          <div className="bg-[#333333] grow text-[16px] md:text-md py-2 px-2 flex items-center gap-1 relative">
            <div className="absolute top-0 bottom-0 -right-3 w-3 bg-[#8B2D2D] skew-x-[-15deg] origin-top-left" />
            {/* <PhoneOutlined className="mr-2 text-lg md:text-3xl" /> */}
            <Phone size={20} color='#FFFFFF' />
            <div className="flex flex-row items-center grow text-nowrap font-semibold justify-evenly">
              <a href={`tel:${contact?.phone}`} className="text-[clamp(14px,4vw,20px)] hover:underline">
                {formatPhoneName(String(contact?.phone))}
              </a>
              <span>/</span>
              <a href={`tel:${contact?.phone2}`} className="text-[clamp(14px,4vw,20px)] hover:underline">
                {formatPhoneName(String(contact?.phone2))}
              </a>
            </div>
          </div>
          <div className="flex gap-4 items-center  bg-[#8F2F34] py-2 px-2">
            <div onClick={() => window.open(contact?.link_line, '_blank')}>
              <Line size={24} color='#FFFFFF' />
            </div>
            <div onClick={() => window.open(contact?.link_facebook, '_blank')}>
              <Facebook size={24} color='#FFFFFF' />
            </div>
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="bg-white px-4">
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
              <div className="bg-[#333333] rounded-tl-full text-[15px] font-bold rounded-bl-full flex gap-2 items-center py-2 px-4">
                <Phone size={20} color='#FFFFFF' />
                <div className="flex flex-row items-center  gap-1">
                  <a href={`tel:${contact?.phone}`} className="text-base hover:underline">
                    {formatPhoneName(String(contact?.phone))}
                  </a>
                  <span>/</span>
                  <a href={`tel:${contact?.phone2}`} className="text-base hover:underline">
                    {formatPhoneName(String(contact?.phone2))}
                  </a>
                </div>
              </div>
              <div className="flex gap-4 items-center bg-[#8F2F34] rounded-tr-full rounded-br-full py-2 px-4">
                <MailOutlined className="ml-2 text-2xl cursor-pointer" onClick={() => window.open(`mailto:${contact?.mail}`)} />
                <div className='cursor-pointer' onClick={() => window.open(`${contact?.link_line}`)}>
                  <Line color='#FFFFFF' size={24} />
                </div>
                <div className='cursor-pointer ' onClick={() => window.open(`${contact?.link_facebook}`)}>
                  <Facebook color='#FFFFFF' size={24} />
                </div>
                <InstagramOutlined className="text-2xl cursor-pointer" onClick={() => window.open(`${contact?.link_instagram}`)} />
              </div>
            </div>
          </div>
          <nav className="text-black">
            <ul className="flex gap-4 md:text-sm lg:text-lg font-semibold justify-end w-max place-self-end border-b-3 h-10">
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

      {
        isMobileMenuOpen && (
          <>
            <div className='fixed top-0 left-0 w-full h-full bg-[#333333] z-99 p-4'>
              <X className='text-whit cursor-pointer place-self-end' onClick={() => setIsMobileMenuOpen(false)} />
              <div className='flex flex-col gap-4 my-8'>
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`text-gray-500 text-2xl hover:text-[#8F2F34] px-2 flex justify-center ${path === item.href ? '!text-[#8F2F34]' : ''}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </>
        )
      }

    </div >
  );
}
