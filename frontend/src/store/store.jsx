import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import vehicleSlice from "./features/vehicle/vehicleSlice";
import allVehicleSlice from "./features/vehicle/getAllVehicleSlice";
import fetchAddedVehicleSlice from "./features/vehicle/getAddedVehicles";
import allVehicleModelSlice from "./features/vehicle/getVehicleModelSlice";
import allVehicleMakersSlice from "./features/vehicle/getVehicleMakersSlice";
import deleteFileSlice from "./features/deleteFileSlice/deleteFileSlice";
import miniHomePageSlice from "./features/miniHomePageSlice/miniHomePageSlice";
import fetchAllInquirySlice from "./features/inquirySlice/getAllInquirySlice";
import fetchSingleInquirySlice from "./features/inquirySlice/getSingleInquirySlice";
import fetchAllInvoicesSlice from "./features/invoiceSlice/getAllInvoiceSlice";
import fetchSingleInvoiceSlice from "./features/invoiceSlice/getSingleInvoiceSlice";
import recordPaymentSlice from "./features/invoiceSlice/recordPaymentSlice";
import fetchAllCashbookSlice from "./features/cashBookSlice/getAllCashBookSlice";
import fetchAllReportsSlice from "./features/reportsSlice/getAllReportsSlice";
import getAllQuotationSlice from "./features/quotationSlice/getAllQuotationSlice";
import getSingleQuotationSlice from "./features/quotationSlice/getSingleQuotationSlice";
import modalSlice from "./designSlice/designSlice";

import contractSlice from "./features/contract/contractSlice";
import contractTemplatesSlice from "./features/contractTemplates/contractTemplatesSlice";
import customerSlice from "./features/customer/customer.slice";
import fetchCustomerSlice from "./features/customer/fetchCustomerSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    vehicle: vehicleSlice,
    contract: contractSlice,
    contractTamplets: contractTemplatesSlice,
    customer: customerSlice,
    allVehicleSlice:allVehicleSlice,
    allVehicleMakersSlice:allVehicleMakersSlice,
    fetchAddedVehicleSlice:fetchAddedVehicleSlice,
    allVehicleModelSlice:allVehicleModelSlice,
    fetchCustomerSlice:fetchCustomerSlice,
    deleteFileSlice:deleteFileSlice,
    miniHomePageSlice:miniHomePageSlice,
    fetchAllInquirySlice:fetchAllInquirySlice,
    fetchSingleInquirySlice:fetchSingleInquirySlice,
    fetchAllInvoicesSlice:fetchAllInvoicesSlice,
    fetchSingleInvoiceSlice:fetchSingleInvoiceSlice,
    recordPaymentSlice:recordPaymentSlice,
    fetchAllCashbookSlice:fetchAllCashbookSlice,
    fetchAllReportsSlice:fetchAllReportsSlice,
    getAllQuotationSlice:getAllQuotationSlice,
    getSingleQuotationSlice:getSingleQuotationSlice,
    modalSlice:modalSlice
  },
});

export default store;
