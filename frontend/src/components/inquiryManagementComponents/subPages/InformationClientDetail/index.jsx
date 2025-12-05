import Breadcrumb from "../../../Breadcrumb";
import Button from "../../../Button";
import Images from "../../../../assets/images";
import Text from "../../../Heading/text";
import CarCardComponent from "../../sharedComponents/CarCardComponent";
import { Link } from "react-router-dom";

const InformationClientDetail = () => {
  const clientsData = [
    { label: "Anrede", value: "Herr" },
    { label: "Vorname", value: "Kristian" },
    { label: "Nachname", value: "Kovac" },
    { label: "Adresse", value: "Langenthalerstrasse 12" },
    { label: "Telefonnummer", value: "+41 78 433 43 43" },
    { label: "Email-Adresse", value: "K.Kiki@Icloud.Com" },
    { label: "Geburtsdatum", value: "01.01.2012" },
    { label: "Ort", value: "Langenthal" },
    { label: "Kundenart", value: "Privat Person" },
    { label: "Kundennummer", value: "1" },
    { label: "Versicherung", value: "Generalli" },
    { label: "PLZ", value: "4900" },
    { label: "Zivilstand", value: "Ledig" },
    { label: "Telefonnummer", value: "0797895571" },
    { label: "Email Adresse", value: "Dallaskeuchal12@gmail.com" },
  ];

  const carDetails = [
    { label: "Brand", value: "231233" },
    { label: "Model", value: "Toyota" },
    { label: "Fuel Type", value: "Diesel" },
    { label: "Vehicle Type", value: "Sedan" },
    { label: "Condition", value: "Excellent" },
    { label: "AB MFK", value: "Yes" },
    { label: "Price", value: "90'000 CHF" },
    { label: "Mileage", value: "90'000 Km" },
    { label: "Year", value: "2022-2024" },
    { label: "Exterior", value: "Black" },
    { label: "Interior", value: "Blue" },
    { label: "Location", value: "Switzerland" },
    { label: "Air Suspension", value: "Yes" },
    { label: "Alarm", value: "Yes" },
    { label: "Sensor", value: "Yes" },
    { label: "Letzer MFK", value: "20.12.2024" },
  ];
  return (
    <article className="space-y-6">
      <Breadcrumb
        heading="INV BF73292 | BMW M8 Competition "
        pageName="Inquiry Management"
      />
      <section className="flex  justify-end items-center gap-3">
        <Button
          text="Active"
          bgColor="secondary"
          borderRadius="rounded-md"
          textColor="white"
          fontSize="text-base"
        />

        <Link to="/dashboard/inquiry-management/:id/mailbox/:id/client-information/chat">
          <Button
            borderRadius="rounded-md"
            bgColor="primary"
            textColor="white"
            text="Open Chat"
            fontSize="text-base"
          />
        </Link>
      </section>
      <section className="mt-4 mb-2">
        <div
          style={{
            backgroundImage: ` url(${Images.vehiclecheckimage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className=" w-full h-full text-white rounded-[10px] cursor-pointer "
        >
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <img src={Images.loginLogo} alt="" className="object-cover" />
            <p className="font-medium text-lg">
              Welcome back! Continue checking vehicles?
            </p>
          </div>
        </div>
      </section>

      {/* Client information  */}

      <section className="  bg-white   rounded-lg border border-gray-300 ">
        <div className="flex gap-3 items-center border-b w-fill border-gray-300  p-4">
          <Text
            content="Client Information"
            textColor="text-darkBlue"
            fontWeight="font-semibold"
            className=""
          />
        </div>

        <div className="flex items-start gap-6 p-4">
          <div className="grid grid-cols-4 gap-4 flex-1">
            {clientsData?.map((client, id) => (
              <div key={id}>
                <Text
                  content={client.label}
                  textColor="text-darkBlue"
                  fontWeight="font-medium"
                  textSize="text-[16px]"
                />
                <Text
                  content={client.value}
                  textSize="text-[14px]"
                  textColor={`${
                    client.value.endsWith(".Com") ? "text-secondary" : ""
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="mr-10">
            <img
              className="w-[131px] h-[131px] rounded-full"
              src={Images.profile}
            />
          </div>
        </div>
      </section>

      {/* Vehicle information  */}

      <section className="  bg-white   rounded-lg border border-gray-300 ">
        <div className="flex gap-3 items-center border-b w-fill border-gray-300  p-4">
          <Text
            content="Search Vehicle Information"
            textColor="text-darkBlue"
            fontWeight="font-semibold"
            className=""
          />
        </div>

        <div className="flex items-start gap-6 p-4">
          <div className="grid grid-cols-4 gap-4 flex-1">
            {carDetails?.map((car, id) => (
              <div key={id}>
                <Text
                  content={car.label}
                  textColor="text-darkBlue"
                  fontWeight="font-medium"
                  textSize="text-[16px]"
                />
                <Text content={car.value} textSize="text-[14px]" />
              </div>
            ))}
          </div>

          <div className="text-center">
            <img src={Images.checkCar} alt="" />
            <div className="flex justify-center mb-2">
              <Text
                content="BMW X5 XDrive M50d "
                fontWeight="font-bold"
                textColor="black"
              />
            </div>

            <div className="flex flex-col items-center p-3 bg-[#F6F6F6] border rounded-lg">
              <Text content="Maximum Budget" textSize="text-lg" />
              <Text
                content="49'900 CHF"
                fontWeight="font-bold"
                textColor="text-secondary"
                textSize="text-[32px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="  bg-white rounded-lg border border-gray-300 ">
        <div className="p-4 grid grid-cols-2 gap-4">
          <CarCardComponent />
          <CarCardComponent />
          <CarCardComponent />
          <CarCardComponent />
        </div>
      </section>
    </article>
  );
};

export default InformationClientDetail;
