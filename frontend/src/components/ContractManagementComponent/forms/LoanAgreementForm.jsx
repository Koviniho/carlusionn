// import CustomInput from "../../Input/custoInput";
// import Button from "../../Button";

// const fields = [
//   {
//     name: "customerName",
//     label: "Customer Name",
//     type: "select",
//     options: [
//       { value: "", label: "Select Customer" },
//       { value: "John Doe", label: "John Doe" },
//       { value: "Jane Smith", label: "Jane Smith" },
//       { value: "Alice Johnson", label: "Alice Johnson" },
//     ],
//   },
//   {
//     name: "vehicle",
//     label: "Vehicle",
//     type: "select",
//     options: [
//       { value: "", label: "Select Vehicle" },
//       { value: "ABC123", label: "Toyota Camry - ABC123" },
//       { value: "XYZ456", label: "Honda Accord - XYZ456" },
//       { value: "LMN789", label: "Ford Focus - LMN789" },
//     ],
//   },
//   {
//     name: "seller",
//     label: "Seller",
//     type: "select",
//     options: [
//       { value: "", label: "Select Seller" },
//       { value: "Seller A", label: "Seller A" },
//       { value: "Seller B", label: "Seller B" },
//       { value: "Seller C", label: "Seller C" },
//     ],
//   },
//   { name: "creationDate", label: "Creation Date", type: "date" },
//   // { name: "pickupDate", label: "Pickup Date", type: "date" },
//   {
//     name: "leasingProvider",
//     label: "Leasing Provider",
//     type: "select",
//     options: [
//       { value: "", label: "Select Leasing Provider" },
//       { value: "Provider 1", label: "Provider 1" },
//       { value: "Provider 2", label: "Provider 2" },
//       { value: "Provider 3", label: "Provider 3" },
//     ],
//   },
// ];

// const financingFields = [
//   {
//     name: "lender",
//     label: "Lender",
//     type: "select",
//     options: [
//       { value: "", label: "Select" },
//       { value: "option-1", label: "Option 1" },
//       { value: "option-2", label: "Option 2" },
//     ],
//   },
//   { name: "loanAmount", label: "Loan Amount", type: "number" },
//   {
//     name: "remarks",
//     label: "Remarks",
//     type: "textarea",
//     placeholder:
//       " - Porsche Approved Garantie bis 07.09.2027 \n - 8-fach bereift (Kompletträder) \n - Zwei Schlüssel \n - Beulen HR und Hinten instand stellen \n - Fahrzeugeintausch Hyundai i30 CHF 13’000.- (separater Kaufvertrag)) \n  ",
//   },
// ];

// const LoanAgreementForm = () => {
//   return (
//     <div className="grid grid-cols-1 gap-4">
//       {fields.map((field) => (
//         <CustomInput
//           key={field.name}
//           type={field.type}
//           name={field.name}
//           label={field.label}
//           placeholder={field.placeholder}
//           options={field?.options || []}
//           // value={formik.values[field.name]}
//           // onChange={(e) => {
//           //   formik.handleChange(e); // Update Formik value
//           //   const { name, value } = e.target;

//           //   // Handle setting state for contractId, customerName, and carModel
//           //   if (name === "contractId") {
//           //     const selectedOption = countractIDOption.find(
//           //       (option) => option.value === value
//           //     );
//           //     setcontractId(selectedOption ? selectedOption.id : null);
//           //   } else if (name === "customerName") {
//           //     const selectedOption = customerNameOption.find(
//           //       (option) => option.value === value
//           //     );
//           //     setcustomerNameId(selectedOption ? selectedOption.id : null);
//           //   } else if (name === "carModel") {
//           //     const selectedOption = vehicleOption.find(
//           //       (option) => option.value === value
//           //     );
//           //     setCarModelId(selectedOption ? selectedOption.id : null);
//           //   }
//           // }}
//           // onBlur={formik.handleBlur}
//           // error={formik.errors[field.name]}
//           // touched={formik.touched[field.name]}
//         />
//       ))}

//       <h2 className=" text-xl font-medium pt-4 ">Financing</h2>
//       {financingFields.map((field) => (
//         <CustomInput
//           key={field.name}
//           type={field.type}
//           name={field.name}
//           label={field.label}
//           placeholder={field.placeholder}
//           // value={formik.values[field.name]}
//           // onChange={formik.handleChange}
//           // onBlur={formik.handleBlur}
//           // error={formik.errors[field.name]}
//           // touched={formik.touched[field.name]}
//           // options={field?.options || []}
//         />
//       ))}
//       <div>
//         <Button
//           type="submit"
//           text="Create A Loan Agreement"
//           className="w-full"
//           borderRadius="rounded-md"
//           textColor="white"
//         />
//       </div>
//     </div>
//   );
// };

// export default LoanAgreementForm;







import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../Input/custoInput";
import Button from "../../Button";

const fields = [
  {
    name: "customerName",
    label: "Customer Name",
    type: "select",
    options: [
      { value: "", label: "Select Customer" },
      { value: "John Doe", label: "John Doe" },
      { value: "Jane Smith", label: "Jane Smith" },
      { value: "Alice Johnson", label: "Alice Johnson" },
    ],
  },
  {
    name: "vehicle",
    label: "Vehicle",
    type: "select",
    options: [
      { value: "", label: "Select Vehicle" },
      { value: "ABC123", label: "Toyota Camry - ABC123" },
      { value: "XYZ456", label: "Honda Accord - XYZ456" },
      { value: "LMN789", label: "Ford Focus - LMN789" },
    ],
  },
  { name: "creationDate", label: "Creation Date", type: "date" },
  {
    name: "leasingProvider",
    label: "Leasing Provider",
    type: "select",
    options: [
      { value: "", label: "Select Leasing Provider" },
      { value: "Provider 1", label: "Provider 1" },
      { value: "Provider 2", label: "Provider 2" },
      { value: "Provider 3", label: "Provider 3" },
    ],
  },
];

const financingFields = [
  {
    name: "lender",
    label: "Lender",
    type: "select",
    options: [
      { value: "", label: "Select" },
      { value: "option-1", label: "Option 1" },
      { value: "option-2", label: "Option 2" },
    ],
  },
  { name: "loanAmount", label: "Loan Amount", type: "number" },
  {
    name: "remarks",
    label: "Remarks",
    type: "textarea",
    placeholder:
      " - Porsche Approved Garantie bis 07.09.2027 \n - 8-fach bereift (Kompletträder) \n - Zwei Schlüssel \n - Beulen HR und Hinten instand stellen \n - Fahrzeugeintausch Hyundai i30 CHF 13’000.- (separater Kaufvertrag)) \n  ",
  },
];

const validationSchema = Yup.object({
  customerName: Yup.string().required("Customer Name is required"),
  vehicle: Yup.string().required("Vehicle is required"),
  creationDate: Yup.date().required("Creation Date is required"),
  leasingProvider: Yup.string().required("Leasing Provider is required"),
  lender: Yup.string().required("Lender is required"),
  loanAmount: Yup.number().required("Loan Amount is required").positive("Must be a positive number"),
});

const LoanAgreementForm = () => {
  const formik = useFormik({
    initialValues: {
      customerName: "",
      vehicle: "",
      creationDate: "",
      leasingProvider: "",
      lender: "",
      loanAmount: "",
      remarks: "",
    },
    validationSchema:validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      // Handle form submission logic (API call, etc.)
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-4">
      {fields.map((field) => (
        <CustomInput
          key={field.name}
          type={field.type}
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          options={field.options || []}
          value={formik.values[field.name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched[field.name] && formik.errors[field.name]}
        />
      ))}

      <h2 className="text-xl font-medium pt-4">Financing</h2>
      {financingFields.map((field) => (
        <CustomInput
          key={field.name}
          type={field.type}
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          options={field.options || []}
          value={formik.values[field.name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched[field.name] && formik.errors[field.name]}
        />
      ))}

      <div>
        <Button type="submit" text="Create A Loan Agreement" className="w-full" borderRadius="rounded-md" textColor="white" />
      </div>
    </form>
  );
};

export default LoanAgreementForm;
