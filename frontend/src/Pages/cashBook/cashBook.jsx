import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import InfoCard from "../../components/InfoCard";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Images from "../../assets/images";
import Text from "../../components/Heading/text";
import Button from "../../components/Button";
import Icons from "../../assets/icons";
import CashBookComponent from "../../components/cashBookComponent/cashBookComponent";
import CustomInput from "../../components/Input/custoInput";
import Modal from "../../components/modal/modal";
import * as Yup from "yup";
import axios from "../../services/api";
import { UPDATE_CASH_BALANCE } from "../../utils/baseURL";
import showToast from "../../utils/toaster";
import { fetchAllCashbook } from "../../store/features/cashBookSlice/getAllCashBookSlice";
import * as XLSX from "xlsx";
const CashBookPage = () => {
  const dispatch = useDispatch();

  const { allCashbookEntries, page, limit } = useSelector(
    (state) => state?.fetchAllCashbookSlice
  );
  const stats = [
    {
      title: "Total Entries",
      value: allCashbookEntries?.totalCount,
      icon: <img src={Images.tag} alt="" className="w-8 h-8" />,
    },
    {
      title: "Total Withdrawal Amount",
      value: allCashbookEntries?.totalWithdrawn,
      icon: <img src={Images.tag} alt="" className="w-8 h-8" />,
    },
    {
      title: "Total Amount Deposited",
      value: allCashbookEntries?.totalDeposited,
      icon: <img src={Images.tag} alt="" className="w-8 h-8" />,
    },
    {
      title: "Last Month Deposited",
      value: allCashbookEntries?.lastMonthDeposited,
      icon: <img src={Images.tag} alt="" className="w-8 h-8" />,
    },
  ];

  useEffect(() => {
    dispatch(fetchAllCashbook({ page, limit }));
  }, [dispatch, limit, page]);
  console.log("🚀 ~ CashBookPage ~ allCashbookEntries:", allCashbookEntries);
  /////////// tabs management //////////
  const [selectedTab, setSelectedTab] = useState("Cashbook");
  // const tabs = ["Cashbook", "Last Month's Report", "Yesterday's Report"];
  const tabs = ["Cashbook"];
  const renderTabContent = () => {
    const tabContent = {
      Cashbook: <CashBookComponent />,
    };
    return tabContent[selectedTab] || null;
  };

  ////////////   for edit balance ///////////////////
  const [value, setValue] = useState(0);
  useEffect(() => {
    setValue(allCashbookEntries?.cashBalance);
  }, [allCashbookEntries?.cashBalance]);

  //////////////////////////// for edit cash balance/////////////////////
  const [openBalanceModal, setopenBalanceModal] = useState(false);
  const fields = [
    {
      name: "newBalance",
      label: "New cash balance",
      type: "number",
      placeholder: "103.00 CHF",
    },

    {
      name: "receiptDate",
      label: "Receipt Date",
      type: "date",
    },

    {
      name: "cashbookDescription",
      label: "Description ",
      placeholder: "Correction entry etc....",
      type: "textarea",
    },
  ];
  const [initialValues, setInitialValues] = useState({
    newBalance: "",
    receiptDate: "",
    cashbookDescription: "",
  });
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      newBalance: Yup.number()
        .typeError("Enter a valid number")
        .required("New cash balance is required"),
      receiptDate: Yup.date()
        .typeError("Select a valid date")
        .required("Receipt date is required"),
    
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const payload = {
          newBalance: parseFloat(values.newBalance),
          receiptDate: new Date(values.receiptDate).toISOString(), // Ensures ISO string
          cashbookDescription: values.cashbookDescription,
        };

        const response = await axios.put(UPDATE_CASH_BALANCE, payload);
        console.log("Balance update successful:", response.data);
        if (response?.data?.success) {
          console.log("Response:", response.data);
          showToast("success", response?.data?.message);
          resetForm();
          setopenBalanceModal(false);
          dispatch(fetchAllCashbook({ page, limit }));
        }
      } catch (error) {
        console.error("Failed to update balance:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const newInitials = {
          newBalance: allCashbookEntries?.cashBalance?.toString() || "",
          receiptDate:
            allCashbookEntries?.receiptDate?.split("T")[0] || "",
          cashbookDescription:
            allCashbookEntries?.cashbookDescription || "",
        };

        setInitialValues(newInitials);
      } catch (err) {
        console.error("Failed to fetch cashbook data", err);
      }
    };

    if (openBalanceModal) {
      fetchData();
    }
  }, [
    allCashbookEntries?.data?.cashBalance,
    allCashbookEntries?.data?.cashbookDescription,
    allCashbookEntries?.data?.receiptDate,
    openBalanceModal,
  ]);


/////////////////////  // download entries in excel ////////////////////////



const handleDownloadExcel = async () => {
  try {
    const response = await dispatch(fetchAllCashbook());

    console.log("🚀 ~ handleDownloadExcel ~ response:", response)
    const entries = response?.payload?.results|| [];

    if (entries.length === 0) {
      showToast("error", "No entries available to download.");
      return;
    }

    const formattedData = entries.map((entry, index) => ({
      "S.No": index + 1,
      Date: new Date(entry.date).toLocaleDateString(),
      Amount: entry.amount,
      Description: entry.description,
      Type: entry.amount < 0 ? "Withdrawal" : "Deposit",
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // 🔥 Auto-width columns
    const columnWidths = Object.keys(formattedData[0]).map((key) => {
      const maxLength = Math.max(
        key.length,
        ...formattedData.map((item) => (item[key] ? item[key].toString().length : 0))
      );
      return { wch: maxLength + 5 };
    });
    worksheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cashbook");
    XLSX.writeFile(workbook, "Cashbook.xlsx");
  } catch (err) {
    console.error("Failed to download Excel:", err);
    showToast("error", "Failed to download Excel file.");
  }
};

  return (
    <>
      {/* /////////for balance //////////// */}
      <Modal
        isOpen={openBalanceModal}
        onClose={() => setopenBalanceModal(false)}
        title={"Change cash balance"}
        width={"w-[40%]"}
        fontSize={"text-2xl"}
        fontWeight="font-medium"
        setModalOpen={setopenBalanceModal}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            {fields.map((field) => (
              <CustomInput
                key={field.name}
                type={field.type}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                // value={formik.values[field.name]}
                value={formik.values[field.name] ?? ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                readOnly={field.readOnly}
                error={formik.errors[field.name]}
                touched={formik.touched[field.name]}
                options={field.options || []}
                fontWeight={"font-medium"}
              />
            ))}
            <div className=" mt-4">
              <Button
                text={"Change cash balance"}
                textColor="white"
                borderRadius="rounded-md"
                isLoading={formik.isSubmitting}
                type="submit"
                className={"w-full"}
              />
            </div>
          </div>
        </form>
      </Modal>
      <Breadcrumb heading="Cash Book" pageName="Cash Book" />
      <div className="flex space-x-4  justify-between items-center">
        <div className="space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`${
                selectedTab === tab
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-grayText"
              } rounded-md px-10 py-1.5 transition-colors text-lg duration-300 ease-in-out`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex flex-col items-center gap-2 ">
          <Text content="Cash Balance" textSize="text-xl" />
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xl text-secondary font-semibold">
              {value} CHF
            </span>

            <Icons.MdOutlineEdit
              size={30}
              className="bg-[#CDF7E6] text-secondary p-1 rounded cursor-pointer"
              onClick={() => setopenBalanceModal(true)}
            />
            {/* )} */}
          </div>
          <Button
            text={"Download Excel"}
            icon={<img src={Images.upload} className="w-6" />}
            bgColor="secondary"
            textColor="white"
            borderRadius="rounded-md"
            onClick={handleDownloadExcel}
          />
        </div>
      </div>
      <div className="flex w-full items-start gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 mt-5">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`
          
          
        `}
            >
              <InfoCard
                title={stat.title}
                value={stat.value}
                icon={stat?.icon}
                textColor="darkBlue"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </>
  );
};

export default CashBookPage;
