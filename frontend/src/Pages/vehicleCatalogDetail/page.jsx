
import HeroSectionCatalog from "../../components/vehiclesCatalogComponent/heroSectionCatalog";
import VehicleDetailComponent from "../../components/vehiclesCatalogComponent/vehicleDetailComponent";
import PagesLayout from "../../layout/PagesLayout";

const VehicleCatalogDetail = () => {
  return (
    <PagesLayout miniHome={true}>
      <HeroSectionCatalog />
      <VehicleDetailComponent />
      {/* <CatalogFilterSection />
      <CatalogList /> */}
    </PagesLayout>
  );
};

export default VehicleCatalogDetail;
