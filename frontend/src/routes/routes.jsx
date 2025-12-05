import { createBrowserRouter } from "react-router-dom";
import PATHS from "./path";
import AboutUsPage from "../Pages/AboutUs/page";
import HomePage from "../Pages/Home/page";
import PricingPage from "../Pages/Pricing/page";
import ProductPage from "../Pages/ProductPage/page";
import ReviewPage from "../Pages/Reviews/page";
import PrivacyPolicyPage from "../Pages/PrivacyPolicy/page";
import TipsAndNews from "../Pages/Tips&News/page";
import DaynamicNews from "../Pages/Tips&News/[slugNews]/page";
import LoginPage from "../Pages/Auth/Login/page";
import SignUpPage from "../Pages/Auth/Sign-Up/page";
import NotFoundPage from "../Pages/PageNotFound/page";
import DashboardLayout from "../layout/dashboardLayout";
import DashBoardPage from "../Pages/DashBoard/page";
import VehicleManagementPage from "../Pages/VehicleManagement/page";
import FinancialManagementPage from "../Pages/FinancialManagement/page";
import PontractManagementPage from "../Pages/ContractManagement/page";
import ProtectedRoute from "./protectedRoutes";
import CustomerManagmentPage from "../Pages/CustomerManagement/page";
import CustomerDetailsPage from "../Pages/CustomerManagement/[CustomerDetails]/page";
import InventoryManagementPage from "../Pages/InventoryManagement/page";
import InquiryManagementPage from "../Pages/InquiryManagement/page";
import QuotationManagementPage from "../Pages/QuotationManagement/page";
import ContractTemplatesDetailsPage from "../Pages/ContractManagement/[contractTemplates]/page";
import ContractDetailsPage from "../Pages/ContractManagement/[contract]/page";
import ProfitAndInvoicesPage from "../Pages/Profit-&-Invoices/page";
import CalendarPage from "../Pages/Calendar/page";
import CarDetailsPage from "../Pages/CarDetails/page";
import SingleVehicleManagemenPage from "../Pages/VehicleManagement/[vehicle-managment]/page";
import VehicleDetailsPage from "../Pages/VehicleManagement/[vehicle-details]";
import GarageSettingPage from "../Pages/GarageSetting/page";
import MyProfilePage from "../Pages/UserSetting/MyProfile";
import MyUsersPage from "../Pages/UserSetting/MyUsers";
import WorkPlanPage from "../Pages/UserSetting/WorkPlan";
import HolidayPlanPage from "../Pages/UserSetting/HolidayPlan";
import UserDetailsPage from "../Pages/UserSetting/UserDetailsPage";
import AccountingPage from "../Pages/Accounting/page";
import TemplatePrint from "../Pages/templatePrint/templatePrint";
import WebPage from "../Pages/webPage/page";
import Interfaces from "../Pages/interfaces/page";
import TariffAndPayments from "../Pages/Tariff&Payments/Page";
import MiniHomePage from "../Pages/miniHomePage/page";
import VehiclesCatalog from "../Pages/vehiclesCatalog/page";
import VehicleCatalogDetail from "../Pages/vehicleCatalogDetail/page";
import VehicleRequestPage from "../Pages/vehicleRequestPage/page";
import SingleCustomerManagemenPage from "../Pages/CustomerManagement/customerDetails2/customerDetails2";
import TrashManagementPage from "../Pages/Trash/page";
import EmailManagementPage from "../Pages/Emails/Page";
import BirthdayList from "../components/customerManagement/birthdayList";
import CashBookPage from "../Pages/cashBook/cashBook";
import ReportsPage from "../Pages/reports/reports";
import VehicleCheck from "../Pages/vehicleCheck/vehicleCheck";
import SingleVehicleCheckManagement from "../components/vehicleCheckComponent/vehicleCheckDetails";
import InvoiceDetail from "../components/ProfitAndInvoicesComponents/details/invoiceDetail";
import CreateInvoice from "../components/ProfitAndInvoicesComponents/details/createInvoice/Index";
import VehicleAssessmentDetail from "../components/vehicleCheckComponent/vehicleAssessmentDetail";
import InquiryDetail from "../components/inquiryManagementComponents/subPages/detail";
import Mailbox from "../components/inquiryManagementComponents/subPages/mailBox";
import InformationClientDetail from "../components/inquiryManagementComponents/subPages/InformationClientDetail";
import OpenChat from "../components/inquiryManagementComponents/subPages/openChat";
import QuotationDetail from "../components/QuotationManagementComponent/quotationDetails";

const Routes = createBrowserRouter([
  {
    path: PATHS.PublicWebPage,
    element: <MiniHomePage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  { path: PATHS.login, element: <LoginPage /> },
  { path: PATHS.signup, element: <SignUpPage /> },

  {
    path: "/about-us",
    element: <AboutUsPage />,
  },
  {
    path: "/pricing",
    element: <PricingPage />,
  },
  {
    path: "/product",
    element: <ProductPage />,
  },
  {
    path: "/reviews",
    element: <ReviewPage />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicyPage />,
  },
  {
    path: "/tips-news",
    element: <TipsAndNews />,
  },
  {
    path: "/tips-news/:id",
    element: <DaynamicNews />,
  },
  {
    path: PATHS.carDetails,
    element: <CarDetailsPage />,
  },

  {
    path: PATHS.vehiclesList,
    element: (
      // <ProtectedRoute>
        <VehiclesCatalog />
      // </ProtectedRoute>
    ),
  },
  {
    path: PATHS.singleCatalogDetail,
    element: (
      // <ProtectedRoute>
        <VehicleCatalogDetail />
      // </ProtectedRoute>
    ),
  },
  {
    path: PATHS.vehicleRequest,
    element: (
      // <ProtectedRoute>
        <VehicleRequestPage />
      // </ProtectedRoute>
    ),
  },
  {
    path: PATHS.dashboard,
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <DashBoardPage />
          </ProtectedRoute>
        ),
      },

      {
        path: PATHS.accounting,
        element: (
          <ProtectedRoute>
            <AccountingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.interfaces,
        element: (
          <ProtectedRoute>
            <Interfaces />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.vehicleManagement,
        element: (
          <ProtectedRoute>
            <VehicleManagementPage />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.garageSetting,
        element: (
          <ProtectedRoute>
            <GarageSettingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.webPage,
        element: (
          <ProtectedRoute>
            <WebPage />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.templatePrint,
        element: (
          <ProtectedRoute>
            <TemplatePrint />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.singleVehicleManagement,
        element: (
          <ProtectedRoute>
            <SingleVehicleManagemenPage />
          </ProtectedRoute>
        ),
      },

      {
        path: PATHS.singleVehicleDetails,
        element: (
          <ProtectedRoute>
            <VehicleDetailsPage />
          </ProtectedRoute>
        ),
      },

      {
        path: PATHS.financialManagement,
        element: (
          <ProtectedRoute>
            <FinancialManagementPage />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.contractManagement,
        element: (
          <ProtectedRoute>
            <PontractManagementPage />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.contractDetails,
        element: (
          <ProtectedRoute>
            <ContractDetailsPage />
          </ProtectedRoute>
        ),
      },

      {
        path: PATHS.contractTemplatesDetails,
        element: (
          <ProtectedRoute>
            <ContractTemplatesDetailsPage />
          </ProtectedRoute>
        ),
      },

      {
        path: PATHS.customerManagement,
        element: (
          <ProtectedRoute>
            <CustomerManagmentPage />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.customerDetails,
        element: (
          <ProtectedRoute>
            <CustomerDetailsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.singleCustomerDetails,
        element: (
          <ProtectedRoute>
            <SingleCustomerManagemenPage />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.birthdayRoute,
        element: (
          <ProtectedRoute>
            <BirthdayList />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.cashBookRoute,
        element: (
          <ProtectedRoute>
            <CashBookPage />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.reportRoute,
        element: (
          <ProtectedRoute>
            <ReportsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.inventoryManagement,
        element: (
          <ProtectedRoute>
            <InventoryManagementPage />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.inquiryManagement,
        element: (
          <ProtectedRoute>
            <InquiryManagementPage />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.inquiryDetail,
        element: (
          <ProtectedRoute>
            <InquiryDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.inquiryMailbox,
        element: (
          <ProtectedRoute>
            <Mailbox />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.informationClientDetail,
        element: (
          <ProtectedRoute>
            <InformationClientDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.chatOpen,
        element: (
          <ProtectedRoute>
            <OpenChat />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.quotationManagement,
        element: (
          <ProtectedRoute>
            <QuotationManagementPage />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.quotationDetail,
        element: (
          <ProtectedRoute>
            <QuotationDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.ProfitAndInvoices,
        element: (
          <ProtectedRoute>
            <ProfitAndInvoicesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.invoiceDetail,
        element: (
          <ProtectedRoute>
            <InvoiceDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.newInvoice,
        element: (
          <ProtectedRoute>
            <CreateInvoice />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.calendar,
        element: (
          <ProtectedRoute>
            <CalendarPage />
          </ProtectedRoute>
        ),
      },
      //  user settings
      {
        path: PATHS.myProfile,
        element: (
          <ProtectedRoute>
            <MyProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.myUsers,
        element: (
          <ProtectedRoute>
            <MyUsersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.userDetail,
        element: (
          <ProtectedRoute>
            <UserDetailsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.workPlan,
        element: (
          <ProtectedRoute>
            <WorkPlanPage />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.holidayPlan,
        element: (
          <ProtectedRoute>
            <HolidayPlanPage />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.tariffAndPayments,
        element: (
          <ProtectedRoute>
            <TariffAndPayments />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.vehicleCheckRoute,
        element: (
          <ProtectedRoute>
            <VehicleCheck />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.vehicleAssementDetailRoute,
        element: (
          <ProtectedRoute>
            <VehicleAssessmentDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.vehicleCheckDetailRoute,
        element: (
          <ProtectedRoute>
            <SingleVehicleCheckManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.email,
        element: (
          <ProtectedRoute>
            <EmailManagementPage />
          </ProtectedRoute>
        ),
      },
      {
        path: PATHS.trash,
        element: (
          <ProtectedRoute>
            <TrashManagementPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default Routes;
