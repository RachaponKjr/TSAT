import Navbar from '@/components/navbar';
import CardImageWithTag from '@/components/cardImageWithTag';
import React from 'react';
import { Button, Carousel } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Footer from '@/components/footer';
import HeaderCustomerSection from '@/components/headerCustomerSection';
import CarouselModel from '@/components/carouselModel';
import CarouselClientsModel from '@/components/carouselClientsModel';

export default function customer() {
  return (
    <div>
      <Navbar />
      <HeaderCustomerSection />

      <CarouselClientsModel />

      <CardImageWithTag />

      <Footer />
    </div>
  );
}
