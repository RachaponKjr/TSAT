import { PhoneOutlined, FacebookFilled } from '@ant-design/icons';
import { FaLine } from 'react-icons/fa'; // ใช้ react-icons สำหรับโลโก้ Line
import React from 'react';

const mockContacts = [
  {
    label: 'โทรศัพท์',
    value: '02-069-9966',
    icon: <PhoneOutlined style={{ fontSize: '2rem', color: 'black' }} />,
  },
  {
    label: 'LINE',
    value: '@topserviceautotechnic',
    icon: <FaLine style={{ fontSize: '2rem', color: 'black' }} />,
  },
  {
    label: 'Facebook',
    value: 'topserviceautotechnic',
    icon: <FacebookFilled style={{ fontSize: '2rem', color: 'black' }} />,
  },
];

export default function ContactSection() {
  return (
    <div className="flex flex-col sm:flex-row md:gap-24 justify-center items-center gap-8">
      {mockContacts.map((contact, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="">{contact.icon}</div>
          <div className="text-lg font-semibold text-[#8F2F34]">
            {contact.value}
          </div>
        </div>
      ))}
    </div>
  );
}
