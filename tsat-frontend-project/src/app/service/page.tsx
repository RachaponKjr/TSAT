import Navbar from '@/components/navbar';
import CarouselReview from '@/components/carouselReview';
import CarouselModel from '@/components/carouselModel';
import Services from '@/components/services';
import CardSelectProduct from '@/components/cardSelectProduct';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CardImageWithTag from '@/components/cardImageWithTag';
import ContactSection from '@/components/contactSection';
import CardLocation from '@/components/cardLocation';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="relative">
        <div className="relative min-h-screen flex items-center justify-center">
          <div className="absolute top-4 left-1/2 mt-12  transform -translate-x-1/2 text-center">
            <div className="text-[#666666] text-3xl font-bold">
              บริการของเรา
            </div>
            <div className="text-[#8F2F34] mt-12 text-4xl font-bold">
              ขับปอร์เช่ต้องได้สิ่งที่ดีที่สุด เราดูแลให้ครบ
              <div className="text-2xl  text-[#666666] mt-12">
                ศูนย์บริการ ซ่อมบำรุงรักษา รถปอร์เช่ (Porsche)
                ที่ใหญ่เเละทันสมัยที่สุด <br /> การันตีงานซ่อม มากกว่า 1,500 คัน
                ดูแลรถลูกค้า เหมือนรถเราเอง
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-[#8F2F34] text-center mt-12 text-2xl font-bold">
        เลือกดูจากบริการ Model Proche ของท่าน
      </div>
      <div className="text-black mx-auto  grid grid-cols-3">
        <div className="mx-auto">
          <img src="../images/image.png" />
        </div>
        <div className="mx-auto">
          <img src="../images/image.png" />
        </div>
        <div className="mx-auto">
          <img src="../images/image.png" />
        </div>
      </div>
      <div className="text-black mx-auto mt-12  grid grid-cols-3">
        <div className="mx-auto">
          <img src="../images/image.png" />
        </div>
        <div className="mx-auto">
          <img src="../images/image.png" />
        </div>
        <div className="mx-auto">
          <img src="../images/image.png" />
        </div>
      </div>
      <div>
        <Services />
      </div>
      {/* <div>
        <CarouselReview />
      </div> */}
      <div>
        <CarouselModel />
      </div>
    </div>
  );
}
