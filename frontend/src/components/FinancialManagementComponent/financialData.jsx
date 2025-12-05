import React from "react";
import InfoCard from "../InfoCard";
import PaymentSvg from "../../assets/svg/paymentSvg";
import PendingSvg from "../../assets/svg/pendingSvg";
import RefundSvg from "../../assets/svg/refundSvg";
import CustomTable from "../Custom-Tabel";
import Button from "../Button";
import { IoSearchCircleOutline, IoSearchOutline } from "react-icons/io5";
import { FaFilter, FaPlus, FaRegEdit } from "react-icons/fa";
import { useFormik } from "formik";
import PopUpModel from "../Modals/pop-up-modals";
import WarningModel from "../Modals/warning-model";
import { MdDeleteOutline } from "react-icons/md";

function TableHeader({ checkboxRef, checked, onToggleAll }) {
  return (
    <thead>
      <tr className="bg-primary !rounded-none">
        <th
          scope="col"
          className="py-3.5 pl-5 pr-3 text-left font-semibold text-white"
        >
          Trans. ID
        </th>
        <th
          scope="col"
          className="py-3.5 pr-3 text-left font-semibold text-white"
        >
          Customer Name
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white"
        >
          Type
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white"
        >
          Amount
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white"
        >
          Date
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white"
        >
          Payment Method
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white"
        >
          Status
        </th>

        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white"
        >
          Actions
        </th>
      </tr>
    </thead>
  );
}

function TableBody({ data, selectedData }) {
  // const dispatch = useDispatch();
  // const [modalOpen, setModalOpen] = useState(false);
  // const [selectedContractTemplate, setContractTemplates] = useState(null);
  const handleEditClick = (item) => {
    // setContractTemplates(item);
    // formik.setValues({
    //   image: null,
    //   stockNo: item.stockNo || "",
    //   templateId: item?.templateId || "",
    //   templateName: item?.templateName || "",
    //   createdBy: item?.createdBy || "",
    //   contractFile: null,
    //   contractType: item?.contractType || "",
    // });
    // setModalOpen(true);
  };
  const handleDeleteClick = async (item) => {
    // const response = await dispatch(deleteContractTemplate(item._id));
    // if (response) {
    //   dispatch(getAllContractTemplates());
    // }
  };
  const formik = useFormik({
    initialValues: {
      templateId: "",
      templateName: "",
      createdBy: "",
      contractFile: null,
      contractType: "",
    },
    // validationSchema: editvalidationSchema,

    onSubmit: async (values) => {
      let formData;

      // if (values.contractFile) {
      // If contractFile is provided, create a FormData object
      // formData = new FormData();
      // Object.keys(values).forEach((key) => {
      // Append all values to FormData, including contractFile
      //   formData.append(key, values[key]);
      // });
      // } else {
      // If no contractFile is provided, submit as a regular object
      //   formData = { ...values };
      //   delete formData.contractFile; // Optionally remove contractFile field if not needed
      // }

      // Submit the form data
      // const response = await dispatch(
      //   updateContracTemplatestById({
      //     id: selectedContractTemplate?._id,
      //     body: formData,
      //   })
      // );

      // if (response) {
      //   dispatch(getAllContractTemplates());

      //   setContractModal(true);
      // }
    },
  });
  return (
    <tbody className="bg-white">
      {data?.map((item, index) => {
        const isSelected = selectedData.includes(item);

        return (
          <tr
            key={index}
            className={`${
              isSelected ? "bg-gray-200" : "hover:bg-gray-50 cursor-pointer"
            } border-b border-gray-100`}
          >
            <td className=" pl-5 whitespace-nowrap text-primary py-4 text-lightBlackText">
              TX001
            </td>
            <td className="whitespace-nowrap text-primary py-4 text-lightBlackText">
              John Doe
            </td>
            <td className="whitespace-nowrap py-4 text-lightBlackText">
              Payment
            </td>
            <td className="whitespace-nowrap py-4 text-lightBlackText">
              $12,766
            </td>
            <td className="whitespace-nowrap py-4 text-lightBlackText">
              01 Aug, 2012
            </td>
            <td className="whitespace-nowrap py-4 text-lightBlackText">
              Credit Card
            </td>
            <td className="whitespace-nowrap py-4 text-lightBlackText">
              Completed
            </td>
            <td className="whitespace-nowrap px-3 py-4  flex items-center gap-3">
              <PopUpModel
                heading="Edit Contract Templates"
                trigger={
                  <button onClick={() => handleEditClick(item)}>
                    <FaRegEdit size={17} className="text-primary" />
                  </button>
                }
                // modalOpen={
                //   modalOpen && selectedContractTemplate?._id === item._id
                // }
                // setModalOpen={setModalOpen}
              >
                {/* <form
                  onSubmit={formik.handleSubmit}
                  className="space-y-1.5 p-6 bg-white rounded-md shadow-md"
                >
                  {fields.map((field) => (
                    <CustomInput
                      key={field.name}
                      type={field.type}
                      name={field.name}
                      label={field.label}
                      value={formik.values[field.name]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.errors[field.name]}
                      touched={formik.touched[field.name]}
                      options={field.options || []} // Pass options only if they exist
                    />
                  ))}
                  <Button
                    type="submit"
                    text="Submit"
                    className="w-full"
                    borderRadius="rounded-sm"
                    // isLoading={isLoading}
                  />
                </form> */}
              </PopUpModel>
              <WarningModel
                buttonTwoText="Delete"
                bgColor="danger"
                trigger={
                  <button>
                    <MdDeleteOutline size={17} className="text-error" />
                  </button>
                }
                // onSave={() => handleDeleteClick(item)}
              >
                {/* <h3 className="mt-5.5 pb-2 text-xl font-medium text-black sm:text-2xl">
                  Delete Contract
                </h3>
                <p className="my-2 text-gray-400">
                  Are you sure you want to delete this Contract?
                </p> */}
              </WarningModel>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

function FinancialData() {
  const stats = [
    {
      title: "Total Revenue",
      value: "3521",
      icon: <PaymentSvg color="#19DB8C" className="fill-[#19DB8C]" />,
    },
    {
      title: "Vehicle Sales",
      value: "3521",
      icon: <PendingSvg />,
    },
    {
      title: "Leasing Contracts",
      value: "3521",
      icon: <PendingSvg />,
    },
    {
      title: "Monthly Sales",
      value: "3521",
      icon: <RefundSvg />,
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-4 gap-6 mb-12 mt-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`
          
          
        `}
          >
            <InfoCard title={stat.title} value={stat.value} icon={stat?.icon} />
          </div>
        ))}
      </div>
      <div className="bg-white border rounded-lg shadow-2xl">
        <div className="flex items-center justify-between p-4">
          {/* Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border-b border-gray-100 w-[400px]">
              <IoSearchCircleOutline className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pr-4 py-2 rounded-lg outline-none"
              />
            </div>
            <p className="text-primary text-sm font-medium">0 results found</p>
          </div>
          {/* Search and Button Container */}
          <div className="flex items-center gap-5">
            <Button
              text="Filters"
              borderRadius="none"
              icon={<FaFilter className="h-5 w-5" />}
            />
            <Button
              text="New Transaction"
              borderRadius="none"
              icon={<FaPlus className="h-5 w-5" />}
            />
            {/* <PopUpModel
              heading="New Template"
              trigger={
                <Button
                  text="New Template"
                  borderRadius="none"
                  icon={<FaPlus className="h-5 w-5" />}
                />
              }
              modalOpen={contractModal}
              setModalOpen={setContractModal}
            >
              <form
                onSubmit={formik.handleSubmit}
                className="space-y-1.5 p-6 bg-white rounded-md shadow-md"
              >
                {fields.map((field) => (
                  <CustomInput
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    label={field.label}
                    value={formik.values[field.name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors[field.name]}
                    touched={formik.touched[field.name]}
                    options={field.options || []} // Pass options only if they exist
                  />
                ))}
                <Button
                  type="submit"
                  text="Submit"
                  className="w-full"
                  borderRadius="rounded-sm"
                  isLoading={isLoading}
                />
              </form>
            </PopUpModel> */}
          </div>
        </div>
        {false ? (
          <ShimmerTable row={10} col={8} />
        ) : (
          <CustomTable
            className="table-fixed w-full"
            TableHeader={TableHeader}
            TableBody={(props) => <TableBody {...props} />}
            data={["", "", "", "", "", "", "", "", "", "", "", ""]}
          />
        )}
      </div>
    </div>
  );
}

export default FinancialData;
