import React from 'react';
import ContactSection from './contactSection';
import CardLocation from './cardLocation';
import { ContactProps } from './navbar';

export default function locationSection({ headText, contact }: { headText: string, contact: ContactProps }) {
  return (
    <div className="bg-white">
      <div className="py-6 md:mt-0 md:space-y-4 flex flex-col gap-4 px-12">
        <div className="text-[clamp(20px,2vw,30px)] font-bold text-center  text-[#8F2F34] container mx-auto" dangerouslySetInnerHTML={{ __html: headText }} />
        <div className='container mx-auto'>
          <ContactSection contact={contact} />
        </div>
        <CardLocation />
      </div>
    </div>
  );
}
