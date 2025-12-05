import MainHeading from "../Heading/mainHeading";
import Text from "../Heading/text";
import Icons from "../../assets/icons";
import Images from "../../assets/images";
import { useEffect } from "react";
import Button from "../Button";
import CustomInput from "../Input/custoInput";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMiniHomePage } from "../../store/features/miniHomePageSlice/miniHomePageSlice";
import { axiosWithoutToken } from "../../services/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import showToast from "../../utils/toaster";
const VehicleRequestComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { webpageId } = useParams();
  const location = useLocation();
  const { vehicleId, s3url } = location.state || {};
  useEffect(() => {
    if (vehicleId) {
      dispatch(fetchMiniHomePage({ webpageId, vehicleId }));
    }
  }, [dispatch, vehicleId, webpageId]);

  const { data } = useSelector((state) => state?.miniHomePageSlice);

  const vehicleData = data?.vehicleData;
  const vehicleArray = vehicleData?.results[0] || [];
  /////////////////// add inquiry api ////////////////
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      testDrive: false,
      testDriveDate: "",
      remarks: "",
      informationAbout: [],
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required."),
      lastName: Yup.string().required("Last name is required."),
      phoneNumber: Yup.string().required("Phone number is required."),
      remarks: Yup.string().required("Remarks is required."),
      email: Yup.string()
        .email("Please enter a valid email address.")
        .required("Email address is required."),
      testDriveDate: Yup.date()
        .nullable()
        .typeError("Please enter a valid date for the test drive."),
    }),
    onSubmit: async (values) => {
      try {
        const payload = {
          testDrive: values.testDrive,
          testDriveDate: values.testDriveDate || null,
          remarks: values.remarks,
          vehicleId,
          ownerId: data?.webpage?.ownerId,
          informationAbout: values.informationAbout,
          customerInformation: {
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber,
            email: values.email,
          },
        };

        const response = await axiosWithoutToken.post("/inquiry", payload);
        console.log("API Response:", response.data);
        showToast("success",response?.data?.message)
        navigate(-2)
      } catch (error) {
        showToast("error",error?.response?.data?.error)
        console.error("API Error:", error);
      }
    },
  });
  return (
    <div className="container mx-auto px-4 ">
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 pt-10"
      >
        <Icons.FiArrowLeft />
        <Text
          textColor="text-darkBlue"
          textSize="text-base"
          fontWeight="font-medium"
          content={"Back"}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8">
        {/* Main Image */}
        <div className="w-full">
          <img
            src={s3url}
            alt="Car Image"
            className=" w-full h-[494px] object-cover shadow-lg rounded  transition-all duration-500 ease-in-out transform "
          />
        </div>
        <div className="">
          {/* Car Details */}
          <div className="px-4 ">
            <MainHeading
              heading={vehicleArray?.make + " " + vehicleArray?.model}
              textColor="darkBlue"
              fontFamily="Poppins"
              textSize="text-[40px]"
              className="font-semibold"
            />
            {/* <h2 className="text-xl font-bold">BMW X5M Competition Steptronic</h2> */}
            <div className="flex flex-wrap items-center gap-2">
              {vehicleArray?.optionalEquipment?.additionalFeature?.map(
                (feature, index) => (
                  <Text
                    key={index}
                    textColor="text-grayText"
                    textSize="text-base"
                    fontWeight="font-medium"
                    className="inline-block"
                    content={`${feature} /`}
                  />
                )
              )}
              <Text
                textColor="text-grayText"
                textSize="text-base"
                fontWeight="font-medium"
                className="inline-block"
                content={vehicleArray?.condition?.warranty}
              />
            </div>
            <div className="pt-5 pb-5">
              <Text
                textColor="text-primary"
                textSize="text-[36px]"
                fontWeight="font-semibold"
                content={`${vehicleArray?.price?.sellingPrice_CHF} CHF`}
              />
            </div>
            <div className=" grid grid-cols-2 max-w-2xl">
              <div className="flex  items-center gap-1">
                <Icons.FaCalendar />
                <p>
                  {vehicleArray?.firstRegistration &&
                  !isNaN(new Date(vehicleArray.firstRegistration).getTime())
                    ? new Date(vehicleArray.firstRegistration)
                        .toISOString()
                        .split("T")[0]
                        .replace(/-/g, "-")
                    : "Invalid Date"}
                </p>
              </div>
              <div className="flex  items-center gap-1">
                <img src={Images.gas} className="w-4 h-4" />
                <p>{vehicleArray?.fuel?.replace(/_/g, " ")}</p>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-2 max-w-2xl">
              <div className="flex  items-center gap-1">
                <Icons.BiSolidTachometer size={20} />
                <p>{vehicleArray?.condition?.kilometer}</p>
              </div>
              <div className="flex  items-center gap-1">
                <Icons.HiSignal size={20} />
                <p>{vehicleArray?.psKw}</p>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-2 max-w-2xl">
              <div className="flex  items-center gap-1">
                <Icons.GiGearStickPattern size={20} />
                <p>{vehicleArray?.noOfGears}</p>
              </div>
              <div className="flex  items-center gap-1">
                <Icons.FaGasPump size={20} />
                <p>{vehicleArray?.consumption_L_100km} / 100 Km</p>
              </div>
            </div>
            <div className="pt-8">
              <Text
                textColor="text-darkblue"
                textSize="text-xl"
                fontWeight="font-normal"
                content={data?.webpage?.siteTitle}
                className="mt-2 mb-2"
              />
            </div>
            <div className="flex  items-center gap-1 font-medium text-darkBlue">
              <Icons.GrLocation />
              <p>Address:</p>
              <p className="text-grayText"> {vehicleArray?.location}</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-white rounded-2xl shadow-xl px-20 py-12 my-8 ">
        <Text
          textColor="text-darkblue"
          textSize="text-xl"
          fontWeight="font-semibold"
          content={data?.webpage?.siteTitle}
          className=" mb-2"
        />

        <div className="grid grid-cols-2 gap-8">
          {["firstName", "lastName", "phoneNumber", "email"].map((field) => (
            <CustomInput
              key={field}
              label={field.replace(/([A-Z])/g, " $1")}
              name={field}
              type="text"
              placeholder="enter your text ..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[field]}
              error={formik.touched[field] && formik.errors[field]}
              touched={formik.touched[field]}
            />
          ))}
        </div>
        <Text
          textColor="text-darkblue"
          textSize="text-xl"
          fontWeight="font-semibold"
          content={"Probefahrt"}
          className="mt-10 mb-2"
        />
        {/* <CustomInput label={"Probefahrt vereinbaren"} type="checkbox" /> */}
        <CustomInput
          label="Test Drive"
          name="testDrive"
          type="checkbox"
          onChange={formik.handleChange}
          checked={formik.values.testDrive}
        />
        <div className="mt-5 space-y-4">
        
          <CustomInput
            label="Test Drive Date"
            name="testDriveDate"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.testDriveDate}
          />

          <CustomInput
            label="Remarks"
            name="remarks"
            type="textarea"
            onChange={formik.handleChange}
            value={formik.values.remarks}
            onBlur={formik.handleBlur}
            error={formik.touched.remarks && formik.errors.remarks}
            touched={formik.touched.remarks}
            placeholder="Your Message..."
            rows="6"
          />
        </div>
        <Text
          textColor="text-darkblue"
          textSize="text-xl"
          fontWeight="font-semibold"
          content={"Ich wünsche mir auch Informationen zu"}
          className="mt-8 mb-2"
        />
        <div className="grid grid-cols-3 gap-8 mt-5  ">
          {/* <CustomInput label={"Leasing"} type="checkbox" />

          <CustomInput label={"Ratenzahlung oder Kredit"} type="checkbox" />

          <CustomInput label={"Versicherung"} type="checkbox" /> */}
          {["Leasing", "Installment Payment or Credit", "Insurance"].map(
            (option) => (
              <label key={option} className="block ">
                <input
                  type="checkbox"
                  name="informationAbout"
                  value={option}
                  onChange={formik.handleChange}
                  checked={formik.values.informationAbout.includes(option)}
                  className="mr-1 "
                />
                {option}
              </label>
            )
          )}
        </div>
        <p className="mt-8">
          Mit dem Senden deiner Nachricht stimmst du der AGB zu und nimmst die{" "}
          <span className="underline">Datenschutzerklärung</span> zur Kenntnis.
        </p>
        <div className="flex justify-center pt-20 pb-20 max-w-xl mx-auto">
          <Button
            text="Send Message"
            bgColor="primary"
            textColor="white"
            type="button"
            onClick={formik.handleSubmit}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleRequestComponent;
