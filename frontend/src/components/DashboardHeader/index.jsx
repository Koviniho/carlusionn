import { useState, useRef } from "react";
import Icons from "../../assets/icons";
import Button from "../Button";
import { IoIosLogOut, IoIosSettings } from "react-icons/io";
import { CiFileOff } from "react-icons/ci";
import { BsTools } from "react-icons/bs";
import { TbCalendarClock, TbUserSearch } from "react-icons/tb";
import { TiPrinter } from "react-icons/ti";
import { MdMenuBook } from "react-icons/md";
import Text from "../../components/Heading/text";
import Images from "../../assets/images/index";
import { Link, useNavigate } from "react-router-dom";
import PATHS from "../../routes/path";

function DashboardHeader() {
  const navigate = useNavigate();
  const messageCount = 10;
  const notificationCount = 12;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const profileRef = useRef(null); // Ref for the profile dropdown
  const menuRef = useRef(null); // Ref for the settings menu dropdown

  // Toggle profile dropdown visibility
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen((prev) => !prev);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setProfileDropdownOpen(false);
  };
  //  const handleClickOutsideProfile = (e) => {
  //   if (profileRef.current && !profileRef.current.contains(e.target)) {
  //     setProfileDropdownOpen(false);
  //   }
  // };

  // // Close settings menu when clicking outside
  // const handleClickOutsideSettings = (e) => {
  //   if (menuRef.current && !menuRef.current.contains(e.target)) {
  //     setIsDropdownOpen(false);
  //   }
  // };

  // // Attach click event listener to close dropdowns when clicking outside
  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutsideProfile);
  //   document.addEventListener("mousedown", handleClickOutsideSettings);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutsideProfile);
  //     document.removeEventListener("mousedown", handleClickOutsideSettings);
  //   };
  // }, []);

  const menuItems = [
    {
      icon: <BsTools />,
      title: "Car Dealership Settings",
      link: PATHS.garageSetting,
    },
    { icon: <TbUserSearch />, title: "Users", link: PATHS.myProfile },
    {
      icon: <TiPrinter />,
      title: "Templates / Print",
      link: PATHS.templatePrint,
    },
    { icon: <MdMenuBook />, title: "Accounting", link: PATHS.accounting },
    { icon: <CiFileOff />, title: "Integration", link: PATHS.interfaces },
    {
      icon: <TbCalendarClock />,
      title: "Subscription",
      link: PATHS.tariffAndPayments,
    },
  ];
  const handelLogout = () => {
    localStorage.clear("");
    navigate("/");
  };
  // const { username } = useUserInfo();

  return (
    <div className="rounded-md bg-white shadow-xl px-4 py-3 flex items-center justify-between ">
      <div className="flex items-center gap-2 w-6/12">
        <img
          src={Icons.search}
          alt="search-icon"
          className="h-[12px] w-[12px]"
        />
        <input
          type="text"
          placeholder="Search..."
          className="focus:outline-none placeholder-primary text-primary text-[12px] font-medium"
        />
      </div>
      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          <div className="relative inline-flex items-center cursor-pointer">
            {/* Message Icon */}
            {/* <FaRegMessage className="text-xl text-primary" /> */}
            <img src={Images.comment} className="h-6 w-6" alt="message" />

            {/* Message Count Badge */}
            {/* {messageCount > 0 && (
              <span className="absolute -top-2 right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
                {messageCount}
              </span>
            )} */}
            {messageCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            )}
          </div>
          <div className="border-r border-primary"></div>
        </div>
        <div className="flex gap-2">
          <div className="relative inline-flex items-center cursor-pointer">
            {/* Notification Icon */}
            <img src={Images.bell} className="h-6 w-6" alt="message" />

            {/* Notification Count Badge */}
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            )}
          </div>
          <div className="border-r border-primary"></div>
        </div>

        {/* Settings Dropdown */}
        <Button
          icon={<IoIosSettings />}
          text={"Settings"}
          textColor="white"
          onClick={toggleDropdown}
          className="rounded-lg border-primary hover:border-primary"
          padding="py-1.5 px-2"
        />
        {isDropdownOpen && (
          <div
            ref={menuRef}
            className="absolute mt-3 !w-60 top-20 bg-white border border-gray-200 rounded-md z-10 shadow-lg"
          >
            <Link to={PATHS.webPage}>
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 py-5 pl-8 border-b"
              >
                {/* Toggle Button */}
                <div
                  // onClick={() => setEnabled(!enabled)}
                  className={`relative cursor-pointer transition-colors duration-200 `}
                >
                  <img src={Images.return1} className="h-5 w-5" alt="message" />
                </div>

                {/* Label */}
                <span className="text-sm font-medium text-darkBlue">
                  Webpage
                </span>
              </div>
            </Link>
            <ul className="space-y-3 pt-2 pb-4">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="group flex items-center gap-3 text-darkBlue px-2 w-full cursor-pointer rounded-md transition duration-200"
                >
                  {/* Add Link for Navigation */}
                  <Link
                    to={item.link}
                    className="flex items-center gap-3 w-full transition duration-200"
                  >
                    {/* Icon */}
                    <span className="text-[20px] pl-6 flex justify-end  transition duration-200">
                      {item.icon}
                    </span>

                    {/* Title */}
                    <Text
                      content={item.title}
                      textSize="text-[14px]"
                      textColor="text-darkBlue"
                      className=" text-darkBlue transition duration-200 "
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Profile Picture */}
        <div className="relative">
          <img
            src={Images.profile}
            alt="Profile"
            className="w-12 h-12 rounded-full cursor-pointer"
            onClick={toggleProfileDropdown}
          />
          {profileDropdownOpen && (
            <div
              ref={profileRef}
              className="absolute mt-2 w-48 right-0 bg-white border border-gray-200 rounded-md shadow-lg"
            >
              <ul className="font-medium">
                <Link to={"/dashboard/settings/my-profile"}>
                  {" "}
                  <li
                    onClick={toggleProfileDropdown}
                    className="flex items-center text-sm px-4 gap-2 py-2 text-darkBlue cursor-pointer hover:bg-backgroundColor   transition duration-200 ease-in-out"
                  >
                    <img
                      src={Images.profile}
                      alt="Profile"
                      className="w-8 h-8 rounded-full cursor-pointer"
                    />
                    {/* {username
                    ? username.charAt(0).toUpperCase() + username.slice(1)
                    : "Test"}{" "} */}{" "}
                    Testing
                  </li>
                </Link>
                <li
                  className="flex items-center gap-3 px-6 py-2 text-darkBlue cursor-pointer transition duration-200 ease-in-out text-sm"
                  onClick={handelLogout}
                >
                  <IoIosLogOut className="h-5 w-5" />
                  Log Out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
