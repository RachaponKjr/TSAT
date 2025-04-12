import Navbar from '@/components/navbar';
import TabMenu from '@/components/tabMenu';
import ContactSection from '@/components/contactSection';
import CardLocation from '@/components/cardLocation';
import { GoogleMap } from '@react-google-maps/api';
import GoogleMapComponent from '@/components/googleMap';
import Footer from '@/components/footer';
import LocationSection from '@/components/locationSection';
import HeaderContact from '@/components/headerContact';

export default function Products() {
  return (
    <div>
      <Navbar />
      <HeaderContact />
      <LocationSection />
      <TabMenu />
      <img
        src="../images/map.png"
        className="w-1/2 py-6 mx-auto object-cover"
        alt="Description of image"
      />
      <Footer />
    </div>
  );
}
