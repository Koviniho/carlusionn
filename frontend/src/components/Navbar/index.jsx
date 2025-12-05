/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import SVGS from "../../assets/svg/index";
import PATHS from "../../routes/path";
import useUserInfo from "../../hooks/useUserInfo";
import { FaAngleDown } from "react-icons/fa";
import { useTranslation } from "react-i18next"; // Import useTranslation hook from react-i18next
import Images from "../../assets/images";
import SelectField from "../selectField/selectField";
import Icons from "../../assets/icons";
import Text from "../Heading/text";

function Navbar({ homePage }) {
  const location = useLocation();
  console.log("🚀 ~ Navbar ~ location:", location);
  const { t, i18n } = useTranslation(); // Use i18n to manage language
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { username } = useUserInfo();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const navItems = [
    { path: "/", label: t("nav.home") },
    { path: "/about-us", label: t("nav.aboutUs") },
    { path: "/product", label: t("nav.product") },
    { path: "/pricing", label: t("nav.pricing") },
    { path: "/reviews", label: t("nav.reviews") },
    {
      label: t("nav.more"),
      path: "",
      icon: <FaAngleDown size={14} />,
      children: [
        { path: "/tips-news", label: t("nav.tipsNews") },
        { path: "/privacy-policy", label: t("nav.privacyPolicy") },
      ],
    },
  ];
  // Handle language change
  const [isOpen, setIsOpen] = useState(false); // State to toggle dropdown visibility

  const [openDropdown, setOpenDropdown] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-parent")) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  //////////////////////// for language change on mobile screen///////////////////////////

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
  return (
    <nav className={`${homePage ? "bg-inherit" : "bg-white"}  py-4 `}>
      <div className="xl:container px-5 xl:px-10 xl:mx-auto flex flex-wrap items-center justify-between">
        {/* Logo */}
        <img
          src={SVGS.LogoSvg}
          alt="logo"
          className="w-28 lg:w-[249px] h-[34px] cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden block">
          <div className="flex gap-2">
            <SelectField
              languages={languages}
              defaultLanguage={defaultLanguage}
              handleLanguageChange={handleLanguageChange}
            />
            {/* <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-black focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button> */}
            {/* /////////////////////updated SideBar //////////////////// */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-drawer-target="default-sidebar"
              data-drawer-toggle="default-sidebar"
              aria-controls="default-sidebar"
              type="button"
              className="inline-flex items-center p-2   text-sm  rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <ul
          className={`nav-links hidden lg:flex lg:items-center lg:gap-6 w-full lg:w-auto`}
        >
          {navItems.map((item, index) => (
            <li key={index} className="relative dropdown-parent">
              {item.children ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDropdown((prev) => !prev);
                  }}
                  className={`flex items-center gap-1 text-lg p-2 rounded ${
                    location.pathname.includes("tips-news") ||
                    location.pathname.includes("privacy")
                      ? "text-primary"
                      : "text-darkBlue"
                  }`}
                >
                  {item.label}
                  {item.icon}
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  end
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-1 text-lg p-2 rounded ${
                      isActive ? "text-primary font-medium" : "text-darkBlue"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )}

              {item.children && openDropdown && (
                <ul className="absolute z-[999] left-0 mt-2 bg-white text-black w-auto rounded-md shadow-md   top-full">
                  {item.children.map((child, idx) => (
                    <li key={idx} className="px-4 py-2 hover:bg-gray-100">
                      <NavLink
                        to={child.path}
                        end
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          isActive ? "text-primary" : "text-darkBlue"
                        }
                      >
                        {child.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* /////////////////////updated SideBar //////////////////// */}
        <aside
          id="default-sidebar"
          className={`fixed top-0 right-0 lg:hidden z-40  w-[310px] h-screen transition-transform duration-500 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } " aria-label="Sidebar`}
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col ">
            <div onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <a
                href="#"
                className="flex items-center justify-end p-2 text-gray-900  "
              >
                <Icons.RxCross2 />
              </a>
            </div>

            <ul
              className={`nav-links ${
                isMobileMenuOpen
                  ? "flex flex-col gap-4 mt-4 mb-6 pl-2"
                  : "lg:hidden "
              }  `}
            >
              <div className="lg:flex items-center  gap-5  ">
                {!token && !username ? (
                  <div className="flex items-start gap-2 ">
                    <NavLink
                      to={PATHS.login}
                      className="text-primary bg-white border border-primary px-4 py-1 rounded-md text-lg font-medium"
                    >
                      {t("login")}
                    </NavLink>
                    <NavLink
                      to={PATHS.signup}
                      className="text-primary bg-white border border-primary px-4 py-1 rounded-md text-lg font-medium"
                    >
                      {t("signup")}
                    </NavLink>
                  </div>
                ) : (
                  <NavLink
                    to={PATHS.dashboard}
                    className="text-primary bg-white border border-primary px-4 py-1 rounded-md text-lg font-medium"
                  >
                    Dashboard
                  </NavLink>
                )}
              </div>
            </ul>
            <ul
              className={`nav-links ${
                isMobileMenuOpen ? "flex flex-col gap-2 " : "hidden"
              } lg:flex lg:items-center lg:gap-6  pb-4  w-full lg:w-auto`}
            >
              {navItems.map((item, index) => (
                <li key={index} className="relative dropdown-parent">
                  {item.children ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdown((prev) => !prev);
                      }}
                      className={`flex items-center gap-1 text-lg p-2 rounded ${
                        location.pathname.includes("tips-news") ||
                        location.pathname.includes("privacy")
                          ? "text-primary"
                          : "text-darkBlue"
                      }`}
                    >
                      {item.label}
                      {item.icon}
                    </button>
                  ) : (
                    <NavLink
                      to={item.path}
                      end
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-1 text-lg p-2 rounded ${
                          isActive
                            ? "text-primary font-medium"
                            : "text-darkBlue"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  )}

                  {item.children && openDropdown && (
                    <ul className="absolute z-[999] left-0 mt-2 bg-white text-black w-auto rounded-md shadow-md   top-full">
                      {item.children.map((child, idx) => (
                        <li key={idx} className="px-4 py-2 hover:bg-gray-100">
                          <NavLink
                            to={child.path}
                            end
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                              isActive ? "text-primary" : "text-darkBlue"
                            }
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex flex-col items-start gap-4  mb-2 md:mb-0  mt-auto border-t pt-4">
              <Text
                // icon={<MdOutlinePhone />}
                textColor={homePage ? "text-darkBlue" : "text-white"}
                content="+12 345 6789 0"
              />
              <Text
                // icon={<LuMail />}
                textColor={homePage ? "text-darkBlue" : "text-white"}
                content="support@carlusion.com"
              />
            </div>
          </div>
        </aside>

        {/* Authentication Links */}
        <div className="lg:flex items-center gap-5 hidden ">
          {!token && !username ? (
            <div className="flex items-center gap-4">
              <NavLink
                to={PATHS.signup}
                className="text-primary underline text-lg font-medium"
              >
                {t("signup")}
              </NavLink>
              <NavLink
                to={PATHS.login}
                className="text-white bg-primary rounded-3xl py-2 px-4 text-lg font-medium"
              >
                {t("login")}
              </NavLink>
            </div>
          ) : (
            <NavLink
              to={PATHS.dashboard}
              className="text-white bg-primary rounded-3xl py-2 px-4 text-lg font-medium"
            >
              Dashboard
            </NavLink>
          )}

          {/* Language Switcher Dropdown */}
          <div className="relative ">
            {/* Dropdown menu */}
            {isOpen && (
              <ul className="absolute z-[999] right-0 mt-2 bg-white text-black w-32 rounded-md shadow-md">
                <li
                  onClick={() => handleLanguageChange("en")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  English
                </li>
                <li
                  onClick={() => handleLanguageChange("it")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Italian
                </li>
                <li
                  onClick={() => handleLanguageChange("de")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  German
                </li>
                <li
                  onClick={() => handleLanguageChange("fr")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  French
                </li>
              </ul>
            )}
          </div>
          {/* //////////////////////// */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
