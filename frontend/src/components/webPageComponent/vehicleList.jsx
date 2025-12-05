/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddedVehicles, setLimit, setPage } from "../../store/features/vehicle/getAddedVehicles";
import { IoSearchOutline } from "react-icons/io5";
import Pagination from "../Pagination";
import axios from "../../services/api";
import { GO_LIVE } from "../../utils/baseURL";
import showToast from "../../utils/toaster";


const VehicleList = ({ vehicles }) => {
  const dispatch=useDispatch();
    const [vehicleData, setVehicleData] = useState(vehicles);

    // const toggleGoLive = (index) => {
    //   setVehicleData((prevVehicles) =>
    //     prevVehicles.map((vehicle, i) =>
    //       i === index ? { ...vehicle, goLive: !vehicle.goLive } : vehicle
    //     )
    //   );
    // };43
   
    const toggleGoLive = async (index, vehicleId, currentStatus) => {
      try {
        // Toggle the goLive status
        const updatedStatus = !currentStatus;
        console.log("🚀 ~ toggleGoLive ~ updatedStatus:", updatedStatus)
    
        // Send API request
        const response = await axios.put(GO_LIVE, {
          id: vehicleId,
          goLive: updatedStatus
        });
        console.log("🚀 ~ toggleGoLive ~ response:", response)
    
        if (response.status === 200) { // Assuming successful response is 200
          setVehicleData((prevVehicles) =>
            prevVehicles.map((vehicle, i) =>
              i === index ? { ...vehicle, goLive: updatedStatus } : vehicle
            )
          );
          showToast("success",response?.data?.message)
          console.log("GoLive status updated successfully!");
          dispatch(fetchAddedVehicles({ page, limit }));
        }
      } catch (error) {
        showToast("success",error?.data?.error)
        console.error("Failed to update GoLive status:", error);
      }
    };
   
   
   
    const { allVehicles, loading, page, limit } = useSelector(
      (state) => state?.fetchAddedVehicleSlice
    );
    const vehicleDetails=allVehicles?.results
     console.log("🚀 ~ VehicleList ~ allVehicles:", vehicleDetails)
     useEffect(() => {
        dispatch(fetchAddedVehicles({ page, limit }));
      }, [dispatch, page, limit]);
      const [searchQuery, setSearchQuery] = useState("");

      const handleSearch = (e) => {
        const query = e.target.value.trim();
        if (query) {
          dispatch(fetchAddedVehicles({ page, limit, search: query }));
        }else{
    
          dispatch(fetchAddedVehicles({ page, limit }));
        }
    
        setSearchQuery(query);
      };
  return (
    <div>
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <div className="flex  items-start justify-between">
      <h2 className="text-xl font-bold mb-4">Vehicle List</h2>
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
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-primary text-white border-primary  ">
            <tr className="" >
              <th className="p-3 text-left font-medium">Image</th>
              {/* <th className="p-3 text-left font-medium">Stock No.</th> */}
              <th className="p-3 text-left font-medium">Make</th>
              <th className="p-3 text-left font-medium">Model</th>
              <th className="p-3 text-left font-medium">Year</th>
              <th className="p-3 text-left font-medium">Price</th>
              <th className="p-3 text-left font-medium">Mileage</th>
              {/* <th className="p-3 text-left font-medium">Location</th> */}
              <th className="p-3 text-left font-medium">Status</th>
              <th className="p-3 text-left font-medium">GO Live</th>
            </tr>
          </thead>
          <tbody>
            {vehicleDetails?.map((vehicle, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="p-3">
                  <img src={vehicle?.titleImage} alt="car" className="w-16 h-10 object-cover" />
                </td>
                {/* <td className="p-3 font-medium">{vehicle.stockNo}</td> */}
                <td className="p-3">{vehicle.make}</td>
                <td className="p-3">{vehicle.model}</td>
                <td className="p-3">{vehicle.manufactureYear}</td>
                <td className="p-3">{vehicle.price}</td>
                <td className="p-3">{vehicle.mileage}</td>
                {/* <td className="p-3">{vehicle.location}</td> */}
                <td className={`p-3 font-medium capitalize ${
                  vehicle.status === "available" ? "text-green-600" :
                  vehicle.status === "Sold" ? "text-red-600" :
                  "text-darkblue"
                }`}>{vehicle.status}</td>
              <td className="p-3">
                  <div 
                    className={`outline-none w-11 h-5 flex items-center p-1 rounded-full  transition duration-300 ease-in-out ${vehicle.goLive ? 'bg-green-500' : 'bg-red-500'}`}
                    onClick={() => toggleGoLive(index, vehicle.id, vehicle.goLive)}
                  >
                    <div className={`bg-white w-4 h-4  rounded-full shadow-md transform transition duration-300 ease-in-out ${vehicle.goLive ? 'translate-x-5' : 'translate-x-0'}`}></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
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
  );
};

export default VehicleList;
