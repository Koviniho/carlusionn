import HeroSectionCatalog from "../../components/vehiclesCatalogComponent/heroSectionCatalog";

import VehicleRequestComponent from "../../components/vehiclesCatalogComponent/vehicleRequestComponent";
import PagesLayout from "../../layout/PagesLayout";

const VehicleRequestPage = () => {
  return (
    <PagesLayout miniHome={true}>
      <HeroSectionCatalog />
      <VehicleRequestComponent />
      {/* <CatalogFilterSection />
      <CatalogList /> */}
    </PagesLayout>
  );
};

export default VehicleRequestPage;
