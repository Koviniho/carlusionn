/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../Button";
import CustomInput from "../../../Input/custoInput";
import { useEffect, useMemo, useState } from "react";
import { fetchVehicleMakers } from "../../../../store/features/vehicle/getVehicleMakersSlice";
import { fetchVehicleModels } from "../../../../store/features/vehicle/getVehicleModelSlice";
import { FaAngleLeft, FaAngleRight, FaChevronDown } from "react-icons/fa";
import Text from "../../../Heading/text";

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: currentYear - 1899 }, (_, i) => {
  const year = 1900 + i;
  return { value: year, label: year.toString() };
});
const basincInfoFields = [
  {
    name: "marke",
    type: "select",
    label: "Select Make",
    placeholder: "select make",
    options: [
      {
        label: "option-1",
        value: "option-1",
      },
      {
        label: "option-2",
        value: "option-2",
      },
    ],
  },
  {
    name: "model",
    type: "select",
    label: "Select Model",
    options: [
      {
        label: "option-1",
        value: "option-1",
      },
      {
        label: "option-2",
        value: "option-2",
      },
    ],
  },
  {
    name: "fuel",
    type: "select",
    label: "Select Fuel Type",
    options: [
      { value: "", label: "Select fuel type" },
      { value: "petrol", label: "Petrol (Gasoline)" },
      { value: "diesel", label: "Diesel" },
      { value: "electric", label: "Electric" },
      { value: "hybrid_petrol", label: "Hybrid (Petrol-Electric)" },
      { value: "hybrid_diesel", label: "Hybrid (Diesel-Electric)" },
      { value: "phev", label: "Plug-in Hybrid (PHEV)" },
      { value: "hydrogen_fuel_cell", label: "Hydrogen Fuel Cell" },
      { value: "cng", label: "CNG (Compressed Natural Gas)" },
      { value: "lpg", label: "LPG (Liquefied Petroleum Gas)" },
      { value: "ethanol", label: "Ethanol (Flex Fuel / E85)" },
      { value: "biodiesel", label: "Biodiesel" },
      { value: "methanol", label: "Methanol" },
      { value: "propane", label: "Propane" },
      { value: "synthetic_fuel", label: "Synthetic Fuel (eFuel)" },
      { value: "solar", label: "Solar-Powered" },
      { value: "hydrogen_ic", label: "Hydrogen Internal Combustion" },
      { value: "biogas", label: "Biogas" },
    ],
  },
  {
    name: "bodyType",
    type: "select",
    label: "Select Body Type",
    options: [
      { value: "", label: "Select body type" },
      { value: "sedan", label: "Sedan" },
      { value: "hatchback", label: "Hatchback" },
      { value: "suv", label: "SUV" },
      { value: "crossover", label: "Crossover" },
      { value: "coupe", label: "Coupe" },
      { value: "convertible", label: "Convertible" },
      { value: "wagon", label: "Wagon" },
      { value: "pickup", label: "Pickup Truck" },
      { value: "minivan", label: "Minivan" },
      { value: "van", label: "Van" },
      { value: "roadster", label: "Roadster" },
      { value: "sports_car", label: "Sports Car" },
      { value: "luxury_sedan", label: "Luxury Sedan" },
      { value: "offroad", label: "Off-Road Vehicle" },
      { value: "microcar", label: "Microcar" },
      { value: "limousine", label: "Limousine" },
      { value: "jeep", label: "Jeep" },
      { value: "targa", label: "Targa" },
      { value: "fastback", label: "Fastback" },
      { value: "shooting_brake", label: "Shooting Brake" },
      { value: "muscle_car", label: "Muscle Car" },
      { value: "electric_sedan", label: "Electric Sedan" },
      { value: "electric_suv", label: "Electric SUV" },
      { value: "kei_car", label: "Kei Car" },
      { value: "campervan", label: "Campervan" },
      { value: "bus", label: "Bus" },
      { value: "station_wagon", label: "Station Wagon" },
      { value: "ute", label: "Ute (Utility Vehicle)" },
      { value: "dune_buggy", label: "Dune Buggy" },
      { value: "hearse", label: "Hearse" },
      { value: "fire_truck", label: "Fire Truck" },
      { value: "police_car", label: "Police Car" },
      { value: "armored_vehicle", label: "Armored Vehicle" },
    ],
  },
  {
    name: "yearFrom",
    type: "select",
    label: "Year From",
    options: yearOptions,
  },
  {
    name: "yearTo",
    type: "select",
    label: "Year To",
    options: yearOptions,
  },
  {
    name: "priceFrom",
    type: "number",
    label: "Price From",
    placeholder: "Enter min price",
  },
  {
    name: "priceTo",
    type: "number",
    label: "Price To",
    placeholder: "Enter max price",
  },
  {
    name: "mileageFrom",
    type: "number",
    label: "Mileage From",
    placeholder: "Enter min mileage",
  },
  {
    name: "mileageTo",
    type: "number",
    label: "Mileage To",
    placeholder: "Enter max mileage",
  },
  {
    name: "condition",
    type: "select",
    label: "Select Condition",
    options: [
      { value: "", label: "Choose Condition" },
      { value: "newVehicle", label: "New Vehicle" },
      { value: "occasion", label: "Occasion" },
      { value: "vintageCars", label: "Vintage Cars" },
      { value: "demonstrationModal", label: "Demonstration model" },
    ],
  },
  {
    name: "location",
    type: "text",
    label: "Location",
    placeholder: "enter your location",
  },
  {
    name: "abMFK",
    type: "checkbox",
    label: "AB MFK",
  },
];
const featureList = [
  "360-Camera",
  "ABS",
  "Adaptive cruise control",
  "Adaptive cornering light",
  "alarm system",
  "Alcantara seats",
  "aluminum rims",
  "Android Auto",
  "removable trailer hitch",
  "trailer hitch fix",
  "swivel trailer coupling",
  "Apple CarPlay",
  "Automatic air conditioning",
  "Bluetooth interface",
  "Brake assist",
  "Chromelemente",
  "DAB Radio",
  "anti-theft device",
  "differential lock",
  "Electrically adjustable seat",
  "Electric windows",
  "Electric tailgate",
  "ESP",
  "double doors",
  "hands-free system",
  "Floor",
  "luggage rack",
  "Hardtop",
  "Head-up-Display",
  "Isofix",
  "Suitcase",
  "laser headlights",
  "speakers",
  "LED headlights",
  "leather seats",
  "air suspension",
  "Manual air conditioning",
  "navigation system",
  "portable navigation system",
  "Panoramic roof",
  "rear parking sensors",
  "front parking sensors",
  "Park assistant",
  "backrest protection",
  "Rear view camera",
  "sunroof",
  "sliding door",
  "keyless entry",
  "fast charging",
  "seat ventilation",
  "seat heating",
  "special paint",
  "sports exhaust",
  "sports seats",
  "Lane Keeping Assist",
  "auxiliary heating",
  "fabric seats",
  "Stop-Start System",
  "partial leather seats",
  "Cruise control",
  "blind spot assistant",
  "Reinforced suspension",
  "xenon headlights",
  "Additional instrumentation",
];
const CarDetailsStepper = ({formik,additionalFeature,setAdditionalFeature }) => {
  console.log("🚀 ~ CarDetailsStepper ~ formik:", formik)
  const dispatch = useDispatch();
  const { vehicleMakers } = useSelector(
    (state) => state?.allVehicleMakersSlice
  );
  const { VehicleModels } = useSelector((state) => state?.allVehicleModelSlice);
  const vehicleMakersOptions = [
    { value: "", label: "select an option" },
    ...(vehicleMakers?.data?.map((make) => ({ value: make, label: make })) ||
      []),
  ];
  const vehicleModelsOptions = [
    { value: "", label: "Select an option" },
    ...Array.from(
      new Set(VehicleModels?.data || []) // Remove duplicates
    ).map((model) => ({ value: model, label: model })),
  ];

  useEffect(() => {
    dispatch(fetchVehicleMakers());
  }, [dispatch]);

  useEffect(() => {
    if (formik?.values?.marke) {
      dispatch(fetchVehicleModels({ make: formik?.values?.marke }));
    }
  }, [dispatch, formik?.values?.marke]);

  ///////////// for optional equipment/////////////
    const [optionalEquipment, setOptionalEquipment] = useState(true);
    ///////////// for integration of optional Equipment////////////////
    const [searchOptional, setSearchOptional] = useState("");

    console.log("🚀 ~ CarDetailsStepper ~ additionalFeature:", additionalFeature)
    const [currentOptionalPage, setCurrentOptionalPage] = useState(1);
    const itemsPerPageOptional = 10;
  
    const filteredFeatures = useMemo(() => {
      return featureList.filter((feature) =>
        feature.toLowerCase().includes(searchOptional.toLowerCase())
      );
    }, [searchOptional]);
  
    // 📌 **Paginate the results (Show only 10 per page)**
    const paginatedFeatures = useMemo(() => {
      const startIndex = (currentOptionalPage - 1) * itemsPerPageOptional;
      return filteredFeatures.slice(
        startIndex,
        startIndex + itemsPerPageOptional
      );
    }, [filteredFeatures, currentOptionalPage]);
  
  return (
    <div className="space-y-5">
      <section>
        <h2 className=" text-xl pt-4 font-[600] mb-3">Basic Information</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {basincInfoFields.map((input) => (
            <CustomInput
              key={input.name}
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              label={input.label}
              required={input.required}
              value={formik.values[input.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched[input.name] ? formik.errors[input.name] : ""
              }
              touched={formik.touched[input.name]}
              options={
                input.name === "marke"
                  ? vehicleMakersOptions
                  : input.name === "model"
                  ? vehicleModelsOptions
                  : input.options || []
              }
            />
          ))}
        </div>
      </section>
          <div className="optionalEquipment1 my-5">
                    <div className="flex items-center gap-3">
                      <Text
                        content={"Optional Equipment "}
                        textColor="text-darkBlue"
                        fontWeight="font-medium"
                      />
                      <FaChevronDown
                        className={`cursor-pointer transform transition-transform duration-300 ${
                          optionalEquipment ? "rotate-180" : "rotate-0"
                        }`}
                        onClick={() => setOptionalEquipment(!optionalEquipment)}
                      />
                    </div>
                    <div
                      className={`transition-all gap-3 grid grid-cols-1 mt-4 space-y-2 duration-300 overflow-hidden ${
                        optionalEquipment
                          ? "max-h-screen opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {" "}
                      <>
                        <CustomInput
                          type={"text"}
                          name={"search"}
                          label={"search"}
                          value={searchOptional}
                          onChange={(e) => setSearchOptional(e.target.value)}
                          placeholder="Search for features..."
                        />
      
                        {paginatedFeatures.map((feature) => (
                          <CustomInput
                            key={feature}
                            type="checkbox"
                            name="additionalFeature"
                            label={feature}
                            checked={additionalFeature?.includes(feature)}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              setAdditionalFeature(
                                isChecked
                                  ? [...additionalFeature, feature] // Add
                                  : additionalFeature.filter((f) => f !== feature) // Remove
                              );
                            }}
                          />
                        ))}
                        {/* 📄 **Pagination Buttons** */}
                        <div className="flex items-center justify-center gap-3">
                          <div
                            disabled={currentOptionalPage === 1}
                            onClick={() => setCurrentOptionalPage((prev) => prev - 1)}
                            className="bg-white h-8 w-8 flex items-center justify-center text-primary border border-primary rounded-md cursor-pointer"
                          >
                            <FaAngleLeft />
                          </div>
      
                          {[
                            ...Array(
                              Math.ceil(
                                filteredFeatures.length / itemsPerPageOptional
                              )
                            ),
                          ].map((_, index) => (
                            <div
                              key={index + 1}
                              onClick={() => setCurrentOptionalPage(index + 1)}
                              className={`h-8 w-8 cursor-pointer flex items-center justify-center border rounded-md ${
                                currentOptionalPage === index + 1
                                  ? "bg-primary text-white"
                                  : "bg-white text-primary border-primary"
                              }`}
                            >
                              {index + 1}
                            </div>
                          ))}
      
                          <div
                            disabled={
                              currentOptionalPage >=
                              Math.ceil(
                                filteredFeatures.length / itemsPerPageOptional
                              )
                            }
                            onClick={() => setCurrentOptionalPage((prev) => prev + 1)}
                            className="bg-white h-8 w-8 flex items-center justify-center text-primary border border-primary rounded-md"
                          >
                            <FaAngleRight />
                          </div>
                        </div>
                      </>
                    </div>
                  </div>
   


   
      {/* <Filters/> */}
      <section className="flex justify-end">
        {/* <Button
          borderColor="primary"
          bgColor="transparent"
          textColor="primary"
          borderRadius="rounded-lg"
          text="Back"
          onClick={() => setCurrentStep((prev) => prev - 1)}
        /> */}
        <Button
          textColor="white"
          borderRadius="rounded-lg"
          text="Next"
          type="button"
          onClick={formik.handleSubmit}
        />
      </section>
    </div>
  );
};

export default CarDetailsStepper;
