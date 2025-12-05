import { useEffect } from "react";
import MainHeading from "../../../components/Heading/mainHeading";
import Breadcrumb from "../../../components/Breadcrumb";

import Text from "../../../components/Heading/text";
import { useParams } from "react-router-dom";
import GoBack from "../../../components/GoBack";
import Images from "../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCustomer } from "../../../store/features/customer/customer.slice";
import Loading from "../../../components/Loading";
import { config } from "../../../services/api";
const CustomerDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singleCustomer, isLoading } = useSelector((state) => state.customer);
  const data = singleCustomer?.customer;

  console.log("state", data);
  const overviewData = [
    { label: "Company Name", value: data?.companyName || "-" },
    { label: "Address", value: data?.address || "-" },
    { label: "Insurance Provider", value: data?.insuranceProvider || "-" },
    { label: "License Plate No.", value: data?.licensePlateNumber || "-" },
    { label: "Total Purchases", value: data?.totalPurchases || "-" },
    { label: "Email Address", value: data?.email || "-" },
    { label: "Contract Type", value: "Dallas Keuchal" },
    { label: "Status", value: data?.status || "-" },
  ];
  useEffect(() => {
    dispatch(getSingleCustomer(id));
  }, [dispatch, id]);
  return (
    <>
      <Breadcrumb heading="Customer Profile" pageName="Customer Management" />
      {isLoading ? (
        <Loading />
      ) : (
        <div className=" w-11/12">
          <div className="flex items-center justify-between ">
            <MainHeading
              heading={data?.customerName || "-"}
              textSize="text-[24px]"
              fontWeight="font-semibold"
              textColor="primary"
              className="font-poppins"
            />
            <GoBack pageName=" Customer Management" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 mt-10">
            {/* Personal Information Section */}
            <div className="border rounded-lg shadow bg-white">
              <div className="flex items-center justify-between mb-4 border-b p-3 ">
                <Text
                  textColor="text-primary"
                  content="Personal Information"
                  fontWeight="font-semibold"
                />
                {/* <MdModeEdit className="text-gray-400 cursor-pointer" /> */}
              </div>

              <div className="p-3 flex items-center justify-between">
                <div className="w-7/12 ">
                  <div className="grid grid-cols-2 mt-4">
                    <div className="flex flex-col space-y-1">
                      <Text
                        content="Customer Name"
                        textSize="text-normal"
                        textColor="text-primary"
                      />
                      <Text
                        content={data?.customerName || "-"}
                        textSize="text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col space-y-1">
                      <Text
                        content="Email Address"
                        textSize="text-normal"
                        textColor="text-primary"
                      />
                      <Text content={data?.email || "-"} textSize="text-sm" />
                    </div>
                    <div className="flex flex-col space-y-1   ml-3">
                      <Text
                        content="Phone number"
                        textSize="text-normal"
                        textColor="text-primary"
                      />
                      <Text
                        content={data?.phoneNunmber || "-"}
                        textSize="text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="">
                  <img
                    src={
                      data?.profileImage
                        ? `${config.imageBaseUrl}/customer/${data?.profileImage}`
                        : Images.Rectangle
                    }
                    alt="Customer Profile"
                    className="h-32 w-32 rounded-full mr-10 border object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Interactions Section */}
            <div className="border rounded-lg shadow bg-white">
              <div className="flex items-center justify-between mb-4 border-b p-3 ">
                <Text
                  textColor="text-primary"
                  content="Interactions"
                  fontWeight="font-semibold"
                />
                {/* <MdModeEdit className="text-gray-400 cursor-pointer" /> */}
              </div>
              <ul className="p-4 space-y-2 ">
                <li className="flex justify-between">
                  <span className="font-semibold text-primary">Timeline</span>
                  <span className="font-semibold text-primary text-start w-20 pl-2">
                    Date
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm text-grayText">Call</span>
                  <span className="text-sm text-grayText">12-05-2024</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm text-grayText">Email</span>
                  <span className="text-sm text-grayText">12-05-2024</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sm text-grayText">In-person</span>
                  <span className="text-sm text-grayText">12-05-2024</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 my-10">
            {/* Personal Information Section */}

            {/* Interactions Section */}
            <div className="border rounded-lg shadow bg-white">
              <div className="flex items-center justify-between mb-4 border-b p-3">
                <Text
                  textColor="text-primary"
                  content="Purchase History"
                  fontWeight="font-semibold"
                />
                {/* <MdModeEdit className="text-gray-400 cursor-pointer" /> */}
              </div>
              <div className="p-4 ">
                {/* Table for displaying the purchased vehicle information */}
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="font-semibold text-primary text-left py-2">
                        Purchased Vehicles
                      </th>
                      <th className="font-semibold text-primary text-left py-2">
                        Purchase Date
                      </th>
                      <th className="font-semibold text-primary text-left py-2">
                        Price
                      </th>
                      <th className="font-semibold text-primary text-left py-2">
                        Contracts
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Content rows */}
                    <tr>
                      <td className="text-sm text-grayText py-2">
                        Toyota Camry
                      </td>
                      <td className="text-sm text-grayText py-2">12-05-2024</td>
                      <td className="text-sm text-grayText py-2">$762,79.00</td>
                      <td className="text-sm text-grayText py-2">Lease</td>
                    </tr>
                    <tr>
                      <td className="text-sm text-grayText py-2">
                        Toyota Camry
                      </td>
                      <td className="text-sm text-grayText py-2">12-05-2024</td>
                      <td className="text-sm text-grayText py-2">$762,79.00</td>
                      <td className="text-sm text-grayText py-2">Lease</td>
                    </tr>
                    <tr>
                      <td className="text-sm text-grayText py-2">
                        Toyota Camry
                      </td>
                      <td className="text-sm text-grayText py-2">12-05-2024</td>
                      <td className="text-sm text-grayText py-2">$762,79.00</td>
                      <td className="text-sm text-grayText py-2">Lease</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="border rounded-lg shadow bg-white">
              <div className="flex items-center justify-between mb-4 border-b p-3">
                <Text
                  textColor="text-primary"
                  content="Follow-Ups"
                  fontWeight="font-semibold"
                />
                {/* <MdModeEdit className="text-gray-400 cursor-pointer" /> */}
              </div>
              <div className="p-4 ">
                {/* Table for displaying the purchased vehicle information */}
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="font-semibold text-primary text-left py-2">
                        Reminders
                      </th>
                      <th className="font-semibold text-primary text-left py-2">
                        Assignee
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Content rows */}
                    <tr>
                      <td className="text-sm text-grayText py-2">12-05-2024</td>

                      <td className="text-sm text-grayText py-2"> Ali Ahmed</td>
                    </tr>
                    <tr>
                      <td className="text-sm text-grayText py-2">12-05-2024</td>

                      <td className="text-sm text-grayText py-2"> Ali Ahmed</td>
                    </tr>{" "}
                    <tr>
                      <td className="text-sm text-grayText py-2">12-05-2024</td>

                      <td className="text-sm text-grayText py-2"> Ali Ahmed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="border rounded-lg shadow bg-white w-full ">
            <div className="flex items-center justify-between mb-4 border-b p-3 ">
              <Text
                textColor="text-primary"
                content="Overview"
                fontWeight="font-semibold"
              />
              {/* <MdModeEdit className="text-gray-400 cursor-pointer" /> */}
            </div>
            <div className="p-3 flex items-center justify-between">
              <div className="grid grid-cols-4 w-full gap-5">
                {overviewData?.map((item, index) => (
                  <div key={index} className="flex flex-col space-y-1">
                    <Text
                      content={item.label}
                      textSize="text-normal"
                      textColor="text-primary"
                    />
                    <Text content={item.value} textSize="text-sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerDetailsPage;
