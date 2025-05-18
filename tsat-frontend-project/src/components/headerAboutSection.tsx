import React from 'react';
import about from '@/assets/images/about-desktop.png'
export default function headerAboutSection({ headText, description1, description2 }: { headText: string, description1: string, description2: string }) {
  return (
    <div className="relative">
      <div className="relative min-h-[35rem] md:min-h-[50rem] flex justify-cente text-center py-6"
        style={{ backgroundImage: `url(${about.src})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}
      >
        <div className="text-center flex px-4 flex-col gap-6 container mx-auto">
          <div className="text-[#666666] text-xl md:text-[clamp(20px,2vw,30px)] font-bold">
            <span dangerouslySetInnerHTML={{ __html: headText }} />
          </div>
          <div className='space-y-4'>
            <div
              style={{ textShadow: '2px 2px 4px rgba(35, 11, 11, 0.25)' }}
              className="text-2xl md:text-[42px] text-[#8F2F34] font-bold"
            >
              <span dangerouslySetInnerHTML={{ __html: description1 }} />
            </div>
            <div className="text-base md:text-2xl text-[#333333] font-bold">
              <p dangerouslySetInnerHTML={{ __html: description2 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
