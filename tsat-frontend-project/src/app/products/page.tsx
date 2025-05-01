import Navbar from '@/components/navbar';
import TabMenu from '@/components/tabMenu';
import Footer from '@/components/footer';
import HeaderProductsSection from '@/components/headerProductsSection';
import { Suspense } from 'react';

export default function page() {
  return (
    <div>
      <Navbar />
      <HeaderProductsSection />
      <Suspense fallback={<div>Loading...</div>}>
        <TabMenu />
      </Suspense>
      <Footer />
    </div>
  );
}
