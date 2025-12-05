import { useFormik } from "formik";
import MainHeading from "../Heading/mainHeading";
import { useState } from "react";
import { useSelector } from "react-redux";

const CatalogFilterSection = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const formInputs = [
    {
      type: "select",
      name: "brand",
      label: "Brand & Model",
      options: [
        { name: "toyota", label: "Toyota" },
        { name: "honda", label: "Honda" },
        { name: "ford", label: "Ford" },
      ],
    },
    {
      type: "select",
      name: "year",
      label: "Year",
      options: [
        { name: "2024", label: "2024" },
        { name: "2023", label: "2023" },
        { name: "2022", label: "2022" },
      ],
    },
    {
      type: "select",
      name: "mileage",
      label: "Mileage",
      options: [
        { name: "5000", label: "5,000 km" },
        { name: "10000", label: "10,000 km" },
        { name: "20000", label: "20,000 km" },
      ],
    },
    {
      type: "select",
      name: "price",
      label: "Price",
      options: [
        { name: "20000", label: "CHF 20,000" },
        { name: "30000", label: "CHF 30,000" },
        { name: "40000", label: "CHF 40,000" },
      ],
    },
    {
      type: "select",
      name: "bodyType",
      label: "Body Type",
      options: [
        { name: "suv", label: "SUV" },
        { name: "sedan", label: "Sedan" },
        { name: "hatchback", label: "Hatchback" },
      ],
    },
    {
      type: "select",
      name: "fuelType",
      label: "Fuel Type",
      options: [
        { name: "petrol", label: "Petrol" },
        { name: "diesel", label: "Diesel" },
        { name: "electric", label: "Electric" },
      ],
    },
    {
      type: "select",
      name: "transmission",
      label: "Transmission",
      options: [
        { name: "manual", label: "Manual" },
        { name: "automatic", label: "Automatic" },
      ],
    },
  ];

  //   export default formInputs;

  const formik = useFormik({
    initialValues: {
      brand: "",
      year: "",
      mileage: "",
      price: "",
      bodyType: "",
      fuelType: "",
      transmission: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const { data } = useSelector((state) => state?.miniHomePageSlice);
  console.log("🚀 ~ CatalogFilterSection ~ data:", data)

  return (
    <div className="container mx-auto py-16 px-4">
      <MainHeading
        heading={`${data?.vehicleData?.totalCount} Passenger Cars`}
        textColor="darkBlue"
        textSize="text-[40px]"
      />
      {/* <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-4 gap-4 items-center"
      >
        {formInputs.map((input) => (
          <div key={input.name} className="flex flex-col">
            <label htmlFor={input.name} className="text-darkBlue mb-1">
              {input.label}
            </label>
            <select
              id={input.name}
              name={input.name}
              value={formik.values[input.name]}
              onChange={(e) => {
                formik.handleChange(e);
                if (input.name === "brand") setSelectedBrand(e.target.value);
              }}
              onBlur={formik.handleBlur}
              className="w-full appearance-none rounded-[100px] bg-white border border-gray-300 py-2 px-4 text-base text-DarkBlue font-medium outline-none"
            >
              {input.options.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.label}
                </option>
              ))}
            </select>
            {formik.errors[input.name] && formik.touched[input.name] && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors[input.name]}
              </p>
            )}
          </div>
        ))}

        <div className="mt-7">
          <button
            type="submit"
            className=" bg-primary text-white py-2  rounded-[100px]  transition w-full"
          >
            Search
          </button>
        </div>
      </form> */}
    </div>
  );
};
export default CatalogFilterSection;
