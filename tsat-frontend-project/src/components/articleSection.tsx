import React from 'react';

export default function ArticleSection() {
  return (
    <div className="flex flex-col md:flex-row justify-between px-6 md:px-48 py-12 gap-8">
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

      <div className="w-full md:w-1/2 flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="flex justify-center">
          <img
            src="../images/about-pro.png"
            className="object-contain w-3/4 md:w-auto"
            alt="about image"
          />
        </div>
        <div className="flex justify-center md:mt-24">
          <img
            src="../images/about-pro.png"
            className="object-contain w-3/4 md:w-auto"
            alt="about image"
          />
        </div>
      </div>
    </div>
  );
}
