/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { IoGridOutline, IoSearchOutline } from "react-icons/io5";
import Breadcrumb from "../../components/Breadcrumb";
import { deleteVehicle } from "../../store/features/vehicle/vehicleSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import FilterSvg from "../../assets/svg/filter";
import CustomTable from "../../components/Custom-Tabel";
import Pagination from "../../components/Pagination";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import showToast from "../../utils/toaster";
import NoDataFound from "../../components/NoDataFound";
import { ShimmerTable } from "react-shimmer-effects";

import { useNavigate } from "react-router-dom";
import AddVehicle from "../../components/VehicleManagementComponent/addVehicle";
import Images from "../../assets/images";
import VehicleStats from "../UserSetting/vehicleStats";
import Icons from "../../assets/icons";
import Modal from "../../components/modal/modal";
import FilterComponent from "../../components/VehicleManagementComponent/vehicleFilters/vehicleFilters";
import {
  fetchAddedVehicles,
  setLimit,
  setPage,
} from "../../store/features/vehicle/getAddedVehicles";
import SVGS from "../../assets/svg";
import Swal from "sweetalert2";

function TableHeader({ layout }) {
  return (
    <thead>
      {layout === "list" ? (
        <tr className="bg-primary ">
          <th
            scope="col"
            className="py-3.5 pl-5 border border-primary  text-left font-semibold text-white w-1/12"
          >
            Image
          </th>
          {/* <th
            scope="col"
            className=" border border-primary text-left  font-semibold text-white w-1/12"
          >
            Stock No.
          </th> */}
          <th
            scope="col"
            className=" border border-primary text-left  font-semibold text-white w-1/12"
          >
            Make
          </th>
          <th
            scope="col"
            className=" py-3.5 border border-primary text-left  font-semibold text-white w-1/12"
          >
            Model
          </th>
          <th
            scope="col"
            className=" py-3.5 border border-primary text-center  font-semibold text-white w-1/12"
          >
            Year
          </th>
          <th
            scope="col"
            className=" py-3.5 border border-primary text-left font-semibold text-white w-1/12"
          >
            Price
          </th>
          <th
            scope="col"
            className=" py-3.5 border border-primary text-left font-semibold text-white w-1/12"
          >
            Mileage
          </th>
          {/* <th
            scope="col"
            className=" py-3.5 border border-primary text-left font-semibold text-white w-1/12"
          >
            Location
          </th> */}
          <th
            scope="col"
            className=" py-3.5 border border-primary text-left  font-semibold text-white w-1/12"
          >
            Status
          </th>
          <th
            scope="col"
            className="py-3.5 border border-primary text-center font-semibold text-white w-1/12"
          >
            Actions
          </th>
        </tr>
      ) : (
        <></>
      )}
    </thead>
  );
}

const TableBody = ({ data, layout }) => {
  const [likedItems, setLikedItems] = useState([]);
  const toggleLike = (itemId) => {
    setLikedItems(
      (prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId) // Remove from liked
          : [...prev, itemId] // Add to liked
    );
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleDeleteClick = async (item) => {
  //   const response = await dispatch(deleteVehicle(item.id));
  //   if (response) {
  //     showToast("success", response.payload.message);
  //     dispatch(fetchAddedVehicles({ page: 1, limit: 10 }));
  //   }
  // };

  const handleDeleteClick = async (item) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1E599B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (result.isConfirmed) {
      const response = await dispatch(deleteVehicle(item.id));
      if (response) {
        showToast("success", response.payload.message);
        dispatch(fetchAddedVehicles({ page: 1, limit: 10 }));
      }
    }
  };


  const handleNavigate = (item) => {
    navigate(`/dashboard/vehicle-management/${item?.id}`);
  };

  if (layout === "grid") {
    return (
      <div className="grid  grid-cols-1 lg:grid-cols-2 gap-6 p-4">
        {data &&
          data.map((item) => (
            <div
              key={item.id}
              className="  grid grid-cols-3 border  border-darkBlue cursor-pointer rounded-lg gap-4"
            >
              <img
                src={item.titleImage}
                alt="Vehicle"
                className="w-[195px] h-full  object-cover rounded-tl-lg rounded-bl-lg "
              />
              <div className="col-span-2">
                <div className="flex justify-end w-full  ">
                  <p
                    className={`${
                      item.status === "available"
                        ? "bg-secondary"
                        : item.status === "reserved"
                        ? "bg-darkBlue"
                        : "bg-error"
                    } text-white py-1 px-4 text-center rounded-tr-lg rounded-bl text-sm  capitalize`}
                  >
                    {item?.status}
                  </p>
                </div>
                <div onClick={() => handleNavigate(item)}>
                  <p className="text-darkBlue capitalize text-sm font-semibold pt-1">
                    {item?.make + " " + item?.model}
                  </p>
                </div>
                <p className="text-xs text-grayText ">
                  {item.fuel} | {item.manufactureYear} | {item.mileage} km
                </p>
                <div className="flex items-center justify-between  mt-3 pb-2">
                  <p className="text-primary text-sm font-semibold">
                    {item.price} CHF
                  </p>
                  <img
                    src={SVGS.LogoSvg}
                    className="h-8 w-[72px] object-contain pr-4"
                  />{" "}
                </div>

                <div className="border-t border-lightGray  pt-4 pb-2 flex items-center justify-between mr-2">
                  <div
                    onClick={() => toggleLike(item.id)}
                    className="flex items-center gap-2 text-grayText"
                  >
                    {likedItems.includes(item.id) ? (
                      <Icons.FaHeart size={16} className="text-red-500" />
                    ) : (
                      <Icons.FaRegHeart size={16} />
                    )}
                    <span className="text-sm">Add to wishlist</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={Images.download} className="text-primary" />
                    <img
                      src={Images.bin}
                      className="text-error cursor-pointer w-4"
                      onClick={() => handleDeleteClick(item)}
                    />
                    <MdOutlineRemoveRedEye
                      size={20}
                      className="text-secondary cursor-pointer"
                      onClick={() => handleNavigate(item)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  // Default (table) layout rendering
  return (
    <tbody className="bg-white">
      {data &&
        data?.map((item) => (
          <tr
            key={item.id}
            className="hover:bg-gray-100 cursor-pointer border-b"
          >
            <td className=" py-2 px-3 text-lightBlackText ">
              <img
                // src={Images.car3}
                src={item.titleImage}
                alt="Vehicle"
                className="h-[40px] w-[54px] object-contain rounded"
              />
            </td>
            {/* <td className="">{item?.stockNo || "-"}</td> */}
            <td className="">{item?.make || "-"}</td>
            <td className="">{item?.model || "-"}</td>
            <td className="text-center">{item?.manufactureYear || "-"}</td>
            <td className="">{item?.price || "-"} CHF</td>
            <td className="">{item?.mileage || "-"} km</td>
            {/* <td className=" ">{item?.location || "-"}</td> */}

            <td
              className={`py-3 font-medium capitalize  ${
                item.status === "available"
                  ? "text-green-600"
                  : item.status === "sold"
                  ? "text-red-600"
                  : "text-darkBlue"
              }`}
            >
              {item.status}
            </td>

            <td className="text-lightBlackText  ">
              <div className="flex items-center justify-center gap-2 ">
                <Icons.FiEdit size={16} className="text-darkBlue" />
                <img
                  src={Images.bin}
                  className="text-error cursor-pointer w-4"
                  onClick={() => handleDeleteClick(item)}
                />
                <MdOutlineRemoveRedEye
                  size={18}
                  className="text-secondary cursor-pointer"
                  onClick={() => handleNavigate(item)}
                />
              </div>
            </td>
          </tr>
        ))}
    </tbody>
  );
};

const VehicleManagementPage = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [layout, setLayout] = useState("grid"); // Default to 'grid'

  const handleSearch = (e) => {
    const query = e.target.value.trim();
    if (query) {
      dispatch(fetchAddedVehicles({ page, limit, search: query, ...filters }));
    }else{

      dispatch(fetchAddedVehicles({ page, limit,...filters }));
    }

    setSearchQuery(query);
  };

  //////////////////////////////////// filters functionality ///////////////////////////

  const [filters, setFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = (updatedFilters) => {
    
    setFilters(updatedFilters);
    setShowFilters(false);
  };

  const { allVehicles, loading, page, limit } = useSelector(
    (state) => state?.fetchAddedVehicleSlice
  );
  console.log("🚀 ~ VehicleManagementPage ~ allVehicles:", allVehicles)

  useEffect(() => {
    dispatch(fetchAddedVehicles({ page, limit,...filters }));
  }, [dispatch, page, limit, filters]);
  return (
    <>
      <Breadcrumb pageName="Vehicles Management" />

      <VehicleStats />
      <div className="bg-white rounded-[10px] shadow-md">
        <div className="flex items-center justify-between p-4">
          <div className="grid grid-cols-3 items-end justify-between gap-8 ">
            <div className="flex items-center gap-2 border-b border-gray-100 w-[300px] col-span-2">
              <IoSearchOutline className="h-4 w-4 text-grayText" />
              <input
                type="text"
                placeholder="Search by make and model"
                className="pr-4 py-2 rounded-lg outline-none placeholder:text-graytext text-sm w-full"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <p className="text-darkBlue text-sm font-medium capitalize">
              {allVehicles?.totalCount} results found
            </p>
          </div>

          <div className="flex items-center gap-5">
            <Button
              textColor={layout === "list" ? "white" : "darkBlue"}
              bgColor={layout === "list" ? "primary" : "white"}
              borderColor={layout === "list" ? "primary" : "darkBlue"}
              borderRadius="rounded"
              padding="px-3 py-2"
              icon={<Icons.FaListUl />}
              onClick={() => setLayout("list")}
            />
            <Button
              textColor={layout === "grid" ? "white" : "darkBlue"}
              bgColor={layout === "grid" ? "primary" : "white"}
              borderColor={layout === "grid" ? "primary" : "darkBlue"}
              borderRadius="rounded"
              padding="px-3 py-2"
              icon={<IoGridOutline />}
              onClick={() => setLayout("grid")}
            />
            <button className="px-3 py-2 rounded bg-primary ">
              <img src={Images.whiteDownload} className="h-6 w-5" />
            </button>
            <Button
              text="Filters"
              textColor="white"
              borderRadius="rounded"
              padding="px-5 py-2"
              icon={<FilterSvg />}
              onClick={() => setShowFilters(true)}
            />

            <Modal
              isOpen={showFilters}
              onClose={() => setShowFilters(false)}
              title={"Add Vehicle"}
              width={"w-[70%]"}
              fontSize={"text-2xl"}
              fontWeight="font-medium"
              setModalOpen={setShowFilters}
            >
              <FilterComponent onFilterChange={handleFilterChange}  selectedFilters={filters} />
            </Modal>

            <AddVehicle />
          </div>
        </div>
        {loading ? (
          <ShimmerTable row={10} col={10} />
        ) : allVehicles?.totalCount === 0 ? (
          <NoDataFound content="Vehicles not found" height={"h-[300px]"} fontSize={"text-2xl"} />
        ): (
          <CustomTable
            TableHeader={() =>
              layout === "list" && <TableHeader layout={layout} />
            }
            TableBody={(props) => <TableBody {...props} layout={layout} />}
            data={allVehicles?.results}
          />
        )}
        {allVehicles?.totalCount <= 10 ? null : (
          <Pagination
            currentPage={page}
            totalCount={allVehicles?.totalCount}
            itemsPerPage={limit}
            onPageChange={(newPage) => dispatch(setPage(newPage))}
            handleItemsPerPageChange={(value) => dispatch(setLimit(value))}
          />
        )}
      </div>
    </>
  );
};

export default VehicleManagementPage;
