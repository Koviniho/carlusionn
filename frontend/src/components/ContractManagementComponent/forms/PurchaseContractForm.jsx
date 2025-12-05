/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../../Button";
import Text from "../../Heading/text";
import CustomInput from "../../Input/custoInput";
import Select from "react-select";
import { useFormik } from "formik";
import * as Yup from "yup";
import useUserInfo from "../../../hooks/useUserInfo";
import { useDispatch } from "react-redux";
import { addNewContract, getAllContract } from "../../../store/features/contract/contractSlice";

const validationSchema = Yup.object({
  customerId: Yup.string().required("Customer is required"),
  sellerId: Yup.string().required("Seller is required"),
  vehicleId: Yup.string().required("Vehicle is required"),
  creationDate: Yup.date().required("Creation date is required"),
  pickupDate: Yup.date().required("Pickup date is required"),
  location: Yup.string().required("Location is required"),
  remarks: Yup.string(),
});

//////////////for selling /////////////////////////////////////
const PurchaseContractForm = ({
  vehicleOptions,
  customerOptions,
  setSearchInput,
  searchInput,
  selectedContract,
  setAddContract
}) => {
  const dispatch=useDispatch();
  // for handle vehicle feature //////////////////
  const [vehicleFeatures, setVehicleFeatures] = useState([]);
  console.log("🚀 ~ vehicleFeatures:", vehicleFeatures);

  const handleCheckboxChange = (label, isChecked) => {
    setVehicleFeatures((prevFeatures) => {
      if (isChecked) {
        return [...prevFeatures, { title: label, description: "" }];
      } else {
        return prevFeatures.filter((feature) => feature.title !== label);
      }
    });
  };

  const handleInputChange = (label, value) => {
    setVehicleFeatures((prevFeatures) =>
      prevFeatures.map((feature) =>
        feature.title === label ? { ...feature, description: value } : feature
      )
    );
  };
  /////////////////////for contract completion /////////////////////////
  const [contractCompletion, setContractCompletion] = useState([]);

  const handleContractChange = (label, isChecked) => {
    setContractCompletion((prev) =>
      isChecked ? [...prev, label] : prev.filter((item) => item !== label)
    );
  };
  const userData = useUserInfo();
  const fields = [

    {
      name: "sellerId",
      label: "Seller",
      type: "select",
      options: [
        { value: "", label: "Select Seller" },
        { value: userData?.userId, label: userData?.username },
      ],
    },
    { name: "creationDate", label: "Creation Date", type: "date" },
    { name: "pickupDate", label: "Pickup Date", type: "date" },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "", label: "Select Status" },
        { value: "draft", label: "Draft" },
        { value: "open", label: "Open" },
        { value: "signed", label: "Signed" },
        { value: "expired", label: "Expired" },
      ],
    },
    {
      name: "location",
      label: "Location",
      type:"text",
      placeholder: "Standort auswählen",
    },
    {
      name: "remarks",
      label: "Remarks",
      type: "textarea",
      placeholder:
        " - Porsche Approved Garantie bis 07.09.2027 \n - 8-fach bereift (Kompletträder) \n - Zwei Schlüssel \n - Beulen HR und Hinten instand stellen \n - Fahrzeugeintausch Hyundai i30 CHF 13’000.- (separater Kaufvertrag)) \n  ",
    },
    // {
    //   name: "vehicleCondition",
    //   label: "Vehicle Condition",
    //   type: "select",
    //   options: [
    //     { value: "", label: "Vehicle Condition" },
    //     { value: "ABC123", label: "Toyota Camry - ABC123" },
    //     { value: "XYZ456", label: "Honda Accord - XYZ456" },
    //   ],
    // },
    // {
    //   name: "km",
    //   label: "Killometer",
    //   type: "number",
    //   placeholder: "89'000 km",
    // },
    // {
    //   name: "sellingPrice",
    //   label: "Selling Price",
    //   type: "number",
    //   placeholder: "89000 ",
    // },
    // {
    //   name: "salesPerson",
    //   label: "Sales Person",
    //   placeholder: "Verkäufer auswählen ",
    // },

    // {
    //   name: "leasingProvider",
    //   label: "Leasing Provider",
    //   type: "select",
    //   options: [
    //     { value: "", label: "Select Leasing Provider" },
    //     { value: "Provider 1", label: "Provider 1" },
    //     { value: "Provider 2", label: "Provider 2" },
    //     { value: "Provider 3", label: "Provider 3" },
    //   ],
    // },
  ];
  // const [isServiceChecked, setIsServiceChecked] = useState(false);
  // const [isRepairChecked, setIsRepairChecked] = useState(false);
  // const [isMFKChecked, setIsMFKChecked] = useState(false);
  const formik = useFormik({
    initialValues: {
      customerId: "",
      sellerId: "",
      vehicleId: "",
      creationDate: "",
      pickupDate: "",
      location: "",
      remarks: "",
    },
    validationSchema,
    onSubmit:async (values) => {
      const {remarks,...remainingValues}=values
      const additional={
        remarks
      }
      const payload = {
        contractType: selectedContract,
        vehicleFeature: vehicleFeatures,
        contractCompletion,
        additional,
        ...remainingValues,
      };
      console.log("Form submitted", payload);
       const response = await dispatch(addNewContract(payload)).unwrap();
      
            if (response?.success) {
              dispatch(getAllContract());
              setAddContract(false); // Close modal after submission
            }
    },
  });

  const renderSelectField = (name, label, options) => (
    <div>
      <label className="block text-base font-semibold text-darkBlue">
        {label}
      </label>
      <Select
        options={searchInput.length > 0 ? options : []}
        placeholder={`Search ${label}`}
        value={options.find((option) => option.value === formik.values[name])}
        onInputChange={(input) => setSearchInput(input)}
        onChange={(option) => formik.setFieldValue(name, option.value)}
        onBlur={() => formik.setFieldTouched(name, true)}
        className="mt-1"
        isSearchable
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 text-sm">{formik.errors[name]}</p>
      )}
    </div>
  );

  return (
    <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-4">
      {renderSelectField("customerId", "Customer Name", customerOptions)}
      {renderSelectField("vehicleId", "Vehicle", vehicleOptions)}

      {fields.map((field) => (
        <CustomInput
          key={field.name}
          type={field.type}
          name={field.name}
          label={field.label}
          value={formik.values[field.name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors[field.name]}
          touched={formik.touched[field.name]}
          options={field?.options || []}
        />
      ))}

      <div className="space-y-2">
        <Text
          textColor="text-darkBlue"
          textSize="text-xl"
          fontWeight="font-semibold"
          content="Vehicle Features"
        />
        {/* <div className="flex justify-between gap-12 items-center">
          <CustomInput
            type="checkbox"
            label="MFK demonstration"
            onChange={(e) => setIsMFKChecked(e.target.checked)}
          />
          {isMFKChecked && (
            <div className="flex-1">
              <CustomInput />{" "}
            </div>
          )}
        </div>
        <div className="flex justify-between gap-12 items-center">
          <CustomInput
            type="checkbox"
            label="Service"
            onChange={(e) => setIsServiceChecked(e.target.checked)}
          />
          {isServiceChecked && (
            <div className="flex-1">
              <CustomInput />{" "}
            </div>
          )}
        </div>
        <div className="flex justify-between gap-12 items-center">
          <CustomInput
            type="checkbox"
            label="Repair"
            onChange={(e) => setIsRepairChecked(e.target.checked)}
          />
          {isRepairChecked && (
            <div className="flex-1">
              <CustomInput />{" "}
            </div>
          )}
        </div> */}
        {["MFK demonstration", "Service", "Repair"].map((label) => {
          const isChecked = vehicleFeatures.some(
            (feature) => feature.title === label
          );

          return (
            <div
              key={label}
              className="flex justify-between gap-12 items-center"
            >
              <CustomInput
                type="checkbox"
                label={label}
                checked={isChecked}
                onChange={(e) => handleCheckboxChange(label, e.target.checked)}
              />
              {isChecked && (
                <div className="flex-1">
                  <CustomInput
                    type="text"
                    placeholder={`Enter ${label} details`}
                    value={
                      vehicleFeatures.find((feature) => feature.title === label)
                        ?.description || ""
                    }
                    onChange={(e) => handleInputChange(label, e.target.value)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="space-y-2">
        <Text
          textColor="text-darkBlue"
          textSize="text-xl"
          fontWeight="font-semibold"
          content="Conclusion of contract"
        />
        {["E-Signature", "Create Invoice", "Email dispatch"].map((label) => {
          const isChecked = contractCompletion.includes(label);

          return (
            <CustomInput
              key={label}
              type="checkbox"
              label={label}
              checked={isChecked}
              onChange={(e) => handleContractChange(label, e.target.checked)}
            />
          );
        })}
      </div>

      <div className="border p-2  rounded-lg flex justify-center gap-2 items-center">
        <span className="text-xs text-gray-500 border px-3 py-1 rounded-xl">
          kovac.kristian@smatik.ch
        </span>
        <span className="text-xs text-gray-500 border px-3 py-1 rounded-xl">
          kovac.kristian2@smatik.ch
        </span>
      </div>

      <Button
        type="button"
        onClick={formik.handleSubmit}
        text="Kaufvertrag Erstellen"
        className="w-full"
        borderRadius="rounded-md"
        textColor="white"
      />
    </form>
  );
};

export default PurchaseContractForm;
