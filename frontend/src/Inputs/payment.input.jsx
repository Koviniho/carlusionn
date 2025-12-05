import * as Yup from "yup";

// Define fields array
const paymentInput = [
  {
    name: "transID",
    label: "Trans. ID",
    type: "select",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "follow-up", label: "Follow-Up" },
    ],
  },
  {
    name: "customerName",
    label: "Customer Name",
    type: "select",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "follow-up", label: "Follow-Up" },
    ],
  },
  {
    name: "vehicle",
    label: "Vehile",
    type: "select",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "follow-up", label: "Follow-Up" },
    ],
  },
  { name: "Amount", label: "Amount", type: "text" },
  { name: "Date", label: "Date", type: "date" },
  { name: "Payment Method", label: "Payment Method", type: "text" },
  {
    name: "Status",
    label: "Status",
    type: "select",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
      { value: "follow-up", label: "Follow-Up" },
    ],
  },
];

// Define Yup validation schema
const customervalidationSchema = Yup.object({
  profileImage: Yup.mixed().nullable(), // Optional file input
  customerName: Yup.string().required("Customer Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email Address is required"),
  phoneNunmber: Yup.string()
    .matches(/^\d+$/, "Phone Number must be numeric")
    .required("Phone Number is required"),
  lastInteraction: Yup.date().nullable(), // Optional date field
  totalPurchases: Yup.number()
    .integer("Total Purchases must be an integer")
    .min(0, "Total Purchases cannot be negative")
    .notRequired(),
  companyName: Yup.string().notRequired(),
  address: Yup.string().notRequired(),
  insuranceProvider: Yup.string().notRequired(),
  licensePlateNumber: Yup.string().notRequired(),
  status: Yup.string()
    .oneOf(["active", "inactive", "follow-up"], "Invalid status value")
    .required("Status is required"),
});
const xxx = Yup.object({
  profileImage: Yup.mixed().notRequired(), // Optional file input
  customerName: Yup.string().required("Customer Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email Address is required"),
  phoneNunmber: Yup.string()
    .matches(/^\d+$/, "Phone Number must be numeric")
    .required("Phone Number is required"),
  lastInteraction: Yup.date().nullable(), // Optional date field
  totalPurchases: Yup.number()
    .integer("Total Purchases must be an integer")
    .min(0, "Total Purchases cannot be negative")
    .notRequired(),
  companyName: Yup.string().notRequired(),
  address: Yup.string().notRequired(),
  insuranceProvider: Yup.string().notRequired(),
  licensePlateNumber: Yup.string().notRequired(),
  status: Yup.string()
    .oneOf(["active", "inactive", "follow-up"], "Invalid status value")
    .required("Status is required"),
});

const CustomerInitialValues = {
  profileImage: null,
  customerName: "",
  email: "",
  phoneNunmber: "",
  lastInteraction: null,
  totalPurchases: 0,
  companyName: "",
  address: "",
  insuranceProvider: "",
  licensePlateNumber: "",
  status: "active",
};
export { paymentInput };
