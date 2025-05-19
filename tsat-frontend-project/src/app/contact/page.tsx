import HeaderContact from '@/components/headerContact';
import MapSection from './_components/map-section';
import api from '@/server/api';
import { CMSContactProps } from '../dashboard/cms/_components/contact-page';

export default async function page() {
  const cmsResponse = await api.cms.getCMSContact();
  const { data: cms } = cmsResponse as { data: CMSContactProps };

  return (
    <div>
      <HeaderContact
        headText={cms?.data?.text_line_1 ?? ''}
        description1={cms?.data?.text_line_2 ?? ''}
        description2={cms?.data?.text_line_3 ?? ''}
      />
      <MapSection />
    </div>
  );
}

