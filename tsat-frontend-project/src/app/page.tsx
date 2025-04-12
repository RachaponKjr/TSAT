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
import HeaderSection from '@/components/headerSection';
import ImageInfo from '@/components/imageInfo';

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeaderSection />
      <CarouselReview />
      <CarouselModel />
      <Services />
      <CardSelectProduct />
      <ImageInfo />

      <CardImageWithTag />

      <div className="bg-white">
        <div className="px-24 py-24 ">
          <div className="text-2xl mb-12 text-center  text-[#8F2F34] ">
            นัดหมายหรือเลือกเข้าใช้บริการบำรุงรักษารถของท่าน
          </div>
          <div>
            <div className="grid grid-cols-3 px-72 gap-6">
              <ContactSection />
              <ContactSection />
              <ContactSection />
            </div>
          </div>
          <div className="grid grid-cols-2 px-20 gap-4">
            <CardLocation />
            <CardLocation />
          </div>
        </div>
      </div>
    </div>
  );
}
