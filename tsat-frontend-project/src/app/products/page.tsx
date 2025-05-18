import Navbar from '@/components/navbar';
import TabMenu from '@/components/tabMenu';
import Footer from '@/components/footer';
import HeaderProductsSection from '@/components/headerProductsSection';
import { Suspense } from 'react';
import api from '@/server/api';
import { CMSProductProps } from '../dashboard/cms/_components/product-page';

export default async function page() {
  const cmsResponse = await api.cms.getCMSProduct();
  const { data: cms } = cmsResponse as { data: CMSProductProps };
  return (
    <div>
      <Navbar />
      <HeaderProductsSection headText={cms.data.text_line_1} description1={cms.data.text_line_2} description2={cms.data.text_line_3} />
      <Suspense fallback={<div>Loading...</div>}>
        <TabMenu />
      </Suspense>
      <Footer />
    </div>
  );
}
