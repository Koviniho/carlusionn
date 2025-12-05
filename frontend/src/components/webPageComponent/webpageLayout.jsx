
import { Formik, Form } from "formik";

import BackgroundImage from "./backgroundImage";
import ContactInfo from "./contactInfo";
import SocialMediaLinks from "./socialMediaLinks";
import VehicleList from "./vehicleList";
import WebsiteIdentity from "./websiteIdentity";
import axios from "../../services/api";
import { useEffect, useState } from "react";
import Images from "../../assets/images";
import showToast from "../../utils/toaster";
import Button from "../Button";

import useUserInfo from "../../hooks/useUserInfo";
import CheckLoader from "../Loading/carLoader";
const WebPageLayout = ({setWebPageData}) => {
  const vehicles = [
    {
      image: "../../assets/images/audiLogo.png",
      stockNo: "128476",
      make: "Toyota",
      model: "Camry",
      year: "2013",
      price: "$230.78",
      mileage: "4500 km",
      location: "London",
      status: "Sold",
      goLive: true,
    },
    {
      image: "../../assets/images/audiLogo.png",
      stockNo: "128476",
      make: "Toyota",
      model: "Camry",
      year: "2013",
      price: "$230.78",
      mileage: "4500 km",
      location: "London",
      status: "Available",
      goLive: true,
    },
  ];
  const userData = useUserInfo();
  console.log("🚀 ~ WebPageLayout ~ userData:", userData);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [uploadImages, setUploadImages] = useState([]);
  console.log("🚀 ~ WebPageLayout ~ uploadImages:", uploadImages);
  const [showCoverPhoto, setShowCoverPhoto] = useState(Images.background2);
  const [myLogo, setLogo] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [webpageId, setWebPageId] = useState("");
  const [allURLs, setAllURLs] = useState([]);
  const [initialValues, setInitialValues] = useState({
    siteTitle: "",
    tagline: "",
    // logo: null,
    phoneNumber: "",
    email: "",
    googleUrl: "",
    facebookUrl: "",
    instagramUrl: "",
    youtubeUrl: "",
    twitterUrl: "",
  });
  console.log("🚀 ~ WebPageLayout ~ initialValues:", initialValues);

  ///////////////////// get api ////////////////////////////
  const fetchWebpageData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/webpage");
      console.log("🚀 ~ fetchWebpageData ~ response:", response);

      if (response?.data?.success) {
        const webpage = response.data.webpage;
        const contactInfo = webpage.contactInformation || {};
        const socialInfo = webpage.socialInformation || {};
        setWebPageData(webpage)
        setWebPageId(webpage?._id);
        setAllURLs(webpage?.allURLs);
        setIsUpdating(true);
        setInitialValues({
          siteTitle: webpage.siteTitle || "",
          tagline: webpage.tagline || "",
          // logo:
          //   webpage.allURLs.find((item) => item.category === "logo")?.s3Url ||
          //   null,
          phoneNumber: contactInfo.phoneNumber || "",
          email: contactInfo.email || "",
          googleUrl: socialInfo.googleUrl || "",
          facebookUrl: socialInfo.facebookUrl || "",
          instagramUrl: socialInfo.instagramUrl || "",
          youtubeUrl: socialInfo.youtubeUrl || "",
          twitterUrl: socialInfo.twitterUrl || "",
        });

        const backgroundImageUrl = webpage.allURLs.find(
          (item) => item.category === "background-image"
        )?.s3Url;
        console.log(
          "🚀 ~ fetchWebpageData ~ backgroundImageUrl:",
          backgroundImageUrl
        );

        if (backgroundImageUrl) {
          setShowCoverPhoto(backgroundImageUrl);
        }
        const logoImageUrl = webpage.allURLs.find(
          (item) => item.category === "logo"
        )?.s3Url;
        // const logoImages = webpage.allURLs
        //   .filter((item) => item.category === "logo")
        //   .map((item) => item);
        // // if (logoImages) {
        // //   setUploadImages(logoImages);
        // // }
        if (logoImageUrl) {
          setLogo(logoImageUrl);
        }
      }
    } catch (error) {
      console.error("Error fetching webpage data", error);
      // showToast(
      //   "error",
      //   error?.response?.data?.message || "Failed to load webpage data."
      // );
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {

    fetchWebpageData();
  }, []);
  const handleSubmit = async (values) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);

    const {
      phoneNumber,
      email,
      googleUrl,
      facebookUrl,
      instagramUrl,
      youtubeUrl,
      twitterUrl,
      logo,
      tagline,
      siteTitle,
      ...remainingValues
    } = values;
    const requiredFields = {
      tagline,
      siteTitle,
      phoneNumber,
      email,
      googleUrl,
      facebookUrl,
      instagramUrl,
      youtubeUrl,
      twitterUrl,
      ...remainingValues,
    };
    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value || value === "" || value === null || value === undefined) {
        showToast("error", `Please fill out the required field: ${key}`);
        return;
      }
    }
    const contactInformation = {
      phoneNumber,
      email,
    };
    const socialInformation = {
      googleUrl,
      facebookUrl,
      instagramUrl,
      youtubeUrl,
      twitterUrl,
    };
    const payload = {
      tagline,
      siteTitle,
      contactInformation,
      socialInformation,
      allURLs: webpageId ? allURLs : "",
      ...remainingValues,
    };
    // setUploadDocument((prev) => [...prev, ...validFiles]);
    const cleanedPayload = Object.fromEntries(
      Object.entries(payload).filter(
        ([_, value]) => value !== null && value !== undefined && value !== ""
      )
    );
    const formData = new FormData();
    Object.entries(cleanedPayload).forEach(([key, value]) => {
      if (
        typeof value === "object" &&
        value !== null &&
        value !== "N/A" &&
        value !== ""
      ) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    if ((!backgroundImage || uploadImages.length === 0) && !isUpdating) {
      showToast("error", "please upload cover and logo images");
      return;
    }

    uploadImages.forEach((imageObj) => {
      formData.append(`logo`, imageObj);
    });

    if (!isUpdating || backgroundImage) {
      formData.append("background-image", backgroundImage);
    }
    try {
      setIsLoading(true);
      const response = webpageId
        ? await axios.put(`/webpage/${webpageId}`, formData) // PUT request for updating
        : await axios.post("/webpage", formData);
      console.log("Response:", response.data);
      if (response?.data?.success) {
        showToast("success", response?.data?.message);
        setIsLoading(false);
        setBackgroundImage(null);
        setUploadImages([]);
        fetchWebpageData()
      }
    } catch (error) {
      console.error("Error submitting form", error);
      showToast(
        "error",
        error?.response?.data?.error || error?.response?.data?.message
      );
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <CheckLoader size={80} />;
  }
  return (
    <div className="p-4">
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <BackgroundImage
              backgroundImage={backgroundImage}
              setBackgroundImage={setBackgroundImage}
              showCoverPhoto={showCoverPhoto}
              setShowCoverPhoto={setShowCoverPhoto}
              setAllURLs={setAllURLs}
              allURLs={allURLs}
            />
            <WebsiteIdentity
              setFieldValue={setFieldValue}
              setUploadImages={setUploadImages}
              myLogo={myLogo}
              setLogo={setLogo}
              setAllURLs={setAllURLs}
              allURLs={allURLs}
            />
            <ContactInfo />
            <SocialMediaLinks />
            <VehicleList vehicles={vehicles} />
            <div className="flex justify-end mt-12">
              <Button
                type="submit"
                text={webpageId ? "Update Changes" : "Save Changes"}
                padding="px-8 py-2"
                textColor="white"
                borderRadius="rounded-md"
                isLoading={isLoading}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default WebPageLayout;
