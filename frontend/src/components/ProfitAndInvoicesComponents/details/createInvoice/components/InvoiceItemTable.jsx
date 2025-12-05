/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import Button from "../../../../Button";
import CustomTable from "../../../../Custom-Tabel";
import Text from "../../../../Heading/text";
import CustomInput from "../../../../Input/custoInput";
import Modal from "../../../../modal/modal";
import * as Yup from "yup";
import { useFormik } from "formik";
import NoDataFound from "../../../../NoDataFound";
import Images from "../../../../../assets/images";
function TableHeader() {
  return (
    <thead>
      <tr className="bg-primary !rounded-none">
        <th
          scope="col"
          className="py-3.5 pr-3 pl-5 text-left font-semibold text-white"
        >
          No.
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white "
        >
          Item
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white "
        >
          Quantity
        </th>

        <th
          scope="col"
          className="px-3 py-3.5 text-left font-semibold text-white "
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
          className="px-3 py-3.5 text-left font-semibold text-white "
        >
          Unit Price
        </th>

        <th
          scope="col"
          className="px-3 py-3.5 text-left whitespace-nowrap font-semibold text-white"
        >
          Tax Rate
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left whitespace-nowrap font-semibold text-white "
        >
          Total
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left whitespace-nowrap font-semibold text-white "
        >
          Action
        </th>
      </tr>
    </thead>
  );
}


const TableBody = ({ data, handleDeleteInvoiceEntry }) => {
  return (
    <tbody className="bg-white">
      {data &&
        data.map((item, index) => (
          <tr
            key={item._id || index}
            className="hover:bg-gray-100 cursor-pointer border-b"
          >
            <td className="pl-5 whitespace-nowrap p-3 text-lightBlackText ">
              {index + 1}
            </td>
            {/* Item Name */}
            <td className="pl-5 whitespace-nowrap p-3 text-lightBlackText ">
              <CustomInput value={item.itemName} placeholder="Item Name" />
            </td>

            {/* Quantity */}
            <td className="whitespace-nowrap p-3 text-lightBlackText ">
              <CustomInput
                type="number"
                value={item.quantity}
                placeholder="Qty"
              />
            </td>

            {/* Unit */}
            <td className="whitespace-nowrap p-3 text-lightBlackText ">
              <CustomInput value={item.unit} placeholder="Unit (e.g., pcs)" />
            </td>

            {/* Unit Price */}
            <td className="whitespace-nowrap p-3 text-lightBlackText ">
              <CustomInput
                type="number"
                value={item.unitPrice}
                placeholder="Unit Price"
              />
            </td>

            {/* Tax Rate */}
            <td className="whitespace-nowrap p-3 text-lightBlackText ">
              <CustomInput value={item.taxRate} placeholder="Tax %" />
            </td>

            {/* Total Price */}
            <td className="whitespace-nowrap p-3 text-lightBlackText ">
              <CustomInput
                type="number"
                value={item.totalPrice}
                placeholder="Total"
              />
            </td>
            <td>
              <div
                onClick={() => handleDeleteInvoiceEntry(index)}
                className="text-red-500 hover:text-red-700 "
              >
                <img src={Images.bin} alt="bin" className="w-5" />
              </div>
            </td>
            {/* Description */}
            {/* <td className="whitespace-nowrap p-3 text-lightBlackText ">
              <CustomInput value={item.description} placeholder="Description" />
            </td> */}
          </tr>
        ))}
    </tbody>
  );
};
export default function InvoiceItemAddTable({ setInvoiceItem, invoiceItem }) {
  const [OpenInvoiceModal, setOpenInvoiceModal] = useState(false);

  const itemFields = [
    {
      name: "itemName",
      label: "Item Name",
      type: "text",
      placeholder: "Enter item",
    
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "select",
      placeholder: "Enter quantity",
      options: Array.from({ length: 100 }, (_, i) => ({
        value: (i + 1).toString().padStart(2, "0"),
        label: (i + 1).toString().padStart(2, "0"),
      })),
    },
    {
      name: "unit",
      label: "Unit",
      type: "text",
      placeholder: "Enter unit",
    },
    {
      name: "unitPrice",
      label: "Unit Price",
      type: "number",
      placeholder: "Enter unit price",
    },
    {
      name: "taxRate",
      label: "Tax Rate",
      type: "select",
      placeholder: "Select tax rate",
      options: [
        { value: "", label: "Please select tax rate" },
        ...Array.from({ length: 51 }, (_, i) => ({
          value: i,
          label: `${i}%`,
        })),
      ],
    },
    {
      name: "totalPrice",
      label: "Total",
      type: "number",
      placeholder: "Total",
      readOnly:"readOnly"
      
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter Description......",
    },
  ];

  const itemValidationSchema = Yup.object().shape({
    itemName: Yup.string().required("Item Name is required"),
    quantity: Yup.string().required("Quantity is required"),
    unit: Yup.string().required("Unit is required"),
    unitPrice: Yup.number().required("Unit Price is required").positive(),
    taxRate: Yup.number().required("Tax Rate is required"),
    totalPrice: Yup.number().required("Total is required").min(0),
    // description: Yup.string().required("description is required"),
  });
  const formik = useFormik({
    initialValues: {
      itemName: "",
      quantity: "",
      unit: "",
      unitPrice: "",
      taxRate: "",
      totalPrice: "",
      description: "",
    },
    validationSchema: itemValidationSchema,
    onSubmit: (values) => {
      const newInvoiceItem = {
        itemName: values.itemName,
        quantity: parseInt(values.quantity),
        unit: values.unit,
        unitPrice: parseInt(values.unitPrice),
        taxRate: parseInt(values.taxRate),
        totalPrice: parseInt(values.totalPrice),
      };
      setInvoiceItem((prev) => [...prev, newInvoiceItem]);
      setOpenInvoiceModal(false);
      formik.resetForm();
    },
  });
  const handleDeleteInvoiceEntry = (indexToDelete) => {
    // Remove from investmentExpenses
    setInvoiceItem((prev) =>
      prev.filter((_, index) => index !== indexToDelete)
    );
  };
////////////////// for getting total ///////////////////
  useEffect(() => {
    const { unitPrice, quantity, taxRate } = formik.values;
  
    if (unitPrice && quantity && taxRate !== "") {
      const subtotal = parseFloat(unitPrice) * parseInt(quantity);
      const taxAmount = subtotal * (parseFloat(taxRate) / 100);
      const total = subtotal + taxAmount;
  
      formik.setFieldValue("totalPrice", total);
    }
  }, [formik.values.unitPrice, formik.values.quantity, formik.values.taxRate]);
  return (
    <div>
      <Modal
        isOpen={OpenInvoiceModal}
        onClose={() => setOpenInvoiceModal(false)}
        title={"Add Invoice"}
        width={"w-[40%]"}
        fontSize={"text-2xl"}
        fontWeight="font-medium"
        setModalOpen={setOpenInvoiceModal}
      >
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {itemFields.map((field) => (
            <CustomInput
              key={field.name}
              type={field.type}
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              value={formik.values[field.name]}
              readOnly={field.readOnly}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors[field.name]}
              touched={formik.touched[field.name]}
              options={field.options || []}
            />
          ))}
          <Button
            text={" Add Item"}
            borderRadius="rounded-md"
            textColor="white"
            type="submit"
            className={"w-full"}
          />
        </form>
      </Modal>
      <div className="bg-white border rounded-md mt-3">
        <div className="flex items-center justify-between p-4 ">
          <Text
            content="Invoice Items"
            fontWeight="font-semibold"
            textColor="#000000"
          />
          <Button
            text={"Add Invoice Item"}
            borderRadius="rounded-md"
            textColor="white"
            type="button"
            onClick={() => setOpenInvoiceModal(true)}
          />
        </div>
        {invoiceItem?.length > 0 ? (
          <CustomTable
            TableHeader={TableHeader}
            TableBody={(props) => (
              <TableBody
                {...props}
                handleDeleteInvoiceEntry={handleDeleteInvoiceEntry}
              />
            )}
            data={invoiceItem}
          />
        ) : (
          <NoDataFound />
        )}
      
      </div>
    </div>
  );
}
