import React from 'react';

import mainPic from '@/assets/images/main-pic.png';

export default function headerSection({ text_line1, text_line2 }: { text_line1: string, text_line2: string }) {
  return (
    // <div className="relative h-[600px] md:h-[927px]"
    <div className="relative h-[500px] md:h-[727px] bg-bottom"
      style={{
        backgroundImage: `url(${mainPic.src})`,
        backgroundSize: 'cover',
        // backgroundPosition: 'center',
      }}
    >
      <div className="w-full  flex flex-col md:relative md:h-max container mx-auto">
        {/* ข้อความ */}
        <div className="px-4 text-center flex flex-col gap-5 pt-5 w-max max-w-full text-white md:absolute md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 md:z-20 order-1">
          <h2 className="text-[#333333] text-3xl md:text-[clamp(36px,6vw,42px)] font-semibold text-shadow-[1.4px_2.79px_2.79px_rgba(0,0,0,1)]" dangerouslySetInnerHTML={{ __html: text_line1 }} />
          <p className="text-lg md:text-[clamp(24px,2vw,35px)] text-shadow-[1.4px_2.79px_2.79px_rgba(0,0,0,1)]" dangerouslySetInnerHTML={{ __html: text_line2 }} />
        </div>
      </div>
    </div>
  );
}
