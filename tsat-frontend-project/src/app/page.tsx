import Navbar from '@/components/navbar';
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

  console.log(catagoryProduct, 'catagoryProduct');
  return (
    <div>
      <Navbar />
      <HeaderSection />
      <CarouselReview workservice={workService.data as any} />
      <CarouselModel carModel={carModel as unknown as CarCatogory} />
      <Services />
      <CardSelectProduct catagoryProduct={catagoryProduct as any} />
      <ImageInfo />
      <CardImageWithTag />
      <LocationSection />
      <Footer />
    </div>
  );
}
