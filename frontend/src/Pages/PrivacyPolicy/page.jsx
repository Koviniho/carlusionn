import PagesLayout from "../../layout/PagesLayout";
import HeroSection from "../../components/HeroSection";
import MainHeading from "../../components/Heading/mainHeading";
import Text from "../../components/Heading/text";
import { useTranslation } from "react-i18next"; // Import useTranslation hook from react-i18next

function PrivacyPolicyPage() {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation(); // Use i18n to manage language

  const informationData = t("privacyPolicy.informationData", {
    returnObjects: true,
  });
  const termsOfServicesData = t("privacyPolicy.termsOfServicesData", {
    returnObjects: true,
  });
  return (
    <PagesLayout>
      <HeroSection
        heading={t("privacyPolicy.heading")}
        content={t("privacyPolicy.content")}
      />
      <div className="container mx-auto px-4">
        <div className="mt-10 space-y-4 text-center">
          <MainHeading
            heading={t("privacyPolicy.privacyPolicy.heading")}
            textColor="darkBlue"
          />
        
            <Text content={t("privacyPolicy.privacyPolicy.content")} />
       
        </div>
        <div className="flex items-start justify-center my-10 gap-3">
        
             <h2 className="rounded-full bg-darkBlue text-white h-[40px] min-w-[40px]  flex items-center justify-center text-center">
               1
              </h2>
        <div className="space-y-6 ">
          {informationData.map((item, index) => (
            <div key={index} className="flex items-start gap-5 w-full">
              {/* <h2 className="rounded-full bg-primary text-white h-[45px] min-w-[45px] flex items-center justify-center text-center">
                {item.number}
              </h2> */}
              <div className="flex flex-col">
                {/* <h2 className="text-primary text-[24px] font-medium">
                  {item.title}
                </h2> */}
                <Text content={item.content} />
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="my-10 space-y-4 text-center">
          <MainHeading
            heading={t("privacyPolicy.termsofService.heading")}
            textColor="primary"
          />
          <Text content={t("privacyPolicy.termsofService.content")} />
        </div>
        <div className="flex items-start justify-center my-10 gap-3">
        
        <h2 className="rounded-full bg-darkBlue text-white h-[40px] min-w-[40px]  flex items-center justify-center text-center">
          2
         </h2>
        <div className="space-y-6 ">
          {termsOfServicesData.map((item, index) => (
            <div key={index} className="flex items-start gap-5 w-full">
              {/* <h2 className="rounded-full bg-primary text-white h-[45px] min-w-[45px] flex items-center justify-center text-center">
                {item.number}
              </h2> */}
              <div className="flex flex-col">
                {/* <h2 className="text-primary text-[24px] font-medium">
                  {item.title}
                </h2> */}
                <Text content={item.content} />
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </PagesLayout>
  );
}

export default PrivacyPolicyPage;
