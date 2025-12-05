import PagesLayout from "../../layout/PagesLayout";

import MainHeading from "../../components/Heading/mainHeading";
import Text from "../../components/Heading/text";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CheckLoader from "../../components/Loading/carLoader";
const MiniHomePage = () => {
  const navigate = useNavigate();
  const { webpageId } = useParams();
  const { data, loading } = useSelector((state) => state?.miniHomePageSlice);
  console.log("🚀 ~ MiniHomePage ~ loading:", loading);
  const webPageDetails = data?.webpage;
  const miniPageLogo = webPageDetails?.allURLs?.find(
    (urlObj) => urlObj.category === "logo"
  );
  const backgroundImage = webPageDetails?.allURLs?.find(
    (urlObj) => urlObj.category === "background-image"
  );

  const handleNavigate = () => {
    navigate(`/vehicle-list/${webpageId}`);
  };

  return (
    <PagesLayout miniHome={true}>
      {loading ? (
        <CheckLoader size={80} opacity={false} />
      ) : (
        <div
          className="h-screen flex flex-col justify-center items-center  bg-black bg-opacity-30"
          style={{
            backgroundImage: `url(${backgroundImage?.s3Url})`,
            backgroundSize: "cover", // Ensures the entire div is covered without distortion
            backgroundPosition: "center", // Centers the image
            backgroundRepeat: "no-repeat", // Prevents repeating
            //   height:"100vh"
          }}
        >
          <div className="border-b-2 pb-8 mb-4 flex flex-col  items-center " >
            <MainHeading
              heading={webPageDetails?.siteTitle}
              textColor="white"
            />
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
          <Button
            onClick={handleNavigate}
            text={"Get Started"}
            bgColor="white"
            textColor="darkBlue"
          />
        </div>
      )}
    </PagesLayout>

    //     <PagesLayout miniHome={true}>
    //   <div
    //     className="h-full flex flex-col justify-center items-center"
    //     style={{
    //       backgroundImage: `url(${backgroundImage.s3Url})`,
    //       backgroundSize: "cover",
    //       backgroundPosition: "center",
    //       backgroundRepeat: "no-repeat",
    //     }}
    //   >
    //     <div className="border-b-2 pb-6 mb-4">
    //       <MainHeading
    //         heading={webPageDetails.siteTitle}
    //         textColor="white"
    //       />
    //       <div className="flex justify-center">
    //         <Text
    //           textColor="text-white"
    //           fontWeight="font-medium"
    //           content={webPageDetails.tagline}
    //         />
    //       </div>
    //     </div>
    //     <img
    //       src={miniPageLogo.s3Url}
    //       alt="logo"
    //       className="mb-6 w-64 h-16 rounded-md object-cover"
    //     />
    //     <Button
    //       onClick={handleNavigate}
    //       text="Get Started"
    //       bgColor="white"
    //       textColor="darkBlue"
    //     />
    //   </div>
    // </PagesLayout>
  );
};

export default MiniHomePage;
