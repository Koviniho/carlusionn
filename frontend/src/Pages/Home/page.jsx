
import PagesLayout from "../../layout/PagesLayout";
import AboutSection from "../../components/AboutPageComponent/AboutSection";
import CarActionCards from "../../components/CarActionCard";
import WorkSoftWare from "../../components/HomePageComponet/WorkSoftWareSlider/workSoftWareSlider";
import PackageSlider from "../../components/HomePageComponet/PackageSlider";
import HomeHeroSection from "../../components/HomePageComponet/home-hero-section";

function HomePage() {
  return (
    <PagesLayout homePage={true}>
      <HomeHeroSection />
      <WorkSoftWare />
      <PackageSlider />
      <AboutSection />
      <CarActionCards />
    </PagesLayout>
  );
}

export default HomePage;
