import Images from "../../../assets/images";

const InvoicePreview = () => {
  return (
    <div className="">
      <h2 className="text-2xl font-medium mb-4 text-darkBlue">Preview</h2>
      <div className=" bg-white border  rounded-md ">
        <div className="flex justify-between p-4 mb-">
          <div className="text-[8px]">
            <h3 className="font-semibold text-xs">Autocenter Niederbipp AG</h3>
            <p>
              Service/ Reparatur | Carrosserie/ Spritzwerk | Ankauf/ Verkauf
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

        <div className="px-4">
          <table className="text-[8px] mb-4 w-full text-black ">
            <thead className="bg-[#E6E6E6] ">
              <tr className="">
                <th className="text-left py-2 px-4 font-semibold">Fahrzeug</th>
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
          </table>
        </div>
        <div className="px-4">
          <table className="w-full text-[8px] mb-4 text-black">
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
          </table>
        </div>

        <p className="text-[8px]  p-4 mb-[160px] mt-32 ">
          Das Autocenter Niederbipp AG Team dankt Ihnen für den Auftrag und
          wünscht gute Fahrt
        </p>

        <div className=" p-4 text-[6px] font-bold ">
          <div className="flex justify-between">
            <dl>
              <div className="">
                <dt className=" inline-block ">Konto:</dt>
                <dd className="inline-block"> Autocenter Niederbipp AG</dd>
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
                <dd className="inline-block">CH63 0078 0016 6188 4650 3</dd>
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
                {/* <dd className="inline-block">01.02.2018</dd> */}
              </div>
              <div className="">
                <dt className="inline-block w-32">E-Mail: verkauf@acnag.ch</dt>
                {/* <dd className="inline-block">01.02.2018 - 10.02.2018</dd> */}
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreview;
