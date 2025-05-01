import Navbar from '@/components/navbar';
import Services from '@/components/services';
import Footer from '@/components/footer';
import ServiceModelSection from '@/components/serviceModelSection';
import HeaderServiceSection from '@/components/headerServiceSection';
import ReviewCustomer from './_components/review-customer';

export default function page() {
  return (
    <div>
      <Navbar />
      <HeaderServiceSection />
      <ServiceModelSection />
      <Services />
      {/* <CarouselModel /> */}
      <ReviewCustomer />
      <Footer />
    </div>
  );
}
