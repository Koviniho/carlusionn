import { useFormik } from "formik";
import Breadcrumb from "../../../Breadcrumb";
import InvoiceAddForm from "./components/InvoiceAddForm";
import InvoiceItemAddTable from "./components/InvoiceItemTable";
import RightInfo from "./components/RightInfo";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axios from "../../../../services/api";
import { ADD_INVOICE, UPDATE_INVOICE } from "../../../../utils/baseURL";
import showToast from "../../../../utils/toaster";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSingleInvoice } from "../../../../store/features/invoiceSlice/getSingleInvoiceSlice";
import Button from "../../../Button";
import CheckLoader from "../../../Loading/carLoader";

const CreateInvoice = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location?.state?.id;
  const isUpdate = Boolean(id);
  const navigate = useNavigate();
  const [invoiceItem, setInvoiceItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    customerId: "",
    creationDate: "",
    dueDate: "",
    numberOfDays: "",
    price: "",
    subject: "",
    vehicleId: "",
    vehicleDescription: "",
    notes: "",
    tasks: "",
  });
  const [loadingInvoiceData, setLoadingInvoiceData] = useState(isUpdate);

  useEffect(() => {
    if (isUpdate) {
      (async () => {
        setLoadingInvoiceData(true);
        try {
          const response = await dispatch(fetchSingleInvoice(id)).unwrap();
          console.log("🚀 ~ response:", response);

          const data = response?.invoice;
          setInitialValues({
            customerId: data?.customerId?._id || "",
            creationDate: data?.creationDate
              ? data.creationDate.split("T")[0]
              : "",
            dueDate: data?.dueDate ? data.dueDate.split("T")[0] : "",
            numberOfDays: data?.numberOfDays || "",
            price: data?.price,
            subject: data?.subject || "",
            vehicleId: data?.vehicleId?._id || "",
            vehicleDescription: data?.vehicleDescription || "",
            notes: data?.notes || "",
            tasks: data?.tasks || "",
          });
          setInvoiceItem(data?.invoiceItem || []);
        } catch (error) {
          showToast("error", error?.response?.data?.error);
        } finally {
          setLoadingInvoiceData(false);
        }
      })();
    }
  }, [dispatch, id, isUpdate]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const removeEmptyFields = (obj) => {
    return Object.keys(obj)
      .filter(
        (key) => obj[key] !== "" && obj[key] !== null && obj[key] !== undefined
      )
      .reduce((newObj, key) => {
        newObj[key] = obj[key];
        return newObj;
      }, {});
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object().shape({
      customerId: Yup.string().required("Customer is required"),
      creationDate: Yup.date().required("Invoice date is required"),

      dueDate: Yup.string().required("Due date is required"),
      numberOfDays: Yup.string().required("Payment deadline is required"),
      price: Yup.number()
        .required("Price is required")
        .min(1, "Price must be at least 1"),
      subject: Yup.string().required("Subject is required"),
    }),
    onSubmit: async (values) => {
      const { creationDate, dueDate, ...remainingValues } = values;

      const payload = removeEmptyFields({
        ...values,
        invoiceItem,
      });

      const updatePayload = removeEmptyFields({
        ...remainingValues,
        creationDate: formik.values.creationDate
          ? new Date(formik.values.creationDate).toISOString()
          : null,
        dueDate: formik.values.dueDate
          ? new Date(formik.values.dueDate).toISOString()
          : null,
        invoiceItem,
      });
      try {
        // const response = await axios.post(ADD_INVOICE, payload);
        setIsLoading(true);
        const response = isUpdate
          ? await axios.put(UPDATE_INVOICE(id), updatePayload)
          : await axios.post(ADD_INVOICE, payload);
        if (response?.data?.success) {
          showToast("success", response?.data?.message);
          formik.resetForm();
          navigate(-1);
          setIsLoading(false);
        }
        // Handle success (e.g. show a message or redirect)
      } catch (error) {
        showToast("error", error?.response?.data?.error);
        setIsLoading(false);
      }
    },
  });
  console.log("🚀 ~ CreateInvoice ~ formik:", formik);

  useEffect(() => {
    console.log("invoiceItem changed:", invoiceItem);
    const totalUnitPrice = invoiceItem?.reduce(
      (sum, item) => sum + (item.totalPrice || 0),
      0
    );

    if (totalUnitPrice > 0 && invoiceItem.length > 0) {
      console.log("Auto-setting price to:", totalUnitPrice);
      formik.setFieldValue("price", totalUnitPrice);
    } else if (!initialValues?.price) {
      formik.setFieldValue("price", "");
    }
  }, [initialValues?.price, invoiceItem]);

  if (loadingInvoiceData) {
    return <CheckLoader size={80} />;
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <Breadcrumb
        heading={"Invoices (Rechnungen)"}
        pageName="Invoice Management"
      />
      <div className="grid grid-cols-10 gap-4 mt-10  items-start justify-start  ">
        <div className=" col-span-7 space-y-5 ">
          <InvoiceAddForm formik={formik} invoiceItem={invoiceItem} />
        </div>

        <div className="col-span-3 rounded-md ">
          <RightInfo formik={formik} />
        </div>
      </div>
      <div className="mt-3">
        <InvoiceItemAddTable
          setInvoiceItem={setInvoiceItem}
          invoiceItem={invoiceItem}
        />
      </div>
      <div className="flex justify-end mt-4">
        <Button
          text={isUpdate ? "Update Invoice" : "Create Invoice"}
          textColor="white"
          borderRadius="rounded-md"
          isLoading={isLoading}
          type="submit"
        />
      </div>
    </form>
  );
};

export default CreateInvoice;
