import Navbar from '@/components/navbar';
import CarouselModel from '@/components/carouselModel';
import Services from '@/components/services';
import TabMenu from '@/components/tabMenu';
import CardProduct from '@/components/cardProduct';
import Footer from '@/components/footer';
import HeaderProductsSection from '@/components/headerProductsSection';

export default function Products() {
  return (
    <div>
      <Navbar />
      <HeaderProductsSection />
      <TabMenu />
      <CardProduct />
      <Footer />
    </div>
  );
}
