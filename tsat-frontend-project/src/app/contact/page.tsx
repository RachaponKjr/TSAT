import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import HeaderContact from '@/components/headerContact';
import MapSection from './_components/map-section';

export default function page() {
  return (
    <div>
      <Navbar />
      <HeaderContact />
      <MapSection />
      <Footer />
    </div>
  );
}
