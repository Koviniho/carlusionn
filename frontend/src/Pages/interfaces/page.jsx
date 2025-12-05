
import Breadcrumb from "../../components/Breadcrumb";
import MainHeading from "../../components/Heading/mainHeading";
import InterfaceHome from "../../components/InterFacesComponent/interfaceHome";

const Interfaces = () => {
  return (
    <>
      <Breadcrumb heading="Hallo, Willkommen Silas Rotzetter! 👋" />
      <MainHeading
        className="font-poppins"
        textColor="black"
        textSize="text-[24px]"
        fontWeight="font-medium"
        heading="Interfaces"
      />

      <div className="py-5">
        <InterfaceHome />
      </div>
    </>
  );
};

export default Interfaces;
