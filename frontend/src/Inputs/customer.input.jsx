import * as Yup from "yup";

// Define fields array
const customerInputs = [
  {
    name: "profileImage",
    label: "Upload Profile Image",
    type: "file",
    placeholder: "Choose a file",
  },
  {
    name: "customerType",
    label: "Customer Type",
    type: "select",
    options: [
      { value: "-", label: "Select customer type" },
      { value: "private", label: "Private Person" },
      { value: "company", label: "Company Person" },
    ],
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
  },
  { name: "zipCode", label: "Zip Code", type: "text", placeholder: "49000" },
  {
    name: "residencePlace",
    label: "Residence Place",
    type: "text",
    placeholder: "Enter residence place",
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter address",
  },
  {
    name: "houseNumber",
    label: "House Number",
    type: "text",
    placeholder: "00",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "number",
    placeholder: "Enter phone number",
  },
  {
    name: "email",
    label: "Email Address",
    type: "text",
    placeholder: "Enter email address",
  },
  {
    name: "insuranceProvider",
    label: "Insurance Provider",
    type: "text",
    placeholder: "Generalli",
  },
  {
    name: "maritalStatus",
    label: "Marital Status",
    type: "select",
    options: [
      { value: "", label: "choose marital status" },
      { value: "single", label: "Single" },
      { value: "married", label: "Married" },
      { value: "divorced", label: "Divorced" },
      { value: "prefer not to say", label: "Prefer not to say" },
    ],
  },
  {
    name: "birthDate",
    label: "Date of Birth",
    type: "date",
    placeholder: "Select date of birth",
  },
  {
    name: "canton",
    label: "Canton",
    type: "text",
    placeholder: "Enter canton",
  },
  {
    name: "nationality",
    label: "Nationality",
    type: "text",
    placeholder: "Enter nationality",
  },
];

// Define Yup validation schema
const customervalidationSchema = Yup.object({
  // profileImage: Yup.mixed().nullable(),
  // profileImage: Yup.mixed()
  // .required("Profile Image is required")
  // .test("fileType", "Unsupported file format", (value) => {
  //   if (!value) return false; // If no file is selected, fail validation
  //   return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
  // })
  // .test("fileSize", "File size too large (max 5MB)", (value) => {
  //   if (!value) return false;
  //   return value.size <= 5 * 1024 * 1024; // 5MB limit
  // }),


  customerType: Yup.string()
    .oneOf(["private", "company"], "Invalid customer type")
    .required("Customer Type is required"),

  status: Yup.string()
    .oneOf(["active", "inactive"], "Invalid status value")
    .required("Status is required"),

    zipCode: Yup.string()
    .trim()
    .matches(/^\d+$/, "Zip Code must be a number") // Ensures only digits are allowed
    .required("Zip Code is required"),
  address: Yup.string().trim().required("Address is required"),
  houseNumber: Yup.string().trim().required("House Number is required"),

  phoneNumber: Yup.string()
    .matches(/^\d+$/, "Phone Number must be numeric")
    .required("Phone Number is required"),

  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email Address is required"),

  insuranceProvider: Yup.string().nullable(),

  maritalStatus: Yup.string().trim().required("Marital Status is required"),

  birthDate: Yup.date()
    .nullable()
    .required("Date of Birth is required"),

  canton: Yup.string().trim().required("Canton is required"),
  nationality: Yup.string()
  .trim()
  .matches(/^[A-Za-z\s]+$/, "Nationality must contain only letters")
  .required("Nationality is required"),
  residencePlace: Yup.string().trim().required("Residence Place is required"),

  // Conditional Fields for Private Customers
  firstName: Yup.string()
    .trim()
    .matches(/^[A-Za-z\s]+$/, "First Name must contain only letters")
    .when("customerType", {
      is: "private",
      then: (schema) => schema.required("First Name is required"),
      otherwise: (schema) => schema.nullable(),
    }),

  lastName: Yup.string()
    .trim()
    .matches(/^[A-Za-z\s]+$/, "Last Name must contain only letters")
    .when("customerType", {
      is: "private",
      then: (schema) => schema.required("Last Name is required"),
      otherwise: (schema) => schema.nullable(),
    }),


  // passIdType: Yup.string().trim().when("customerType", {
  //   is: "private",
  //   then: (schema) => schema.required("Pass ID Type is required"),
  //   otherwise: (schema) => schema.nullable(),
  // }),

  // passportId: Yup.string().trim().when("customerType", {
  //   is: "private",
  //   then: (schema) => schema.required("Passport ID is required"),
  //   otherwise: (schema) => schema.nullable(),
  // }),

  // residencePermit: Yup.string().trim().when("customerType", {
  //   is: "private",
  //   then: (schema) => schema.required("Residence Permit is required"),
  //   otherwise: (schema) => schema.nullable(),
  // }),

  // Conditional Field for Company Customers
  companyName: Yup.string()
    .trim()
    .matches(/^[A-Za-z\s]+$/, "Company Name must contain only letters")
    .when("customerType", {
      is: "company",
      then: (schema) => schema.required("Company Name is required"),
      otherwise: (schema) => schema.nullable(),
    }),

  name: Yup.string()
    .trim()
    .matches(/^[A-Za-z\s]+$/, "Owner Name must contain only letters")
    .when("customerType", {
      is: "company",
      then: (schema) => schema.required("Owner Name is required"),
      otherwise: (schema) => schema.nullable(),
    }),

});


const editCustomervalidationSchema = Yup.object({
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
  customerType: "-", // Default selection
  status: "active",
  zipCode: "",
  address: "",
  houseNumber: "",
  phoneNumber: "",
  email: "",
  insuranceProvider: "",
  maritalStatus: "",
  birthDate: "",
  canton: "",
  nationality: "",
  residencePlace: "",
  // Private customer-specific fields
  firstName: "",
  lastName: "",
  passIdType: "",
  // passportId: "",
  // residencePermit: "",

  // Company-specific field
  companyName: "",
  name:"",
};
export {
  editCustomervalidationSchema,
  CustomerInitialValues,
  customerInputs,
  customervalidationSchema,
};
