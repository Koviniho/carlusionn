/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useFormik } from "formik";
import Button from "../../Button";
import * as Yup from "yup";
import CustomInput from "../../Input/custoInput";
import Select from "react-select";
import useUserInfo from "../../../hooks/useUserInfo";
import { useMemo, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaChevronDown } from "react-icons/fa";
import Text from "../../Heading/text";
import { useDispatch } from "react-redux";
import { addNewContract, getAllContract } from "../../../store/features/contract/contractSlice";

const vehicleFeaturesFields = [
  {
    name: "typeApproval",
    label: "Determine Vehicle",
    placeholder: "ABC123",
    type: "text",
    options: [
      { value: "", label: "Select Type Approval" },
      { value: "european", label: "European Type Approval (ECWVTA)" },
      { value: "national", label: "National Type Approval" },
      { value: "smallSeries", label: "Small Series Type Approval" },
      { value: "individual", label: "Individual Vehicle Approval (IVA)" },
      { value: "usDot", label: "U.S. DOT Compliance" },
    ],
  },
  {
    name: "make",
    label: "Make",
    type: "select",
    options: [
      { value: "", label: "Select Make" },
      { value: "Toyota", label: "Toyota" },
      { value: "Honda", label: "Honda" },
      { value: "Ford", label: "Ford" },
      { value: "Chevrolet", label: "Chevrolet" },
      { value: "BMW", label: "BMW" },
      { value: "Mercedes-Benz", label: "Mercedes-Benz" },
      { value: "Audi", label: "Audi" },
      { value: "Volkswagen", label: "Volkswagen" },
      { value: "Hyundai", label: "Hyundai" },
      { value: "Nissan", label: "Nissan" },
      { value: "Kia", label: "Kia" },
      { value: "Mazda", label: "Mazda" },
      { value: "Subaru", label: "Subaru" },
      { value: "Tesla", label: "Tesla" },
      { value: "Volvo", label: "Volvo" },
      { value: "Porsche", label: "Porsche" },
      { value: "Jaguar", label: "Jaguar" },
      { value: "Land Rover", label: "Land Rover" },
      { value: "Lexus", label: "Lexus" },
    ],
  },
  // {
  //   name: "model",
  //   label: "Model",
  //   type: "select",
  //   options: [
  //     { value: "", label: "Select" },
  //     { value: "option-1", label: "Option 1" },
  //     { value: "option-2", label: "Option 2" },
  //   ],
  // },
  { name: "version", label: "Version", placeholder: "Enter Version" },

  {
    name: "bodyType",
    label: "Body Type",
    type: "select",
    options: [
      { value: "", label: "Select Type" },
      { value: "sedan", label: "Sedan" },
      { value: "suv", label: "SUV" },
      { value: "hatchback", label: "Hatchback" },
      { value: "coupe", label: "Coupe" },
      { value: "convertible", label: "Convertible" },
      { value: "wagon", label: "Wagon" },
      { value: "pickup", label: "Pickup Truck" },
      { value: "minivan", label: "Minivan" },
      { value: "crossover", label: "Crossover" },
      { value: "electric", label: "Electric" },
    ],
  },
  {
    name: "vehicleColor",
    label: "Vehicle color",
    type: "select",
    placeholder: "Choose Color",
    options: [
      { value: "", label: "Choose Color" },
      { value: "black", label: "Black" },
      { value: "white", label: "White" },
      { value: "gray", label: "Gray" },
      { value: "silver", label: "Silver" },
      { value: "red", label: "Red" },
      { value: "blue", label: "Blue" },
      { value: "green", label: "Green" },
      { value: "yellow", label: "Yellow" },
      { value: "orange", label: "Orange" },
      { value: "brown", label: "Brown" },
      { value: "beige", label: "Beige" },
      { value: "purple", label: "Purple" },
      { value: "pink", label: "Pink" },
      { value: "gold", label: "Gold" },
      { value: "bronze", label: "Bronze" },
      { value: "turquoise", label: "Turquoise" },
      { value: "violet", label: "Violet" },
      { value: "multicolor", label: "Multicolor" },
      { value: "champagne", label: "Champagne" },
      { value: "burgundy", label: "Burgundy" },
      { value: "copper", label: "Copper" },
      { value: "graphite", label: "Graphite" },
      { value: "charcoal", label: "Charcoal" },
      { value: "navy", label: "Navy Blue" },
      { value: "midnightblue", label: "Midnight Blue" },
      { value: "skyblue", label: "Sky Blue" },
      { value: "lime", label: "Lime Green" },
      { value: "olive", label: "Olive Green" },
      { value: "mint", label: "Mint Green" },
      { value: "teal", label: "Teal" },
      { value: "rose", label: "Rose" },
      { value: "lavender", label: "Lavender" },
      { value: "matteblack", label: "Matte Black" },
      { value: "mattegray", label: "Matte Gray" },
      { value: "matteblue", label: "Matte Blue" },
      { value: "mattered", label: "Matte Red" },
      { value: "pearlwhite", label: "Pearl White" },
      { value: "chameleon", label: "Chameleon" },
      { value: "carbonfiber", label: "Carbon Fiber" },
      { value: "custom", label: "Custom Color" },
    ],
  },
  {
    name: "interiorColor",
    label: "interior color",
    type: "select",

    placeholder: "Choose Color",
    options: [
      { value: "", label: "Choose Color" },
      { value: "black", label: "Black" },
      { value: "white", label: "White" },
      { value: "gray", label: "Gray" },
      { value: "silver", label: "Silver" },
      { value: "red", label: "Red" },
      { value: "blue", label: "Blue" },
      { value: "green", label: "Green" },
      { value: "yellow", label: "Yellow" },
      { value: "orange", label: "Orange" },
      { value: "brown", label: "Brown" },
      { value: "beige", label: "Beige" },
      { value: "purple", label: "Purple" },
      { value: "pink", label: "Pink" },
      { value: "gold", label: "Gold" },
      { value: "bronze", label: "Bronze" },
      { value: "turquoise", label: "Turquoise" },
      { value: "violet", label: "Violet" },
      { value: "multicolor", label: "Multicolor" },
      { value: "champagne", label: "Champagne" },
      { value: "burgundy", label: "Burgundy" },
      { value: "copper", label: "Copper" },
      { value: "graphite", label: "Graphite" },
      { value: "charcoal", label: "Charcoal" },
      { value: "navy", label: "Navy Blue" },
      { value: "midnightblue", label: "Midnight Blue" },
      { value: "skyblue", label: "Sky Blue" },
      { value: "lime", label: "Lime Green" },
      { value: "olive", label: "Olive Green" },
      { value: "mint", label: "Mint Green" },
      { value: "teal", label: "Teal" },
      { value: "rose", label: "Rose" },
      { value: "lavender", label: "Lavender" },
      { value: "matteblack", label: "Matte Black" },
      { value: "mattegray", label: "Matte Gray" },
      { value: "matteblue", label: "Matte Blue" },
      { value: "mattered", label: "Matte Red" },
      { value: "pearlwhite", label: "Pearl White" },
      { value: "chameleon", label: "Chameleon" },
      { value: "carbonfiber", label: "Carbon Fiber" },
      { value: "custom", label: "Custom Color" },
    ],
  },
  {
    name: "transmission",
    label: "Transmission",
    type: "select",
    options: [
      { value: "", label: "Select Transmission" },
      { value: "manual", label: "Manual" },
      { value: "automatic", label: "Automatic" },
      { value: "cvt", label: "Continuously Variable Transmission (CVT)" },
      { value: "dct", label: "Dual-Clutch Transmission (DCT)" },
      { value: "tiptronic", label: "Tiptronic" },
      { value: "semi-automatic", label: "Semi-Automatic" },
    ],
  },
  {
    name: "type",
    label: "Type",
    type: "select",
    options: [
      { value: "", label: "Select Type" },
      { value: "passenger", label: "Passenger Vehicle" },
      { value: "commercial", label: "Commercial Vehicle" },
      { value: "heavy-duty", label: "Heavy-Duty Vehicle" },
      { value: "motorcycle", label: "Motorcycle" },
      { value: "bus", label: "Bus" },
      { value: "truck", label: "Truck" },
      { value: "agricultural", label: "Agricultural Vehicle" },
      { value: "construction", label: "Construction Vehicle" },
      { value: "special-purpose", label: "Special Purpose Vehicle" },
    ],
  },
  {
    name: "drive",
    label: "Drive",
    type: "select",
    options: [
      { value: "", label: "Select Drive Type" },
      { value: "Front-Wheel Drive (FWD)", label: "Front-Wheel Drive (FWD)" },
      { value: "Rear-Wheel Drive (RWD)", label: "Rear-Wheel Drive (RWD)" },
      { value: "All-Wheel Drive (AWD)", label: "All-Wheel Drive (AWD)" },
      { value: "Four-Wheel Drive (4WD)", label: "Four-Wheel Drive (4WD)" },
    ],
  },
  {
    name: "fuel",
    label: "Fuel",
    type: "select",
    options: [
      { value: "", label: "Select Fuel Type" },
      { value: "petrol", label: "Petrol" },
      { value: "diesel", label: "Diesel" },
      { value: "electric", label: "Electric" },
      { value: "hybrid", label: "Hybrid (Petrol/Electric)" },
      { value: "plug-in-hybrid", label: "Plug-in Hybrid (PHEV)" },
      { value: "cng", label: "Compressed Natural Gas (CNG)" },
      { value: "lpg", label: "Liquefied Petroleum Gas (LPG)" },
      { value: "hydrogen", label: "Hydrogen Fuel Cell" },
    ],
  },
];

const conditionFields = [
  {
    name: "vehicleCondition",
    label: "Vehicle Condition",
    type: "select",
    options: [
      { value: "", label: "Select Vehicle Condition" },
      { value: "new", label: "New" },
      { value: "used", label: "Used" },
      { value: "certified-preowned", label: "Certified Pre-Owned" },
      { value: "damaged", label: "Damaged" },
      { value: "salvage", label: "Salvage" },
      { value: "rebuilt", label: "Rebuilt" },
      { value: "restored", label: "Restored" },
    ],
  },

  { name: "firstRegistration", label: "First Registration", type: "date" },

  { name: "mileage", label: "Kilometer", type: "number" },
  { name: "lastMFK", label: "Last MFK", type: "date" },
  { name: "fromMFK", label: "From MFK", type: "checkbox" },
  {
    name: "warranty",
    label: "Warranty",
    type: "select",
    options: [
      { value: "", label: "Select Warranty Duration" },
      { value: "1_year", label: "1 Year" },
      { value: "2_years", label: "2 Years" },
      { value: "3_years", label: "3 Years" },
      { value: "4_years", label: "4 Years" },
      { value: "5_years", label: "5 Years" },
      { value: "extended", label: "Extended Warranty (More than 5 Years)" },
      { value: "none", label: "No Warranty" },
    ],
  },
];

const priceFields = [
  {
    name: "purchasePrice_CHF",
    label: "Purchase Price - CHF",
    placeholder: "Purchase Price",
    type: "number",
  },
  {
    name: "newPrice",
    label: "New Price- CHF",
    placeholder: "New Price",
    type: "number",
  },
];
const equipmentFields = [
  {
    name: "optionalFeature",
    label: "Search function",
    placeholder: "Search function",
  },
  { label: "Ablagenpaket", type: "checkbox" },
  { label: "Abstandsregeltempomat", type: "checkbox" },
  { label: "Adaptives Kurvenlicht", type: "checkbox" },
  {
    label: "Alarmanlage Mit Innenraumüberwachung Und Neigungssensor",
    type: "checkbox",
  },
  { label: "Hängevorrichtung Mit Abnehmbarem", type: "checkbox" },
  { label: "Apps", type: "checkbox" },
  { label: "Assist: Park Distance Control Hinten", type: "checkbox" },
  { label: "Assist: Park Distance Control Vorne Und Hinten", type: "checkbox" },
  { label: "Aussenspiegelpaket", type: "checkbox" },
  { label: "BMW Individual Edelholzausführung", type: "checkbox" },
  { label: "BMW Individual Erweiterte", type: "checkbox" },
  { label: "BMW Individual Holzintarsie Für", type: "checkbox" },
  { label: "BMW Individual Komposition", type: "checkbox" },
];

const validationSchema = Yup.object({
  customerId: Yup.string().required("Customer Name is required"),
  sellerId: Yup.string().required("Sales person is required"),
  creationDate: Yup.date().required("Creation Date is required"),
  status: Yup.string().required("Status is required"),

  typeApproval: Yup.string().required("Determine Vehicle is required"),
  make: Yup.string().required("Make is required"),
  version: Yup.string().required("Version is required"),
  bodyType: Yup.string().required("Body Type is required"),
  vehicleColor: Yup.string().required("Vehicle color is required"),
  interiorColor: Yup.string().required("Interior color is required"),
  transmission: Yup.string().required("Transmission is required"),
  type: Yup.string().required("Type is required"),
  drive: Yup.string().required("Drive is required"),
  fuel: Yup.string().required("Fuel is required"),

  vehicleCondition: Yup.string().required("Vehicle Condition is required"),
  firstRegistration: Yup.date().required("Placing in the market is required"),
  mileage: Yup.number()
    .required("Kilometer is required")
    .positive("Must be a positive number"),
  lastMFK: Yup.date().required("Last MFK is required"),
  fromMFK: Yup.boolean(),
  warranty: Yup.string().required("Warranty is required"),

  purchasePrice_CHF: Yup.number()
    .required("Purchase Price is required")
    .positive("Must be a positive number"),
  newPrice: Yup.number()
    .required("New Price is required")
    .positive("Must be a positive number"),
});

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
const PurchaseAgreementForm = ({
  vehicleOptions,
  customerOptions,
  setSearchInput,
  searchInput,
  selectedContract,
  setAddContract,
}) => {
  const dispatch=useDispatch();
  const userData = useUserInfo();
  const fields = [
    // {
    //   name: "customerId",
    //   label: "Customer Name",
    //   type: "select",
    //   options: [
    //     { value: "", label: "Select Customer" },
    //     { value: "John Doe", label: "John Doe" },
    //     { value: "Jane Smith", label: "Jane Smith" },
    //     { value: "Alice Johnson", label: "Alice Johnson" },
    //   ],
    // },
    {
      name: "sellerId",
      label: "Sales person",
      type: "select",
      options: [
        { value: "", label: "Select Seller" },
        { value: userData?.userId, label: userData?.username },
      ],
    },

    { name: "creationDate", label: "Creation Date", type: "date" },
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
  ];
  const formik = useFormik({
    initialValues: {
      customerId: "",
      sellerId: "",
      creationDate: "",
      status: "",
      version: "",
      mileage: "",
      firstRegistration: "",
      lastMFK: "",
      fromMFK: false, // Checkbox default to false
      purchasePrice_CHF: "",
      newPrice: "",
      typeApproval: "",
      make: "",
      // model: "", // Uncomment if needed
      bodyType: "",
      vehicleColor: "",
      interiorColor: "",
      transmission: "",
      type: "",
      drive: "",
      fuel: "",
      vehicleCondition: "",
      warranty: "",
    },
    validationSchema,
    onSubmit:async (values) => {
      const {
        vehicleCondition,
        firstRegistration,
        mileage,
        lastMFK,
        fromMFK,
        warranty,
        purchasePrice_CHF,
        newPrice,
        typeApproval,
        make,
        version,
        bodyType,
        vehicleColor,
        interiorColor,
        transmission,
        type,
        drive,
        fuel,
        ...remainingValues
      } = values;
      const vehicleFeatureBuy={
        typeApproval,
        make,
        version,
        bodyType,
        vehicleColor,
        interiorColor,
        transmission,
        type,
        drive,
        fuel,
      }
      const condition = {
        vehicleCondition,
        firstRegistration,
        mileage,
        lastMFK,
        fromMFK,
        warranty,
      };
      const price = {
        purchasePrice_CHF,
        newPrice,
      };
      const payload = {
        ...remainingValues,
        optionalFeature:additionalFeature,
        condition,
        price,
        vehicleFeatureBuy,
        contractType:selectedContract
      };
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
  ///////////// for integration of optional Equipment////////////////
  const [optionalEquipment, setOptionalEquipment] = useState(true);
  const [searchOptional, setSearchOptional] = useState("");
  const [additionalFeature, setAdditionalFeature] = useState([]);
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
    <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-4">
      {renderSelectField("customerId", "Customer Name", customerOptions)}
      {fields.map((field) => (
        <CustomInput
          key={field.name}
          type={field.type}
          name={field.name}
          label={field.label}
          value={formik.values[field.name]}
          options={field?.options || []}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors[field.name]}
          touched={formik.touched[field.name]}
        />
      ))}

      <h2 className=" text-xl font-medium pt-4 ">Vehicle Features</h2>
      {vehicleFeaturesFields.map((field) => (
        <CustomInput
          key={field.name}
          type={field.type}
          name={field.name}
          label={field.label}
          value={formik.values[field.name]}
          placeholder={field.placeholder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors[field.name]}
          touched={formik.touched[field.name]}
          options={field?.options || []}
        />
      ))}
      <h2 className=" text-xl font-medium pt-4 ">Condition</h2>
      {conditionFields.map((field) => (
        <CustomInput
          key={field.name}
          type={field.type}
          name={field.name}
          label={field.label}
          value={formik.values[field.name]}
          placeholder={field.placeholder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors[field.name]}
          touched={formik.touched[field.name]}
          options={field?.options || []}
        />
      ))}
      <h2 className=" text-xl font-medium pt-4 ">Price</h2>
      {priceFields.map((field) => (
        <CustomInput
          key={field.name}
          type={field.type}
          name={field.name}
          label={field.label}
          value={formik.values[field.name]}
          placeholder={field.placeholder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors[field.name]}
          touched={formik.touched[field.name]}
          options={field?.options || []}
        />
      ))}
      {/* <h2 className=" text-xl font-medium pt-4 ">Equipment</h2>
      {equipmentFields.map((field) => (
        <CustomInput
          key={field.name}
          type={field.type}
          name={field.name}
          label={field.label}
          value={formik.values[field.name]}
          placeholder={field.placeholder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors[field.name]}
          touched={formik.touched[field.name]}
          options={field?.options || []}
        />
      ))} */}

      <div className="optionalEquipment1 my-5">
        <div className="flex items-center gap-3">
          <Text
            content={"Equipment "}
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
            optionalEquipment ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
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
                  Math.ceil(filteredFeatures.length / itemsPerPageOptional)
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
                  Math.ceil(filteredFeatures.length / itemsPerPageOptional)
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
      <h2 className=" text-xl font-medium pt-4 ">Technical Data</h2>
      <div className="bg-blue-200 p-3 text-xs ">
        Bitte wahle eine treibleaffert Dann wir dir mehr ibformation anzeigen
      </div>
      <div>
        <Button
          type="button"
          onClick={formik.handleSubmit}
          text="Create Agreement"
          className="w-full"
          borderRadius="rounded-md"
          textColor="white"
        />
      </div>
    </form>
  );
};

export default PurchaseAgreementForm;
