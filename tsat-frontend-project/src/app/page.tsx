import Navbar, { ContactProps } from '@/components/navbar';
import CarouselReview from '@/components/carouselReview';
import CarouselModel from '@/components/carouselModel';
import Services from '@/components/services';
import CardSelectProduct from '@/components/cardSelectProduct';

import CardImageWithTag from '@/components/cardImageWithTag';

import HeaderSection from '@/components/headerSection';
import ImageInfo from '@/components/imageInfo';

import LocationSection from '@/components/locationSection';
import Footer from '@/components/footer';
import api from '@/server/api';
import { CarCatogory, CarModel } from '@/types/car-model';
import { CMSHomeProps } from './dashboard/cms/_components/home-page';

export interface CatagoryProduct {
  data: any;
  id: string;
  name: string;
  image: string
  createdAt: string;
  updatedAt: string;
}

export default async function Home() {
  const response = await api.carModel.getCarModel();
  const carModel: CarModel = response as unknown as CarModel;
  const catagoryProduct = await api.product.getCatagoryProduct() as unknown as CatagoryProduct[];
  const workService = await api.workservice.getService();
  const cmsResponse = await api.cms.getCMSHome();
  const contact = await api.content.getContact();
  const { data: cms } = cmsResponse as { data: CMSHomeProps };
  return (
    <div>
      <Navbar />
      <HeaderSection text_line1={cms.data.text_line_1} text_line2={cms.data.text_line_2} />
      <CarouselReview workservice={workService.data as any} headText={cms.data.text_line_3} />
      <CarouselModel carModel={carModel as unknown as CarCatogory} headText={cms.data.text_line_4} description={cms.data.text_line_5} />
      <Services headText={cms.data.text_line_6} description={cms.data.text_line_7} />
      <CardSelectProduct catagoryProduct={catagoryProduct as any} headText={cms.data.text_line_8} />
      <ImageInfo headText={cms.data.text_line_9} description1={cms.data.text_line_10} description2={cms.data.text_line_11} />
      <CardImageWithTag headText={cms.data.text_line_12} />
      <LocationSection contact={contact.data.data[0] as ContactProps} headText={cms.data.text_line_13} />
      <Footer />
    </div>
  );
}
