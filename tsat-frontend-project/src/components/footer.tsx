import React from 'react';
import {
  FaPhoneAlt,
  FaLine,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebook,
} from 'react-icons/fa';

export default function Footer() {
  const contactItems2 = [
    {
      icon: <FaFacebook className="text-xl text-white mr-3" />,
      text: 'topserviceautotechnic',
    },
    {
      icon: <FaInstagram className="text-xl text-white mr-3" />,
      text: 'topserviceautotechnic',
    },
  ];

  const contactItems = [
    {
      icon: <FaPhoneAlt className="text-xl text-white mr-3" />,
      text: '02-069-9966 / 089-986-9966',
    },
    {
      icon: <FaLine className="text-xl text-white mr-3" />,
      text: '@topserviceautotechnic',
    },
    {
      icon: <FaEnvelope className="text-xl text-white mr-3" />,
      text: 'customer@topserviceautotechnic.com',
    },
    {
      icon: <FaMapMarkerAlt className="text-xl text-white mr-3" />,
      text: 'สาขานิมิตรใหม่ 61 →',
    },
    {
      icon: <FaMapMarkerAlt className="text-xl text-white mr-3" />,
      text: 'สาขารามอินทรา →',
    },
  ];

  return (
    <footer className="bg-[#8F2F34] text-white py-12 px-6 sm:px-12">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <img
              src="../images/logo-white.png"
              alt="Description of image"
              className="w-1/2 sm:w-1/3 md:w-1/2"
            />
            <ul className="text-md mt-6 space-y-4 max-w-md">
              <li>
                Top Service Auto Technic — อู่ซ่อมบำรุง Porsche ครบวงจร เช็คระยะ
                ซ่อมเครื่องยนต์ ระบบไฟฟ้า ลงโปรแกรมด้วย Piwis Tester 3
                มาตรฐานศูนย์บริการ ปอร์เช่ ทั่วโลก
                พร้อมอะไหล่แท้และของเหลวสังเคราะห์ เกรดพรีเมียม
                ดูแลโดยทีมช่างผู้เชี่ยวชาญ
              </li>
              <li className="font-bold text-white/40 text-sm">
                © 2025 Top Service Auto Technic. All rights reserved.
              </li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-lg mb-2">เมนู</div>
            <ul>
              <li className="py-2 hover:text-[#333333] cursor-pointer">
                หน้าหลัก
              </li>
              <li className="py-2 hover:text-[#333333] cursor-pointer">
                บริการ
              </li>
              <li className="py-2 hover:text-[#333333] cursor-pointer">
                ผลิตภัณฑ์
              </li>
              <li className="py-2 hover:text-[#333333] cursor-pointer">
                ลูกค้าของเรา
              </li>
              <li className="py-2 hover:text-[#333333] cursor-pointer">
                เกี่ยวกับเรา
              </li>
              <li className="py-2 hover:text-[#333333] cursor-pointer">
                ติดต่อเรา
              </li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-lg mb-2">ติดต่อ</div>
            <ul className="space-y-3">
              {contactItems.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center text-white text-base font-semibold hover:text-[#333333] cursor-pointer"
                >
                  {item.icon}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-bold text-lg mb-2">ติดตามเรา</div>
            <ul className="space-y-3">
              {contactItems2.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center text-white text-base font-semibold hover:text-[#333333] cursor-pointer"
                >
                  {item.icon}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
