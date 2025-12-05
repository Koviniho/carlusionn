import { useState } from "react";
import InvoiceHeaderEdit from "../invoices/invoiceHeaderEdit";
import InvoiceFooterEdit from "../invoices/invoiceFooterEdit";
import InvoicePositionEdit from "../invoices/invoicePositionEdit";
import InvoiceVehicleEdit from "../invoices/invoiceVehicleEdit";
import InvoiceItemsEdit from "../invoices/invoiceItemsEdit";
import InvoiceTextEdit from "../invoices/invoiceTextEdit";
import CashReceiptForm from "./cashRecieptForm";
import Images from "../../../assets/images";

const CashReceiptLayout = () => {
  const [showSection, setShowSection] = useState("");
  const [savedSection, setSavedSection] = useState(null);
  const [savedFooterSection, setSavedFooterSection] = useState(null);

  console.log("🚀 ~ InvoiceLayout ~ savedSection:", savedSection);
  // const [selectedSection, setSelectedSection] = useState(null);
  // const isCentered = !savedSection?.showText || !savedSection?.showLogo;
  // const handleSelect = (index) => {
  //   setSelectedSection(index);
  // };

  return (
    <div className="grid grid-cols-2 gap-4   text-grayText ">
      {/* Layout Invoice */}
      <div className="">
        <h2 className="text-2xl font-medium mb-4 text-darkBlue">
        Layout Cash Receipt
        </h2>
        <div className=" bg-white border p-4 rounded-md">
          <div className="header border-dashed border border-primary rounded  mb-4">
            <button
              onClick={() =>
                setShowSection((prev) =>
                  prev === "editHeader" ? "" : "editHeader"
                )
              }
              className={`ml-auto block text-[6px] ${
                showSection === "editHeader"
                  ? "bg-primary text-white"
                  : "bg-[#D2DEEB]"
              }  px-3 py-1 rounded-tr rounded-bl`}
            >
              Kopfbereich bearbeiten
            </button>

            {savedSection ? (
              <div>
                <section className="mb-4 cursor-pointer">
                  <div
                    className={`p-4 bg-white  ${
                      savedSection.boxEmpty ? "h-[130px]" : ""
                    } rounded-md flex items-center ${
                      savedSection.logoPosition === "left"
                        ? "flex-row-reverse"
                        : ""
                    } ${
                      !savedSection.showText || !savedSection.showLogo
                        ? "justify-center"
                        : "justify-between"
                    }`}
                  >
                    {savedSection.showText && (
                      <div className="text-[8px]">
                        <h3 className="font-semibold text-xs">
                          Autocenter Niederbipp AG
                        </h3>
                        <p>
                          Service/ Reparatur | Carrosserie/ Spritzwerk | Ankauf/
                          Verkauf
                        </p>
                        <p>Leonardistrasse 3, 4704 Niederbipp</p>
                        <p>Tel: 032 633 60 63</p>
                        <p>Email: verkauf@acnag.ch</p>
                        <p>UID: CHE-199.615.522</p>
                      </div>
                    )}

                    {savedSection.showLogo && (
                      <div className="font-bold text-lg">
                        <img
                          src={Images.staticLogo}
                          alt="logo"
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </section>
              </div>
            ) : (
              <div className="flex justify-between p-4 ">
                <div className="text-[8px]">
                  <h3 className="font-semibold text-xs">
                    Autocenter Niederbipp AG
                  </h3>
                  <p>
                    Service/ Reparatur | Carrosserie/ Spritzwerk | Ankauf/
                    Verkauf
                  </p>
                  <p>Leonardistrasse 3, 4704 Niederbipp</p>
                  <p>Tel: 032 633 60 63</p>
                  <p>Email: verkauf@acnag.ch</p>
                  <p>UID: CHE-199.615.522</p>
                </div>
                <div className="text-right font-bold text-lg">
                  <img src={Images.layoutLogo} alt="logo" />
                </div>
              </div>
            )}
          </div>

          <div className="section2 border-dashed border border-primary rounded  mb-4">
            <button
              onClick={() =>
                setShowSection((prev) =>
                  prev === "editPosition" ? "" : "editPosition"
                )
              }
              className={`ml-auto block text-[6px]   ${showSection === "editPosition"
                  ? "bg-primary text-white"
                  : "bg-[#D2DEEB]"
              }  px-3 py-1 rounded-tr rounded-bl`}
            >
              Positionen bearbeiten
            </button>
            <div className=" p-4 text-[8px]">
              <h4 className="font-semibold text-xs mb-2">Rechnung 42</h4>
              <div className="flex justify-between">
                <dl>
                  <div className="">
                    <dt className=" inline-block min-w-32">Rechnungsdatum:</dt>
                    <dd className="inline-block">01.02.2018</dd>
                  </div>
                  <div className="">
                    <dt className="inline-block w-32">Fällig am:</dt>
                    <dd className="inline-block">01.02.2018</dd>
                  </div>
                  <div className="">
                    <dt className="inline-block w-32">Annahme:</dt>
                    <dd className="inline-block">01.02.2018 - 10.02.2018</dd>
                  </div>
                  <div className="">
                    <dt className=" inline-block w-32">Ihre UID:</dt>
                    <dd className="inline-block">A19999999</dd>
                  </div>
                  <div className="">
                    <dt className=" inline-block w-32">Zahlungsart:</dt>
                    <dd className="inline-block">Rechnung</dd>
                  </div>
                </dl>
                <dl>
                  <div className="">
                    <dt className=" inline-block min-w-32">Kd-Nr:</dt>
                    <dd className="inline-block">20001</dd>
                  </div>
                  <div className="">
                    <dt className="inline-block w-32">Max Mustermann</dt>
                    {/* <dd className="inline-block">01.02.2018</dd> */}
                  </div>
                  <div className="">
                    <dt className="inline-block w-32">Musterstrasse 13a</dt>
                    {/* <dd className="inline-block">01.02.2018 - 10.02.2018</dd> */}
                  </div>
                  <div className="">
                    <dt className=" inline-block w-32">Musterstadt 4900</dt>
                    {/* <dd className="inline-block">A19999999</dd> */}
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div className="section3 h-[100px] border-dashed border border-primary rounded  mb-4">
            <button
            //   onClick={() =>
            //     setShowSection((prev) =>
            //       prev === "editVehicle" ? "" : "editVehicle"
            //     )
            //   }
              className={` ml-auto block text-[6px]  ${showSection === "editVehicle"
                  ? "bg-primary text-white"
                  : "bg-[#D2DEEB]"
              }  px-3 py-1 rounded-tr rounded-bl mb-2`}
            >
              Fahrzeugdaten bearbeiten
            </button>
            {/* <table className="text-[8px] mb-4 w-full text-black">
              <thead className="bg-[#E6E6E6] ">
                <tr className="">
                  <th className="text-left py-2 px-4 font-semibold">
                    Fahrzeug
                  </th>
                  <th className="text-left p-2 font-semibold">Typenschein</th>
                  <th className="text-left p-2 font-semibold">
                    Inverkehrsetzung
                  </th>
                  <th className="text-left p-2 font-semibold">Kilometer</th>
                  <th className="text-left p-2 font-semibold">Getriebe</th>
                </tr>
              </thead>
              <tbody>
                <tr className="">
                  <td className="py-2 px-4 font-semibold text-black">
                    BMW M850i XDrive Steptronic
                  </td>
                  <td className="p-2 text-grayText">BC4A94</td>
                  <td className="p-2 text-grayText">01.02.2018</td>
                  <td className="p-2 text-grayText">97&apos;000 km</td>
                  <td className="p-2 text-grayText">Automatikgetriebe</td>
                </tr>
              </tbody>
            </table> */}
            <p className="px-4 capitalize text-sm">add your content</p>
          </div>
          <div className="section4  h-[100px] border-dashed border border-primary rounded  mb-4">
            <button   
            //   onClick={() =>
            //     setShowSection((prev) =>
            //       prev === "editInvoice" ? "" : "editInvoice"
            //     )
            //   } 
              className={`ml-auto block text-[6px]  ${showSection === "editInvoice"
                  ? "bg-primary text-white"
                  : "bg-[#D2DEEB]"
              }  px-3 py-1 rounded-tr rounded-bl mb-2`}>
              Rechnungspositionen bearbeiten
            </button>
            {/* <table className="w-full text-[8px] mb-4 text-black">
              <thead className="bg-[#E6E6E6]">
                <tr className="">
                  <th className="text-left py-2 px-4 font-semibold">Pos.</th>
                  <th className="text-left p-2 font-semibold">Art.Nr</th>
                  <th className="text-left p-2 font-semibold">Bezeichnung</th>
                  <th className="text-left p-2 font-semibold">Einzelpreis</th>
                  <th className="text-left p-2 font-semibold">Gesamt</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-grayText">
                  <td className="py-2 px-4">1</td>
                  <td className="p-2">OUG</td>
                  <td className="p-2">Spiegel</td>
                  <td className="p-2">100.00 CHF</td>
                  <td className="p-2">225.00 CHF</td>
                </tr>
              </tbody>
            </table> */}
             <p className="px-4 capitalize text-sm">add your content</p>
          </div>
          <div className=" border-dashed border border-primary rounded  mb-4">
            <button  onClick={() =>
                setShowSection((prev) =>
                  prev === "editText" ? "" : "editText"
                )
              } className={`ml-auto block text-[6px] bg-[#D2DEEB] px-3 py-1 rounded-tr rounded-bl  ${showSection === "editText"
                  ? "bg-primary text-white"
                  : "bg-[#D2DEEB]"
              } `}>
              Text bearbeiten
            </button>
            <p className="text-[8px]  p-4 mb-4">
              Das Autocenter Niederbipp AG Team dankt Ihnen für den Auftrag und
              wünscht gute Fahrt
            </p>
          </div>
          <div className=" border-dashed border border-primary rounded  mb-4">
            <button
              onClick={() =>
                setShowSection((prev) =>
                  prev === "editFooter" ? "" : "editFooter"
                )
              }
              className={`ml-auto block text-[6px]  ${showSection === "editFooter"
                  ? "bg-primary text-white"
                  : "bg-[#D2DEEB]"
              } px-3 py-1 rounded-tr rounded-bl`}
            >
              Fussbereich bearbeiten
            </button>
            <div className=" p-4 text-[6px] font-bold">
              {savedFooterSection ? (
                <div>
                  <section>
                    {/* <p className="text-darkBlue text-xs mb-1">{savedFooterSection.label}</p> */}
                    <div className={`bg-white  mb-4 cursor-pointer   rounded `}>
                      {savedFooterSection.content}
                    </div>
                  </section>
                </div>
              ) : (
                <div className="flex justify-between text-grayText">
                  <dl>
                    <div className="">
                      <dt className=" inline-block ">Konto:</dt>
                      <dd className="inline-block">
                        {" "}
                        Autocenter Niederbipp AG
                      </dd>
                    </div>
                    <div className="">
                      <dt className="inline-block ">Bank:</dt>
                      <dd className="inline-block">BEKB</dd>
                    </div>
                    <div className="">
                      <dt className="inline-block ">BIC:</dt>
                      <dd className="inline-block">KBBECH22XXX</dd>
                    </div>
                    <div className="">
                      <dt className=" inline-block ">IBAN</dt>
                      <dd className="inline-block">
                        CH63 0078 0016 6188 4650 3
                      </dd>
                    </div>
                  </dl>
                  <dl>
                    <div className="">
                      <dt className=" inline-block ">UID-NR.:</dt>
                      <dd className="inline-block">CHE-199.619.522</dd>
                    </div>
                  </dl>
                  <dl>
                    <div className="">
                      <dt className=" inline-block ">Tel</dt>
                      <dd className="inline-block">032 633 00 63</dd>
                    </div>
                    <div className="">
                      <dt className="inline-block w-32">
                        Web: autocenterniederbipp.ch
                      </dt>
                    </div>
                    <div className="">
                      <dt className="inline-block w-32">
                        E-Mail: verkauf@acnag.ch
                      </dt>
                    </div>
                  </dl>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      {showSection === "editHeader" ? (
        <InvoiceHeaderEdit
          setSavedSection={setSavedSection}
          setShowSection={setShowSection}
        />
      ) : showSection === "editFooter" ? (
        <InvoiceFooterEdit
          setShowSection={setShowSection}
          setSavedFooterSection={setSavedFooterSection}
        />
      ) : showSection === "editPosition" ? (
        <InvoicePositionEdit />
      ) : showSection === "editVehicle" ? (
        <InvoiceVehicleEdit />
      ) : showSection === "editInvoice" ? (
        <InvoiceItemsEdit />
      ):showSection === "editText" ? (
        <InvoiceTextEdit />
      ):(
        <CashReceiptForm />
      )}
    </div>
  );
};

export default CashReceiptLayout;
