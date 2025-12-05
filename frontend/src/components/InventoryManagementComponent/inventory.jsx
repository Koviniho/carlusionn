import React, { useEffect, useState } from "react";
import CustomTable from "../Custom-Tabel";
import { FaEye, FaPlus, FaRegEdit, FaRegEye } from "react-icons/fa";
import FilterSvg from "../../assets/svg/filter";
import { IoSearchOutline } from "react-icons/io5";
import RefundSvg from "../../assets/svg/refundSvg";
import { MdDeleteOutline, MdOutlineDeleteOutline } from "react-icons/md";
import PersonSvg from "../../assets/svg/personSvg";
import InfoCard from "../InfoCard";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import * as Yup from "yup";
import Pagination from "../Pagination";
import models from "car-models";
import { ShimmerTable } from "react-shimmer-effects";

import {
  deleteVehicle,
  getAllVehicle,
  updateVehicle,
} from "../../store/features/vehicle/vehicleSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import PopUpModel from "../Modals/pop-up-modals";
import CustomInput from "../Input/custoInput";
import WarningModel from "../Modals/warning-model";
import NoDataFound from "../NoDataFound";
import truncateText from "../../utils/truncateText";
import {
  bodyTypes,
  editInitialValues,
  editVehicleValidation,
  vehicleValidation,
} from "../../Inputs/vehicle.input";

function TableHeader({ checkboxRef, checked, onToggleAll }) {
  return (
    <thead>
      <tr className="bg-primary !rounded-none">
        <th
          scope="col"
          className=" pl-5 py-3.5 pr-3 text-left font-semibold text-white w-[11%]"
        >
          Vehicle ID
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white w-[11%]"
        >
          Make & Model
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white w-[11%]"
        >
          Year
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white w-[11%]"
        >
          Status
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white w-[11%]"
        >
          Price
        </th>

        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white w-[11%]"
        >
          Location
        </th>

        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white w-[11%]"
        >
          Actions
        </th>
      </tr>
    </thead>
  );
}

const TableBody = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [carModels, setCarModels] = useState([]);
  const { vehicle, isLoading, errorMessage } = useSelector(
    (state) => state.vehicle
  );
  // Formik configuration for editing vehicle details
  const formInputs = [
    {
      type: "file",
      name: "image1",
      label: "Image 1",
      accept: "image/*",
      onChange: (e) => {
        const files = e.target.files;
        if (files.length > 0) {
          formik.setFieldValue("image1", files[0]);
        } else {
          formik.setFieldValue("image1", null);
        }
      },
    },
    {
      type: "file",
      name: "image2",
      label: "Image 2",
      accept: "image/*",
      onChange: (e) => {
        const files = e.target.files;
        if (files.length > 0) {
          formik.setFieldValue("image2", files[0]);
        } else {
          formik.setFieldValue("image2", null);
        }
      },
    },
    {
      type: "file",
      name: "image3",
      label: "Image 3",
      accept: "image/*",
      onChange: (e) => {
        const files = e.target.files;
        if (files.length > 0) {
          formik.setFieldValue("image3", files[0]);
        } else {
          formik.setFieldValue("image3", null);
        }
      },
    },
    {
      type: "file",
      name: "image4",
      label: "Image 4",
      accept: "image/*",
      onChange: (e) => {
        const files = e.target.files;
        if (files.length > 0) {
          formik.setFieldValue("image4", files[0]);
        } else {
          formik.setFieldValue("image4", null);
        }
      },
    },
    {
      type: "text",
      name: "stockNo",
      label: "Stock Number",
    },
    {
      type: "number",
      name: "year",
      label: "Year",
    },
    {
      type: "number",
      name: "price",
      label: "Price",
    },
    {
      type: "number",
      name: "mileage",
      label: "Mileage",
    },
    {
      type: "text",
      name: "location",
      label: "Location",
    },
    {
      type: "select",
      name: "status",
      label: "Status",
      options: [
        { value: "", label: "" },
        { value: "available", label: "Available" },
        { value: "sold", label: "Sold" },
        { value: "reserved", label: "Reserved" },
      ],
    },
    {
      type: "select",
      name: "brand",
      label: "Brand",
      options: brands.map((brand) => ({ value: brand, label: brand })),
    },
    {
      type: "select",
      name: "model",
      label: "Car Model",
      options: carModels
        .filter((car) => car.brand === selectedBrand)
        .map((car) => ({ value: car.model, label: car.model })),
    },
    {
      type: "select",
      name: "type",
      label: "Body Type",
      options: bodyTypes.map((type) => ({
        value: type.value,
        label: type.label,
      })),
    },
    { type: "text", name: "vehicleId", label: "Vehicle ID" },
  ];
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: editInitialValues,
    validationSchema: editVehicleValidation,
    onSubmit: async (values) => {
      let dataToSend;

      // Initialize the array for images
      const images = [];

      // Check for images and add them to the images array
      if (values.image1) images.push(values.image1);
      if (values.image2) images.push(values.image2);
      if (values.image3) images.push(values.image3);
      if (values.image4) images.push(values.image4);

      if (images.length > 0) {
        // If there are images, use FormData
        const formData = new FormData();

        // Append images to FormData under the 'images' field
        images.forEach((image) => {
          formData.append("images", image);
        });

        // Append other fields to FormData
        Object.entries(values).forEach(([key, value]) => {
          if (!key.startsWith("image")) {
            // Avoid appending image fields again
            formData.append(key, value);
          }
        });

        dataToSend = formData;
      } else {
        // If no images, send data as a plain object
        dataToSend = {
          stockNo: values.stockNo,
          year: values.year,
          price: values.price,
          mileage: values.mileage,
          location: values.location,
          status: values.status,
          brand: values.brand,
          model: values.model,
          type: values.type,
          vehicleId: values.vehicleId,
        };
      }

      // Send the data to the API
      const response = await dispatch(
        updateVehicle({ id: selectedVehicle._id, body: dataToSend })
      );

      if (response) {
        showToast("success", response.payload.message);
        dispatch(getAllVehicle({ page: 1 })); // Refresh vehicle list
      }

      setModalOpen(false); // Close modal
    },
  });
  const handleEditClick = (item) => {
    setSelectedVehicle(item);

    formik.setValues({
      image: null,
      stockNo: item.stockNo || "",
      brand: item.brand || "",
      model: item.model || "",
      type: item.type || "",
      year: item.year || "",
      price: item.price || "",
      mileage: item.mileage || "",
      location: item.location || "",
      status: item.status || "available",
      vehicleId: item.vehicleId || "",
    });
    setSelectedBrand(item.brand);
    setModalOpen(true);
  };

  const handleDeleteClick = async (item) => {
    const response = await dispatch(deleteVehicle(item._id));
    if (response) {
      showToast("success", response.payload.message);
      dispatch(getAllVehicle({ page: 1 }));
    }
  };
  const handelNavigate = (item) => {
    navigate(`/dashboard/vehicle-management/${item?._id}`);
  };

  useEffect(() => {
    const carModelsData = models.all(); // Fetch all car models data

    if (!carModelsData || carModelsData.length === 0) return;

    const brandsSet = new Set();
    const modelsArray = [];

    carModelsData.forEach((item) => {
      const [brand, ...modelParts] = item.split(" ");
      const model = modelParts.join(" ");

      brandsSet.add(brand);
      modelsArray.push({ brand, model });
    });

    setBrands(Array.from(brandsSet));
    setCarModels(modelsArray);
  }, []);
  // data;

  return (
    <tbody className="bg-white">
      {data &&
        data.map((item) => (
          <tr
            key={item._id}
            className="hover:bg-gray-100   cursor-pointer border-b "
          >
            <td className=" pl-5 whitespace-nowrap px-3  text-lightBlackText w-[11%]">
              {item?.vehicleId || "-"}
            </td>
            <td className="whitespace-nowrap px-3  text-lightBlackText w-[11%]">
              {item?.brand + " " + item?.model || "-"}
            </td>{" "}
            <td className="whitespace-nowrap px-3  text-lightBlackText w-[11%]">
              {item?.year || "-"}
            </td>{" "}
            <td className="whitespace-nowrap px-3  text-lightBlackText w-[11%]">
              {item?.status || "-"}
            </td>{" "}
            <td className="whitespace-nowrap px-3  text-lightBlackText w-[11%]">
              {item?.price?.sellingPrice_CHF || "-"}
            </td>{" "}
            <td className="whitespace-nowrap px-3  text-lightBlackText w-[11%]">
              {truncateText(item?.location) || "-"}
            </td>
            <td className="whitespace-nowrap px-3 py-4  flex items-center gap-3">
              <PopUpModel
                heading="Edit Vehicle"
                trigger={
                  <button onClick={() => handleEditClick(item)}>
                    <FaRegEdit size={17} className="text-primary" />
                  </button>
                }
                modalOpen={modalOpen && selectedVehicle?._id === item._id}
                setModalOpen={setModalOpen}
              >
                <form onSubmit={formik.handleSubmit} className="space-y-4">
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
              </PopUpModel>

              <WarningModel
                buttonTwoText="Delete"
                bgColor="danger"
                trigger={
                  <button>
                    <MdDeleteOutline size={17} className="text-error" />
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
              </WarningModel>
              <FaRegEye
                className="text-secondary"
                onClick={() => handelNavigate(item)}
              />
            </td>
          </tr>
        ))}
    </tbody>
  );
};

export default function Inventory() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [addVehicle, setAddVehicle] = useState(false);
  const { vehicle, isLoading, errorMessage } = useSelector(
    (state) => state.vehicle
  );

  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [carModels, setCarModels] = useState([]);

  useEffect(() => {
    const carModelsData = models.all(); // Fetch all car models data

    if (!carModelsData || carModelsData.length === 0) return;

    const brandsSet = new Set();
    const modelsArray = [];

    carModelsData.forEach((item) => {
      const [brand, ...modelParts] = item.split(" ");
      const model = modelParts.join(" ");

      brandsSet.add(brand);
      modelsArray.push({ brand, model });
    });

    setBrands(Array.from(brandsSet));
    setCarModels(modelsArray);
  }, []);
  const stats = [
    {
      title: " Total Vehicles in stock",
      value: "3521",
      icon: <PersonSvg className="text-secondary" />,
    },
    {
      title: "New  Vehicles Available",
      value: "3521",
      icon: <PersonSvg className="text-secondary" />,
    },
    {
      title: "Used  Vehicles Available",
      value: "3521",
      icon: <PersonSvg className="text-secondary" />,
    },
    {
      title: "Vehicles Sold this month",
      value: "3521",
      icon: <RefundSvg />,
    },
  ];

  useEffect(() => {
    dispatch(getAllVehicle({ page: currentPage, limit: itemsPerPage }));
  }, [currentPage, itemsPerPage]);

  const handleSearch = (e) => {
    const query = e.target.value.trim();
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when search query changes
  };

  const handleItemsPerPageChange = (value) => {
    const validValue = Math.max(1, value);
    setItemsPerPage(validValue);
    setCurrentPage(1); // Reset to the first page
  };
  const formInputs = [
    {
      type: "file",
      name: "image1",
      label: "Image 1",
      accept: "image/*",
      onChange: (e) => {
        const files = e.target.files;
        if (files.length > 0) {
          formik.setFieldValue("image1", files[0]);
        } else {
          formik.setFieldValue("image1", null);
        }
      },
    },
    {
      type: "file",
      name: "image2",
      label: "Image 2",
      accept: "image/*",
      onChange: (e) => {
        const files = e.target.files;
        if (files.length > 0) {
          formik.setFieldValue("image2", files[0]);
        } else {
          formik.setFieldValue("image2", null);
        }
      },
    },
    {
      type: "file",
      name: "image3",
      label: "Image 3",
      accept: "image/*",
      onChange: (e) => {
        const files = e.target.files;
        if (files.length > 0) {
          formik.setFieldValue("image3", files[0]);
        } else {
          formik.setFieldValue("image3", null);
        }
      },
    },
    {
      type: "file",
      name: "image4",
      label: "Image 4",
      accept: "image/*",
      onChange: (e) => {
        const files = e.target.files;
        if (files.length > 0) {
          formik.setFieldValue("image4", files[0]);
        } else {
          formik.setFieldValue("image4", null);
        }
      },
    },
    { type: "text", name: "stockNo", label: "Stock Number" },
    { type: "number", name: "year", label: "Year" },
    { type: "number", name: "price", label: "Price" },
    { type: "number", name: "mileage", label: "Mileage" },
    { type: "text", name: "location", label: "Location" },
    {
      type: "select",
      name: "status",
      label: "Status",
      options: [
        { value: "", label: "" },
        { value: "available", label: "Available" },
        { value: "sold", label: "Sold" },
        { value: "reserved", label: "Reserved" },
      ],
    },
    {
      type: "select",
      name: "brand",
      label: "Brand",
      options: brands.map((brand) => ({ value: brand, label: brand })),
    },
    {
      type: "select",
      name: "model",
      label: "Car Model",
      options: carModels
        .filter((car) => car.brand === selectedBrand)
        .map((car) => ({ value: car.model, label: car.model })),
    },
    {
      type: "select",
      name: "type",
      label: "Body Type",
      options: bodyTypes.map((type) => ({
        value: type.value,
        label: type.label,
      })),
    },
    { type: "text", name: "vehicleId", label: "Vehicle ID" }, // Add vehicleId field
  ];

  const formik = useFormik({
    initialValues: {
      image1: null,
      image2: null,
      image3: null,
      image4: null,
      stockNo: "",
      year: "",
      price: "",
      mileage: "",
      location: "",
      status: "",
      brand: "",
      model: "",
      type: "",
      vehicleId: "",
    },
    validationSchema: vehicleValidation,
    onSubmit: async (values) => {
      const formData = new FormData();

      // Collect images into an array
      const images = [];
      if (values.image1) images.push(values.image1);
      if (values.image2) images.push(values.image2);
      if (values.image3) images.push(values.image3);
      if (values.image4) images.push(values.image4);

      // Append the images array to FormData with the name 'images'
      images.forEach((image, index) => {
        formData.append("images", image);
      });

      // Append the other fields
      formData.append("stockNo", values.stockNo);
      formData.append("year", values.year);
      formData.append("price", values.price);
      formData.append("mileage", values.mileage);
      formData.append("location", values.location);
      formData.append("status", values.status);
      formData.append("brand", values.brand);
      formData.append("model", values.model);
      formData.append("type", values.type);
      formData.append("vehicleId", values.vehicleId); // Append vehicleId

      try {
        const response = await dispatch(addNewVehicle(formData));
        if (response) {
          dispatch(getAllVehicle({ page: currentPage, limit: itemsPerPage }));
          formik.resetForm();
        }
        setAddVehicle(false);
      } catch (error) {
        console.error("Error adding vehicle:", error);
      }
    },
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 mt-5">
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
          {/* Search and Button Container */}
          <div className="flex items-center gap-5">
            {/* Search Bar */}
            <Button
              borderRadius="rounded-md"
              text="Filters"
              icon={<FilterSvg className="h-5 w-5" />}
            />
            <PopUpModel
              heading="Add Inventory"
              trigger={
                <Button
                  text="New Inventory"
                  borderRadius="none"
                  icon={<FaPlus className="h-5 w-5" />}
                />
              }
              modalOpen={addVehicle}
              setModalOpen={setAddVehicle}
            >
              <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-2 gap-4 p-5 px-8 space-y-1">
                  {formInputs?.map((input, index) => (
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
                      error={
                        formik.errors[input.name] && formik.touched[input.name]
                      }
                      touched={formik.touched[input.name]}
                      options={input.options || []}
                    />
                  ))}
                </div>
                <div className="px-8 py-4 pb-8">
                  <Button
                    loadingText="Adding..."
                    isLoading={isLoading}
                    type="submit"
                    text="Add Vehicle"
                    className="w-full"
                    borderRadius="rounded-none"
                  />
                </div>
              </form>
            </PopUpModel>
          </div>
        </div>
        {isLoading ? (
          <ShimmerTable row={10} col={10} />
        ) : vehicle?.results?.length > 0 ? (
          <CustomTable
            TableHeader={TableHeader}
            TableBody={(props) => <TableBody {...props} />}
            data={vehicle?.results}
          />
        ) : (
          <NoDataFound />
        )}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          // totalPages={vehicle?.totalPages}
          totalCount={100}
          itemsPerPage={10}
          handleItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </>
  );
}
