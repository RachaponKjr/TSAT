import React from 'react';
import { Phone } from './icons/phone';
import Line from './icons/line';
import Facebook from './icons/facebook';
import { ContactProps } from './navbar';
import { formatPhoneName } from '@/lib/format-phonenumber';

export default function ContactSection({ contact }: { contact: ContactProps }) {
  const mockContacts = [
    {
      label: 'โทรศัพท์',
      value: formatPhoneName(contact.phone),
      icon: <Phone />,
    },
    {
      label: 'LINE',
      value: contact.line,
      icon: <Line />,
    },
    {
      label: 'Facebook',
      value: contact.facebook,
      icon: <Facebook />,
    },
  ];
  return (
    <div className="flex flex-col sm:flex-row md:gap-24 justify-center items-center gap-8">
      {mockContacts.map((contact, index) => (
        <div key={index} className="flex flex-col gap-2 items-center">
          <div className="">{contact.icon}</div>
          <div className="text-sm md:text-[clamp(16px,1.5vw,24px)] font-semibold text-[#8F2F34]">
            {contact.value}
          </div>
        </div>
      ))}
    </div>
  );
}
