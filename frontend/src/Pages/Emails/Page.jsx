import Breadcrumb from "../../components/Breadcrumb";
import InfoCard from "../../components/InfoCard";
import mailSvg from "../../assets/images/mail.svg";
import { IoSearchOutline } from "react-icons/io5";
import CustomTable from "../../components/Custom-Tabel";
import { format } from "date-fns";
import Button from "../../components/Button";
import { MdTune } from "react-icons/md";

function TableHeader() {
  return (
    <thead>
      <tr className="bg-primary !rounded-none">
        <th className="py-3.5 pl-5 text-left font-semibold text-white">
          <input type="checkbox" />
        </th>
        <th className="w-1/6 pl-5 py-3.5 pr-3 text-left font-semibold text-white">
          Art
        </th>
        <th className="w-1/6 px-3 py-3.5 text-left font-semibold text-white">
          Empfänger
        </th>
        <th className="w-1/6 px-3 py-3.5 text-left font-semibold text-white">
          Betreff
        </th>
        <th className="w-1/6 px-3 py-3.5 text-left font-semibold text-white">
          Versendet
        </th>
        <th className="w-1/6 px-3 py-3.5 text-left font-semibold text-white">
          Zugestellt
        </th>
        <th className="w-1/6 px-3 py-3.5 text-left font-semibold text-white">
          Geöffnet
        </th>
      </tr>
    </thead>
  );
}

const staticData = [
  {
    contractId: { templateId: "A123" },
    customerName: { customerName: "Max Mustermann" },
    carModel: { brand: "BMW", model: "X5" },
    createdAt: "2024-02-15T12:00:00Z",
    status: "Signed",
    open: "Open",
  },
  {
    contractId: { templateId: "B456" },
    customerName: { customerName: "John Doe" },
    carModel: { brand: "Audi", model: "Q7" },
    createdAt: "2024-01-20T15:30:00Z",
    status: "Pending",
    open: "Unknown",
  },
  {
    contractId: { templateId: "C789" },
    customerName: { customerName: "Jane Smith" },
    carModel: { brand: "Mercedes", model: "C-Class" },
    createdAt: "2023-12-10T10:45:00Z",
    status: "Delivered",
    open: "Open",
  },
];

function TableBody() {
  return (
    <tbody className="bg-white">
      {staticData.map((item, index) => (
        <tr
          key={index}
          className="hover:bg-gray-50 cursor-pointer border-b border-gray-100"
        >
          <td className="whitespace-nowrap py-4 px-5 font-medium">
            <input type="checkbox" />
          </td>
          <td className="w-1/6 pl-5 capitalize whitespace-nowrap text-primary px-3 py-4 text-lightBlackText">
            {item?.contractId?.templateId || "-"}
          </td>
          <td className="w-1/6 whitespace-nowrap px-3 py-4 text-lightBlackText">
            {item?.customerName?.customerName || "-"}
          </td>
          <td className="w-1/6 whitespace-nowrap px-3 py-4 text-lightBlackText">
            {item?.carModel
              ? `${item.carModel.brand} ${item.carModel.model}`
              : "-"}
          </td>
          <td className="w-1/6 whitespace-nowrap px-3 py-4 text-lightBlackText">
            {item?.createdAt
              ? format(new Date(item.createdAt), "dd MMM, yyyy")
              : "-"}
          </td>
          <td
            className={`w-1/6 whitespace-nowrap px-3 py-4 text-lightBlackText ${
              item?.status === "Signed"
                ? "text-secondary"
                : item?.status === "Expired"
                ? "text-error"
                : item?.status === "Pending"
                ? "text-primary"
                : "text-grayText"
            }`}
          >
            {item?.status || "-"}
          </td>
          <td
            className={`w-1/6 whitespace-nowrap px-3 py-4 text-lightBlackText ${
              item?.open === "Open"
                ? "text-secondary"
                : item?.open === "Unknown"
                ? "text-error"
                : item?.open === "Pending"
                ? "text-primary"
                : "text-grayText"
            }`}
          >
            {item?.open || "-"}
          </td>
        </tr>
      ))}
    </tbody>
  );
}

const EmailManagementPage = () => {
  return (
    <article>
      <Breadcrumb pageName="Email Verkehr" />
      <button className="bg-primary text-white rounded-md px-10 py-3 transition-colors duration-300 ease-in-out">
        Gesendete E-Mails
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4  gap-6 mb-12 mt-5">
        <InfoCard title="Gesamt Versende Email" value="3521" url={mailSvg} />
        <InfoCard
          title="Erfolgreich Versendete Emails"
          value="3521"
          url={mailSvg}
        />
        <InfoCard title="Unbekannt" value="3521" url={mailSvg} />
        <InfoCard title="Monatliche Verkäufe" value="3521" url={mailSvg} />
      </div>
      <div className="bg-white border rounded-lg shadow-2xl">
        <div className="flex items-center justify-between p-4">
          {/* Search Bar */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border-b border-gray-100 w-[400px]">
              <IoSearchOutline className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pr-4 py-2 rounded-lg outline-none"
              />
            </div>
            <p className="text-primary text-sm font-medium">0 results found</p>
          </div>
          <div className="flex gap-5">
            <Button
              text="Filters"
              borderRadius="rounded-md"
              textColor="white"
              icon={<MdTune className="h-5 w-5 rotate-90" />}
            />

            <Button
              text="+ Exportieren"
              borderRadius="rounded-md"
              textColor="white"
            />
          </div>
        </div>

        {/* Table Component */}
        <CustomTable TableHeader={TableHeader} TableBody={TableBody} />
      </div>
    </article>
  );
};

export default EmailManagementPage;
