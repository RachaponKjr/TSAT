import Navbar from '@/components/navbar';
import React from 'react';
import Footer from '@/components/footer';
import HeaderAboutSection from '@/components/headerAboutSection';
import ArticleSection from '@/components/articleSection';
import ArticleSection2 from '@/components/articleSection2';
import ClientsReview from '@/components/clientsReview';

export default function page() {
  return (
    <div>
      <Navbar />
      <HeaderAboutSection />
      <ArticleSection />
      <ArticleSection2 />
      <ClientsReview />
      <Footer />
    </div>
  );
}
