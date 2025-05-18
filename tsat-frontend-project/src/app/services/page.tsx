import Navbar from '@/components/navbar';
import Services from '@/components/services';
import Footer from '@/components/footer';
import ServiceModelSection from '@/components/serviceModelSection';
import HeaderServiceSection from '@/components/headerServiceSection';
import ReviewCustomer from './_components/review-customer';
import api from '@/server/api';
import { CMSServiceProps } from '../dashboard/cms/_components/service-page';

export default async function page() {
  const cmsResponse = await api.cms.getCMSService();
  const { data: cms } = cmsResponse as { data: CMSServiceProps };
  return (
    <div>
      <Navbar />
      <HeaderServiceSection headText={cms.data.text_line_1} text_line2={cms.data.text_line_2} text_line3={cms.data.text_line_3} />
      <ServiceModelSection headText={cms.data.text_line_4} />
      <Services headText={cms.data.text_line_5} description={cms.data.text_line_6} />
      {/* <CarouselModel /> */}
      <ReviewCustomer headText={cms.data.text_line_7} />
      <Footer />
    </div>
  );
}
