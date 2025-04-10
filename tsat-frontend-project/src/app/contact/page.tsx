import Navbar from '@/components/navbar';
import TabMenu from '@/components/tabMenu';
import ContactSection from '@/components/contactSection';
import CardLocation from '@/components/cardLocation';
import { GoogleMap } from '@react-google-maps/api';
import GoogleMapComponent from '@/components/googleMap';

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

            <div className="text-2xl font-bold   text-[#666666] mt-12">
              ศูนย์บริการ Top Service Auto Technic หรือ TSAT เปิดให้บริการทั้ง 2
              สาขา <br /> สาขานิมิตรใหม่ 61 และ สาขารัชดาภิเษก 19
            </div>
          </div>
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
      <TabMenu />
      <img
        src="../images/map.png"
        className="w-1/2 mt-12 mx-auto object-cover"
        alt="Description of image"
      />
      <GoogleMapComponent />
    </div>
  );
}
