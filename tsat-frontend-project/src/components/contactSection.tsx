import { PhoneOutlined, FacebookFilled } from '@ant-design/icons';
import { FaLine } from 'react-icons/fa'; // ใช้ react-icons สำหรับโลโก้ Line
import React from 'react';

const mockContacts = [
  {
    label: 'โทรศัพท์',
    value: '02-069-9966',
    icon: <PhoneOutlined style={{ fontSize: '4rem', color: 'black' }} />,
  },
  {
    label: 'LINE',
    value: '@tsatservice',
    icon: <FaLine style={{ fontSize: '4rem', color: 'black' }} />,
  },
  {
    label: 'Facebook',
    value: 'TSAT Service',
    icon: <FacebookFilled style={{ fontSize: '4rem', color: 'black' }} />,
  },
];

export default function ContactSection() {
  return (
    <div className="flex flex-col sm:flex-row md:gap-72 justify-center items-center gap-8">
      {mockContacts.map((contact, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="mb-2">{contact.icon}</div>
          <div className="text-md text-gray-700">{contact.label}</div>
          <div className="text-lg font-semibold text-[#8F2F34]">
            {contact.value}
          </div>
        </div>
      ))}
    </div>
  );
}
