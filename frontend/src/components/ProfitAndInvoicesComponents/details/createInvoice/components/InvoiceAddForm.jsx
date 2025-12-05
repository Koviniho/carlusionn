/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../../../../store/features/customer/fetchCustomerSlice";
import { fetchAddedVehicles } from "../../../../../store/features/vehicle/getAddedVehicles";
import Select from "react-select";
import Text from "../../../../Heading/text";
import CustomInput from "../../../../Input/custoInput";

const InvoiceAddForm = ({ formik, invoiceItem }) => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  const { allVehicles } = useSelector((state) => state?.fetchAddedVehicleSlice);
  const { allCustomers } = useSelector((state) => state?.fetchCustomerSlice);

  const customerOptions =
    allCustomers?.results?.map((customer) => ({
      label: customer.customerName,
      value: customer.id,
    })) || [];

  const vehicleOptions =
    allVehicles?.results?.map((vehicle) => ({
      label: `${vehicle.make} ${vehicle.model}`,
      value: vehicle.id,
    })) || [];

  const fields = [
    {
      name: "customerId",
      label: "Customer Name",
      type: "asyncSelect",
      options: customerOptions,
    },
    {
      name: "creationDate",
      label: "Invoice Date",
      type: "date",
    },
    {
      name: "dueDate",
      label: "Due Date",
      type: "date",
      readOnly: "readOnly",
    },
    {
      name: "numberOfDays",
      label: "Payment Deadline",
      type: "select",
      placeholder: "Enter number of days",

      options: [
        { value: "", label: "Select Days" }, // Empty state option
        ...Array.from({ length: 30 }, (_, i) => ({
          value: i + 1,
          label: `${i + 1} day${i + 1 > 1 ? "s" : ""}`,
        })),
      ],
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      placeholder: "Enter price",
      readOnly: invoiceItem.length > 0 ? "readOnly" : "",
    },
    {
      name: "subject",
      label: "Subject",
      type: "select",
      options: [
        { value: "", label: "Choose an option" },
        { value: "vehicle", label: "Vehicle" },
        { value: "deposits", label: "Deposits" },
        { value: "miscellaneous", label: "Miscellaneous" },
      ],
    },
    {
      name: "vehicleId",
      label: "Vehicle",
      type: "asyncSelect",
      options: vehicleOptions,
    },
    {
      name: "vehicleDescription",
      label: "Description",
      placeholder: "Description...",
      type: "textarea",
    },
  ];

  useEffect(() => {
    dispatch(fetchCustomers({ page: 1, limit: 10, search: searchInput }));
    dispatch(fetchAddedVehicles({ page: 1, limit: 10, search: searchInput }));
  }, [dispatch, searchInput]);

  const handleDateChange = () => {
    const creationDate = formik.values.creationDate;
    const numberOfDays = formik.values.numberOfDays;

    if (creationDate && numberOfDays) {
      const dueDate = new Date(creationDate);
      dueDate.setDate(dueDate.getDate() + parseInt(numberOfDays, 10)); // Add number of days to creation date
      formik.setFieldValue("dueDate", dueDate.toISOString().split("T")[0]); // Set formatted due date
    }
  };

  // Listen to changes in creationDate and numberOfDays to update the dueDate
  useEffect(() => {
    if (formik.values.creationDate && formik.values.numberOfDays) {
      handleDateChange();
    }
  }, [formik.values.creationDate, formik.values.numberOfDays]);

  return (
    <div className="border rounded-lg p-3 bg-white space-y-4">
      <Text
        content="Informationen"
        fontWeight="font-semibold"
        textColor="#000000"
      />


      {fields.map((field) => {
       
        if (field.type === "asyncSelect") {
        
          if (
            field.name === "vehicleId" &&
            formik.values.subject !== "vehicle"
          ) {
            return null; 
          }

          return (
            <div key={field.name}>
              <label className="block text-base font-semibold text-darkBlue">
                {field.label}
              </label>
              <Select
                options={searchInput?.length > 0 ? field.options : []}
                placeholder={`Search ${field.label}`}
                value={field.options?.find(
                  (option) => option.value === formik.values[field.name]
                )}
                onInputChange={(input) => setSearchInput(input)}
                onChange={(selectedOption) =>
                  formik.setFieldValue(field.name, selectedOption.value)
                }
                onBlur={() => formik.setFieldTouched(field.name, true)}
                isSearchable
                className="mt-1"
                noOptionsMessage={() =>
                  searchInput?.length === 0
                    ? "Start typing to search"
                    : "No results found"
                }
              />
              {formik.touched[field.name] && formik.errors[field.name] && (
                <p className="text-red-500 text-sm">
                  {formik.errors[field.name]}
                </p>
              )}
            </div>
          );
        }

        return (
          <CustomInput
            key={field.name}
            type={field.type}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            value={formik.values[field.name] ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            readOnly={field.readOnly}
            error={formik.errors[field.name]}
            touched={formik.touched[field.name]}
            options={field.options || []}
          />
        );
      })}
    </div>
  );
};

export default InvoiceAddForm;
