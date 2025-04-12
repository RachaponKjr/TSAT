import Navbar from '@/components/navbar';
import CarouselModel from '@/components/carouselModel';
import Services from '@/components/services';
import TabMenu from '@/components/tabMenu';
import CardProduct from '@/components/cardProduct';
import Footer from '@/components/footer';

export default function Products() {
  return (
    <div>
      <Navbar />
      <div>
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="text-[#666666] mt-6 text-3xl font-bold">
              ผลิตภัณฑ์ของเรา
            </div>
            <div className="text-[#8F2F34] w-[1440px] mt-12 text-4xl font-bold">
              Porsche ของคุณสมควรได้รับสิ่งที่ดีที่สุด และเราจัดให้ครบ
            </div>
            <div className="text-2xl   text-[#666666] mt-12">
              เราคัดสรรเฉพาะ อะไหล่แท้ และ ของเหลวเกรดพรีเมียม
              ที่ออกแบบมาเพื่อสมรรถนะสูงสุดของ Porsche โดยเฉพาะ <br />
              เราการันตีมาตรฐานระดับศูนย์บริการ เพื่อให้รถของคุณแรงเต็มพิกัด
              พร้อมลุยทุกเส้นทาง
            </div>
          </div>
        </div>
      </div>
      <TabMenu />
      <CardProduct />
      <Footer />
    </div>
  );
}
