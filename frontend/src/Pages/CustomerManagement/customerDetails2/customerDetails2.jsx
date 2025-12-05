/* eslint-disable react/prop-types */
/* eslint-disable no-constant-binary-expression */
import { useEffect } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleVehicle } from "../../../store/features/vehicle/vehicleSlice";

import MainHeading from "../../../components/Heading/mainHeading";
import Text from "../../../components/Heading/text";

import "react-photo-view/dist/react-photo-view.css";
import Button from "../../../components/Button";
import Icons from "../../../assets/icons";
import Images from "../../../assets/images";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import PDFViewer from "../../../components/UserSettings/PDFViewer";
import CustomerDetailsRightSide from "../../../components/customerManagement/customerDetailsRightSide";
import { getSingleCustomer } from "../../../store/features/customer/customer.slice";
import { formatDate } from "../../../utils/dateFormate";
const SingleCustomerManagemenPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const {singleCustomer} = useSelector((state) => state.customer);
  const customerDetail=singleCustomer?.customer
  console.log("🚀 ~ SingleCustomerManagemenPage ~ data:", customerDetail)
  const profileImage = customerDetail?.allURLs?.find(img => img.category === "profile")?.s3Url || "default-profile.png";

  useEffect(() => {
    dispatch(getSingleCustomer(id));
  }, [dispatch, id]);

  return (
    <>
      <Breadcrumb heading="Customer Profile" pageName={"Customer Management"} />

      <div className="mt-12">
        <div className="flex items-center justify-between">
          <MainHeading
            className="font-poppins"
            textColor="darkBlue"
            textSize="text-[24px]"
            fontWeight="font-semibold"
            // heading={vehicleDetails?.brand + " " + vehicleDetails?.model || "-"}
            heading={"Kristian Kovac"}
          />
 
        </div>

        <div className="grid grid-cols-10 gap-4 mt-10  items-start justify-start  ">
          <div className=" col-span-7 space-y-5 ">
           
            <div className="  bg-white   rounded-md border border-gray-300 ">
              <div className="flex gap-3 items-center border-b w-fill border-gray-300  p-4">
                <Text
                  content="Personal Information"
                  textColor="text-darkBlue"
                  fontWeight="font-semibold"
                  className=""
                />
                <Icons.BiEditAlt
                  width={18}
                  height={18}
                  className="fill-secondary font-bold"
                />
              </div>

              <div className="flex items-start justify-between">
                <div className="w-10/12 grid grid-cols-3 gap-6 p-5">
                  {/* First Column */}
                  <div className="flex flex-col gap-4">
                    <div>
                      <Text
                        content="Customer Type"
                        textColor="text-darkBlue"
                        fontWeight="font-medium"
                        textSize="text-[16px]"
                      />
                      <Text content={customerDetail?.customerType} textSize="text-[14px]" />
                    </div>
                    <div>
                      <Text
                        content="Name"
                        textColor="text-darkBlue"
                        fontWeight="font-normal"
                        textSize="text-[16px]"
                      />
                      <Text content={`${customerDetail?.firstName} ${customerDetail?.name}`} textSize="text-[14px]" />
                    </div>
                    <div>
                      <Text
                        content="Zip code"
                        textColor="text-darkBlue"
                        fontWeight="font-normal"
                        textSize="text-[16px]"
                      />
                      <Text content={customerDetail?.zipCode} textSize="text-[14px]" />
                    </div>
                
                    <div>
                      <Text
                        content="Location"
                        textColor="text-darkBlue"
                        fontWeight="font-normal"
                        textSize="text-[16px]"
                      />
                      <Text content={customerDetail?.residencePlace} textSize="text-[14px]" />
                    </div>
                  </div>

                  {/* Second Column */}
                  <div className="flex flex-col gap-4">
                    <div>
                      <Text
                        content="Customer Number"
                        textColor="text-darkBlue"
                        fontWeight="font-normal"
                        textSize="text-[16px]"
                      />
                      <Text content={`${customerDetail?._id.slice(0,15)}...`} textSize="text-[14px]" />
                    </div>
                    <div>
                      <Text
                        content="Date of Birth"
                        textColor="text-darkBlue"
                        fontWeight="font-normal"
                        textSize="text-[16px]"
                      />
                      <Text content={formatDate(customerDetail?.birthDate)} textSize="text-[14px]" />
                    </div>
                    <div>
                      <Text
                        content="Ort"
                        textColor="text-darkBlue"
                        fontWeight="font-normal"
                        textSize="text-[16px]"
                      />
                      <Text content="4900" textSize="text-[14px]" />
                    </div>
                    {/* <div>
                      <Text
                        content="Position"
                        textColor="text-darkBlue"
                        fontWeight="font-normal"
                        textSize="text-[16px]"
                      />
                      <Text content="CEO" textSize="text-[14px]" />
                    </div> */}
                   <div>
                      <Text
                        content="Address"
                        textColor="text-darkBlue"
                        fontWeight="font-normal"
                        textSize="text-[16px]"
                      />
                      <Text
                        content={customerDetail?.address}
                        textSize="text-[14px]"
                      />
                    </div>
                  </div>

                  {/* Third Column */}
                  <div className="flex flex-col gap-4">
                    <div>
                      <Text
                        content="Phone Number"
                        textColor="text-darkBlue"
                        fontWeight="font-normal"
                        textSize="text-[16px]"
                      />
                      <Text content={customerDetail?.phoneNumber} textSize="text-[14px]" />
                    </div>
                    <div>
                      <Text
                        content="Email Address"
                        textColor="text-darkBlue"
                        fontWeight="font-normal"
                        textSize="text-[16px]"
                      />
                      <Text
                        content={customerDetail?.email}
                        textSize="text-[14px]"
                      />
                    </div>
                    <div>
                      <Text
                        content="Marital Status"
                        textColor="text-darkBlue"
                        fontWeight="font-normal"
                        textSize="text-[16px]"
                      />
                      <Text content={customerDetail?.maritalStatus} textSize="text-[14px]" />
                    </div>
                   
                  </div>
                </div>

                <div className="  my-10 mx-2 flex-shrink-0">
                  <img
                    className="w-[131px] h-[131px] rounded-full object-cover"
                    src={profileImage}
                  />
                </div>
              </div>
            </div>
            <div className="purchaseHistory   border rounded-lg shadow bg-white">
              <div className="flex items-center justify-between mb-4 border-b py-3 px-4">
                <Text
                  textColor="text-darkblue"
                  content="Purchase History"
                  fontWeight="font-semibold"
                />
              </div>

              <div className="">
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr className=" border-gray-300">
                      <th className="font-semibold text-darkblue text-left py-2 px-4">
                        Purchased Vehicles
                      </th>
                      <th className="font-semibold text-darkblue text-left py-2 px-4">
                        Purchase Date
                      </th>
                      <th className="font-semibold text-darkblue text-left py-2 px-4">
                        Price
                      </th>
                      <th className="font-semibold text-darkblue text-left py-2 px-4">
                        Contracts
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Table Rows */}
                    {[
                      {
                        vehicle: "Toyota Camry",
                        date: "12-05-2024",
                        price: "$76,279.00",
                        contract: "Lease",
                      },
                      {
                        vehicle: "Honda Accord",
                        date: "15-06-2024",
                        price: "$68,500.00",
                        contract: "Finance",
                      },
                      {
                        vehicle: "Ford Explorer",
                        date: "20-07-2024",
                        price: "$82,900.00",
                        contract: "Lease",
                      },
                      {
                        vehicle: "Ford Explorer",
                        date: "20-07-2024",
                        price: "$82,900.00",
                        contract: "Lease",
                      },
                      {
                        vehicle: "Toyota Camry",
                        date: "12-05-2024",
                        price: "$76,279.00",
                        contract: "Lease",
                      },
                    ].map((item, index) => (
                      <tr key={index} className=" border-gray-200 ">
                        <td className="text-sm text-grayText py-2 px-4">
                          {item.vehicle}
                        </td>
                        <td className="text-sm text-grayText py-2 px-4">
                          {item.date}
                        </td>
                        <td className="text-sm text-grayText py-2 px-4">
                          {item.price}
                        </td>
                        <td className="text-sm text-grayText py-2 px-4 ">
                          {item.contract}
                        </td>
                        <td className="text-lightBlackText ">
                          <div className="flex items-center gap-2 ">
                            <img
                              src={Images.download}
                              className="text-darkBlue"
                            />

                            <MdOutlineRemoveRedEye
                              size={19}
                              className="text-secondary cursor-pointer"
                              //   onClick={() => handleNavigate(item)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="remarks border rounded-lg shadow bg-white">
              <div className="flex items-center gap-2 mb-4 border-b py-3 px-4">
                <Text
                  textColor="text-darkblue"
                  content="Remarks"
                  fontWeight="font-semibold"
                />
                <Icons.FiPlus className="text-secondary font-medium" />
              </div>

              <div className="">
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr className=" border-gray-300">
                      <th className="font-semibold text-darkblue text-left py-2 px-4">
                        Remark
                      </th>
                      <th className="font-semibold text-darkblue text-left py-2 px-4 w-20">
                        Created on
                      </th>
                      <th className="font-semibold text-darkblue text-left py-2 px-4">
                        Created by
                      </th>
                      {/* <th className="font-semibold text-darkblue text-left py-2 px-4">
                        Contracts
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Table Rows */}
                    {[
                      {
                        vehicle: "Toyota Camry",
                        date: "12-05-2024",
                        price: "$76,279.00",
                        contract: "Silas Rotzetter",
                      },
                      {
                        vehicle: "Honda Accord",
                        date: "15-06-2024",
                        price: "$68,500.00",
                        contract: "Julia",
                      },
                      {
                        vehicle: "Ford Explorer",
                        date: "20-07-2024",
                        price: "$82,900.00",
                        contract: "Silas Rotzetter",
                      },
                      {
                        vehicle: "Ford Explorer",
                        date: "20-07-2024",
                        price: "$82,900.00",
                        contract: "Julia",
                      },
                      {
                        vehicle: "Toyota Camry",
                        date: "12-05-2024",
                        price: "$76,279.00",
                        contract: "Silas Rotzetter",
                      },
                    ].map((item, index) => (
                      <tr key={index} className=" border-gray-200 ">
                        <td className="text-sm text-grayText py-2 px-4">
                          {/* {item.vehicle} */}
                          This software helped us close deals faster and improve
                          customer engagement.
                        </td>
                        <td className="text-sm text-grayText py-2 px-4 w-max">
                          {item.date}
                        </td>
                        {/* <td className="text-sm text-grayText py-2 px-4">
                          {item.price}
                        </td> */}
                        <td className="text-sm text-grayText py-2 px-4 w-20 ">
                          {item.contract}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="vertage  bg-white  rounded-md border border-gray-300 ">
              <div className="flex gap-2 items-center border-b border-gray-300 pb-2 p-4">
                <Text
                  content="Verträge"
                  textColor="text-darkBlue"
                  fontWeight="font-semibold"
                  className=""
                />
                <Icons.FiPlus className="text-secondary font-medium" />
              </div>
              <div className="mt-3 gap-2 flex flex-col p-4">
                <PDFViewer delIcon={<img src={Images.bin} className="w-4" />} />
                <PDFViewer delIcon={<img src={Images.bin} className="w-4" />} />
                <PDFViewer delIcon={<img src={Images.bin} className="w-4" />} />
              </div>
            </div>
            <div className="history  bg-white  rounded-md border border-gray-300 ">
              <div className="flex gap-2 items-center border-b border-gray-300 pb-2 p-4">
                <Text
                  content="History"
                  textColor="text-darkBlue"
                  fontWeight="font-semibold"
                  className=""
                />
              </div>
              <div className="mt-3 gap-2 flex flex-col p-4">
                <p className=" text-grayText font-medium">Paid on 22/02/2025</p>
                <p className=" text-grayText font-medium">
                  Contract #Bre44343 Signed on 22/01/2025
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-3 rounded-md ">
            <CustomerDetailsRightSide />
          </div>
        </div>
        <div className="Searches   border rounded bg-white mt-8">
          <div className="flex items-center justify-between mb-4 border-b py-3 px-4">
            <Text
              textColor="text-darkblue"
              content="Searches"
              fontWeight="font-semibold"
            />
            <Button
              text="New Search"
              textColor="white"
              borderRadius="rounded"
              fontSize="text-base"
              padding="px-5 py-2"
              icon={<Icons.FiPlus />}
              //   onClick={() => setShowFilters(true)}
            />
          </div>

          <div className="">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-primary w-full text-white ">
                <tr className=" border-gray-300 ">
                  <th className="font-medium  text-left py-2 px-4">Title</th>
                  <th className="font-medium  text-left py-2 px-4">Results</th>
                  <th className="font-medium  text-left py-2 px-4">Sites</th>
                  <th className="font-medium  text-left py-2 px-4">Status</th>
                  <th className="font-medium  text-left py-2 px-4">Last Run</th>
                  <th className="font-medium  text-left py-2 px-4">Created</th>
                  <th className="font-medium  text-left py-2 ">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Table Rows */}
                {[
                  {
                    vehicle: "Toyota Camry",
                    date: "12-05-2024",
                    result: 101,
                    price: "Not interested",
                    contract: "Lease",
                  },
                  {
                    vehicle: "Honda Accord",
                    date: "15-06-2024",
                    result: 101,
                    price: "Interested",
                    contract: "Finance",
                  },
                  {
                    vehicle: "Ford Explorer",
                    date: "20-07-2024",
                    result: 101,
                    price: "Interested",
                    contract: "Lease",
                  },
                  {
                    vehicle: "Ford Explorer",
                    date: "20-07-2024",
                    result: 101,
                    price: "Interested",
                    contract: "Lease",
                  },
                  {
                    vehicle: "Toyota Camry",
                    date: "12-05-2024",
                    result: 101,
                    price: "Not interested",
                    contract: "Lease",
                  },
                ].map((item, index) => (
                  <tr key={index} className=" border-gray-200 border-b ">
                    <td className="font-medium text-darkBlue py-3 px-4">
                      {item.vehicle}
                    </td>
                    <td className="font-medium text-[#0D9960] py-2 px-4">
                      {item.result}
                    </td>
                    <td className="font-medium text-grayText py-2 px-4">
                      {item.result}
                    </td>
                    <td
                      className={` ${
                        item.price === "Interested"
                          ? "text-secondary"
                          : item.price === "Not interested"
                          ? "text-error"
                          : "text-darkblue"
                      } py-2 px-4`}
                    >
                      {item.price}
                    </td>
                    <td className="font-medium text-grayText py-2 px-4">
                      {item.date}
                    </td>
                    <td className="font-medium text-grayText py-2 px-4">
                      {item.date}
                    </td>
                    <td className=" ">
                      <div className="flex items-center  gap-2 ">
                        <img
                          src={Images.download}
                          className="text-darkBlue w-4"
                        />
                        <img src={Images.bin} className="text-darkBlue w-4" />

                        <MdOutlineRemoveRedEye
                          size={19}
                          className="text-secondary cursor-pointer"
                          //   onClick={() => handleNavigate(item)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCustomerManagemenPage;
