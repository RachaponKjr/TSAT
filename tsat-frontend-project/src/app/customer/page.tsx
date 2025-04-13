import Navbar from '@/components/navbar';
import React from 'react';
import Footer from '@/components/footer';
import HeaderCustomerSection from '@/components/headerCustomerSection';
import ItemCustomer from './_components/items-customer';
import SwiperClientModel from './_components/swiper-client-model';

export default function customer() {
  return (
    <div>
      <Navbar />
      <HeaderCustomerSection />

      {/* <CarouselClientsModel /> */}
      <div className='py-10 px-10 md:px-24 md:py-16 relative'>
        <SwiperClientModel />
        <div className='absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-[#FFFFFF] to-[#999999] opacity-20' />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 px-4 py-6 lg:px-[100px]'>
        {Array.from({ length: 6 }, (_, index) => (
          <ItemCustomer key={index} />
        ))}
      </div>

      <Footer />
    </div>
  );
}
