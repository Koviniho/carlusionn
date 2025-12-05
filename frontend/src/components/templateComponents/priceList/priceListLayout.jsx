import { useState } from "react";
import InvoiceHeaderEdit from "../invoices/invoiceHeaderEdit";
import InvoiceFooterEdit from "../invoices/invoiceFooterEdit";
import InvoicePreview from "../invoices/invoicePreview";
import Images from "../../../assets/images";
import VehicleContractPage from "../templateContracts/vehicleContractPage";
import ContractLayoutEdit from "../templateContracts/contractLayoutEdit";

const PriceListLayout = () => {
  const [showSection, setShowSection] = useState("");
  const [savedHeader2, setSavedHeader2] = useState(null);
  const [savedFooterSection, setSavedFooterSection] = useState(null);

  return (
    <div className="grid grid-cols-2 gap-4   text-grayText ">
      {/* Layout Invoice */}
      <div className="">
        <h2 className="text-2xl font-medium mb-4 text-darkBlue">
          Layout Price
        </h2>
        <div className=" bg-white border p-4 rounded-md">
          <div className="header2 border-dashed border border-primary rounded  mb-4">
            <button
              onClick={() =>
                setShowSection((prev) =>
                  prev === "editHeader2" ? "" : "editHeader2"
                )
              }
              className={`ml-auto block text-[6px] ${
                showSection === "editHeader2"
                  ? "bg-primary text-white"
                  : "bg-[#D2DEEB]"
              }  px-3 py-1 rounded-tr rounded-bl`}
            >
              Kopfbereich bearbeiten
            </button>

            {savedHeader2 ? (
              <div>
                <section className="mb-4 cursor-pointer">
                  <div
                    className={`p-4 bg-white  ${
                      savedHeader2.boxEmpty ? "h-[130px]" : ""
                    } rounded-md flex items-center ${
                      savedHeader2.logoPosition === "left"
                        ? "flex-row-reverse"
                        : ""
                    } ${
                      !savedHeader2.showText || !savedHeader2.showLogo
                        ? "justify-center"
                        : "justify-between"
                    }`}
                  >
                    {savedHeader2.showText && (
                      <div className="text-[8px]">
                        <h3 className="font-semibold text-xs">
                          Autocenter Niederbipp AG
                        </h3>
                        {/* <p>
                          Service/ Reparatur | Carrosserie/ Spritzwerk | Ankauf/
                          Verkauf
                        </p>
                        <p>Leonardistrasse 3, 4704 Niederbipp</p>
                        <p>Tel: 032 633 60 63</p>
                        <p>Email: verkauf@acnag.ch</p>
                        <p>UID: CHE-199.615.522</p> */}
                      </div>
                    )}

                    {savedHeader2.showLogo && (
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
              <div className="flex justify-between items-end px-4 pb-4 ">
                <div className="text-[8px]">
                  <h3 className="font-semibold text-xs">
                    Autocenter Niederbipp AG
                  </h3>
                  {/* <p>
                    Service/ Reparatur | Carrosserie/ Spritzwerk | Ankauf/
                    Verkauf
                  </p>
                  <p>Leonardistrasse 3, 4704 Niederbipp</p>
                  <p>Tel: 032 633 60 63</p>
                  <p>Email: verkauf@acnag.ch</p>
                  <p>UID: CHE-199.615.522</p> */}
                </div>
                <div className="text-right font-bold text-lg">
                  <img src={Images.layoutLogo} alt="logo" />
                </div>
              </div>
            )}
          </div>
          <div className="vehicleDescription border-dashed border border-primary rounded mb-4">
            <button
              onClick={() =>
                setShowSection((prev) =>
                  prev === "editVehicleDescription"
                    ? ""
                    : "editVehicleDescription"
                )
              }
              className={`ml-auto block text-[6px]  ${
                showSection === "editVehicleDescription"
                  ? "bg-primary text-white"
                  : "bg-[#D2DEEB]"
              } px-3 py-1 rounded-tr rounded-bl`}
            >
              Fussbereich bearbeiten
            </button>
            <div className="  text-[6px] font-bold  text-darkBlue ">
              <VehicleContractPage />
            </div>
          </div>
          <div className="footer2 border-dashed border border-primary rounded  mb-4">
            <button
              onClick={() =>
                setShowSection((prev) =>
                  prev === "editFooter" ? "" : "editFooter"
                )
              }
              className={`ml-auto block text-[6px]  ${
                showSection === "editFooter"
                  ? "bg-primary text-white"
                  : "bg-[#D2DEEB]"
              } px-3 py-1 rounded-tr rounded-bl`}
            >
              Fussbereich bearbeiten
            </button>
            <div className=" py-4 text-[6px] font-bold border-t border-[#8F8F8F] mx-4 mt-2 ">
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
      {showSection === "editHeader2" ? (
        <InvoiceHeaderEdit
          setShowSection={setShowSection}
          header2={true}
          setSavedHeader2={setSavedHeader2}
        />
      ) : showSection === "editFooter" ? (
        <InvoiceFooterEdit
          setShowSection={setShowSection}
          setSavedFooterSection={setSavedFooterSection}
        />
      ) : showSection === "editVehicleDescription" ? (
        <ContractLayoutEdit contractPage={true} />
      ) : (
        <InvoicePreview />
      )}
    </div>
  );
};

export default PriceListLayout;
