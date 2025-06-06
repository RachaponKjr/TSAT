import React from 'react';

export default function headerCustomerSection({ headText, description1, description2 }: { headText: string, description1: string, description2: string }) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-center">
        <div className=" flex flex-col gap-4 px-4 text-center justify-center ">
          <div className="text-[#666666] text-xl md:text-[clamp(24px,2vw,30px)] font-bold mb-2">
            <span dangerouslySetInnerHTML={{ __html: headText }} />
          </div>
          <div
            style={{ textShadow: '2px 2px 4px rgba(35, 11, 11, 0.25)' }}
            className="text-2xl md:text-[clamp(30px,3vw,42px)] text-[#8F2F34] font-bold"
          >
            <span dangerouslySetInnerHTML={{ __html: description1 }} />
          </div>
          <div className="text-base md:text-[clamp(18px,2vw,24px)] max-w-4xl text-center text-[#333333] break-words font-bold leading-relaxed">
            <p dangerouslySetInnerHTML={{ __html: description2 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
