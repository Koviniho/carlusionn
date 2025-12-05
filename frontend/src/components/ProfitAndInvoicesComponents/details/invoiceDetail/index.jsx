/* eslint-disable no-constant-binary-expression */
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import MainHeading from "../../../../components/Heading/mainHeading";

import "react-photo-view/dist/react-photo-view.css";
import Icons from "../../../../assets/icons";
import Button from "../../../../components/Button";
import Breadcrumb from "../../../Breadcrumb";
import InvoiceItemTable from "./components/InvoiceItemTable";
import LeftInformation from "./components/LeftInformation";
import RightInformation from "./components/RightInformation";
import * as Yup from "yup";
import { fetchSingleInvoice } from "../../../../store/features/invoiceSlice/getSingleInvoiceSlice";
import Modal from "../../../modal/modal";
import { useFormik } from "formik";
import CustomInput from "../../../Input/custoInput";
import { recordPayment } from "../../../../store/features/invoiceSlice/recordPaymentSlice";
import showToast from "../../../../utils/toaster";
import CustomSelect from "../../../customSelect/customSelect";
import { showErrorAlert } from "../../../sweetAlert/sweetAlert";
import CheckLoader from "../../../Loading/carLoader";
function IvoiceDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [showDetails, setShowDetails] = useState(true);
  // const [showTechnicalInfo, setShowTechnicalInfo] = useState(true);
  // const [infoFirst, setInfoFirst] = useState(true);
  // const [infoSecond, setInfoSecond] = useState(true);
  // const [infoThird, setInfoThird] = useState(true);

  // const { singleVehicle } = useSelector((state) => state.vehicle);
  // const vehicleDetails = singleVehicle?.vehicle || {};
  const { id } = useParams();

  // useEffect(() => {
  //   dispatch(getSingleVehicle(id));
  // }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchSingleInvoice(id));
  }, [dispatch, id]);

  const { singleInvoice,loading } = useSelector(
    (state) => state?.fetchSingleInvoiceSlice
  );
  const invoiceDetail = singleInvoice?.invoice;
  console.log("🚀 ~ IvoiceDetail ~ invoiceDetail:", invoiceDetail);
  ///////////////add payment model /////////////////////
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const fields = [
    {
      name: "amount",
      label: "Payment Amount",
      type: "number",
      placeholder: "103.00",
    },
    {
      name: "date",
      label: "Payment Date",
      type: "date",
      placeholder: "02.10.2012",
    },
    {
      name: "method",
      label: "Payment Method",
      type: "select",
      options: [
        { value: "", label: "Select payment method" },
        { value: "cash", label: "Cash" },
        { value: "card", label: "Card" },
        { value: "bank transfer", label: "Bank Transfer" },
      ],
      placeholder: "Select method",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "enter the Description……",
      rows: 4,
    },
  ];

  const [openPaymentModel, setOpenPaymentModel] = useState(false);
  const formik = useFormik({
    initialValues: {
      amount: "",
      date: "",
      method: "",
      description: "",
    },
    validationSchema: Yup.object({
      amount: Yup.number()
        .required("Amount is required")
        .min(1, "Minimum amount is 1")
        .max(
          invoiceDetail?.remainingAmount,
          `Cannot exceed total of ${invoiceDetail?.remainingAmount}`
        ),
      date: Yup.date()
        .required("Date is required")
        .min(today, "Date cannot be in the past"),
      method: Yup.string().required("Payment method is required"),
      // description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      try {
        const payload = {
          customerId: invoiceDetail?.customerId?._id,
          editorId: invoiceDetail?.editorId?._id,
          vehicleId: invoiceDetail?.vehicleId?._id,
          addPayment: {
            ...values,
          },
        };
        const response = await dispatch(
          recordPayment({ id, payload })
        ).unwrap();
        if (response?.success) {
          showToast("success", "Payment added successfully!");
          dispatch(fetchSingleInvoice(id));
          setOpenPaymentModel(false);
          formik.resetForm();
          console.log("Payment submitted:", response);
        }
      } catch (error) {
        showToast("error", error?.response?.data?.message);
        console.error("Error submitting form:", error);
      }
    },
  });

  /////////////for status update ///////////
  useEffect(() => {
    setSelectedStatus(invoiceDetail?.status);
  }, [invoiceDetail?.status]);
  const options = [
    { label: "More", value: "" },
    { label: "Mark as Paid", value: "paid" },
    { label: "Edit Invoice", value: "edit" },
    { label: "Cancel Invoice", value: "cancellation" },
  ];
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    console.log("🚀 ~ handleStatusChange ~ newStatus:", newStatus)
    if (invoiceDetail?.status === "cancellation") {
      showToast("error","You can't change the status of a cancelled invoice.");
      return;
    }
    if (newStatus === "edit") {
      if (invoiceDetail?.remainingAmount === invoiceDetail?.price) {
        navigate("/dashboard/profit-&-invoices/new-invoice", {
          state: { fromEdit: true, id: id }, // replace `yourIdVariable` with the actual id
        });
        return;
      } else {
        showErrorAlert(
          "Error",
          "Your payment is in progress or completed. You are unable to edit."
        );
        return;
      }
    }
    setSelectedStatus(newStatus);
    // const payload = {
    //   status: newStatus,
    // };
    const payload = {
      status: newStatus,
      ...(newStatus === "paid" && {
        customerId: invoiceDetail?.customerId?._id,
        editorId: invoiceDetail?.editorId?._id,
        vehicleId: invoiceDetail?.vehicleId?._id,
      }),
    };
    try {
      const response = await dispatch(recordPayment({ id, payload })).unwrap();
      console.log("🚀 ~ handleStatusChange ~ response:", response);
      if (response?.success) {
        showToast("success", response?.message);
        dispatch(fetchSingleInvoice(id));
        setOpenPaymentModel(false);
        formik.resetForm();
        console.log("Payment submitted:", response);
      }
    } catch (error) {
      showToast("error", error?.response?.data?.message);
      console.error("Error submitting form:", error);
    }
  };

  
  if (loading) {
    return <CheckLoader size={80} />;
  }
  return (
    <>
      <Breadcrumb
        heading={`Rechnung # ${invoiceDetail?._id}`}
        pageName="Invoice Management"
      />
      <Modal
        isOpen={openPaymentModel}
        onClose={() => setOpenPaymentModel(false)}
        title={"Record Payment"}
        width={"w-[40%]"}
        fontSize={"text-2xl"}
        fontWeight="font-medium"
        setModalOpen={setOpenPaymentModel}
      >
        <form onSubmit={formik.handleSubmit} className=" mx-auto p-4 space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <CustomInput
                label={field.label}
                type={field.type}
                name={field.name}
                rows={field.rows || undefined}
                options={field.options}
                placeholder={field.placeholder}
                className="outline-none w-full border px-3 py-2 rounded"
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors[field.name]}
                touched={formik.touched[field.name]}
              />
            </div>
          ))}

          <Button
            type="submit"
            text={"Add Payment"}
            textColor="white"
            borderRadius="rounded-md"
            isLoading={formik.isSubmitting}
            className="w-full py-2"
          />
        </form>
      </Modal>
      <div>
        <div className="flex items-center justify-between">
          <MainHeading
            className="font-poppins"
            textColor="secondary"
            textSize="text-[32px]"
            fontWeight="font-semibold"
          
            heading={`${invoiceDetail?.price} CHF` || "-"}
          />

          <div className="flex items-center gap-3">
            {/* <Button
              borderRadius="rounded-md"
              bgColor="error hover:border-error"
              textColor="white hover:text-error"
              text="Overdue"
            /> */}
            {invoiceDetail?.overdue && (
              <div className="text-white bg-error px-4 py-2 rounded text-sm">
                Overdue
              </div>
            )}
            {/* <Button
              icon={<IoIosArrowDown size={24} />}
              borderRadius="rounded-md"
              bgColor="secondary"
              textColor="white"
              text="More"
              iconPosition="right"
              fontSize="text-[16px]"
            /> */}
            <CustomSelect
              name="event"
              options={options}
              value={selectedStatus}
              onChange={handleStatusChange}
              // backgroundColor="bg-secondary"
              borderColor="border-primary"
              textColor="text-primary"
              fontSize="text-sm"
            />
            <Button
              icon={<Icons.BiEditAlt size={20} />}
              borderRadius="rounded-md"
              bgColor="primary"
              textColor="white"
              text="Payment Reminder"
              fontSize="text-[14px]"
            />

            <Button
              borderRadius="rounded-md"
              bgColor="primary"
              textColor="white"
              text="Record Payment"
              fontSize="text-[14px]"
              onClick={() => setOpenPaymentModel(true)}
            />
          </div>
        </div>
        <div className="grid grid-cols-10 gap-4 mt-10  items-start justify-start  ">
          <div className=" col-span-7 space-y-5 ">
            <LeftInformation />
          </div>

          <div className="col-span-3 rounded-md ">
            <RightInformation />
          </div>
        </div>
        <div>
          <InvoiceItemTable />
        </div>
      </div>
    </>
  );
}

export default IvoiceDetail;
