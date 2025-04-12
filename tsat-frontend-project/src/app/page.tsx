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

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeaderSection />
      <CarouselReview />
      <CarouselModel />
      <Services />
      <CardSelectProduct />
      <ImageInfo />
      <CardImageWithTag />
      <LocationSection />
      <Footer />
    </div>
  );
}
