import MainHeading from "../Heading/mainHeading";
import Text from "../Heading/text";
import CustomInput from "../Input/custoInput";
import CustomSelect from "../customSelect/customSelect";
import Images from "../../assets/images";
import Icons from "../../assets/icons";
import { useState } from "react";
function GeneralAccounting() {
  const [withLogo, setWithLogo] = useState(false);
  const percentageOptions = Array.from({ length: 10 }, (_, i) => ({
    value: (i + 1) / 100,
    label: `${(i + 1) / 10}%`,
  }));
  const paymentPackages = [
    {
      label: "Basic",
      value: 9.99,
    },
    {
      label: "Standard",
      value: 24.99,
    },
    {
      label: "Premium",
      value: 49.99,
    },
  ];
  return (
    <div>
      <div className="flex  items-center justify-between">
        <MainHeading
          heading="Accounting Settings"
          textColor="darkBlue"
          textSize="text-[24px]"
          fontFamily="Poppins"
          fontWeight="font-medium"
        />
        <div className="flex gap-2">
          <div className=" bg-white  p-4 rounded  cursor-pointer border border-lightGray">
            <img src={Images.bin} className="text-red-600 w-4 h-4" />
          </div>
          <div className=" bg-white  p-4 rounded  cursor-pointer border border-lightGray">
            <Icons.FiPlus className="text-darkBlue w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="flex flex-col py-4">
        <Text
          content={"Steuersätze"}
          textColor="darkBlue"
          textSize="text-[20px]"
        />
        <div className="flex items-center gap-5 mt-3">
          <div className="flex flex-col gap-2 w-20">
            <label className="text-[13px]">Standardsteuersatz</label>
            <CustomSelect
              options={percentageOptions}
              borderColor="border-lightGray"
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="text-[13px]">Steuersätze</label>
            <CustomInput />
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="text-[13px]">Bezeichnung</label>
            <CustomInput />
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="text-[13px]">Kontennummer</label>
            <CustomInput />
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="text-[13px]">Steuercode / Steuerschlüssel</label>
            <CustomInput />
          </div>
        </div>
      </div>
      <div className="flex flex-col py-4">
        <Text
          content={"Standard Kontennummern"}
          textColor="darkBlue"
          textSize="text-[20px]"
        />
        <div className="flex items-center gap-5 mt-3">
          <div className="flex flex-col gap-2 ">
            <label className="text-[13px]">Kunden Kontonummer</label>
            <CustomInput placeholder="10000" />
          </div>
        </div>
      </div>
      <div className="flex flex-col pb-4">
        <div className="flex items-center gap-5 mt-3">
          <div className="flex flex-col gap-2 ">
            <label className="text-[13px]">Kassenbuch Kontonummer</label>
            <CustomInput placeholder="2500" />
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="text-[13px]">Bank Kontonummer</label>
            <CustomInput placeholder="2500" />
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="text-[13px]">Kreditkarte Kontonummer</label>
            <CustomInput placeholder="2500" />
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="text-[13px]">Sonstiges Kontonummer</label>
            <CustomInput placeholder="2500" />
          </div>
        </div>
      </div>
      <div className="flex flex-col py-4">
        <Text
          content={"Datev Einstellungen"}
          textColor="darkBlue"
          textSize="text-[20px]"
        />
        <div className="flex items-center gap-5 mt-3">
          <div className="flex flex-col gap-2 ">
            <label className="text-[13px]">Beraternummer</label>
            <CustomInput placeholder="10000" />
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="text-[13px]">Mandantennummer</label>
            <CustomInput placeholder="10000" />
          </div>{" "}
          <div className="flex flex-col gap-2 ">
            <label className="text-[13px]">Wirtschaftsjahresbeginn</label>
            <CustomInput placeholder="01.01.2025" />
          </div>{" "}
          <div className="flex flex-col gap-2 ">
            <label className="text-[13px]">Sachkontolänge</label>
            <CustomInput placeholder="4" />
          </div>
        </div>
      </div>
      <div className="flex flex-col py-4">
        <Text
          content={"Standart Zahlungsmethode"}
          textColor="black"
          textSize="text-[20px]"
        />
        <div className="flex items-center gap-5 mt-3">
          <div className="flex flex-col gap-2 w-20">
            <CustomSelect
              options={paymentPackages}
              borderColor="border-lightGray"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col py-4">
        <div className="flex items-center gap-5">
          <Text
            content={"Kostenaufstellung"}
            textColor="darkBlue"
            textSize="text-[20px]"
          />
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={withLogo}
              onChange={() => setWithLogo(!withLogo)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-primary peer-checked:after:translate-x-full after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>
        <p className="text-[13px] font-medium mt-2">
          Kostenaufstellung können aus einem Entwurf heraus erstellt werden. Sie
          sind fpr die interne Dokumentation von Arbeiten gedacht , die entweder
          an eigenden Fahrzeugen oder an Gebrauchtwagen vor dem Verkauf
          durchgeführt und nich dem Kunden in Rechnungen gestellt werden
        </p>
      </div>
      <div className="flex flex-col py-4">
        <Text
          content={"Nummerierung"}
          textColor="darkBlue"
          textSize="text-[20px]"
        />
        <div className="flex items-center gap-5 mt-3 flex-wrap">
          <div className="flex flex-col gap-2 relative">
            <label className="text-[13px]">Nächste Rechnungsnummer</label>
            <CustomInput placeholder="10000" />
            <Icons.BiEditAlt className="absolute right-2 top-10 text-primary " />
          </div>
          <div className="flex flex-col gap-2 relative ">
            <label className="text-[13px]">Nächste Angebotsnummer</label>
            <CustomInput placeholder="10000" />
            <Icons.BiEditAlt className="absolute right-2 top-10 text-primary " />
          </div>{" "}
          <div className="flex flex-col gap-2 relative ">
            <label className="text-[13px]">Nächste Kassenbuchnummer</label>
            <CustomInput placeholder="10000" />
            <Icons.BiEditAlt className="absolute right-2 top-10 text-primary " />
          </div>{" "}
          <div className="flex flex-col gap-2 relative ">
            <label className="text-[13px]">Nächste Kundennummer</label>
            <CustomInput placeholder="10000" />
            <Icons.BiEditAlt className="absolute right-2 top-10 text-primary " />
          </div>{" "}
          <div className="flex flex-col gap-2 relative ">
            <label className="text-[13px]">
              Nächste Lieferantenkontonummer
            </label>
            <CustomInput placeholder="10000" />
            <Icons.BiEditAlt className="absolute right-2 top-10 text-primary " />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralAccounting;
