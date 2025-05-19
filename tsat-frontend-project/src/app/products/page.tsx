import TabMenu from '@/components/tabMenu';
import HeaderProductsSection from '@/components/headerProductsSection';
import { Suspense } from 'react';
import api from '@/server/api';
import { CMSProductProps } from '../dashboard/cms/_components/product-page';

export default async function Page() {
  try {
    const cmsResponse = await api.cms.getCMSProduct();
    const cms = (cmsResponse as any)?.data?.data as CMSProductProps | undefined;

    if (!cms) {
      return <div>ไม่สามารถโหลดข้อมูลหน้า Products ได้</div>;
    }

    return (
      <div>
        <HeaderProductsSection
          headText={cms.text_line_1 || ''}
          description1={cms.text_line_2 || ''}
          description2={cms.text_line_3 || ''}
        />
        <Suspense fallback={<div>Loading...</div>}>
          <TabMenu />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในหน้า Products:', error);
    return <div>เกิดข้อผิดพลาดในการโหลดข้อมูลหน้า Products</div>;
  }
}
