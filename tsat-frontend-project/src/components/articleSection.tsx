import React from 'react';

import abotpro from '@/assets/images/about-pro.png'
import Image from 'next/image';

export default function ArticleSection() {
  return (
    <div className="flex flex-col md:flex-row justify-between px-6 xl:px-48 py-12 gap-8 container mx-auto">
      <div className="w-full md:w-1/2">
        <div className="text-[#8F2F34] text-2xl md:text-3xl font-bold">
          จากผู้ใช้รถ...สู่การสร้างทีมช่างผู้เชี่ยวชาญ
        </div>
        <div className="text-base md:text-2xl text-[#666666] mt-4">
          เราเริ่มต้นจากความรักและความเข้าใจในรถสมรรถนะสูง
          จากมุมมองของผู้ใช้รถตัวจริง สู่การก่อตั้ง Top Service Auto Technic
          (TSAT) ทีมช่างผู้เชี่ยวชาญที่พร้อมดูแลรถของคุณ ด้วยมาตรฐานระดับโลก
          เพื่อให้ทุกการขับขี่เต็มสมรรถนะ และมั่นใจได้ในทุกเส้นทาง
        </div>
        <div className="text-base md:text-2xl text-[#666666] mt-4">
          เราใส่ใจใน ความโปร่งใสทุกขั้นตอน พร้อมให้ข้อมูลที่ถูกต้อง
          และตรงไปตรงมาศูนย์บริการของเราเพียบพร้อมด้วย อุปกรณ์ทันสมัย และ
          มาตรฐานระดับสากล พร้อมผู้ชำนาญการซ่อมและดูแลรถสมรรถนะสูงโดยตรง
          เพื่อให้คุณมั่นใจว่า รถคันโปรดจะได้รับการดูแลอย่างดีที่สุด
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-row items-center justify-center gap-4">
        <Image src={abotpro} alt="about image" width={250} height={250}/>
        <Image src={abotpro} alt="about image" width={250} height={250} className='relative top-14'/>
      </div>
    </div>
  );
}
