/* eslint-disable react/prop-types */
import { BiEditAlt } from "react-icons/bi";
import Text from "../Heading/text";
import { useNavigate } from "react-router-dom";
import PATHS from "../../routes/path";

export default function PersonalDetails({ card, status, edit }) {
  const nav = useNavigate();
  return (
    <>
      <div className="mt-8 bg-white  rounded-md border border-gray-300 f">
        <div className="flex gap-3 items-center border-b border-gray-300 pb-2 p-4">
          <div
            onClick={() => {
              nav(PATHS.userDetail);
            }}
          >
            <Text
              content={card.name}
              textColor="text-darkBlue"
              fontWeight="font-semibold"
              className="hover:underline cursor-pointer"
            />
          </div>
          {!status && !edit ? (
            <>
              <BiEditAlt
                width={18}
                height={18}
                className="hover:fill-secondary font-bold "
              />
            </>
          ) : status ? (
            <>
              <Text
                content={card.status}
                fontWeight="font-medium"
                textSize="text-[13px]"
                textColor={card.status==="offline"? "text-error" : "text-secondary"}
              />
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="flex items-center">
          <div className="grid grid-cols-3 gap-6 w-10/12 mt-5 p-4">
            <div>
              <Text
                content="Customer type"
                textColor="black"
                fontWeight="font-normal"
                textSize="text-[16px]"
              />
              <Text content={card.customerType} textSize="text-[14px]" />
            </div>
            <div>
              <Text
                content="Name"
                textColor="black"
                fontWeight="font-normal"
                textSize="text-[16px]"
              />
              <Text content={card.name} textSize="text-[14px]" />
            </div>
            <div>
              <Text
                content="PLZ"
                textColor="black"
                fontWeight="font-normal"
                textSize="text-[16px]"
              />
              <Text content={card.plz} textSize="text-[14px]" />
            </div>
            <div>
              <Text
                content="Location"
                textColor="black"
                fontWeight="font-normal"
                textSize="text-[16px]"
              />
              <Text content={card.location} textSize="text-[14px]" />
            </div>
            <div>
              <Text
                content="Marital Status"
                textColor="black"
                fontWeight="font-normal"
                textSize="text-[16px]"
              />
              <Text content={card.maritalStatus} textSize="text-[14px]" />
            </div>
            <div>
              <Text
                content="Customer Number"
                textColor="black"
                fontWeight="font-normal"
                textSize="text-[16px]"
              />
              <Text content={card.customerNumber} textSize="text-[14px]" />
            </div>
            <div>
              <Text
                content="Date of Birth"
                textColor="black"
                fontWeight="font-normal"
                textSize="text-[16px]"
              />
              <Text content={card.dateOfBirth} textSize="text-[14px]" />
            </div>
            <div>
              <Text
                content="Position"
                textColor="black"
                fontWeight="font-normal"
                textSize="text-[16px]"
              />
              <Text content={card.position} textSize="text-[14px]" />
            </div>
            <div>
              <Text
                content="Address"
                textColor="black"
                fontWeight="font-normal"
                textSize="text-[16px]"
              />
              <Text content={card.address} textSize="text-[14px]" />
            </div>
            <div>
              <Text
                content="Phone Number"
                textColor="black"
                fontWeight="font-normal"
                textSize="text-[16px]"
              />
              <Text content={card.phoneNumber} textSize="text-[14px]" />
            </div>
            <div>
              <Text
                content="Email Address"
                textColor="black"
                fontWeight="font-normal"
                textSize="text-[16px]"
              />
              <Text content={card.emailAddress} textSize="text-[14px]" />
            </div>
          </div>

          <img
            className="w-[131px] h-[131px] rounded-full "
            src={card.imageSrc}
            alt="Profile"
          />
        </div>
      </div>
    </>
  );
}
