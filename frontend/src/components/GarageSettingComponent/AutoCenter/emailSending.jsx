import React, { useState } from "react";
import Text from "../../Heading/text";
import { RiErrorWarningLine } from "react-icons/ri";
import Button from "../../Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../Input/custoInput";
import { OwnEmailInput } from "../../../Inputs/GarageSetting.input";

function EmailSending() {
  const [selectedTab, setSelectedTab] = useState("Send with Carlusion");

  // Render the content for the selected tab
  const renderTabContent = () => {
    switch (selectedTab) {
      case "Send with Carlusion":
        return <SendWithCarlusion />;
      case "Own email / SMTP":
        return <OwnEmailSMTP />;

      default:
        return <SendWithCarlusion />;
    }
  };
  return (
    <div className=" border my-3 border-lightGray rounded-md bg-white w-full ">
      <div className="flex items-center gap-4 border-b border-lightGray px-4 py-2">
        <Text
          content="Email Sending"
          textColor="text-darkBlue"
          fontWeight="font-semibold"
        />
      </div>
      <div className="flex space-x-4 p-4">
        <button
          onClick={() => setSelectedTab("Send with Carlusion")}
          className={`${
            selectedTab === "Send with Carlusion"
              ? "bg-primary text-white"
              : "bg-gray-100 text-grayText"
          } rounded-md px-10 py-1`}
        >
          Send with Carlusion
        </button>

        <button
          onClick={() => setSelectedTab("Own email / SMTP")}
          className={`${
            selectedTab === "Own email / SMTP"
              ? "bg-primary text-white"
              : "bg-gray-100 text-grayText"
          } rounded-md text-lg font-medium px-10 py-1`}
        >
          Own email / SMTP
        </button>
      </div>
      <div className="p-4">{renderTabContent()}</div>
    </div>
  );
}

export default EmailSending;

const SendWithCarlusion = () => {
  return (
    <div>
      <div className="space-y-2">
        <label className="flex items-center gap-1 text-darkBlue font-medium">
          Email Sender <span className="text-secondary">*</span>
        </label>
        <div className="p-2 w-full border border-lightGray flex items-center justify-between ">
          <input
            className="text-lightGray w-8/12 focus:outline-none"
            placeholder="Autocenter-Niederbipp-AG"
          />
          <span className="font-medium text-black">@Carlusion.email</span>
        </div>
      </div>
      <div className="bg-blue-100 my-5 px-4 py-2 flex items-center gap-3">
        <RiErrorWarningLine size={24} className="text-blue-500" />
        <div className="space-y-2">
          <Text
            content="Emails are sent from this email address."
            className="text-normal"
            fontWeight="font-medium"
            textColor="text-[#B5C2D7]"
          />
          <Text
            content="Replies from your customers will be automatically forwarded to the workshop email address info@acnag.ch."
            className="text-normal"
            fontWeight="font-medium"
            textColor="text-[#B5C2D7]"
          />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <Button
          text="Save"
          bgColor="primary"
          textColor="white"
          borderRadius="rounded-md"
          borderColor="primary"
          padding="px-12 py-2"
        />
        <button
          className={
            "hover:bg-none px-12 py-2 text-error border border-error rounded-md "
          }
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const OwnEmailSMTP = () => {
  // Formik setup
  const formik = useFormik({
    initialValues: OwnEmailInput.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {}),
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-2">
      {OwnEmailInput.map((field) => (
        <CustomInput
          key={field.name}
          name={field.name}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          value={formik.values[field.name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors[field.name]}
          touched={formik.touched[field.name]}
          required={field.require}
          options={field.options}
          paddingY="py-8"
          fontWeight="font-semibold" // if any options for select, otherwise undefined
        />
      ))}

      <div className="flex items-center gap-5">
      <Button
          text="Save"
          bgColor="primary"
          textColor="white"
          borderRadius="rounded-md"
          borderColor="primary"
          padding="px-12 py-2"
        />
        <button
          className={
            "hover:bg-none px-12 py-2 text-error border border-error rounded-md "
          }
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
