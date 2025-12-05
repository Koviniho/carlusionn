/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaPlus,
  FaRegLightbulb,
} from "react-icons/fa";
import CustomInput from "../../Input/custoInput";
import { useFormik } from "formik";
import Button from "../../Button";
import {
  additionalDetail,
  addVehicleFirst,
  addVehicleHistoryDataInput,
  addVehicleInvestmentDataInput,
  addVehicleThird,
  detailedDataInput,
  makeAndModelSecondConditionInputs,
  makeAndModelSecondInputs,
  optionalEquipmentInput,
  optionalEquipmentTwoInput,
  previousOwnerDataInput,
  technicaldataInputs,
  vehicleConditionInputs,
  vehicleDocumentInputs,
  vehicleFeatures,
  vehiclePriceInputs,
} from "../../../Inputs/vehicle.input";
import Text from "../../../components/Heading/text";
import { FaChevronDown } from "react-icons/fa6";
import { CiCircleAlert, CiLight } from "react-icons/ci";
import { FaCarSide } from "react-icons/fa";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { GiTyre } from "react-icons/gi";
import Modal from "../../../components/modal/modal";
import Icons from "../../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVehicles,
  setLimit,
  setPage,
  setSearch,
} from "../../../store/features/vehicle/getAllVehicleSlice";
import Pagination from "../../Pagination";
import { ShimmerTable } from "react-shimmer-effects";
import PopUpModel from "../../Modals/pop-up-modals";
import { fetchVehicleMakers } from "../../../store/features/vehicle/getVehicleMakersSlice";
import { showErrorAlert, showSuccessAlert } from "../../sweetAlert/sweetAlert";
import axios from "../../../services/api";
import showToast from "../../../utils/toaster";
import { fetchVehicleModels } from "../../../store/features/vehicle/getVehicleModelSlice";
import Swal from "sweetalert2";
import * as Yup from "yup";
import Images from "../../../assets/images";
import { fetchAddedVehicles } from "../../../store/features/vehicle/getAddedVehicles";
const PhotographOptimallyArray = [
  { icons: <CiLight size={30} />, content: "In daylight" },
  { icons: <FaCarSide size={30} />, content: "All-around view" },
  {
    icons: <MdAirlineSeatReclineExtra size={30} />,
    content: "interior and exterior shots",
  },
  { icons: <GiTyre size={30} />, content: "Entire Equipment" },
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

const validationSchema = Yup.object().shape({
  make: Yup.string().required("Make is required"),
  model: Yup.string().required("Model is required"),
  version: Yup.string().required("Version is required"),
  location: Yup.string().required("Location is required"),
  trunkNumber: Yup.string().required("Trunk Number is required"),
  bodyType: Yup.string().required("Body Type is required"),
  vehicleType: Yup.string().required("Vehicle Type is required"),
  fuel: Yup.string().required("Fuel type is required"),
  drive: Yup.string().required("Drive type is required"),
  seats: Yup.number()
    .typeError("Seats must be a number")
    .integer("Seats must be an integer")
    .min(1, "Seats must be at least 1")
    .required("Seats are required"),
  doors: Yup.number()
    .typeError("Doors must be a number")
    .integer("Doors must be an integer")
    .min(1, "Doors must be at least 1")
    .required("Doors are required"),
  psKw: Yup.string().required("PS/KW is required"),
  capacity_cm3: Yup.number()
    .typeError("Capacity must be a number")
    .min(1, "Capacity must be at least 1")
    .required("Capacity is required"),
  cylinder: Yup.number()
    .typeError("Cylinders must be a number")
    .integer("Cylinders must be an integer")
    .min(1, "Cylinders must be at least 1")
    .required("Cylinders are required"),
  noOfGears: Yup.number()
    .typeError("Gears must be a number")
    .integer("Gears must be an integer")
    .min(1, "Gears must be at least 1")
    .required("Number of gears is required"),
  wheelbase_mm: Yup.number()
    .typeError("Wheelbase must be a number")
    .min(1, "Wheelbase must be at least 1")
    .required("Wheelbase is required"),
  trailerLoad_kg: Yup.number()
    .typeError("Trailer Load must be a number")
    .min(1, "Trailer Load must be at least 1")
    .required("Trailer Load is required"),
  typeApproval: Yup.string().required("Type Approval is required"),
  curbWeight_kg: Yup.number()
    .typeError("Curb Weight must be a number")
    .min(1, "Curb Weight must be at least 1")
    .required("Curb Weight is required"),
  payload_kg: Yup.number()
    .typeError("Payload must be a number")
    .min(1, "Payload must be at least 1")
    .required("Payload is required"),
  firstRegistration: Yup.date().required("First Registration is required"),
  co2Emission_G_km: Yup.number()
    .typeError("CO2 Emission must be a number")
    .min(1, "CO2 Emission must be at least 1")
    .required("CO2 Emission is required"),
  energyLabel: Yup.string().required("Energy Label is required"),
  emissionStandard: Yup.string().required("Emission Standard is required"),
  consumption_L_100km: Yup.number()
    .typeError("Consumption must be a number")
    .min(0, "Consumption cannot be negative")
    .required("Consumption is required"),
  standardEquipment: Yup.string().required("Standard Equipment is required"),
  vehicleColor: Yup.string().required("vehicle color is required"),
  interiorColor: Yup.string().required("interior color is required"),
  vehicleCondition: Yup.string().required("Vehicle condition is required"),
  kilometer: Yup.number()
    .required("Kilometer is required")
    .positive("Kilometer must be a positive number")
    .integer("Kilometer must be an integer"),
  lastMOT: Yup.date()
    .nullable()
    .typeError("Invalid date format")
    .max(new Date(), "Date cannot be in the future"),
  lastMFK: Yup.date()
    .nullable()
    .typeError("Invalid date format")
    .max(new Date(), "Date cannot be in the future"),
  warranty: Yup.string().required("Warranty is required"),
  sellingPrice_CHF: Yup.number()
    .required("Selling price is required")
    .positive("Selling price must be a positive number"),
  newPrice_CHF: Yup.number()
    .required("New price is required")
    .positive("New price must be a positive number"),
    height_mm: Yup.number()
    .nullable()
    .typeError("Width must be a number")
    .positive("Width must be a positive number"),
    width_mm: Yup.number()
    .nullable()
    .typeError("Width must be a number")
    .positive("Width must be a positive number"),
  length_mm: Yup.number()
    .nullable()
    .typeError("Length must be a number")
    .positive("Length must be a positive number"),
  VIN: Yup.string()
    .nullable(),
  serialNumber: Yup.string()
    .nullable(),
  referenceNumber: Yup.string()
    .nullable()
   
});
const AddVehicle = () => {
  const [addVehicle, setAddVehicle] = useState(false);
  const [showSecondPopup, setShowSecondPopup] = useState(false);
  const [showThirdPopup, setShowThirdPopup] = useState(false); // State for the second popup
  const [alreadyRecorded, setAlreadyRecorded] = useState(true);
  const [vehicleFeatured, setVehicleFeatured] = useState(true);
  const [vehicleCondition, setVehicleCondition] = useState(true);
  const [vehiclePrice, setVehiclePrice] = useState(true);
  const [optionalEquipment, setOptionalEquipment] = useState(true);
  const [optionalEquipmentTwo, setOptionalEquipmentTwo] = useState(true);
  const [detailsData, setDetailsData] = useState(true);
  const [showForthPopup, setShowForthPopup] = useState(false);
  const [showPhotographOptimally, setPhotographOptimally] = useState(true);
  const [showFifthPopUp, setShowFifthPopUp] = useState(false);
  const [showSixthPopup, setShowSixthPopup] = useState(false);
  const [showSeventhPopup, setShowSeventhPopup] = useState(false);
  const [ShowEighthPopup, setShowEighthPopup] = useState(false);
  const [ShowNinePopup, setShowNinePopup] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState("Typengenemigung");
  const [makeAndModelSecondPopup, setmakeAndModelSecondPopup] = useState(false);
  const [vihecleFeatured, setvihecleFeatured] = useState(false);
  const [makeModelCondtition, setmakeModelCondtition] = useState(false);
  const [technicaldata, setTechnicaldata] = useState(false);
  ///////////////////////for upload Images ////////////
  const fileInputRef = useRef(null);
  const [uploadCarImages, setUploadCarImages] = useState([]);
  const [uploadCars, setUploadCars] = useState([]);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    // Filter only valid images
    const validFiles = files.filter((file) => allowedTypes.includes(file.type));

    if (validFiles.length !== files.length) {
      showErrorAlert(
        "Invalid File",
        "Only JPG, JPEG, and PNG files are allowed."
      );
    }

    if (validFiles.length > 0) {
      setUploadCars((prev) => [...prev, ...validFiles]);
      const newImages = validFiles.map((file) => URL.createObjectURL(file));
      setUploadCarImages((prev) => [...prev, ...newImages]); // Add new images to state
    }
  };

  const handleDeleteImage = (index) => {
    setUploadCarImages(uploadCarImages.filter((_, i) => i !== index));
    setUploadCars(uploadCars.filter((_, i) => i !== index));
  };
  /////////////////////// for upload Documents ///////////////////
  const documentInputRef = useRef(null);
  const [uploadCarDocument, setUploadCarDocument] = useState([]);
  const [uploadDocument, setUploadDocument] = useState([]);

  const handleDocumentClick = () => {
    if (documentInputRef.current) {
      documentInputRef.current.click();
    }
  };

  const handleDocumentChange = (event) => {
    const files = Array.from(event.target.files);
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg", // Image types
      "application/pdf", // PDF
      "application/msword", // DOC
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
    ];

    // Filter only valid images
    const validFiles = files.filter((file) => allowedTypes.includes(file.type));

    if (validFiles.length !== files.length) {
      showErrorAlert(
        "Invalid File",
        "Only JPG, JPEG, PNG, PDF, DOC, and DOCX files are allowed."
      );
    }

    if (validFiles.length > 0) {
      setUploadDocument((prev) => [...prev, ...validFiles]);
      const newImages = validFiles.map((file) => URL.createObjectURL(file));
      setUploadCarDocument((prev) => [...prev, ...newImages]); // Add new images to state
    }
  };

  const handleDeleteDocument = (index) => {
    setUploadCarDocument(uploadCarDocument.filter((_, i) => i !== index));
    setUploadDocument(uploadDocument.filter((_, i) => i !== index));
  };

  ///////////////////////////////////////////////////////////////
  /////////////////////// for upload registration document ///////////////////
  const regInputRef = useRef(null);
  const [uploadRegDocument, setUploadRegDocument] = useState([]);
  const [uploadReg, setUploadReg] = useState([]);

  const handleRegClick = () => {
    if (regInputRef.current) {
      regInputRef.current.click();
    }
  };

  const handleRegChange = (event) => {
    const files = Array.from(event.target.files);
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg", // Image types
      "application/pdf", // PDF
      "application/msword", // DOC
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
    ];

    // Filter only valid images
    const validFiles = files.filter((file) => allowedTypes.includes(file.type));

    if (validFiles.length !== files.length) {
      showErrorAlert(
        "Invalid File",
        "Only JPG, JPEG, PNG, PDF, DOC, and DOCX files are allowed."
      );
    }

    if (validFiles.length > 0) {
      setUploadReg((prev) => [...prev, ...validFiles]);
      const newImages = validFiles.map((file) => URL.createObjectURL(file));
      setUploadRegDocument((prev) => [...prev, ...newImages]); // Add new images to state
    }
  };

  const handleDeleteReg = (index) => {
    setUploadRegDocument(uploadRegDocument.filter((_, i) => i !== index));
    setUploadReg(uploadReg.filter((_, i) => i !== index));
  };

  /////////////////////// for upload history document ///////////////////
  const historyInputRef = useRef(null);
  const [uploadHistoryDocument, setUploadHistoryDocument] = useState([]);
 
  const [uploadHistory, setUploadHistory] = useState([]);


  const handleHistoryClick = () => {
    if (historyInputRef.current) {
      historyInputRef.current.click();
    }
  };

  const handleHistoryChange = (event) => {
    const files = Array.from(event.target.files);
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg", // Image types
      "application/pdf", // PDF
      "application/msword", // DOC
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
    ];

    // Filter only valid images
    const validFiles = files.filter((file) => allowedTypes.includes(file.type));

    if (validFiles.length !== files.length) {
      showErrorAlert(
        "Invalid File",
        "Only JPG, JPEG, PNG, PDF, DOC, and DOCX files are allowed."
      );
    }

    if (validFiles.length > 0) {
      setUploadHistory((prev) => [...prev, ...validFiles]);
      const newImages = validFiles.map((file) => URL.createObjectURL(file));
      setUploadHistoryDocument((prev) => [...prev, ...newImages]); // Add new images to state
    }
  };

  const handleDeleteHistory = (index) => {
    setUploadHistoryDocument(
      uploadHistoryDocument.filter((_, i) => i !== index)
    );
    setUploadHistory(uploadHistory.filter((_, i) => i !== index));
  };

  //////////////////////////////for filter data  /////////////////////////////////
  const [filterLoader, setFilterLoader] = useState(false);
  const formik = useFormik({
    initialValues: addVehicleFirst.reduce((acc, field) => {
      if (field.name === "chooseVehicle") {
        acc[field.name] = "Typengenemigung"; // Set the default value for chooseVehicle
      } else {
        acc[field.name] = field.type === "select" ? "" : null; // Default: "" for select, null for others
      }
      return acc;
    }, {}),
    onSubmit: async (values) => {
      setFilterLoader(true);
      const { chooseVehicle, ...filteredValues } = values;
      const cleanedPayload = Object.fromEntries(
        Object.entries(filteredValues).filter(
          ([_, value]) => value !== null && value !== ""
        )
      );
      if (!selectedVehicle) {
        setFilterLoader(false);
        showToast("error", "please choose vehicle first");
        return;
      }
      if (
        !cleanedPayload.manufactureYear ||
        !cleanedPayload.manufacture_month
      ) {
        setFilterLoader(false);
        showToast(
          "error",
          "Manufacture year and manufacture month are required."
        );
        return;
      }
      const payload = {
        page,
        limit,
        ...cleanedPayload,
      };
      try {
        const response = await dispatch(fetchVehicles(payload)).unwrap();
        console.log("🚀 ~ onSubmit: ~ response:", response)

        setFilterLoader(false);

        handleFirstPopupSubmit();
      } catch (error) {
        setFilterLoader(false);
        Swal.fire({
          title: "Vehicle Not Found!",
          text: "Would you like to try another vehicle or add a new one?",
          icon: "error",
          showCancelButton: true,
          confirmButtonColor: "#1E599B",
          confirmButtonText: "Try Another Vehicle",
          cancelButtonText: "Add New Vehicle",
        }).then((result) => {
          if (result.isConfirmed) {
            // User wants to try another vehicle (reset form or take some action)
            formik.resetForm();
          } else {
            // User wants to add a new vehicle (trigger new vehicle flow)
            setShowThirdPopup(true);
            setAddVehicle(false);
          }
        });

        // if (error?.message) {
        //   showToast("error", error?.message);
        // } else {
        //   showToast("error", error);
        // }
        console.error("Error submitting vehicle data:", error);
      }
    },
  });

  const handleFirstPopupSubmit = () => {
    setAddVehicle(false);
    setShowSecondPopup(true);
    // if (formik.values.chooseVehicle === "Typengenemigung") {
    //   setShowSecondPopup(true);
    // }
    // if (formik.values.chooseVehicle === "Stammnummer") {
    //   setShowSecondPopup(true);
    // } else if (formik.values.chooseVehicle === "Make and Model") {
    //   // setmakeAndModelSecondPopup(true);
    //   setShowSecondPopup(true);
    // }
  };

  const processedInputs = (() => {
    switch (selectedVehicle) {
      case "Typengenemigung":
        return addVehicleFirst;

      case "Stammnummer":
        return [
          ...addVehicleFirst.filter(
            (input) => input.name !== "TG" && input.name !== "fahrzeugart"
          ),
          {
            name: "chassisnummer",
            label: "Enter Reference Number",
            placeholder: "Passenger Car",
            type: "number",
            required: true,
          },
        ];

      case "Make and Model":
        return [
          ...addVehicleFirst.filter((input) => input.name !== "fahrzeugart"),
          {
            name: "marke",
            label: "Make",
            placeholder: "Select Make",
            required: true,
            type: "select",
            options: [{ value: "", label: "Select Make" }],
          },
          {
            name: "modell",
            label: "Model",
            required: true,
            placeholder: "Select Model",
            type: "select",
            options: [{ value: "", label: "Select Model" }],
          },
        ];

      default:
        // Return the full array if no option is selected
        return addVehicleFirst;
    }
  })();

  // Handle `chooseVehicle` selection change
  const handleVehicleChange = (e) => {
    setSelectedVehicle(e.target.value);
    // formik.handleChange(e); // Update Formik state
    const { value } = e.target;

    formik.resetForm({
      values: {
        chooseVehicle: value, // Keep the selected value
        manufacture_month: "",
        manufactureYear: "",
        fahrzeugart: "",
        TG: "",
      },
    });
  };

  ////////////////// get all vehicles//////////////////////
  const dispatch = useDispatch();
  const { vehicles, loading, error, page, limit } = useSelector(
    (state) => state?.allVehicleSlice
  );
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

  /////////////for search//////////////////
  // const dispatch = useDispatch();
  const search = useSelector((state) => state?.allVehicleSlice?.search);
  const [searchTerm, setSearchTerm] = useState(search);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  // useEffect(() => {
  //   dispatch(setSearch(searchTerm));
  //   dispatch(fetchVehicles({ page: 1, limit: 10, search: searchTerm }));
  // }, [searchTerm, dispatch]);
  /////////////////for select vehicle ////////////////
  const [selectVehicle, setSelectVehicle] = useState(null);
  const handleRowClick = (item) => {
    setSelectVehicle((prev) => (prev?.ID === item.ID ? null : item));
  };
  ////////////third step add vehicle///////////
  const vehicleDataMapping = {
    bodyType: "aufbau",
    vehicleType: "gears",
    fuel: "treibstoff",
    drive: "antrieb",
    seats: "sitze",
    doors: "tueren",
    psKw: "ps_kw",
    capacity_cm3: "hubraum_cm3",
    cylinder: "zylinder",
    noOfGears: "anzahl_gaenge",
    wheelbase_mm: "radstand_mm",
    trailerLoad_kg: "anhaengelast_gebremst",
    typeApproval: "eu_typengenehmigung",
    curbWeight_kg: "leergewicht",
    payload_kg: "nutzlast",
    firstRegistration: "inverkehrsetzung",
    co2Emission_G_km: "co2_emission_g_km",
    energyLabel: "energieetikette",
    emissionStandard: "euro_norm",
    consumption_L_100km: "verbrauch_l_100km",
    standardEquipment: "serienmaesigge_ausstatung",
    make: "marke",
    model: "modell",
  };
  useEffect(() => {
    if (selectVehicle) {
      const updatedValues = {};

      addVehicleThird.forEach((field) => {
        const backendKey = vehicleDataMapping[field.name];
        if (backendKey && selectVehicle[backendKey] !== null) {
          updatedValues[field.name] = selectVehicle[backendKey]?.toString();
        }
      });

      formHandler.setValues((prevValues) => ({
        ...prevValues,
        ...updatedValues,
      }));
    }
  }, [selectVehicle]);

  ///////////// for integration of optional Equipment////////////////
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

  ////////////for details Data///////////
  const [saveDetailsData, setSaveDetailsData] = useState([]);
  ////////////for Extras///////////
  const [saveExtraData, setSaveExtraData] = useState([]);

  ///////////////// // for add previous owner/////////////
  const [previousOwners, setPreviousOwners] = useState([]);
  const handleAddPreviousOwner = () => {
    const newOwner = {
      name: formik.values.name,
      ownerType: formik.values.ownerType,
      from: formik.values.from,
      until: formik.values.until,
      yearOfBirth: formik.values.yearOfBirth,
      drivenKilometers: formik.values.drivenKilometers,
      status: formik.values.status,
      purchasePrice_CHF: formik.values.owner_purchasePrice_CHF,
    };
    const isEmptyField = Object.values(newOwner).some((value) => !value);

    if (isEmptyField) {
      showToast("error", "All fields are required.");
      return;
    }
    // Add new owner to the list
    setPreviousOwners([...previousOwners, newOwner]);
    setShowSeventhPopup(false);

    // Reset fields (Optional)
    formik.setValues({
      ...formik.values,
      name: "",
      from: "",
      until: "",
      yearOfBirth: "",
      drivenKilometers: "",
      status: "",
      owner_purchasePrice_CHF: "",
    });
  };
  const handleDeletePreviousOwner = (index) => {
    const newPreviousOwners = previousOwners.filter((_, i) => i !== index);
    setPreviousOwners(newPreviousOwners);
  };
  ///////////////// // for add history/////////////
  const [vehicleHistory, setVehicleHistory] = useState([]);
 
  const [historyDocuments, setHistoryDocuments] = useState({});

  const handleAddVehicleHistory = () => {
    const newHistoryEntry = {
      type: formik.values.type,
      location: formik.values.historyLocation,
      date: formik.values.date,
    };
    const isEmptyField = Object.values(newHistoryEntry).some((value) => !value);

    if (isEmptyField) {
      showToast("error", "All fields are required.");
      return;
    }
    if (uploadHistoryDocument.length === 0) {
      showToast("error", "Please upload at least one file.");
      return;
    }
    setShowEighthPopup(false);
    // Add new entry
    const newIndex = vehicleHistory.length;
    setVehicleHistory([...vehicleHistory, newHistoryEntry]);

    // Store the current documents for this entry, then reset uploads
    setHistoryDocuments({
      ...historyDocuments,
      [newIndex]: uploadHistory,
    });

    // Reset the file upload state for new history entries
    setUploadHistoryDocument([]);
    setUploadHistory([]);

    formik.setValues({
      ...formik.values,
      type: "",
      historyLocation: "",
      date: "",
    });
  };
  const handleDeleteHistoryEntry = (indexToDelete) => {
    // Remove from vehicleHistory array
    setVehicleHistory((prev) => prev.filter((_, index) => index !== indexToDelete));
  
    // Remove matching entry from historyDocuments object
    setHistoryDocuments((prev) => {
      const updated = { ...prev };
      delete updated[indexToDelete];
  
      // Optional: Re-key the remaining keys to match the new vehicleHistory indices
      const rekeyed = {};
      Object.keys(updated).forEach((key) => {
        const keyNum = parseInt(key);
        if (keyNum > indexToDelete) {
          rekeyed[keyNum - 1] = updated[key];
        } else if (keyNum < indexToDelete) {
          rekeyed[keyNum] = updated[key];
        }
      });
  
      return rekeyed;
    });
  };
  
  ///////////////// // for add investment expenses/////////////
  const InvestmentInputRef = useRef(null);
  const [uploadInvestmentDocument, setUploadInvestmentDocument] = useState([]);
  const [uploadInvestment, setUploadInvestment] = useState([]);

  const handleInvestmentClick = () => {
    if (InvestmentInputRef.current) {
      InvestmentInputRef.current.click();
    }
  };

  const handleInvestmentChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 1 || uploadInvestment.length > 0) {
      showErrorAlert(
        "Invalid Upload",
        "You can only upload one file at a time."
      );
      return;
    }
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg", // Image types
      "application/pdf", // PDF
      "application/msword", // DOC
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
    ];

    // Filter only valid images
    const validFiles = files.filter((file) => allowedTypes.includes(file.type));

    if (validFiles.length !== files.length) {
      showErrorAlert(
        "Invalid File",
        "Only JPG, JPEG, PNG, PDF, DOC, and DOCX files are allowed."
      );
    }

    if (validFiles.length > 0) {
      setUploadInvestment((prev) => [...prev, ...validFiles]);
      const newImages = validFiles.map((file) => URL.createObjectURL(file));
      setUploadInvestmentDocument((prev) => [...prev, ...newImages]); // Add new images to state
    }
  };

  const handleDeleteInvestment = (index) => {
    setUploadInvestmentDocument(
      uploadInvestmentDocument.filter((_, i) => i !== index)
    );
    setUploadInvestment(uploadInvestment.filter((_, i) => i !== index));
  };
  const [investmentExpenses, setInvestmentExpenses] = useState([]);
  const [investmentDocuments, setInvestmentDocuments] = useState({});

  const handleAddVehicleInvestment = () => {
    if (!formik.values.investmentFor) {
      showToast("error", "Investment For is required.");
      return;
    }
    if (!formik.values.amount_CHF) {
      showToast("error", "Amount (CHF) is required.");
      return;
    }
    if (!formik.values.investmentLocation) {
      showToast("error", "Investment Location is required.");
      return;
    }
    if (uploadInvestment.length === 0) {
      showToast("error", "Please upload at least one file.");
      return;
    }

    const newHistoryEntry = {
      investmentFor: formik.values.investmentFor,
      amount_CHF: formik.values.amount_CHF,
      investmentLocation: formik.values.investmentLocation,
    };

    // Add new entry
    const newIndex = investmentExpenses.length;
    setInvestmentExpenses([...investmentExpenses, newHistoryEntry]);

    // Store the current documents for this entry, then reset uploads
    setInvestmentDocuments({
      ...investmentDocuments,
      [newIndex]: uploadInvestment,
    });
    setShowNinePopup(false);
    // Reset the file upload state for new history entries
    setUploadInvestmentDocument([]);
    setUploadInvestment([]);

    formik.setValues({
      ...formik.values,
      investmentFor: "",
      amount_CHF: "",
      investmentLocation: "",
    });
  };
  const handleDeleteInvestmentEntry = (indexToDelete) => {
  
    setInvestmentExpenses((prev) => prev.filter((_, index) => index !== indexToDelete));
  
   
    setInvestmentDocuments((prev) => {
      const updated = { ...prev };
      delete updated[indexToDelete];
  
      // Re-key remaining items
      const rekeyed = {};
      Object.keys(updated).forEach((key) => {
        const keyNum = parseInt(key);
        if (keyNum > indexToDelete) {
          rekeyed[keyNum - 1] = updated[key];
        } else if (keyNum < indexToDelete) {
          rekeyed[keyNum] = updated[key];
        }
      });
  
      return rekeyed;
    });
  };
  
  ///////////////////////main Submit function //////////////////////
  const [loaderSubmitFunction, setLoaderSubmitFunction] = useState(false);
  const handleNext = async () => {
    const {
      status,
      owner_purchasePrice_CHF,
      marke,
      modell,
      chassisnummer,
      TG,
      chooseVehicle,
      fahrzeugart,
      manufacture_month,
      
      purchasePrice_CHF,
      plannedInvestment,
      seller,
      purchaseDate,
      name,
      ownerType,
      from,
      until,
      yearOfBirth,
      drivenKilometers,
      date,
      historyLocation,
      ...filteredValues
    } = formik.values;
    const {
      make,
      model,
      vehicleType,
      trunkNumber,
      bodyType,
      seats,
      doors,
      co2Emission_G_km,
      capacity_cm3,
      noOfGears,
      cylinder,
      curbWeight_kg,
      vehicleColor,
      interiorColor,
      sellingPrice_CHF,
      newPrice_CHF,
      vehicleCondition,
      kilometer,
      lastMOT,
      abMFK,
      lastMFK,
      warranty,
      height_mm,
      width_mm,
      length_mm,
      VIN,
      serialNumber,
      referenceNumber,
      ...remainingValues
    } = formHandler.values;
    const purchaseDetails = {
      purchasePrice_CHF,
      plannedInvestment,
      seller,
      purchaseDate,
    };
    const price = {
      sellingPrice_CHF,
      newPrice_CHF,
    };
    const vehicleDimension = {
      height_mm,
      width_mm,
      length_mm,
      VIN,
      serialNumber,
      referenceNumber,
    };
    const optionalEquipment = {
      vehicleDimension: vehicleDimension,
      // additionalFeature: formik.values.additionalFeature,
      additionalFeature: additionalFeature,
    };
    const condition = {
      vehicleCondition,
      kilometer,
      lastMOT,
      abMFK,
      lastMFK,
      warranty,
    };
    const vehicleFeatures = {
      interiorColor,
      vehicleColor,
    };

    const payload = {
      ...remainingValues,
      ...filteredValues,
      make: selectVehicle ? selectVehicle?.marke : formHandler.values.make,
      model: selectVehicle ? selectVehicle?.modell : formHandler.values.model,
      bodyType: String(bodyType),
      trunkNumber: String(trunkNumber),
      cylinder: Number(cylinder),
      curbWeight_kg: Number(curbWeight_kg),
      seats: Number(seats),
      doors: Number(doors),
      co2Emission_G_km: Number(co2Emission_G_km),
      capacity_cm3: Number(capacity_cm3),
      noOfGears: Number(noOfGears),
      type: vehicleType,
      // detailedData: saveDetailsData,
      // extras: saveExtraData,
      optionalEquipment,
      price,
      condition,
      vehicleFeatures,
      purchaseDetails,
      previousOwner: previousOwners,
      vehicleHistory: vehicleHistory,
      plannedInvestmentDetails: investmentExpenses,
    };
    // images :uploadCars
    const cleanedPayload = Object.fromEntries(
      Object.entries(payload).filter(
        ([_, value]) => value !== null && value !== undefined && value !== ""
      )
    );
    const formData = new FormData();
    Object.entries(cleanedPayload).forEach(([key, value]) => {
      if (typeof value === "object" && value !== null && value !== "N/A" && value !== "") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });
    if (saveDetailsData.length) {
      formData.append("detailedData", saveDetailsData.join(","));
    }
    if (saveExtraData.length) {
      formData.append("extras", saveExtraData.join(","));
    }

    // Append images in binary format
    uploadCars.forEach((imageObj) => {
      formData.append(`images`, imageObj);
    });
    uploadDocument.forEach((imageObj) => {
      formData.append(`documents`, imageObj);
    });
    uploadReg.forEach((imageObj) => {
      formData.append(`registration`, imageObj);
    });

    Object.keys(historyDocuments).forEach((historyIndex) => {
      historyDocuments[historyIndex].forEach((file) => {
        formData.append(`history/${historyIndex}`, file);
      });
    });
    Object.keys(investmentDocuments).forEach((historyIndex) => {
      investmentDocuments[historyIndex].forEach((file) => {
        formData.append(`investment-invoice/${historyIndex}`, file);
      });
    });

    try {
      setLoaderSubmitFunction(true);
      const response = await axios.post("/vehicle", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response?.data.success) {
        setLoaderSubmitFunction(false);
        setShowSixthPopup(false);
        setSelectVehicle(null);
        setUploadCars([]);
        setUploadCarImages([]);
        setUploadCarDocument([]);
        setUploadDocument([]);
        setUploadReg([]);
        setUploadRegDocument([]);
        setPreviousOwners([]);
        setVehicleHistory([]);
        setHistoryDocuments({});
        setInvestmentDocuments({});
        showSuccessAlert("Success", "Vehicle added successfully.");
        formik.resetForm();
        formHandler.resetForm();
         dispatch(fetchAddedVehicles({ page, limit }));
      }
      // setShowForthPopup(false);
      // setShowFifthPopUp(true);
    } catch (error) {
      setLoaderSubmitFunction(false);
      showErrorAlert("Failed", error?.response?.data?.error || error?.message);
    }
  };

  const formHandler = useFormik({
     initialValues : [
      ...addVehicleThird,
      ...vehicleFeatures,
      ...vehicleConditionInputs,
      ...vehiclePriceInputs,
      ...optionalEquipmentTwoInput,
    ].reduce((acc, field) => {
      acc[field.name] = field.type === "checkbox" ? false : ""; // Ensure checkboxes start as false
      return acc;
    }, {}),
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setShowThirdPopup(false);
      setShowForthPopup(true);
    },
  });

  useEffect(() => {
    if (formHandler?.values?.make) {
      dispatch(fetchVehicleModels({ make: formHandler?.values?.make }));
    }
  }, [dispatch, formHandler?.values?.make]);


  
  return (
    <div>
      {/* First Popup */}

      <Button
        textColor="white"
        text="New Vehicle"
        borderRadius="rounded"
        icon={<FaPlus className="h-3 w-3" />}
        onClick={() => setAddVehicle(true)}
      />
      <Modal
        isOpen={addVehicle}
        onClose={() => setAddVehicle(false)}
        title={"Add Vehicle"}
        width={"w-[40%]"}
        fontSize={"text-2xl"}
        fontWeight="font-medium"
        setModalOpen={setAddVehicle}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 gap-4 py-5 px-2 space-y-2">
            {processedInputs.map((input) => (
              <CustomInput
                key={input.name}
                placeholder={input.placeholder}
                type={input.type}
                name={input.name}
                label={input.label}
                required={input?.required}
                value={formik.values[input.name]}
                onChange={
                  input.name === "chooseVehicle"
                    ? handleVehicleChange
                    : formik.handleChange
                }
                onBlur={formik.handleBlur}
                error={formik.errors[input.name] && formik.touched[input.name]}
                touched={formik.touched[input.name]}
                options={
                  input.name === "marke"
                    ? vehicleMakersOptions
                    : input.name === "modell"
                    ? vehicleModelsOptions
                    : input.options || []
                }
                paddingY={"py-3"}
              />
            ))}
          </div>
          <div className=" py-8">
            <Button
              type="submit"
              isLoading={filterLoader}
              text="Identify Vehicle"
              textColor="white"
              className="w-full"
              fontSize="text-xl"
              borderRadius="rounded-lg"
            />
          </div>
        </form>
      </Modal>
      {/* Second Popup */}

      <Modal
        isOpen={showSecondPopup}
        onClose={() => setShowSecondPopup(false)}
        title={"Add Vehicle"}
        width={"w-[50%]"}
        fontSize={"text-2xl"}
        fontWeight="font-medium"
        setModalOpen={setShowSecondPopup}
      >
        <>
          <div className="bg-white  rounded-lg overflow-hidden px-2">
            {/* <div className="my-4 flex justify-end ">
              <SearchBar handleSearch={handleSearch} searchTerm={searchTerm} />
            </div> */}
            {loading ? (
              <ShimmerTable row={10} col={5} />
            ) : (
              <table className=" text-left w-full">
                <thead>
                  <tr className="border-b border-gray-200 text-sm  ">
                    <th className=" pl-3 pb-2 font-semibold ">Version</th>
                    <th className="pb-2 font-semibold text-center text-gray-700">
                      PS (kw)
                    </th>
                    <th className="pb-2 font-semibold text-gray-700 text-center">
                      Transmission Type
                    </th>
                    <th className="pb-2 font-semibold text-gray-700 text-left">
                      Fuel
                    </th>
                    <th className="pb-2 font-semibold text-gray-700 text-center">
                      Doors
                    </th>
                    <th className="pb-2 font-semibold text-gray-700 text-center">
                      Seats
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {vehicles?.results?.results.map((item, index) => (
                    <tr
                      key={index}
                      className={` transition border !my-3 rounded-md text-sm text-lightGray border-gray-200 cursor-pointer ${
                        selectVehicle?.modell === item.modell
                          ? "bg-gray-100"
                          : ""
                      }`}
                      onClick={() => handleRowClick(item)}
                    >
                      <td className="pl-3 py-3 font-medium text-primary">
                        <div>{item.modell}</div> {/* Model Name */}
                        <div className="text-lightGray">
                          {" "}
                          {item.erstellungsdatum
                            ? new Date(item.erstellungsdatum)
                                .toISOString()
                                .split("T")[0]
                            : "N/A"}
                        </div>{" "}
                      </td>
                      <td className="text-center">{item.ps_kw || "N/A"}</td>{" "}
                      <td className="text-center">{item.gears || "N/A"}</td>{" "}
                      <td className="text-left">{item.treibstoff}</td>{" "}
                      <td className="text-center">{item.tueren || "N/A"}</td>{" "}
                      <td className="text-center">{item.sitze}</td>{" "}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {vehicles?.results?.pagination?.totalRecords > 10 && (
              <Pagination
                currentPage={page}
                totalCount={vehicles?.results?.pagination?.totalRecords} // Use the actual total count from API
                itemsPerPage={limit}
                onPageChange={(newPage) => dispatch(setPage(newPage))}
                handleItemsPerPageChange={(value) => dispatch(setLimit(value))}
              />
            )}
          </div>
          <div className=" flex items-center justify-between">
            <Button
              text="Back"
              borderRadius="rounded-md"
              textColor="darkBlue"
              onClick={() => {
                setAddVehicle(true);
                setShowSecondPopup(false);
              }}
              className="mt-4"
              bgColor="white"
              borderColor="darkBlue"
            />
            <div className="flex items-center gap-5">
              <Button
                text="Complete Yourself"
                borderRadius="rounded-md"
                textColor="darkBlue"
                onClick={() => {
                  setShowSecondPopup(false), setShowThirdPopup(true);
                }} // Close the second popup
                className="mt-4"
                disabled={selectVehicle}
                bgColor="white"
                borderColor="darkBlue"
              />
              <Button
                text="Next"
                borderRadius="rounded-md"
                textColor="white"
                padding="py-2 px-12"
                disabled={!selectVehicle}
                onClick={() => {
                  setShowSecondPopup(false);
                  setShowThirdPopup(true);
                  // setShowForthPopup(true);
                }} // Close the second popup
                className="mt-4"
                bgColor="primary"
                borderColor="primary"
              />
            </div>
          </div>
        </>
      </Modal>
      {/* third Popup */}

      <Modal
        isOpen={showThirdPopup}
        onClose={() => setShowThirdPopup(false)}
        title={"Add Vehicle Data"}
        width={"w-[60%]"}
        fontSize={"text-2xl"}
        fontWeight="font-medium"
        setModalOpen={setShowThirdPopup}
      >
        <div className="py-5">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <p className="text-xs font-medium text-black text-left mb-2">
                We have already recorded the following information. Not your
                vehicle?{" "}
                <span
                  onClick={() => {
                    setShowThirdPopup(false);
                    setAddVehicle(true);
                  }}
                  className="text-primary font-semibold cursor-pointer"
                >
                  Change vehicle details
                </span>
              </p>
              <div className="flex items-center gap-3">
                <Text
                  content={
                    selectVehicle
                      ? selectVehicle?.marke + " " + selectVehicle?.modell
                      : "Vehicle Name"
                  }
                  textColor="text-primary"
                  fontWeight="font-medium"
                />
                <Icons.FaChevronDown
                  className={`cursor-pointer transform transition-transform duration-300 ${
                    alreadyRecorded ? "rotate-180" : "rotate-0"
                  }`}
                  onClick={() => setAlreadyRecorded(!alreadyRecorded)}
                />
              </div>
              <div
                className={`transition-all  mt-1 duration-300 overflow-hidden ${
                  alreadyRecorded
                    ? "max-h-auto opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-2 border border-lightGray rounded-sm mt-5 pb-5">
                  <div className="grid grid-cols-3 gap-4 space-y-1 pt-3">
                    {addVehicleThird?.map((input) => (
                      <CustomInput
                        key={input.name}
                        type={input.type}
                        name={input.name}
                        placeholder={input.placeholder}
                        label={input.label}
                        required={input.required}
                        value={formHandler.values[input.name]}
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        error={
                          formHandler.touched[input.name]
                            ? formHandler.errors[input.name]
                            : ""
                        }
                        touched={formHandler.touched[input.name]}
                        options={
                          input.name === "make"
                            ? vehicleMakersOptions
                            : input.name === "model"
                            ? vehicleModelsOptions
                            : input.options || []
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="vehicleFeatures my-5">
              <div className="flex items-center gap-3">
                <Text
                  content={"Vehicle Features"}
                  textColor="text-darkBlue"
                  fontWeight="font-medium"
                />
                <Icons.FaChevronDown
                  className={`cursor-pointer transform transition-transform duration-300 ${
                    vehicleFeatured ? "rotate-180" : "rotate-0"
                  }`}
                  onClick={() => setVehicleFeatured(!vehicleFeatured)}
                />
              </div>
              <div
                className={`transition-all  grid grid-cols-1 mt-4 space-y-3 duration-300 overflow-hidden ${
                  vehicleFeatured
                    ? "max-h-screen opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {vehicleFeatures?.map((input) => (
                  <CustomInput
                    key={input.name}
                    type={input.type}
                    name={input.name}
                    label={input.label}
                    required={input?.require}
                    value={formHandler.values[input.name]}
                    onChange={formHandler.handleChange}
                    onBlur={formHandler.handleBlur}
                    error={
                      formHandler.errors[input.name] &&
                      formHandler.errors[input.name]
                    }
                    touched={formHandler.touched[input.name]}
                    options={input.options || []}
                    paddingY={"py-3"}
                  />
                ))}
              </div>
            </div>
            <div className="vehicleCondition my-5">
              <div className="flex items-center gap-3">
                <Text
                  content={"Condition"}
                  textColor="text-darkBlue"
                  fontWeight="font-medium"
                />
                <FaChevronDown
                  className={`cursor-pointer transform transition-transform duration-300 ${
                    vehicleCondition ? "rotate-180" : "rotate-0"
                  }`}
                  onClick={() => setVehicleCondition(!vehicleCondition)}
                />
              </div>
              <div
                className={`transition-all gap-3 grid grid-cols-1 mt-4 space-y-3 duration-300 overflow-hidden ${
                  vehicleCondition
                    ? "max-h-screen opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {vehicleConditionInputs?.map((input) => (
                  <CustomInput
                    key={input.name}
                    type={input.type}
                    name={input.name}
                    label={input.label}
                    required={input?.required}
                    value={formHandler.values[input.name]}
                    onChange={
                      input.type === "checkbox"
                        ? (e) =>
                            formHandler.setFieldValue(
                              input.name,
                              e.target.checked
                            )
                        : formHandler.handleChange
                    }
                    onBlur={formHandler.handleBlur}
                    error={
                      formHandler.errors[input.name] &&
                      formHandler.errors[input.name]
                    }
                    touched={formHandler.touched[input.name]}
                    options={input.options || []}
                    paddingY={"py-3"}
                  />
                ))}
              </div>
            </div>
            <div className="price my-5">
              <div className="flex items-center gap-3">
                <Text
                  content={"Price "}
                  textColor="text-darkBlue"
                  fontWeight="font-medium"
                />
                <FaChevronDown
                  className={`cursor-pointer transform transition-transform duration-300 ${
                    vehiclePrice ? "rotate-180" : "rotate-0"
                  }`}
                  onClick={() => setVehiclePrice(!vehiclePrice)}
                />
              </div>
              <div
                className={`transition-all gap-3 grid grid-cols-1 mt-5 duration-300 overflow-hidden ${
                  vehiclePrice
                    ? "max-h-screen opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {vehiclePriceInputs?.map((input) => (
                  <CustomInput
                    key={input.name}
                    type={input.type}
                    name={input.name}
                    label={input.label}
                    required={input?.required}
                    value={formHandler.values[input.name]}
                    onChange={formHandler.handleChange}
                    onBlur={formHandler.handleBlur}
                    error={
                      formHandler.errors[input.name] &&
                      formHandler.errors[input.name]
                    }
                    touched={formHandler.touched[input.name]}
                    options={input.options || []}
                  />
                ))}
              </div>
            </div>
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
            <div className="optionalEquipment2 my-5">
              <div className="flex items-center gap-3 ">
                <Text
                  content={"Optional Equipment "}
                  textColor="text-darkBlue"
                  fontWeight="font-medium"
                />
                <FaChevronDown
                  className={`cursor-pointer transform transition-transform duration-300 ${
                    optionalEquipmentTwo ? "rotate-180" : "rotate-0"
                  }`}
                  onClick={() => setOptionalEquipmentTwo(!optionalEquipmentTwo)}
                />
              </div>
              <div
                className={`transition-all  mt-4 space-y-3 duration-300 overflow-hidden ${
                  optionalEquipmentTwo
                    ? "max-h-screen opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {" "}
                <>
                  <div className="gap-3 grid grid-cols-3">
                    {optionalEquipmentTwoInput?.slice(0, 3)?.map((input) => (
                      <CustomInput
                        key={input.name}
                        type={input.type}
                        name={input.name}
                        label={input.label}
                        required={input?.required}
                        value={formHandler.values[input.name]}
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        error={
                          formHandler.errors[input.name] &&
                          formHandler.errors[input.name]
                        }
                        touched={formHandler.touched[input.name]}
                        options={input.options || []}
                      />
                    ))}
                  </div>
                  <div className="gap-3 grid grid-cols-1 mt-2">
                    {optionalEquipmentTwoInput?.slice(3)?.map((input) => (
                      <CustomInput
                        key={input.name}
                        type={input.type}
                        name={input.name}
                        label={input.label}
                        required={input?.required}
                        value={formHandler.values[input.name]}
                        onChange={formHandler.handleChange}
                        onBlur={formHandler.handleBlur}
                        error={
                          formHandler.errors[input.name] &&
                          formHandler.errors[input.name]
                        }
                        touched={formHandler.touched[input.name]}
                        options={input.options || []}
                      />
                    ))}
                  </div>
                </>
              </div>
            </div>
            <div className="detailsData my-12 grid grid-cols-2 items-start">
              <div>
                <div className="flex items-center gap-3  ">
                  <Text
                    content={"Detailed Data"}
                    textColor="text-darkBlue"
                    fontWeight="font-medium"
                  />
                  <FaChevronDown
                    className={`cursor-pointer transform transition-transform duration-300 ${
                      detailsData ? "rotate-180" : "rotate-0"
                    }`}
                    onClick={() => setDetailsData(!detailsData)}
                  />
                </div>
                <div
                  className={`transition-all mt-4    duration-300 overflow-hidden ${
                    detailsData
                      ? "max-h-screen opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {" "}
                  <>
                    <div className="gap-3 grid grid-cols-1 space-y-1">
                      {detailedDataInput?.map((input) => (
                        <CustomInput
                          key={input.name}
                          type={input.type}
                          name={input.name}
                          label={input.label}
                          required={input?.required}
                          checked={saveDetailsData?.includes(input.name)}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            setSaveDetailsData(
                              isChecked
                                ? [...saveDetailsData, input.name] // Add
                                : saveDetailsData.filter(
                                    (f) => f !== input.name
                                  ) // Remove
                            );
                          }}
                          onBlur={formik.handleBlur}
                          error={
                            formik.errors[input.name] &&
                            formik.touched[input.name]
                          }
                          touched={formik.touched[input.name]}
                          options={input.options || []}
                        />
                      ))}
                    </div>
                    <div className="gap-3 grid grid-cols-1 mt-7">
                      <Text
                        content={"Extras"}
                        textColor="text-darkBlue"
                        fontWeight="font-medium"
                      />
                      <CustomInput
                        type="checkbox"
                        name="saveExtraData"
                        label="8-tire set"
                        // required={true}
                        checked={saveExtraData.includes("8-tire set")}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setSaveExtraData((prev) => {
                            return isChecked
                              ? [...prev, "8-tire set"] // ✅ Add value to array if checked
                              : prev.filter((item) => item !== "8-tire set"); // ❌ Remove if unchecked
                          });
                        }}
                      />
                    </div>
                  </>
                </div>
              </div>
              <div>
                <div
                  className={`transition-all  duration-300 overflow-hidden `}
                >
                  <>
                    <div className="gap-3 grid grid-cols-1 ">
                      {additionalDetail?.map((input) => (
                        <CustomInput
                          key={input.name}
                          type={input.type}
                          name={input.name}
                          label={input.label}
                          required={input?.required}
                          value={formik.values[input.name]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.errors[input.name] &&
                            formik.touched[input.name]
                          }
                          touched={formik.touched[input.name]}
                          options={input.options || []}
                        />
                      ))}
                    </div>
                  </>
                </div>
              </div>
            </div>
            <div className=" flex items-center justify-between">
              <Button
                text="Back"
                borderRadius="rounded-md"
                textColor="primary"
                onClick={() => {
                  setShowThirdPopup(false);
                  setShowSecondPopup(true);
                }} // Close the second popup
                className="mt-4"
                bgColor="white"
                borderColor="primary"
              />
              <div className="flex items-center gap-4">
                <div
                  onClick={formHandler.handleSubmit}
                  // onClick={handle3rdStepNext}
                  className="mt-4 bg-primary border border-primary rounded-md text-white py-2 px-6 cursor-pointer"
                >
                  Next
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      {/*  fourth pop up */}

      <Modal
        isOpen={showForthPopup}
        onClose={() => setShowForthPopup(false)}
        title={"Add Vehicle Images"}
        width={"w-[60%]"}
        fontSize={"text-2xl"}
        fontWeight="font-medium"
        setModalOpen={setShowForthPopup}
      >
        <>
          <div className="p-5">
            <div className="flex items-center justify-between">
              <Text
                content={"Photograph Optimally"}
                textColor="text-darkBlue"
                fontWeight="font-medium"
                textSize="text-xs"
                icon={<FaRegLightbulb />}
              />
              <FaChevronDown
                className={`cursor-pointer transform transition-transform duration-300 ${
                  showPhotographOptimally ? "rotate-180" : "rotate-0"
                }`}
                onClick={() => setPhotographOptimally(!showPhotographOptimally)}
              />
            </div>
            <div
              className={`transition-all mt-5 duration-300 overflow-hidden ${
                showPhotographOptimally
                  ? "max-h-screen opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="grid grid-cols-4 ">
                {PhotographOptimallyArray?.map((item, index) => (
                  <div key={index} className="flex flex-col items-center gap-1">
                    {item.icons}
                    <p className="text-xs font-medium">{item?.content}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* //////////upload Images //////////////////// */}
            <div className="flex flex-col items-start gap-2 my-8">
              <label className="font-medium text-left text-darkBlue">
                Upload Photos
              </label>

              <button
                onClick={handleButtonClick}
                className="px-8 py-2  border border-darkBlue   bg-inherit text-darkBlue rounded cursor-pointer "
              >
                upload pictures
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                />
              </button>
            </div>

            <div className="space-y-3">
              {uploadCarImages.length > 0 ? (
                uploadCarImages.map((image, index) => (
                  <div
                    key={index} // Always include a unique key when mapping
                    className="border border-lightGray rounded-md p-3 gap-5 flex items-center"
                  >
                    <img
                      src={image}
                      className="border h-[100px] w-2/12 rounded-md object-cover"
                      alt="Signup"
                    />
                    <div className="flex-grow flex flex-col gap-10">
                      <div className="flex flex-col gap-4">
                        <Text
                          content={uploadCars[index].name}
                          textColor="black"
                          textSize="text-sm"
                          className="capitalize"
                        />
                        <div className="flex items-center gap-4">
                          <Icons.RiDeleteBin6Line
                            size={20}
                            onClick={() => handleDeleteImage(index)}
                          />
                          {/* <Icons.IoReload size={20} /> */}
                          <Icons.IoEyeOutline
                            size={20}
                            onClick={() => window.open(image, "_blank")}
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="self-center">
                      <Icons.BiGridVertical
                        size={50}
                        className="text-lightGray"
                      />
                    </div> */}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No images uploaded</p>
              )}
            </div>
          </div>
          <div className="p-5 flex items-center justify-between">
            <Button
              text="Back"
              borderRadius="rounded-md"
              textColor="darkBlue"
              onClick={() => {
                setShowThirdPopup(true);
                setShowForthPopup(false);
              }}
              className="mt-4"
              bgColor="white"
              borderColor="darkBlue"
            />

            <Button
              text="Add Vehicle Images"
              borderRadius="rounded-md"
              textColor="white"
              onClick={() => {
                if (uploadCarImages.length < 4) {
                  showErrorAlert(
                    "Insufficient Images",
                    "Please upload at least 4 images before proceeding."
                  );
                } else {
                  setShowForthPopup(false);
                  setShowFifthPopUp(true);
                }
              }}
              // onClick={handleNext}
              className="mt-4 "
              bgColor="primary"
              borderColor="primary"
            />
          </div>
        </>
      </Modal>
      {/*  fifth pop up investment expenses and documents */}

      <Modal
        isOpen={showFifthPopUp}
        onClose={() => setShowFifthPopUp(false)}
        title={"Add Vehicle Document"}
        width={"w-[60%]"}
        fontSize={"text-2xl"}
        fontWeight="font-medium"
        setModalOpen={setShowFifthPopUp}
      >
        <>
          <div className="space-y-4 p-5">
            <Text
              content={
                "Please select a type of fuel. Then we can show you more information"
              }
              textColor="text-black"
              fontWeight="font-medium"
              textSize="text-sm"
              icon={<Icons.FiInfo className="text-primary " />}
              className="bg-blue-100 p-2 border-l-2 border-primary"
            />
            <form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 gap-3 ">
                <div className="flex flex-col items-start gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNinePopup(true)}
                    className="px-6 py-2  text-grayText rounded-md  border border-grayText hover:bg-primary-dark"
                  >
                    Add Investment Expenses
                  </button>
                </div>
                <div className="vehicleHistoryTable bg-white   overflow-hidden ">
                  {investmentExpenses.length > 0 ? (
                    <table className="min-w-full text-left ">
                      <thead>
                        <tr className="border-b border-gray-200 text-darkBlue">
                          <th className="pb-2 font-medium ">Investment For</th>
                          <th className="pb-2 font-medium ">Amount</th>
                          <th className="pb-2 font-medium ">
                            Investment Location
                          </th>
                          <th className="pb-2 font-medium ">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {investmentExpenses.map((entry, index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-50 transition border rounded-md border-gray-200"
                          >
                            <td className="pl-2 py-3 font-medium text-secondary capitalize">
                              {entry.investmentFor}
                            </td>
                            <td className="text-grayText">
                              {entry.amount_CHF}
                            </td>
                            <td className="text-grayText">
                              {entry.investmentLocation}
                            </td>
                            <td className="mx-auto">
                    <button
                      onClick={() => handleDeleteInvestmentEntry(index)}
                      className="text-red-500 hover:text-red-700 "
                    >
                      <img src={Images.bin} alt="bin" className="w-5" />
                    </button>
                  </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-center text-gray-500">
                      No investment expenses uploaded
                    </p>
                  )}
                </div>
                {vehicleDocumentInputs?.map((input) =>
                  input.type === "file" ? (
                    <div
                      key={input.name}
                      className="flex flex-col items-start gap-2 "
                    >
                      <label className="font-medium text-left text-darkBlue">
                        {input.label}
                      </label>

                      <button
                        type="button"
                        onClick={handleDocumentClick}
                        // onClick={() => documentInputRef[input.name].click()}
                        className="px-8 py-2 border border-darkBlue bg-inherit text-darkBlue rounded cursor-pointer"
                      >
                        Upload Documents
                      </button>

                      <input
                        type="file"
                        ref={documentInputRef}
                        className="hidden"
                        multiple
                        onChange={handleDocumentChange}
                      />
                    </div>
                  ) : (
                    <CustomInput
                      key={input.name}
                      type={input.type}
                      name={input.name}
                      label={input.label}
                      required={input.required}
                      value={formik.values[input.name]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.errors[input.name] && formik.touched[input.name]
                      }
                      touched={formik.touched[input.name]}
                      options={input.options || []}
                      placeholder={input.placeholder}
                      paddingY={"py-3"}
                    />
                  )
                )}
              </div>
            </form>
            <div className="space-y-3">
              {uploadCarDocument.length > 0 ? (
                uploadCarDocument.map((image, index) => (
                  <div
                    key={index} // Always include a unique key when mapping
                    className="border border-lightGray rounded-md p-3 gap-5 flex items-center"
                  >
                    {["image/jpeg", "image/png", "image/jpg"].includes(
                      uploadDocument[index].type
                    ) ? (
                      <img
                        src={image}
                        className="border h-[100px] w-2/12 rounded-md object-cover"
                        alt={uploadDocument[index].name}
                      />
                    ) : (
                      <div className="border h-[100px] w-2/12 rounded-md flex items-center justify-center bg-gray-100">
                        <Icons.FaFileAlt className="text-gray-500 text-3xl" />
                      </div>
                    )}
                    <div className="flex-grow flex flex-col gap-10">
                      <div className="flex flex-col gap-4">
                        <Text
                          content={uploadDocument[index].name}
                          textColor="black"
                          textSize="text-sm"
                          className="capitalize "
                        />
                        <div className="flex items-center gap-4">
                          <Icons.RiDeleteBin6Line
                            size={20}
                            onClick={() => handleDeleteDocument(index)}
                          />
                          {/* <Icons.IoReload size={20} /> */}
                          <Icons.IoEyeOutline
                            size={20}
                            onClick={() => {
                              const fileType = uploadDocument[index].type;

                              if (
                                [
                                  "image/jpeg",
                                  "image/png",
                                  "image/jpg",
                                ].includes(fileType)
                              ) {
                                // Open image directly
                                window.open(image, "_blank");
                              } else {
                                // Convert document file to a Blob URL and open
                                const fileURL = URL.createObjectURL(
                                  uploadDocument[index]
                                );
                                window.open(fileURL, "_blank");
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="self-center">
                      <Icons.BiGridVertical
                        size={50}
                        className="text-lightGray"
                      />
                    </div> */}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No document uploaded
                </p>
              )}
            </div>
          </div>
          <div className="p-5 flex items-center justify-between">
            <Button
              text="Back"
              borderRadius="rounded-md"
              textColor="darkBlue"
              onClick={() => {
                setShowFifthPopUp(false);
                setShowForthPopup(true);
              }}
              className="mt-4"
              bgColor="white"
              borderColor="darkBlue"
            />

            <Button
              text="Add Vehicle Document"
              borderRadius="rounded-md"
              textColor="white"
              onClick={() => {
                const hasEmptyRequiredField = vehicleDocumentInputs.some(
                  (field) =>
                    field.required &&
                    (formik.values[field.name] === "" ||
                      formik.values[field.name] === undefined ||
                      formik.values[field.name] === null)
                );
                if (hasEmptyRequiredField) {
                  showToast("error", "All  fields must be filled.");
                  return;
                }
                if (!uploadCarDocument.length) {
                  showErrorAlert(
                    "Insufficient Document",
                    "Please upload at least 1 document before proceeding."
                  );
                } else {
                  setShowFifthPopUp(false);
                  setShowSixthPopup(true);
                }
              }}
              className="mt-4 "
              bgColor="primary"
              borderColor="primary"
            />
          </div>
        </>
      </Modal>
      {/*  sixth pop up  registration*/}
      <Modal
        isOpen={showSixthPopup}
        onClose={() => setShowSixthPopup(false)}
        title={"Add Vehicle"}
        width={"w-[60%]"}
        fontSize={"text-2xl"}
        fontWeight="font-medium"
        setModalOpen={setShowSixthPopup}
      >
        <>
          <div className="space-y-4 p-5">
            <div className="flex flex-col items-start gap-2">
              <Text
                content={"Vehicle Registration Document"}
                textColor="text-black"
                fontWeight="font-medium"
                textSize="text-normal"
              />
              <button
                type="button"
                onClick={handleRegClick}
                className="px-6 py-2  text-darkBlue rounded-md  border border-grayText hover:bg-primary-dark"
              >
                Upload Vehicle Registration Document
              </button>

              <input
                type="file"
                ref={regInputRef}
                className="hidden"
                multiple
                onChange={handleRegChange}
              />
            </div>
            <div className="space-y-3">
              {uploadRegDocument.length > 0 ? (
                uploadRegDocument.map((image, index) => (
                  <div
                    key={index}
                    className="border border-lightGray rounded-md p-3 gap-5 flex items-center"
                  >
                    {["image/jpeg", "image/png", "image/jpg"].includes(
                      uploadReg[index].type
                    ) ? (
                      <img
                        src={image}
                        className="border h-[100px] w-2/12 rounded-md object-cover"
                        alt={uploadReg[index].name}
                      />
                    ) : (
                      <div className="border h-[100px] w-2/12 rounded-md flex items-center justify-center bg-gray-100">
                        <Icons.FaFileAlt className="text-gray-500 text-3xl" />
                      </div>
                    )}
                    <div className="flex-grow flex flex-col gap-10">
                      <div className="flex flex-col gap-4">
                        <Text
                          content={uploadReg[index].name}
                          textColor="black"
                        />
                        <div className="flex items-center gap-4">
                          <Icons.RiDeleteBin6Line
                            size={20}
                            onClick={() => handleDeleteReg(index)}
                          />
                          {/* <Icons.IoReload size={20} /> */}
                          <Icons.IoEyeOutline
                            size={20}
                            onClick={() => {
                              const fileType = uploadReg[index].type;

                              if (
                                [
                                  "image/jpeg",
                                  "image/png",
                                  "image/jpg",
                                ].includes(fileType)
                              ) {
                                // Open image directly
                                window.open(image, "_blank");
                              } else {
                                // Convert document file to a Blob URL and open
                                const fileURL = URL.createObjectURL(
                                  uploadReg[index]
                                );
                                window.open(fileURL, "_blank");
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="self-center">
                      <Icons.BiGridVertical
                        size={50}
                        className="text-lightGray"
                      />
                    </div> */}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No registration document uploaded
                </p>
              )}
            </div>

            <div className="flex flex-col items-start gap-2">
              <Text
                content={"Previous Owner"}
                textColor="text-black"
                fontWeight="font-medium"
                textSize="text-normal"
              />
              <button
                type="button"
                onClick={() => {
                  // setShowSixthPopup(false);
                  setShowSeventhPopup(true);
                }}
                className="px-6 py-2  text-grayText rounded-md  border border-grayText hover:bg-primary-dark"
              >
                Add Previous Owner
              </button>
            </div>
            <div className="previousOwnerTable bg-white  rounded-lg overflow-hidden ">
              {previousOwners.length > 0 ? (
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200 text-darkBlue">
                      <th className="pb-2 font-medium ">Owner</th>
                      <th className="pb-2  font-medium ">From</th>
                      <th className="pb-2  font-medium ">Until</th>
                      <th className=" pb-2 font-medium ">Year of birth</th>
                      <th className=" pb-2 font-medium ">Kilometer</th>
                      <th className="pb-2 font-medium ">Action</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {previousOwners.map((owner, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition border  border-gray-200"
                      >
                        <td className="pl-2 py-3 font-medium text-secondary">
                          <div>{owner.name}</div>
                          <div className="text-xs text-gray-500 capitalize">
                            {owner.ownerType}
                          </div>
                        </td>
                        <td className="text-grayText">{owner.from}</td>
                        <td className="text-grayText">{owner.until}</td>
                        <td className="text-grayText">{owner.yearOfBirth}</td>
                        <td className="text-grayText">
                          {owner.drivenKilometers} km
                        </td>
                        <td className="mx-auto">
                    <button
                      onClick={() => handleDeletePreviousOwner(index)}
                      className="text-red-500 hover:text-red-700 "
                    >
                      <img src={Images.bin} alt="bin" className="w-5" />
                    </button>
                  </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-gray-500">
                  No previous owner added
                </p>
              )}
            </div>
            <div className="flex flex-col items-start gap-2">
              <Text
                content={"Vehicle history"}
                textColor="text-black"
                fontWeight="font-medium"
                textSize="text-normal"
              />
              <button
                type="button"
                onClick={() => setShowEighthPopup(true)}
                className="px-6 py-2  text-grayText rounded-md  border border-grayText hover:bg-primary-dark"
              >
                Add vehicle history
              </button>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".png,.jpg,.jpeg,.pdf,.docx"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
            <div className="vehicleHistoryTable bg-white   overflow-hidden ">
              {vehicleHistory.length > 0 ? (
                <table className="min-w-full text-left ">
                  <thead>
                    <tr className="border-b border-gray-200 text-darkBlue">
                      <th className="pb-2 font-medium ">Type</th>
                      <th className="pb-2 font-medium ">Location</th>
                      <th className="pb-2 font-medium ">Date</th>
                      <th className="pb-2 font-medium ">Action</th>
                      {/* <th className="pb-2 font-medium ">Year of birth</th>
                      <th className="pb-2 font-medium ">Kilometer</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {vehicleHistory.map((entry, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition border rounded-md border-gray-200"
                      >
                        <td className="pl-2 py-3 font-medium text-secondary capitalize">
                          {entry.type.replace("_", " ")}
                        </td>
                        <td className="text-grayText">{entry.location}</td>
                        <td className="text-grayText">{entry.date}</td>
                        <td className="mx-auto">
                    <button
                        onClick={() => handleDeleteHistoryEntry(index)}
                      className="text-red-500 hover:text-red-700 "
                    >
                      <img src={Images.bin} alt="bin" className="w-5" />
                    </button>
                  </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-gray-500">No history uploaded</p>
              )}
            </div>
          </div>
          <div className="p-5 flex items-center justify-between">
            <Button
              text="Back"
              borderRadius="rounded-md"
              textColor="darkBlue"
              onClick={() => {
                setShowFifthPopUp(true);
                setShowSixthPopup(false);
              }}
              className="mt-4"
              bgColor="white"
              borderColor="darkBlue"
            />
            <Button
              text="Add Vehicle"
              borderRadius="rounded-md"
              isLoading={loaderSubmitFunction}
              textColor="white"
              // onClick={() => {
              //   handleNext();

              // }}
              onClick={() => {
                if (!uploadRegDocument.length) {
                  showErrorAlert(
                    "Insufficient Document",
                    "Please upload at least 1 registration document before proceeding."
                  );
                } else {
                  handleNext();
                }
              }}
              className="mt-4 "
              bgColor="primary"
              borderColor="primary"
            />
          </div>
        </>
      </Modal>

      {/*  seventh pop up previous owner */}

      <Modal
        isOpen={showSeventhPopup}
        onClose={() => setShowSeventhPopup(false)}
        title={"Add Previous Owner"}
        width={"w-[40%]"}
        fontSize={"text-2xl"}
        fontWeight="font-medium"
        setModalOpen={setShowSeventhPopup}
      >
        <>
          <div className=" py-5">
            <div className="gap-3 grid grid-cols-1 space-y-2">
              {previousOwnerDataInput?.map((input) => (
                <CustomInput
                  key={input.name}
                  type={input.type}
                  name={input.name}
                  label={input.label}
                  placeholder={input.placeholder}
                  required={input?.required}
                  value={formik.values[input.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.errors[input.name] && formik.touched[input.name]
                  }
                  touched={formik.touched[input.name]}
                  options={input.options || []}
                  paddingY={"py-3"}
                />
              ))}
            </div>
          </div>
          <div className=" flex items-center justify-between">
            <Button
              text="Add Previous Owner"
              borderRadius="rounded-md"
              textColor="white"
              onClick={() => {
                const hasEmptyRequiredField = previousOwnerDataInput.some(
                  (field) =>
                    field.required &&
                    (formik.values[field.name] === "" ||
                      formik.values[field.name] === undefined ||
                      formik.values[field.name] === null)
                );
                if (hasEmptyRequiredField) {
                  showToast("error", "All  fields must be filled.");
                } else {
                  handleAddPreviousOwner();
                }
              }}
              // onClick={() => {
              //   // handleNext()
              //   handleAddPreviousOwner();
              //   setShowSeventhPopup(false);
              //   setShowSixthPopup(true);
              // }} // Close the second popup
              className="mt-4 w-full"
              bgColor="primary"
              borderColor="primary"
            />
          </div>
        </>
      </Modal>
      {/*  eighth pop up vehicle Historyyyy */}

      <Modal
        isOpen={ShowEighthPopup}
        onClose={() => setShowEighthPopup(false)}
        title={"Add Vehicle History"}
        width={"w-[50%]"}
        fontSize={"text-2xl"}
        fontWeight="font-medium"
        setModalOpen={setShowEighthPopup}
      >
        <>
          <Icons.FaArrowLeftLong
            size={25}
            className="text-grayText "
            onClick={() => {
              setShowSixthPopup(true);
              setShowEighthPopup(false);
            }}
          />
          <div className="py-5">
            <div className="gap-3 grid grid-cols-1 space-y-3 ">
              {addVehicleHistoryDataInput?.map((input) => (
                <CustomInput
                  key={input.name}
                  type={input.type}
                  name={input.name}
                  label={input.label}
                  placeholder={input.placeholder}
                  required={input?.required}
                  value={formik.values[input.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.errors[input.name] && formik.touched[input.name]
                  }
                  touched={formik.touched[input.name]}
                  options={input.options || []}
                />
              ))}
            </div>
            <div className="flex flex-col items-start my-6">
              <Text
                content={"Documents"}
                textColor="text-black"
                fontWeight="font-medium"
                textSize="text-normal"
              />
              <button
                type="button"
                onClick={handleHistoryClick}
                className="px-6 py-2  text-grayText rounded-md  border border-grayText hover:bg-primary-dark"
              >
                Upload Documents{" "}
              </button>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={historyInputRef}
                className="hidden"
                multiple
                onChange={handleHistoryChange}
              />
            </div>
            <div className="space-y-3">
              {uploadHistoryDocument.length > 0 ? (
                uploadHistoryDocument.map((image, index) => (
                  <div
                    key={index} // Always include a unique key when mapping
                    className="border border-lightGray rounded-md p-3 gap-5 flex items-center"
                  >
                    {["image/jpeg", "image/png", "image/jpg"].includes(
                      uploadHistory[index].type
                    ) ? (
                      <img
                        src={image}
                        className="border h-[100px] w-2/12 rounded-md object-cover"
                        alt={uploadHistory[index].name}
                      />
                    ) : (
                      <div className="border h-[100px] w-2/12 rounded-md flex items-center justify-center bg-gray-100">
                        <Icons.FaFileAlt className="text-gray-500 text-3xl" />
                      </div>
                    )}
                    <div className="flex-grow flex flex-col gap-10">
                      <div className="flex flex-col gap-4">
                        <Text
                          content={uploadHistory[index].name}
                          textColor="black"
                          textSize="text-sm"
                          className="capitalize "
                        />
                        <div className="flex items-center gap-4">
                          <Icons.RiDeleteBin6Line
                            size={20}
                            onClick={() => handleDeleteHistory(index)}
                          />
                          {/* <Icons.IoReload size={20} /> */}
                          <Icons.IoEyeOutline
                            size={20}
                            onClick={() => {
                              const fileType = uploadHistory[index].type;

                              if (
                                [
                                  "image/jpeg",
                                  "image/png",
                                  "image/jpg",
                                ].includes(fileType)
                              ) {
                                // Open image directly
                                window.open(image, "_blank");
                              } else {
                                // Convert document file to a Blob URL and open
                                const fileURL = URL.createObjectURL(
                                  uploadHistory[index]
                                );
                                window.open(fileURL, "_blank");
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="self-center">
                      <Icons.BiGridVertical
                        size={50}
                        className="text-lightGray"
                      />
                    </div> */}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No history document uploaded
                </p>
              )}
            </div>
          </div>
          <div className=" flex items-center justify-between">
            <Button
              text="Add Vehicle History"
              borderRadius="rounded-md"
              textColor="white"
              onClick={() => {
                // handleNext();
                handleAddVehicleHistory();

                // setShowSeventhPopup(true);
              }}
              className="mt-4 w-full"
              bgColor="primary"
              borderColor="primary"
            />
          </div>
        </>
      </Modal>

      {/*  nine pop up Planned Investment and expenses */}

      <Modal
        isOpen={ShowNinePopup}
        onClose={() => setShowNinePopup(false)}
        title={"Add Vehicle Investment"}
        width={"w-[50%]"}
        fontSize={"text-2xl"}
        fontWeight="font-medium"
        setModalOpen={setShowNinePopup}
      >
        <>
          <div className="py-5">
            <div className="gap-3 grid grid-cols-1 space-y-3 ">
              {addVehicleInvestmentDataInput?.map((input) => (
                <CustomInput
                  key={input.name}
                  type={input.type}
                  name={input.name}
                  label={input.label}
                  placeholder={input.placeholder}
                  required={input?.required}
                  value={formik.values[input.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.errors[input.name] && formik.touched[input.name]
                  }
                  touched={formik.touched[input.name]}
                  options={input.options || []}
                />
              ))}
            </div>
            <div className="flex flex-col items-start my-6">
              <Text
                content={"Documents"}
                textColor="text-black"
                fontWeight="font-medium"
                textSize="text-normal"
              />
              <button
                type="button"
                onClick={handleInvestmentClick}
                className="px-6 py-2  text-grayText rounded-md  border border-grayText hover:bg-primary-dark"
              >
                Upload Documents{" "}
              </button>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={InvestmentInputRef}
                className="hidden"
                onChange={handleInvestmentChange}
              />
            </div>
            <div className="space-y-3">
              {uploadInvestmentDocument.length > 0 ? (
                uploadInvestmentDocument.map((image, index) => (
                  <div
                    key={index} // Always include a unique key when mapping
                    className="border border-lightGray rounded-md p-3 gap-5 flex items-center"
                  >
                    {["image/jpeg", "image/png", "image/jpg"].includes(
                      uploadInvestment[index].type
                    ) ? (
                      <img
                        src={image}
                        className="border h-[100px] w-2/12 rounded-md object-cover"
                        alt={uploadInvestment[index].name}
                      />
                    ) : (
                      <div className="border h-[100px] w-2/12 rounded-md flex items-center justify-center bg-gray-100">
                        <Icons.FaFileAlt className="text-gray-500 text-3xl" />
                      </div>
                    )}
                    <div className="flex-grow flex flex-col gap-10">
                      <div className="flex flex-col gap-4">
                        <Text
                          content={uploadInvestment[index].name}
                          textColor="black"
                          textSize="text-sm"
                          className="capitalize "
                        />
                        <div className="flex items-center gap-4">
                          <Icons.RiDeleteBin6Line
                            size={20}
                            onClick={() => handleDeleteInvestment(index)}
                          />
                          {/* <Icons.IoReload size={20} /> */}
                          <Icons.IoEyeOutline
                            size={20}
                            onClick={() => {
                              const fileType = uploadInvestment[index].type;

                              if (
                                [
                                  "image/jpeg",
                                  "image/png",
                                  "image/jpg",
                                ].includes(fileType)
                              ) {
                                // Open image directly
                                window.open(image, "_blank");
                              } else {
                                // Convert document file to a Blob URL and open
                                const fileURL = URL.createObjectURL(
                                  uploadInvestment[index]
                                );
                                window.open(fileURL, "_blank");
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className="self-center">
                      <Icons.BiGridVertical
                        size={50}
                        className="text-lightGray"
                      />
                    </div> */}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">
                  No expense document uploaded
                </p>
              )}
            </div>
          </div>
          <div className=" flex items-center justify-between">
            <Button
              text="Back"
              borderRadius="rounded-md"
              textColor="darkBlue"
              onClick={() => {
                setShowFifthPopUp(true);
                setShowNinePopup(false);
              }}
              className="mt-4"
              bgColor="white"
              borderColor="darkBlue"
            />
            <Button
              text="Add Vehicle Investment"
              borderRadius="rounded-md"
              textColor="white"
              onClick={() => {
                // handleNext();
                handleAddVehicleInvestment();

                // setShowSeventhPopup(true);
              }}
              className="mt-4 "
              bgColor="primary"
              borderColor="primary"
            />
          </div>
        </>
      </Modal>
      {/* ////////////// */}
      <PopUpModel
        heading="Add Vehicle"
        trigger={null}
        modalOpen={makeAndModelSecondPopup}
        // modalOpen={true}
        setModalOpen={setmakeAndModelSecondPopup}
      >
        <div className="p-5">
          <form onSubmit={formik.handleSubmit}>
            <div>
              <div className="flex items-center gap-3">
                <Text
                  content={"Vehicle Features "}
                  textColor="text-primary"
                  fontWeight="font-medium"
                />
                <FaChevronDown
                  className={`cursor-pointer text-primary transform transition-transform duration-300 ${
                    vehicleFeatured ? "rotate-180" : "rotate-0"
                  }`}
                  onClick={() => setvihecleFeatured(!vehicleFeatured)}
                />
              </div>
              <div
                className={`transition-all  mt-5 duration-300 overflow-hide ${
                  vehicleFeatured
                    ? "max-h-auto opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="grid grid-cols-1 gap-4  space-y-1">
                  {makeAndModelSecondInputs?.map((input) => (
                    <CustomInput
                      key={input.name}
                      type={input.type}
                      name={input.name}
                      placeholder={input.placeholder}
                      label={input.label}
                      required={input?.required}
                      value={formik.values[input.name]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.errors[input.name] && formik.touched[input.name]
                      }
                      touched={formik.touched[input.name]}
                      options={input.options || []}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="my-5 mt-10">
              <div className="flex items-center gap-3">
                <Text
                  content={"Condition"}
                  textColor="text-primary"
                  fontWeight="font-medium"
                />
                <FaChevronDown
                  className={`cursor-pointer transform transition-transform duration-300 ${
                    makeModelCondtition ? "rotate-180" : "rotate-0"
                  }`}
                  onClick={() => {
                    setmakeModelCondtition(!makeModelCondtition);
                  }}
                />
              </div>
              <div
                className={`transition-all gap-3 grid grid-cols-1 mt-5 duration-300 overflow-hidden ${
                  makeModelCondtition
                    ? "max-h-screen opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {makeAndModelSecondConditionInputs?.map((input) => (
                  <CustomInput
                    key={input.name}
                    type={input.type}
                    name={input.name}
                    label={input.label}
                    required={input?.require}
                    value={formik.values[input.name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.errors[input.name] && formik.touched[input.name]
                    }
                    touched={formik.touched[input.name]}
                    options={input.options || []}
                  />
                ))}
              </div>
            </div>
            <div className="my-5">
              <div className="flex items-center gap-3">
                <Text
                  content={"Price "}
                  textColor="text-primary"
                  fontWeight="font-medium"
                />
                <FaChevronDown
                  className={`cursor-pointer transform transition-transform duration-300 ${
                    vehiclePrice ? "rotate-180" : "rotate-0"
                  }`}
                  onClick={() => setVehiclePrice(!vehiclePrice)}
                />
              </div>
              <div
                className={`transition-all gap-3 grid grid-cols-1 mt-5 duration-300 overflow-hidden ${
                  vehiclePrice
                    ? "max-h-screen opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {vehiclePriceInputs?.map((input) => (
                  <CustomInput
                    key={input.name}
                    type={input.type}
                    name={input.name}
                    label={input.label}
                    required={input?.required}
                    value={formik.values[input.name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.errors[input.name] && formik.touched[input.name]
                    }
                    touched={formik.touched[input.name]}
                    options={input.options || []}
                  />
                ))}
              </div>
            </div>
            <div className="my-5">
              <div className="flex items-center gap-3">
                <Text
                  content={"Optional Equipment "}
                  textColor="text-primary"
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
                className={`transition-all gap-3 grid grid-cols-1 mt-5 duration-300 overflow-hidden ${
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
                    // value={formik.values[input.name]}
                    // onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    // error={
                    //   // formik.errors[input.name] && formik.touched[input.name]
                    // }
                    // touched={formik.touched[input.name]}
                    // options={input.options || []}
                  />
                  {optionalEquipmentInput?.map((input) => (
                    <CustomInput
                      key={input.name}
                      type={input.type}
                      name={input.name}
                      label={input.label}
                      required={input?.require}
                      value={formik.values[input.name]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.errors[input.name] && formik.touched[input.name]
                      }
                      touched={formik.touched[input.name]}
                      options={input.options || []}
                    />
                  ))}
                  <div className="flex items-center justify-center gap-3">
                    <button className="bg-primary h-8 w-8 flex items-center justify-center text-white rounded-md">
                      1
                    </button>
                    <button className="bg-primary h-8 w-8 flex items-center justify-center text-white rounded-md">
                      2
                    </button>{" "}
                    <button className="bg-primary h-8 w-8 flex items-center justify-center text-white rounded-md">
                      3
                    </button>{" "}
                    <button className="bg-primary h-8 w-8 flex items-center justify-center text-white rounded-md">
                      4
                    </button>{" "}
                    <button className="bg-primary h-8 w-8 flex items-center justify-center text-white rounded-md">
                      <FaAngleRight />
                    </button>
                  </div>
                </>
              </div>
            </div>
            <div className="my-5">
              <div className="flex items-center gap-3">
                <Text
                  content={"Technical Data "}
                  textColor="text-primary"
                  fontWeight="font-medium"
                />
                <FaChevronDown
                  className={`cursor-pointer transform transition-transform duration-300 ${
                    technicaldata ? "rotate-180" : "rotate-0"
                  }`}
                  onClick={() => setTechnicaldata(!technicaldata)}
                />
              </div>
              <div
                className={`transition-all  mt-5 duration-300 overflow-hidden ${
                  technicaldata
                    ? "max-h-screen opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <>
                  <Text
                    content={
                      "Please select a type of fuel. Then we can show you more information"
                    }
                    textColor="text-black"
                    fontWeight="font-medium"
                    textSize="text-sm"
                    icon={<CiCircleAlert />}
                    className="bg-blue-100 mb-5 p-2 border-l-2 border-blue-500"
                  />
                  <div
                    className={`gap-3 grid ${
                      technicaldataInputs.length <= 4
                        ? "grid-cols-4"
                        : "grid-cols-2"
                    } border border-lightGray p-3`}
                  >
                    {technicaldataInputs?.map((input) => (
                      <CustomInput
                        key={input.name}
                        type={input.type}
                        name={input.name}
                        label={input.label}
                        required={input?.required}
                        placeholder={input.placeholder}
                        value={formik.values[input.name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors[input.name] &&
                          formik.touched[input.name]
                        }
                        touched={formik.touched[input.name]}
                        options={input.options || []}
                      />
                    ))}
                  </div>
                </>
              </div>
            </div>
            <div className="my-5 grid grid-cols-2 items-start">
              <div>
                <div className="flex items-center gap-3">
                  <Text
                    content={"Detailed Data"}
                    textColor="text-primary"
                    fontWeight="font-medium"
                  />
                  <FaChevronDown
                    className={`cursor-pointer transform transition-transform duration-300 ${
                      detailsData ? "rotate-180" : "rotate-0"
                    }`}
                    onClick={() => setDetailsData(!detailsData)}
                  />
                </div>
                <div
                  className={`transition-all   duration-300 overflow-hidden ${
                    detailsData
                      ? "max-h-screen opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {" "}
                  <>
                    <div className="gap-3 grid grid-cols-1 mt-2">
                      {detailedDataInput?.map((input) => (
                        <CustomInput
                          key={input.name}
                          type={input.type}
                          name={input.name}
                          label={input.label}
                          required={input?.required}
                          value={formik.values[input.name]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.errors[input.name] &&
                            formik.touched[input.name]
                          }
                          touched={formik.touched[input.name]}
                          options={input.options || []}
                        />
                      ))}
                    </div>
                    <div className="gap-3 grid grid-cols-1 mt-3">
                      <Text
                        content={"Extras"}
                        textColor="text-primary"
                        fontWeight="font-medium"
                      />
                      <CustomInput
                        type={"checkbox"}
                        name={"8-tireSet"}
                        label={"8-tire set"}
                        // required={input?.required}
                        // value={formik.values[input.name]}
                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        // error={
                        //   formik.errors[input.name] &&
                        //   formik.touched[input.name]
                        // }
                        // touched={formik.touched[input.name]}
                        // options={input.options || []}
                      />
                    </div>
                  </>
                </div>
              </div>
              <div>
                <div
                  className={`transition-all   duration-300 overflow-hidden `}
                >
                  {" "}
                  <>
                    <div className="gap-3 grid grid-cols-1 mt-3">
                      <CustomInput
                        type={"textarea"}
                        name={"Additional Title (125)"}
                        label={"Additional Title (125)"}
                        // required={input?.required}
                        // value={formik.values[input.name]}
                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        // error={
                        //   formik.errors[input.name] &&
                        //   formik.touched[input.name]
                        // }
                        // touched={formik.touched[input.name]}
                        // options={input.options || []}
                      />
                      <CustomInput
                        type={"textarea"}
                        name={"Vehicle Description"}
                        label={"Vehicle Description"}
                        // required={input?.required}
                        // value={formik.values[input.name]}
                        // onChange={formik.handleChange}
                        // onBlur={formik.handleBlur}
                        // error={
                        //   formik.errors[input.name] &&
                        //   formik.touched[input.name]
                        // }
                        // touched={formik.touched[input.name]}
                        // options={input.options || []}
                      />
                    </div>
                  </>
                </div>
              </div>
            </div>
            <div className="p-5 flex items-center justify-between">
              <Button
                text="Back"
                borderRadius="rounded-md"
                textColor="primary"
                onClick={() => {
                  setmakeAndModelSecondPopup(false);
                  setShowSecondPopup(true);
                }} // Close the second popup
                className="mt-4"
                bgColor="white"
                borderColor="primary"
              />

              <Button
                text="Next"
                borderRadius="rounded-md"
                textColor="white"
                onClick={() => {
                  setmakeAndModelSecondPopup(false);
                  setShowForthPopup(true);
                }} // Close the second popup
                className="mt-4"
                bgColor="primary"
                borderColor="primary"
              />
            </div>
          </form>
        </div>
      </PopUpModel>
    </div>
  );
};
export default AddVehicle;
