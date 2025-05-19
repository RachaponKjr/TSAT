import React from 'react';
import HeaderAboutSection from '@/components/headerAboutSection';
import ArticleSection from '@/components/articleSection';
import ArticleSection2 from '@/components/articleSection2';
import ReviewCustomer from '../services/_components/review-customer';
import BannerBottom from './_components/banner';
import api from '@/server/api';
import { CMSAboutProps } from '../dashboard/cms/_components/about-page';

export default async function page() {
  const cmsResponse = await api.cms.getCMSAbout();
  const { data: cms } = cmsResponse as { data: CMSAboutProps };

  return (
    <div>
      <HeaderAboutSection
        headText={cms?.data?.text_line_1 ?? ''}
        description1={cms?.data?.text_line_2 ?? ''}
        description2={cms?.data?.text_line_3 ?? ''}
      />
      <ArticleSection />
      <ArticleSection2 />
      <ReviewCustomer
        headText={cms?.data?.text_line_2 ?? ''}
        bgColor='#F5F5F5'
      />
      <BannerBottom />
    </div>
  );
}
