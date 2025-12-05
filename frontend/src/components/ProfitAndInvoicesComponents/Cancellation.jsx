import React from "react";
import { FaPlus, FaRegEdit, FaRegEye } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import CustomTable from "../Custom-Tabel";
import CustomInput from "../Input/custoInput";
import Button from "../Button";
import { Link } from "react-router-dom";
import FilterSvg from "../../assets/svg/filter";

function TableHeader({ checkboxRef, checked, onToggleAll }) {
  return (
    <thead>
      <tr className="bg-primary !rounded-none">
        <th className="py-3.5 pl-5 text-left font-semibold text-white">
          <CustomInput type="checkbox" />
        </th>
        <th
          scope="col"
          className="py-3.5 pr-3 pl-5 text-left font-semibold text-white w-1/6"
        >
          Trans. ID{" "}
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white w-1/6"
        >
          Customer Name
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white w-1/6"
        >
          Type
        </th>

        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white w-1/6"
        >
          Amount
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white w-1/6"
        >
          Date
        </th>

        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white w-1/6"
        >
          Payment Method
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white w-1/6"
        >
          Status
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white w-1/6"
        >
          Actions
        </th>
      </tr>
    </thead>
  );
}

const data = [
  {
    id: "TX001",
    customerName: "John Doe",
    type: "Payment",
    amount: "$12,766",
    date: "01 Aug, 2012",
    paymentMethod: "Credit Card",
    status: "Cancellation",
  },
  {
    id: "TX001",
    customerName: "John Doe",
    type: "Refund",
    amount: "$12,766",
    date: "01 Aug, 2012",
    paymentMethod: "Credit Card",
    status: "Cancellation",
  },
  {
    id: "TX001",
    customerName: "John Doe",
    type: "Payment",
    amount: "$12,766",
    date: "01 Aug, 2012",
    paymentMethod: "Credit Card",
    status: "Cancellation",
  },
  {
    id: "TX001",
    customerName: "John Doe",
    type: "Payment",
    amount: "$12,766",
    date: "01 Aug, 2012",
    paymentMethod: "Cash",
    status: "Cancellation",
  },
  {
    id: "TX001",
    customerName: "John Doe",
    type: "Payment",
    amount: "$12,766",
    date: "01 Aug, 2012",
    paymentMethod: "Bank Transfer",
    status: "Cancellation",
  },
  {
    id: "TX001",
    customerName: "John Doe",
    type: "Loan",
    amount: "$12,766",
    date: "01 Aug, 2012",
    paymentMethod: "Cash",
    status: "Cancellation",
  },
  {
    id: "TX001",
    customerName: "John Doe",
    type: "Loan",
    amount: "$12,766",
    date: "01 Aug, 2012",
    paymentMethod: "Credit Card",
    status: "Cancellation",
  },
  {
    id: "TX001",
    customerName: "John Doe",
    type: "Payment",
    amount: "$12,766",
    date: "01 Aug, 2012",
    paymentMethod: "Bank Transfer",
    status: "Cancellation",
  },
];

const TableBody = ({ data }) => {
  // Formik configuration for editing vehicle details

  // const formik = useFormik({
  //   enableReinitialize: true,

  //   initialValues: editInitialValues,
  //   validationSchema: editVehicleValidation,
  //   onSubmit: async (values) => {
  //     let dataToSend;

  //     // Initialize the array for images
  //     const images = [];

  //     // Check for images and add them to the images array
  //     if (values.image1) images.push(values.image1);
  //     if (values.image2) images.push(values.image2);
  //     if (values.image3) images.push(values.image3);
  //     if (values.image4) images.push(values.image4);

  //     if (images.length > 0) {
  //       // If there are images, use FormData
  //       const formData = new FormData();

  //       // Append images to FormData under the 'images' field
  //       images.forEach((image) => {
  //         formData.append("images", image);
  //       });

  //       // Append other fields to FormData
  //       Object.entries(values).forEach(([key, value]) => {
  //         if (!key.startsWith("image")) {
  //           // Avoid appending image fields again
  //           formData.append(key, value);
  //         }
  //       });

  //       dataToSend = formData;
  //     } else {
  //       // If no images, send data as a plain object
  //       dataToSend = {
  //         stockNo: values.stockNo,
  //         year: values.year,
  //         price: values.price,
  //         mileage: values.mileage,
  //         location: values.location,
  //         status: values.status,
  //         brand: values.brand,
  //         model: values.model,
  //         type: values.type,
  //         vehicleId: values.vehicleId,
  //       };
  //     }

  //     // Send the data to the API
  //     const response = await dispatch(
  //       updateVehicle({ id: selectedVehicle._id, body: dataToSend })
  //     );

  //     if (response) {
  //       showToast("success", response.payload.message);
  //       dispatch(getAllVehicle({ page: 1 })); // Refresh vehicle list
  //     }

  //     setModalOpen(false); // Close modal
  //   },
  // });
  // const handleEditClick = (item) => {
  //   setSelectedVehicle(item);

  //   formik.setValues({
  //     image: null,
  //     stockNo: item.stockNo || "",
  //     brand: item.brand || "",
  //     model: item.model || "",
  //     type: item.type || "",
  //     year: item.year || "",
  //     price: item.price || "",
  //     mileage: item.mileage || "",
  //     location: item.location || "",
  //     status: item.status || "available",
  //     vehicleId: item.vehicleId || "",
  //   });
  //   setSelectedBrand(item.brand);
  //   setModalOpen(true);
  // };

  // const handleDeleteClick = async (item) => {
  //   const response = await dispatch(deleteVehicle(item._id));
  //   if (response) {
  //     showToast("success", response.payload.message);
  //     dispatch(getAllVehicle({ page: 1 }));
  //   }
  // };

  // data;

  return (
    <tbody className="bg-white">
      {data &&
        data.map((item) => (
          <tr
            key={item._id}
            className="hover:bg-gray-100   cursor-pointer border-b "
          >
            <td className="whitespace-nowrap py-4 px-5 font-medium">
              <CustomInput type="checkbox" />
            </td>
            <td className="pl-5 whitespace-nowrap px-3  text-lightBlackText w-1/6">
              {/* {item?.vehicleId || "-"} */}
              {item.id}
            </td>
            <td className="whitespace-nowrap px-3  text-lightBlackText w-1/6">
              {/* {item?.brand + " " + item?.model || "-"}
               */}
              {item.customerName}
            </td>{" "}
            <td className="whitespace-nowrap px-3  text-lightBlackText w-1/6">
              {/* {item?.year || "-"} */}
              {item.type}
            </td>{" "}
            <td className="whitespace-nowrap px-3  text-lightBlackText w-1/6">
              {/* {item?.status || "-"} */}
              {item.amount}
            </td>{" "}
            <td className="whitespace-nowrap px-3  text-lightBlackText w-1/6">
              {/* {item?.price || "-"} */}
              {item.date}
            </td>{" "}
            <td className="whitespace-nowrap px-3  text-lightBlackText w-1/6">
              {/* {truncateText(item?.location) || "-"} */}
              {item.paymentMethod}
            </td>
            <td
              className={`whitespace-nowrap px-3 text-lightBlackText w-1/6 ${
                item.status.includes("Paid")
                  ? "text-green-500"
                  : item.status.includes("Overdue")
                  ? "text-red-500"
                  : item.status.includes("Cancellation")
                  ? "text-purple-500"
                  : ""
              }`}
            >
              {/* {truncateText(item?.location) || "-"} */}
              {item.status}
            </td>
            <td className="whitespace-nowrap px-3 py-4  flex items-center gap-3">
              {/* <PopUpModel
                heading="Edit Vehicle"
                trigger={
                  <button onClick={() => handleEditClick(item)}> */}
              <Link
                to={`/dashboard/profit-&-invoices/${item.id}`}
                state={{ isVehicle: item.type === "Vehicle" }}
              >
                <FaRegEye className="text-secondary" />
              </Link>
              <FaRegEdit size={17} className="text-primary" />
              <MdDeleteOutline size={17} className="text-error" />
              {/* </button>
                }
                modalOpen={modalOpen && selectedVehicle?._id === item._id}
                setModalOpen={setModalOpen} */}
              {/* > */}
              {/* <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 p-5 px-8 space-y-1">
                    {formInputs?.map((input) => (
                      <CustomInput
                        key={input.name}
                        type={input.type}
                        name={input.name}
                        label={input.label}
                        value={formik.values[input.name]}
                        onChange={(e) => {
                          formik.handleChange(e);
                          if (input.name === "brand") {
                            setSelectedBrand(e.target.value);
                          }
                        }}
                        onBlur={formik.handleBlur}
                        error={formik.errors[input.name]}
                        touched={formik.touched[input.name]}
                        options={input.options || []}
                      />
                    ))}
                  </div>
                  <div className="px-8 py-4 pb-8">
                    <Button
                      isLoading={isLoading}
                      loadingText="Updating..."
                      type="submit"
                      text="Update Vehicle"
                      className="w-full"
                      borderRadius="rounded-none"
                    />
                  </div>
                </form>
              </PopUpModel> */}
              {/* <WarningModel
                buttonTwoText="Delete"
                bgColor="danger"
                trigger={
                  <button> */}
              {/* <MdDeleteOutline size={17} className="text-error" />
                  </button>
                }
                onSave={() => handleDeleteClick(item)}
              >
                <h3 className="mt-5.5 pb-2 text-xl font-medium text-black sm:text-2xl">
                  Delete Vehicle
                </h3>
                <p className="my-2 text-gray-400">
                  Are you sure you want to delete this vehicle?
                </p>
              </WarningModel> */}
            </td>
          </tr>
        ))}
    </tbody>
  );
};
export default function Cancellation() {
  return (
    <div>
      <div className="bg-white rounded-md mt-10">
        <div className="flex items-center justify-between p-4 ">
          {/* Title */}
          <div className="flex items-center gap-3">
            <div className=" flex items-center gap-2 border-b bborder-gray-100 w-[400px]">
              <IoSearchOutline className="h-5 w-5 text-gray-400" />

              <input
                type="text"
                placeholder="Search"
                className=" pr-4 py-2  rounded-lg  outline-none "
              />
            </div>
            <p className="text-primary text-sm font-medium">0 results found</p>
          </div>
          <div className="flex items-center gap-5">
            {/* Search Bar */}
            <Button
              borderRadius="rounded-md"
              text="Filters"
              icon={<FilterSvg className="h-5 w-5" />}
              textColor="white"
            />

            <Link to="/dashboard/profit-&-invoices/new-invoice">
              <Button
                textColor="white"
                text="New Invoice"
                borderRadius="none"
                icon={<FaPlus className="h-5 w-5" />}
              />
            </Link>
          </div>
        </div>
        {/* {isLoading ? (
          <ShimmerTable row={10} col={10} /> */}
        {/* ) : vehicle?.results?.length > 0 ? ( */}
        <CustomTable
          TableHeader={TableHeader}
          TableBody={(props) => <TableBody {...props} />}
          data={data}
        />
        {/* ) : (
          <NoDataFound />
        )} */}
        {/* <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={vehicle?.totalPages}
          handleItemsPerPageChange={handleItemsPerPageChange}
        /> */}
      </div>
    </div>
  );
}
