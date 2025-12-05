/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CarDetailsStepper from "./forms/CarDetailsStepper";
import BuyerAndTargetStepper from "./forms/BuyerAndTargetStepper";
import { GoDotFill } from "react-icons/go";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../../services/api";
import { ADD_QUOTATION } from "../../../utils/baseURL";
import showToast from "../../../utils/toaster";
import LoadingScreen from "./components/LoadingScreen";
import Modal from "../../modal/modal";
import { useDispatch } from "react-redux";
import { getSingleQuotation } from "../../../store/features/quotationSlice/getSingleQuotationSlice";
const AddQuotationStepper = ({ setModalOpen, singleQuotation }) => {
  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [additionalFeature, setAdditionalFeature] = useState([]);
  const steps = [
    { label: "Select Car Details" },
    { label: "Select The Buyer And Target" },
  ];

  ///////////////////api /////////////////
  const [initialValues, setInitialValues] = useState({
    marke: "",
    model: "",
    fuel: "",
    bodyType: "",
    yearFrom: "",
    yearTo: "",
    priceFrom: "",
    priceTo: "",
    mileageFrom: "",
    mileageTo: "",
    condition: "",
    location: "",
    abMFK: false,
    customerId: "",
  });
  console.log("🚀 ~ AddQuotationStepper ~ initialValues:", initialValues);
  ///////////////  // for update //////////
  useEffect(() => {
    if (singleQuotation) {
      const getData = singleQuotation?.quotation;
      const { filters, customerId, _id } = getData;
      const {
        make,
        model,
        fuel,
        bodyType,
        yearFrom,
        yearTo,
        priceFrom,
        priceTo,
        mileageFrom,
        mileageTo,
        condition,
        location,
        abMFK,
        features,
      } = filters || {};

      console.log("🚀 ~ useEffect ~ make:", make);
      setInitialValues({
        marke: make || "",
        model: model || "",
        fuel: fuel || "",
        bodyType: bodyType || "",
        yearFrom: yearFrom || "",
        yearTo: yearTo || "",
        priceFrom: priceFrom || "",
        priceTo: priceTo || "",
        mileageFrom: mileageFrom || "",
        mileageTo: mileageTo || "",
        condition: condition || "",
        location: location || "",
        abMFK: abMFK || false,
        customerId: customerId || "",
      });

      if (features) {
        setAdditionalFeature(features);
      }
    }
  }, [singleQuotation]);
  const validationSchema = Yup.object().shape({
    marke: Yup.string().required("Make is required"),
    model: Yup.string().required("Model is required"),
    fuel: Yup.string().required("Fuel type is required"),
    bodyType: Yup.string().required("Body type is required"),
    yearFrom: Yup.number()
      .min(1900, "Year must be >= 1900")
      .max(new Date().getFullYear(), "Year is too far in the future")
      .required("Year from is required"),
    yearTo: Yup.number()
      .min(Yup.ref("yearFrom"), "Year to must be after Year from")
      .max(new Date().getFullYear(), "Year is too far in the future")
      .required("Year to is required"),
    priceFrom: Yup.number()
      .min(0, "Price must be positive")
      .required("Minimum price is required"),
    priceTo: Yup.number()
      .min(Yup.ref("priceFrom"), "Price to must be greater than price from")
      .required("Maximum price is required"),
    mileageFrom: Yup.number()
      .min(0, "Mileage must be positive")
      .required("Minimum mileage is required"),
    mileageTo: Yup.number()
      .min(
        Yup.ref("mileageFrom"),
        "Mileage to must be greater than mileage from"
      )
      .required("Maximum mileage is required"),
    condition: Yup.string().required("Condition is required"),
    location: Yup.string().required("Location is required"),
    abMFK: Yup.boolean(), // Optional checkbox
  });
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Final submitted values", values);
      const { customerId, marke, ...remainingValues } = values;
      if (currentStep === 0) {
        setCurrentStep((prev) => prev + 1);
        return;
      }
      const payload = {
        customerId,
        filters: {
          make: marke,
          features: additionalFeature,
          ...remainingValues,
        },
      };
      try {
        setCurrentStep((prev) => prev + 1);
        let response;
        if (singleQuotation?.quotation?.id) {
          // Update existing quotation
          response = await axios.put(
            `/quotation/${singleQuotation.quotation.id}`,
            payload
          );
        } else {
          // Create new quotation
          response = await axios.post(ADD_QUOTATION, payload);
        }
        // const response = await axios.post(ADD_QUOTATION, payload);
        if (response?.data?.success) {
          showToast("success", response?.data?.message);
          setModalOpen(false);
          // forUpdate/////
          if (singleQuotation?.quotation?.id) {
            dispatch(getSingleQuotation(singleQuotation.quotation.id));
          }
        }
        console.log("API response:", response.data);
      } catch (error) {
        setModalOpen(false);
        console.error("Error submitting quotation:", error);
        showToast("error", error?.response?.data?.error);
      }
    },
  });
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <CarDetailsStepper
            setCurrentStep={setCurrentStep}
            formik={formik}
            additionalFeature={additionalFeature}
            setAdditionalFeature={setAdditionalFeature}
          />
        );
      case 1:
        return (
          <BuyerAndTargetStepper
            setCurrentStep={setCurrentStep}
            formik={formik}
          />
        );
      case 2:
        return (
          <LoadingScreen />
          // <SelectPlatformStepper
          //   setCurrentStep={setCurrentStep}
          //   setModalOpen={setModalOpen}
          //   modalOpen={modalOpen}
          // />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-[18px] p-4 h-full">
      <div className="flex items-center justify-between relative w-full">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center flex-1 relative"
          >
            {index > 0 && (
              <div
                className={`absolute top-[20%] left-[-45%] w-[90%] h-1 ${
                  currentStep >= index ? "bg-primary" : "bg-gray-300"
                }`}
              />
            )}

            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                currentStep > index
                  ? "bg-primary border-primary text-white"
                  : currentStep === index
                  ? "border-primary text-primary bg-white"
                  : "border-primary text-gray-400 bg-white"
              }`}
            >
              {currentStep > index ? "✔" : <GoDotFill className="text-3xl" />}
            </div>

            <p
              className={`mt-2 text-sm font-medium ${
                currentStep >= index ? "text-black" : "text-gray-400"
              }`}
            >
              {step.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6">{renderStepContent(currentStep)}</div>
      <Modal
        isOpen={showLoader}
        onClose={() => setShowLoader(false)}
        title={"Rate Car"}
        width={"w-[40%]"}
        fontSize={"text-2xl"}
        fontWeight="font-medium"
        setModalOpen={setShowLoader}
      >
        <LoadingScreen />
      </Modal>
    </div>
  );
};

export default AddQuotationStepper;
