/* eslint-disable react/prop-types */

import MainHeading from "../Heading/mainHeading";
import Images from "../../assets/images";
import SVGS from "../../assets/svg";
import { Link, useLocation, useParams } from "react-router-dom";
// import { IoMdArrowDropleft } from "react-icons/io";
import { FaPlay } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMiniHomePage } from "../../store/features/miniHomePageSlice/miniHomePageSlice";

// Arrays for images and links
const partnerImages = [
  Images.jaguarLogo,
  Images.lamborghiniLogo,
  Images.mercedesLogo,
  Images.porscheLogo,
  Images.audiLogo,
  Images.bmwLogo,
];

const Footer = ({ miniHome }) => {
  const { t } = useTranslation();
  const footerLinks = [
    { label: t("nav.aboutUs"), path: "/about-us" },
    { label: t("nav.product"), path: "/product" },
    { label: t("nav.pricing"), path: "/pricing" },
    { label: t("nav.reviews"), path: "/reviews" },
    { label: t("nav.news"), path: "/tips-news" },
  ];

  //////////get webpage ///////////////////////
  const { webpageId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const { vehicleId } = location.state || {}; 
  useEffect(() => {
    if(!vehicleId){

      dispatch(fetchMiniHomePage({ webpageId }));
    }
  }, [dispatch, vehicleId, webpageId]);
  const { data } = useSelector((state) => state?.miniHomePageSlice);
  const webPageDetails = data?.webpage;
  const socialMediaLogos = [
    {
      src: Images.facebookLogo,
      alt: "Facebook logo",
      link: webPageDetails?.socialInformation?.facebookUrl,
    },
    {
      src: Images.instagramLogo,
      alt: "Instagram logo",
      link: webPageDetails?.socialInformation?.instagramUrl,
    },
    {
      src: Images.twitterLogo,
      alt: "Twitter logo",
      link: webPageDetails?.socialInformation?.twitterUrl,
    },
    {
      src: Images.googleLogo,
      alt: "Google logo",
      link: webPageDetails?.socialInformation?.googleUrl,
    },
    {
      src: Images.youtubeLogo,
      alt: "YouTube logo",
      link: webPageDetails?.socialInformation?.youtubeUrl,
    },
  ];

  return (
    <div className="bg-[#19DB8C08]">
      {miniHome ? null : (
        <div>
          <div className="flex items-center justify-center">
            <MainHeading
              heading={t("homePage.footer.ourPARTNERS")}
              textColor=""
              className="max-sm:text-2xl"
            />
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-between container mx-auto py-10 pb-16 gap-4 md:gap-0 px-4">
            {partnerImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Partner ${index + 1}`}
                className="h-8 md:h-10 lg:h-12"
              />
            ))}
          </div>
        </div>
      )}
      <div className="py-4 bg-[#313131] px-4">
        <div className="flex flex-col md:flex-row items-center justify-between container mx-auto gap-6 md:gap-0 ">
          <img src={SVGS.footerLogoSvg} alt="logo" className="h-8 md:h-10" />
          <p className="text-grayText text-sm font-normal text-center md:text-left mt-1 ">
            Copyright © 2025 <span className="text-white">Carlusion</span> All
            rights reserved
          </p>
          <div className="flex justify-center md:justify-start items-center gap-3">
            {socialMediaLogos.map((logo, index) => (
              <a
                key={index}
                href={logo.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={logo.src} alt={logo.alt} className="h-5 md:h-6 object-cover" />
              </a>
            ))}
          </div>
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-3 md:gap-5">
            {footerLinks.map((link, index) => (
              <Link
                key={index}
                className="flex items-center gap-2  text-white font-medium"
                to={link.path}
              >
                {/* <IoMdArrowDropleft /> */}
                <FaPlay className="rotate-180" size={6} />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
