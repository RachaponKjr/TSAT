import Navbar from '@/components/navbar';
import React from 'react';
import Footer from '@/components/footer';
import HeaderAboutSection from '@/components/headerAboutSection';
import ArticleSection from '@/components/articleSection';
import ArticleSection2 from '@/components/articleSection2';
import ReviewCustomer from '../services/_components/review-customer';

export default function page() {
  return (
    <div>
      <Navbar />
      <HeaderAboutSection />
      <ArticleSection />
      <ArticleSection2 />
      {/* <ClientsReview /> */}
      <ReviewCustomer bgColor='#F5F5F5'/>
      <Footer />
    </div>
  );
}
