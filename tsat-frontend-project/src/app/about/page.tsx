import Navbar from '@/components/navbar';
import React from 'react';
import Footer from '@/components/footer';
import HeaderAboutSection from '@/components/headerAboutSection';
import ArticleSection from '@/components/articleSection';
import ArticleSection2 from '@/components/articleSection2';
import ReviewCustomer from '../services/_components/review-customer';
import BannerBottom from './_components/banner';

export default function page() {
  return (
    <div>
      <Navbar />
      <HeaderAboutSection />
      <ArticleSection />
      <ArticleSection2 />
      <ReviewCustomer bgColor='#F5F5F5' />
      <BannerBottom />
      <Footer />
    </div>
  );
}
