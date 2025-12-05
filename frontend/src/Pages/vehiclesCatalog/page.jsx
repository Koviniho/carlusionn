import CatalogFilterSection from "../../components/vehiclesCatalogComponent/catalogFilterSection";
import CatalogList from "../../components/vehiclesCatalogComponent/catalogList";
import HeroSectionCatalog from "../../components/vehiclesCatalogComponent/heroSectionCatalog";
import PagesLayout from "../../layout/PagesLayout";

const VehiclesCatalog = () => {
  return (
    <PagesLayout miniHome={true}>
      <HeroSectionCatalog />
      <CatalogFilterSection />
      <CatalogList />
    </PagesLayout>
  );
};

export default VehiclesCatalog;
