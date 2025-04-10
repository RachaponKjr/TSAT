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
          <img
            src="../images/main-pic.png"
            className="w-full object-cover h-1/3"
            alt="Description of image"
          />
          <div className="absolute top-4 left-1/2  mt-24 transform -translate-x-1/2 text-center">
            <div className="text-black text-5xl font-bold">
              Top Service Auto Technic (TSAT)
              <div className="text-3xl text-white mt-12">
                ศูนย์บริการ ซ่อมบำรุงรักษา รถปอร์เช่ (Porsche)
                ที่ใหญ่เเละทันสมัยที่สุด <br /> การันตีงานซ่อม มากกว่า 1,500 คัน
                ดูแลรถลูกค้า เหมือนรถเราเอง
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <CarouselReview />
      </div>
      <div>
        <CarouselModel />
      </div>
      <div>
        <Services />
      </div>
      <div className="bg-white py-24">
        <div className="px-24">
          <div className="text-2xl mb-12 text-center  text-[#8F2F34] ">
            เลือกดูผลิตภัณฑ์
          </div>
          <div className="grid grid-cols-5 gap-6">
            <CardSelectProduct />
            <CardSelectProduct />
            <CardSelectProduct />
            <CardSelectProduct />
            <CardSelectProduct />
          </div>
        </div>
      </div>
      <div className="relative  min-h-screen flex items-center justify-center">
        <img
          src="../images/main-pic.png"
          className="w-full object-cover h-1/3"
          alt="Description of image"
        />
      </div>
      <div className="bg-[#F5F5F5] py-24 ">
        <div className=" flex justify-between px-24  items-center mb-12">
          <div className="text-2xl font-bold text-[#8F2F34] ">
            เลือกดูบริการจาก Model Porsche ของท่าน
          </div>

          <Button
            style={{
              border: '1px solid #8F2F34',
              backgroundColor: 'transparent',
              color: '#8F2F34',
              fontSize: '1.25rem',
              padding: '1.5rem 6rem',
            }}
            className="hover:bg-white hover:text-black transition-all duration-300"
          >
            ดูทั้งหมด <PlusOutlined />
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-6 px-24">
          <CardImageWithTag />
          <CardImageWithTag />
          <CardImageWithTag />
          <CardImageWithTag />
          <CardImageWithTag />
          <CardImageWithTag />
        </div>
      </div>
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
