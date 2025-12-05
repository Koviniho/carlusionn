/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Text from "../Heading/text";
import { MdOutlinePhone } from "react-icons/md";
import { LuMail } from "react-icons/lu";
// import { IoLogoInstagram } from "react-icons/io";
// import { LiaFacebookSquare } from "react-icons/lia";
// import { TiSocialTwitter } from "react-icons/ti";
// import { TbBrandLinkedin } from "react-icons/tb";
import Images from "../../assets/images";
import Icons from "../../assets/icons";
import SelectField from "../selectField/selectField";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMiniHomePage } from "../../store/features/miniHomePageSlice/miniHomePageSlice";

function Header({ homePage, miniHome }) {
  const socialMediaLogos = [
    { src: Images.facebookLogo, alt: "Facebook logo" },
    { src: Images.instagramLogo, alt: "Instagram logo" },
    { src: Images.twitterLogo, alt: "Twitter logo" },
    { src: Images.googleLogo, alt: "Google logo" },
    { src: Images.youtubeLogo, alt: "YouTube logo" },
  ];
  const socialMediaLinks = [
    {
      icon: (
        <Icons.FaInstagram color={homePage ? "darkBlue" : "white"} size={20} />
      ),
      link: "https://www.instagram.com",
    },
    {
      icon: (
        <Icons.FaFacebookSquare
          color={homePage ? "darkBlue" : "white"}
          size={20}
        />
      ),
      link: "https://www.facebook.com",
    },
    {
      icon: (
        <Icons.FaTwitter color={homePage ? "darkBlue" : "white"} size={20} />
      ),
      link: "https://www.twitter.com",
    },
    {
      icon: (
        <Icons.FaLinkedin color={homePage ? "darkBlue" : "white"} size={20} />
      ),
      link: "https://www.linkedin.com",
    },
  ];

  /////////////////////////for languages /////////////////////////////
  const [isOpen, setIsOpen] = useState(false); // State to toggle dropdown visibility
  const { t, i18n } = useTranslation();

  const getDefaultLanguage = () => {
    const storedLanguage = localStorage.getItem("preferredLanguage");
    if (storedLanguage) {
      return storedLanguage; // Return the stored language if it exists
    }

    // Fallback to German (de) if no language is stored
    return "de";
  };

  // Set the default language when component mounts
  const defaultLanguage = getDefaultLanguage();
  useEffect(() => {
    i18n.changeLanguage(defaultLanguage); // Change the language in i18next
    localStorage.setItem("preferredLanguage", defaultLanguage); // Store the preferred language in localStorage
  }, []);

  // Handle language change
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language); // Change language in i18next
    localStorage.setItem("preferredLanguage", language); // Store the preferred language in localStorage
    setIsOpen(false); // Close the dropdown after language change
  };

  const languages = [
    { id: 1, name: "English", value: "en", flag: Images.ukFlag }, // U.S. flag as emoji
    { id: 2, name: "Italian", value: "it", flag: Images.italyFlag }, // Spain flag
    { id: 3, name: "French", value: "fr", flag: Images.franceFlag }, // France flag
    { id: 4, name: "German", value: "de", flag: Images.germanFlag }, // Germany flag
  ];

  //////////get webpage ///////////////////////
  const location = useLocation();
  const { vehicleId } = location.state || {};
  const { webpageId } = useParams();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if(!vehicleId){

  //     dispatch(fetchMiniHomePage({ webpageId }));
  //   }
  // }, [dispatch, vehicleId, webpageId]);
  const { data } = useSelector((state) => state?.miniHomePageSlice);
  const webPageDetails = data?.webpage;
  return (
    <div
      className={` ${
        homePage ? "bg-inherit text-darkBlue" : "bg-darkBlue"
      }  py-5 ${miniHome ? "" : "border-b"} lg:block hidden`}
    >
      <div className="xl:container lg:px-5 xl:px-10 xl:mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Contact Info Section */}
        <div className="flex items-center gap-7 mb-2 md:mb-0">
          <Text
            icon={<MdOutlinePhone />}
            textColor={homePage ? "text-darkBlue" : "text-white"}
            content={webPageDetails?.contactInformation?.phoneNumber}
          />
          <Text
            icon={<LuMail />}
            textColor={homePage ? "text-darkBlue" : "text-white"}
            content={webPageDetails?.contactInformation?.email}
          />
        </div>
        {/* Social Icons Section */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3 ">
            {socialMediaLinks.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Link to ${item.link}`}
              >
                {item.icon}
              </a>
            ))}
          </div>
          <SelectField
            languages={languages}
            defaultLanguage={defaultLanguage}
            handleLanguageChange={handleLanguageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
