'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import Line from './icons/line';
import { Mail, MapPin, Phone } from 'lucide-react';
import Facebook from './icons/facebook';
import { InstagramOutlined } from '@ant-design/icons';
import { ContactProps } from './navbar';
import api from '@/server/api';
import { formatPhoneName } from '@/lib/format-phonenumber';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const [contact, setContact] = useState<ContactProps>();
  const router = useRouter();
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
    <footer className="bg-[#8F2F34] text-white py-6 md:py-12 px-6 sm:px-12">
      <div className='container mx-auto flex md:flex-row flex-col justify-between gaap-0'>
        <div className='max-w-[350px] hidden lg:flex flex-col gap-[18px]'>
          <Image src="/images/logo-white.png" alt="" width={350} height={350} />
          <p className='text-white font-bold'>Top Service Auto Technic — อู่ซ่อมบำรุง Porsche ครบวงจร เช็คระยะ ซ่อมเครื่องยนต์ ระบบไฟฟ้า ลงโปรแกรมด้วย Piwis Tester 3 มาตรฐานศูนย์บริการ ปอร์เช่ ทั่วโลก พร้อมอะไหล่แท้และของเหลวสังเคราะห์ เกรดพรีเมียม ดูแลโดยทีมช่างผู้เชี่ยวชาญ</p>
          <span className='text-[#BD676B] text-sm font-bold'>© 2025 Top Service Auto Technic. All rights reserved.</span>
        </div>
        <div className='flex flex-row justify-evenly text-nowrap py-3 md:py-0 border-b border-[#BD676B] md:border-none md:flex-col gap-4 font-bold text-[clamp(12px,2vw,14px)]'>
          <Link href={'/'} className='hidden md:block'>หน้าหลัก</Link>
          <Link href={'/services'}>บริการ</Link>
          <Link href={'/products'}>ผลิตภัณฑ์</Link>
          <Link href={'/customer'}>ลูกค้าของเรา</Link>
          <Link href={'/about'}>เกี่ยวกับเรา</Link>
          <Link href={'/contact'}>ติดต่อเรา</Link>
        </div>
        <div className='flex items-center justify-center md:justify-start md:items-start flex-wrap-reverse md:flex-nowrap md:flex-col gap-4 font-bold text-sm py-3 md:py-0 border-b border-[#BD676B] md:border-none'>
          <div className='flex gap-2'>
            <Phone size={20} color='white' />
            <div className="flex flex-row items-center gap-2">
              <a href={`tel:${contact?.phone}`} className="text-base hover:underline">
                {formatPhoneName(String(contact?.phone))}
              </a>
              <span>/</span>
              <a href={`tel:${contact?.phone2}`} className="text-base hover:underline">
                {formatPhoneName(String(contact?.phone2))}
              </a>
            </div>
          </div>
          <div className='flex gap-2 cursor-pointer' onClick={() => window.open(`${contact?.link_line}`)}>
            <Line size={20} color='white' />
            <span>{contact?.line}</span>
          </div>
          <div className='flex gap-2 cursor-pointer' onClick={() => window.open(`mailto:${contact?.mail}`)}>
            <Mail size={20} />
            <span>{contact?.mail}</span>
          </div>
          <div className='flex gap-2 flex-col md:flex-row items-center cursor-pointer' onClick={() => router.push('/contact')}>
            <MapPin size={20} />
            <span>สาขานิมิตรใหม่ 61 →</span>
          </div>
          <div className='flex flex-col md:flex-row items-center gap-2 cursor-pointer' onClick={() => router.push('/contact')}>
            <MapPin size={20} />
            <span>สาขารัชดาภิเษก 19 →</span>
          </div>
        </div>
        <div className='flex flex-row justify-between md:justify-start md:flex-col gap-4 font-bold text-sm py-3 md:py-0 border-b border-[#BD676B] md:border-none'>
          <div className='flex flex-col md:flex-row items-center gap-2 cursor-pointer' onClick={() => window.open(`${contact?.link_facebook}`)}>
            <Facebook color='white' size={20} />
            <span>{contact?.facebook}</span>
          </div>
          <div className='flex flex-col md:flex-row items-center gap-2 cursor-pointer' onClick={() => window.open(`${contact?.link_instagram}`)}>
            <InstagramOutlined className='text-[20px]' />
            <span>{contact?.instagram}</span>
          </div>
        </div>
        <div className='flex flex-col md:hidden gap-4 text-center py-3'>
          <p className='font-semibold'>Top Service Auto Technic — อู่ซ่อมบำรุง Porsche ครบวงจร เช็คระยะ ซ่อมเครื่องยนต์ ระบบไฟฟ้า ลงโปรแกรมด้วย Piwis Tester 3 มาตรฐานศูนย์บริการ ปอร์เช่ ทั่วโลก พร้อมอะไหล่แท้และของเหลวสังเคราะห์ เกรดพรีเมียม ดูแลโดยทีมช่างผู้เชี่ยวชาญ</p>
          <span className='text-[#BD676B] text-sm font-bold'>© 2025 Top Service Auto Technic. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
