import { ContactProps } from '@/components/navbar';
import CarouselReview from '@/components/carouselReview';
import CarouselModel from '@/components/carouselModel';
import Services from '@/components/services';
import CardSelectProduct from '@/components/cardSelectProduct';

import CardImageWithTag from '@/components/cardImageWithTag';

import HeaderSection from '@/components/headerSection';
import ImageInfo from '@/components/imageInfo';

import LocationSection from '@/components/locationSection';
import api from '@/server/api';
import { CarCatogory, CarModel } from '@/types/car-model';
import { CMSHomeProps } from './dashboard/cms/_components/home-page';
import { Work } from '@/types/customer-work';

export interface CatagoryProduct {
  data: any;
  id: string;
  name: string;
  image: string
  createdAt: string;
  updatedAt: string;
}

export default async function Home() {
  try {
    const response = await api.carModel.getCarModel();
    const carModel: CarModel = response as unknown as CarModel;

    const catagoryProduct = await api.product.getCatagoryProduct() as unknown as CatagoryProduct[];
    const cmsResponse = await api.cms.getCMSHome();
    const contact = await api.content.getContact();

    const cmsData = (cmsResponse as any)?.data?.data;
    const contactData = (contact as any)?.data?.data?.[0];
    const { data: customerWork } = await api.customerWork.getCustomerWork() as { data: { works: Work[] } };

    // ถ้าไม่มี CMS ข้อมูล ให้ return null หรือ UI แจ้งเตือน
    if (!cmsData) {
      return <div>ไม่สามารถโหลดข้อมูลหน้าแรกได้</div>;
    }

    return (
      <div>
        <HeaderSection
          text_line1={cmsData.text_line_1 || ''}
          text_line2={cmsData.text_line_2 || ''}
        />
        <CarouselReview
          workservice={customerWork.works || []}
          headText={cmsData.text_line_3 || ''}
        />
        <CarouselModel
          carModel={carModel as unknown as CarCatogory}
          headText={cmsData.text_line_4 || ''}
          description={cmsData.text_line_5 || ''}
        />
        <Services
          headText={cmsData.text_line_6 || ''}
          description={cmsData.text_line_7 || ''}
        />
        <CardSelectProduct
          catagoryProduct={catagoryProduct || []}
          headText={cmsData.text_line_8 || ''}
        />
        <ImageInfo
          headText={cmsData.text_line_9 || ''}
          description1={cmsData.text_line_10 || ''}
          description2={cmsData.text_line_11 || ''}
        />
        <CardImageWithTag headText={cmsData.text_line_12 || ''} />
        {contactData && (
          <LocationSection
            contact={contactData as ContactProps}
            headText={cmsData.text_line_13 || ''}
          />
        )}
      </div>
    );
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในหน้า Home:', error);
    return <div>เกิดข้อผิดพลาดในการโหลดข้อมูลหน้าแรก</div>;
  }
}

