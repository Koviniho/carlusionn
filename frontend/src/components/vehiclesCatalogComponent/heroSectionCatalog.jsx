import { useSelector } from "react-redux";
import MainHeading from "../Heading/mainHeading";
import Text from "../Heading/text";

const HeroSectionCatalog = () => {
  const { data } = useSelector((state) => state?.miniHomePageSlice);
  const webPageDetails = data?.webpage;
  const miniPageLogo = webPageDetails?.allURLs?.find(
    (urlObj) => urlObj.category === "logo"
  );
  const backgroundImage = webPageDetails?.allURLs?.find(
    (urlObj) => urlObj.category === "background-image"
  );

  return (
    <div
      className="h-[600px] flex flex-col justify-center items-center border-b "
      style={{
        backgroundImage: `url(${backgroundImage?.s3Url})`,
        backgroundSize: "cover", // Ensures the entire div is covered without distortion
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Prevents repeating
        //   height:"100vh"
      }}
    >
      <div className="border-b-2 pb-8 mb-4">
        <MainHeading heading={webPageDetails?.siteTitle} textColor="white" />
        <div className="flex justify-center">
          <Text
            textColor="text-white"
            fontWeight="font-medium"
            content={webPageDetails?.tagline}
          />
        </div>
      </div>
      <img
        src={miniPageLogo?.s3Url}
        alt="logo"
        className="mb-8 w-96 h-20 rounded-md object-cover"
      />
    </div>
  );
};

export default HeroSectionCatalog;
