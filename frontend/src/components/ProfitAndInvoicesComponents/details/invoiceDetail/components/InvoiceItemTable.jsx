/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import CustomTable from "../../../../Custom-Tabel";
import Text from "../../../../Heading/text";
import NoDataFound from "../../../../NoDataFound";
import { ShimmerTable } from "react-shimmer-effects";
function TableHeader() {
  return (
    <thead>
      <tr className="bg-primary !rounded-none">
        <th
          scope="col"
          className="py-3.5 pr-3 pl-5 text-left font-semibold text-white w-1/6"
        >
          No.
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white w-1/6"
        >
          Title
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white w-1/6"
        >
          Quantity
        </th>

        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white w-1/6"
        >
          Unit
        </th>
        {/* <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white w-1/6"
        >
          Description
        </th> */}

        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white w-1/6"
        >
          Unit Price
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white w-1/6"
        >
         Total Price
        </th>
        {/* <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold whitespace-nowrap text-white w-1/6"
        >
          Discounted Price
        </th> */}
        <th
          scope="col"
          className="px-3 py-3.5 text-left whitespace-nowrap font-semibold text-white w-1/6"
        >
          Tax Rate
        </th>
      </tr>
    </thead>
  );
}

const data = [
  {
    no: 1,
    title: "BMW X5 M",
    quantity: "01",
    unit: "pcs",
    description: "Replacement Vehicle",
    unitPrice: "1200.78 CHF",
    discount: "0%",
    discountedPrice: "1200.78 CHF",
    taxRate: "8.10%",
  },
  {
    no: 2,
    title: "BMW X5 M",
    quantity: "01",
    unit: "hr",
    description: "Replacement Vehicle",
    unitPrice: "1200.78 CHF",
    discount: "0%",
    discountedPrice: "1200.78 CHF",
    taxRate: "8.10%",
  },
  {
    no: 3,
    title: "BMW X5 M",
    quantity: "01",
    unit: "pcs",
    description: "Replacement Vehicle",
    unitPrice: "1200.78 CHF",
    discount: "0%",
    discountedPrice: "1200.78 CHF",
    taxRate: "8.10%",
  },
  {
    no: 4,
    title: "BMW X5 M",
    quantity: "01",
    unit: "pcs",
    description: "Replacement Vehicle",
    unitPrice: "1200.78 CHF",
    discount: "0%",
    discountedPrice: "1200.78 CHF",
    taxRate: "8.10%",
  },
  {
    no: 5,
    title: "BMW X5 M",
    quantity: "01",
    unit: "hr",
    description: "Replacement Vehicle",
    unitPrice: "1200.78 CHF",
    discount: "0%",
    discountedPrice: "1200.78 CHF",
    taxRate: "8.10%",
  },
];

const TableBody = ({ data }) => {
  return (
    <tbody className="bg-white">
      {data &&
        data.map((item,index) => (
          <tr
            key={item._id}
            className="hover:bg-gray-100   cursor-pointer border-b "
          >
            <td className="pl-5 whitespace-nowrap p-3  text-lightBlackText w-1/6">
              {/* {item?.vehicleId || "-"} */}
              {index+1}
            </td>
            <td className="whitespace-nowrap p-3  text-lightBlackText w-1/6">
              {/* {item?.brand + " " + item?.model || "-"}
               */}
              {item.itemName}
            </td>{" "}
            <td className="whitespace-nowrap p-3  text-lightBlackText w-1/6">
              {/* {item?.year || "-"} */}
              {item.quantity}
            </td>{" "}
            <td className="whitespace-nowrap p-3  text-lightBlackText w-1/6">
              {/* {item?.status || "-"} */}
              {item.unit}
            </td>{" "}
            {/* <td className="whitespace-nowrap p-3  text-lightBlackText w-1/6">
            
              {item.description}
            </td>{" "} */}
            <td className="whitespace-nowrap p-3  text-lightBlackText w-1/6">
            
              {item.unitPrice}
            </td>
            <td className="whitespace-nowrap p-3  text-lightBlackText w-1/6">
          
              {item.totalPrice}
            </td>
            {/* <td className="whitespace-nowrap p-3  text-lightBlackText w-1/6">
        
              {item.discountedPrice}
            </td> */}
            <td className="whitespace-nowrap p-3  text-lightBlackText w-1/6">
           
              {item.taxRate}
            </td>
          </tr>
        ))}
    </tbody>
  );
};
export default function InvoiceItemTable() {
  
  const { singleInvoice,loading } = useSelector(
    (state) => state?.fetchSingleInvoiceSlice
  );
  const invoiceDetail=singleInvoice?.invoice
  return (
    <div>
      <div className="bg-white border rounded-md mt-3 shadow-md">
        <div className="flex items-center justify-between p-4 ">
          <Text
            content="Invoice Items"
            fontWeight="font-semibold"
            textColor="#000000"
          />
        </div>
        {loading ? (
          <ShimmerTable row={10} col={10} />
        ) : invoiceDetail?.invoiceItem?.length > 0 ? ( 
        <CustomTable
          TableHeader={TableHeader}
          TableBody={(props) => <TableBody {...props} />}
          data={invoiceDetail?.invoiceItem}
        />
         ) : (
          <NoDataFound content="Items not found" height={"h-[300px]"} fontSize={"text-2xl"} />
        )} 
        {/* <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={vehicle?.totalPages}
          handleItemsPerPageChange={handleItemsPerPageChange}
        /> */}
        {/* <div className="flex items-center justify-end p-2  gap-6">
          <Text
            content="Discount:"
            fontWeight="font-semibold"
            textColor="#000000"
          />
          <Text content="0.00 CHF" />
        </div> */}
      </div>
    </div>
  );
}
