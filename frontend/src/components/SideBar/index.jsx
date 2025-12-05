import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SVGS from "../../assets/svg";
import Icons from "../../assets/icons";
import DashboardSvg from "../../assets/svg/DashBoradSvg";
import Images from "../../assets/images";
import PATHS from "../../routes/path";
import CarSvg from "../../assets/svg/carSvg";
import ContractSvg from "../../assets/svg/contractSvg";
import CashSvg from "../../assets/svg/cashSvg";
import PersonSvg from "../../assets/svg/personSvg";
import InquirySvg from "../../assets/svg/inquirySvg";
import QuotationSvg from "../../assets/svg/quitationSvg";
import CalendarSvg from "../../assets/svg/calenderSvg";
import PaymentSvg from "../../assets/svg/paymentSvg";
import OverviewSvg from "../../assets/svg/overviewSvg";
import PricingSvg from "../../assets/svg/pricingSvg";
import { FaChevronRight } from "react-icons/fa6";
import {
  MdOutlineDeleteOutline,
  MdOutlineMarkEmailUnread,
} from "react-icons/md";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: <DashboardSvg />,
    path: PATHS.dashboard,
    iconPosition: "left",
  },
  {
    title: "Vehicle Management",
    icon: <CarSvg />,
    path: PATHS.vehicleManagement,
    iconPosition: "left",
  },
  {
    title: "Contract Management",
    icon: <ContractSvg />,
    path: PATHS.contractManagement,
    iconPosition: "left",
  },
  {
    title: "Financial Management",
    icon: <CashSvg />,
    path: PATHS.financialManagement,
    iconPosition: "left",
  },
  {
    title: "Customer Management",
    icon: <PersonSvg />,
    path: PATHS.customerManagement,
    iconPosition: "left",
  },
  // {
  //   title: "Inventory Management",
  //   icon: <InventorySvg />,
  //   path: PATHS.inventoryManagement,
  //   iconPosition: "left",
  // },
  {
    title: "Inquiry Management",
    icon: <InquirySvg />,
    path: PATHS.inquiryManagement,
    iconPosition: "left",
  },
  {
    title: "Quotation Management",
    icon: <QuotationSvg />,
    path: PATHS.quotationManagement,
    iconPosition: "left",
  },
  {
    title: "Calendar",
    icon: <CalendarSvg />,
    path: PATHS.calendar,
    iconPosition: "left",
  },
  {
    title: "Invoice Management",
    icon: <PaymentSvg />,
    path: PATHS.ProfitAndInvoices,
    iconPosition: "left",
  },
  {
    title: "Cash Book",
    icon: <OverviewSvg />,
    path: PATHS.cashBookRoute,
    iconPosition: "left",
  },
  {
    title: "Reports",
    icon: <PricingSvg />,
    path: PATHS.reportRoute,
    iconPosition: "left",
  },
  {
    title: "Vehicle Check",
    icon: <Icons.GiCartwheel />,
    path: PATHS.vehicleCheckRoute,
    iconPosition: "left",
  },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const [moreOption, setMoreOption] = useState(null);

  const toggleSidebar = () => {
    setIsCollapsed((prevState) => !prevState);
  };
  const popupRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setMoreOption(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <aside
      className={`${
        isCollapsed ? "w-[80px]" : "w-[279px]"
      } min-h-screen bg-white shadow-xl rounded-xl transition-all duration-300`}
      aria-label="Sidebar Navigation"
    >
      {/* Logo and Menu Section */}
      <div
        className={`flex items-center border-b-2 border-gray-200 ${
          isCollapsed ? "p-1 gap-2 justify-center" : "p-4 gap-4 justify-between"
        }`}
      >
        <Link to="/">
          <img
            src={isCollapsed ? Images.favicon : SVGS.LogoSvg}
            className={`${isCollapsed ? "w-10" : "w-9/12"}`}
            alt="Logo"
          />
        </Link>
        <img
          src={Icons.menu}
          alt="menu"
          className="mt-2 cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>

      {/* Sidebar Items */}
      <nav className="p-4 space-y-1">
        {sidebarItems.map((item, index) => (
          <div key={index} className="relative">
            <div
              className={`flex items-center justify-between p-2 rounded-lg transition-colors group duration-300 ${
                location.pathname === item.path
                  ? "bg-primary text-white"
                  : "hover:bg-primary hover:text-white"
              }`}
            >
              <Link
                to={item.path}
                className={`flex items-center ${
                  item.iconPosition === "right" ? "justify-between" : "gap-3"
                } w-full`}
              >
                {item.iconPosition !== "right" && item.icon}
                {!isCollapsed && (
                  <span
                    className={`text-black font-medium group-hover:text-white text-[14px] ${
                      location.pathname === item.path && "text-white"
                    }`}
                  >
                    {item.title}
                  </span>
                )}
                {item.iconPosition === "right" && item.icon}
              </Link>
            </div>
          </div>
        ))}
        <div className="relative" ref={popupRef}>
          <button
            className="flex items-center px-2 gap-2 text-primary"
            onClick={() => setMoreOption((prev) => !prev)}
          >
            {!isCollapsed && <span>More</span>}
            <FaChevronRight size={10} />
          </button>
          {moreOption && (
            <div className="absolute left-20 w-44 top-0 bg-white p-2 shadow-lg rounded-lg">
              <ul className="space-y-2">
                <li className="flex items-center gap-2  p-2  rounded cursor-pointer text-sm hover:bg-primary hover:text-white">
                  <MdOutlineMarkEmailUnread />
                  <Link to={`${PATHS.email}`}>Sent Email</Link>
                </li>
                <li className="flex items-center gap-2 hover:bg-primary hover:text-white p-2 rounded cursor-pointer text-sm">
                  <MdOutlineDeleteOutline />
                  <Link to="/dashboard/trash">Trash</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
