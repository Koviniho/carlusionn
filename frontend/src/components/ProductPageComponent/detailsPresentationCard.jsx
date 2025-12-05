
import MainHeading from "../Heading/mainHeading";
import Images from "../../assets/images";
import Text from "../Heading/text";
import { FaPlay } from "react-icons/fa";
import { useTranslation } from "react-i18next"; // Import useTranslation hook from react-i18next

function DetailsPresentationCard() {
  const { t, i18n } = useTranslation(); // Use i18n to manage language

  return (
    <div className="container mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4">
        <div className="w-full">
          <div className="">
            <MainHeading
              heading={t("product.DetailsPresentationCard.heading")}
              textColor="darkBlue"
              lineHeight="leading-[67px]"
              className="max-sm:text-2xl"
            />
          </div>
          <div className="space-y-4">
            <Text content={t("product.DetailsPresentationCard.contentOne")} className="max-sm:text-sm" />
            <Text content={t("product.DetailsPresentationCard.contentTwo")} className="max-sm:text-sm" />
            <Text content={t("product.DetailsPresentationCard.contentThree")} className="max-sm:text-sm" />
            {/* <Text content={t("product.DetailsPresentationCard.contenFour")} /> */}

          </div>
        </div>

        {/* Video Section */}
        <div className="relative rounded-lg overflow-hidden shadow-lg !w-full h-[620px]">
          <img
            src={Images.videoCar} // Replace this URL with the actual video thumbnail
            alt="Video Thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black gap-3  bg-opacity-40 flex items-center justify-center">
            <button className="bg-white text-gray-800 p-3 rounded-full hover:scale-110 transform transition duration-200 flex items-center justify-center g">
              <FaPlay />
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.752 11.168l-5.197-3.033A1 1 0 008 8.917v6.165a1 1 0 001.555.832l5.197-3.033a1 1 0 000-1.664z"
                />
              </svg> */}
            </button>
            <span className="text-white sm:text-[24px] text-sm">
              {t("product.DetailsPresentationCard.WatchVideo")}{" "}
            </span>
          </div>
        </div>
      </div>
      <div className="px-4 mt-6">
      <Text content={t("product.DetailsPresentationCard.contenFour")} className="max-sm:text-sm" />
      </div>
    </div>
  );
}

export default DetailsPresentationCard;
