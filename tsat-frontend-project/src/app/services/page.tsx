import Services from '@/components/services';
import ServiceModelSection from '@/components/serviceModelSection';
import HeaderServiceSection from '@/components/headerServiceSection';
import ReviewCustomer from './_components/review-customer';
import api from '@/server/api';
import { CMSServiceProps } from '../dashboard/cms/_components/service-page';

export default async function Page() {
  try {
    const cmsResponse = await api.cms.getCMSService();
    const cms = (cmsResponse as any)?.data?.data as CMSServiceProps | undefined;

    if (!cms) {
      return <div>ไม่สามารถโหลดข้อมูลหน้า Services ได้</div>;
    }

    return (
      <div>
        <HeaderServiceSection
          headText={cms.text_line_1 || ''}
          text_line2={cms.text_line_2 || ''}
          text_line3={cms.text_line_3 || ''}
        />
        <ServiceModelSection headText={cms.text_line_4 || ''} />
        <Services
          headText={cms.text_line_5 || ''}
          description={cms.text_line_6 || ''}
        />
        <ReviewCustomer headText={cms.text_line_7 || ''} />
      </div>
    );
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในหน้า Services:', error);
    return <div>เกิดข้อผิดพลาดในการโหลดข้อมูล Services</div>;
  }
}
