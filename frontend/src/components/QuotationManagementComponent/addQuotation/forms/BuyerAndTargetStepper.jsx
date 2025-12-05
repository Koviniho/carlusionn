/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button from "../../../Button";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../../../store/features/customer/fetchCustomerSlice";

const BuyerAndTargetStepper = ({ setCurrentStep,formik }) => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  const { allCustomers } = useSelector((state) => state?.fetchCustomerSlice);

  const customerOptions =
    allCustomers?.results?.map((customer) => ({
      label: `${customer.customerName} `,
      value: customer.id, // Ensure this is a unique identifier
    })) || [];

  useEffect(() => {
    dispatch(fetchCustomers({ page: 1, limit: 10, search: searchInput }));
  }, [dispatch, searchInput]);

  ///////////////////// for fetch customers//////////////////////////////////
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
    <div className="space-y-5">
      <section>
        <h2 className=" text-xl pt-4 font-[600] mb-3">Basic Information</h2>
        {renderSelectField("customerId", "Customer Name", customerOptions)}
      
      </section>

      <section className="flex justify-between">
        <Button
          borderColor="primary"
          bgColor="transparent"
          textColor="primary"
          borderRadius="rounded-lg"
          text="Back"
          onClick={() => setCurrentStep((prev) => prev - 1)}
        />
        <Button
          textColor="white"
          borderRadius="rounded-lg"
          text="Next"
          // onClick={() => setCurrentStep((prev) => prev + 1)}
          onClick={formik.handleSubmit}
        />
      </section>
    </div>
  );
};

export default BuyerAndTargetStepper;
