import Navbar from '@/components/navbar';
import CarouselModel from '@/components/carouselModel';
import Services from '@/components/services';
import Footer from '@/components/footer';
import ServiceModelSection from '@/components/serviceModelSection';
import HeaderServiceSection from '@/components/headerServiceSection';

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeaderServiceSection />
      <ServiceModelSection />
      <Services />
      <CarouselModel />
      <Footer />
    </div>
  );
}
