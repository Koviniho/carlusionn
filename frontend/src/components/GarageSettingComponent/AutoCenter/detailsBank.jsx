
import { MdEdit } from "react-icons/md";
import Text from "../../Heading/text";

function DetailedBank() {
  const detailsBankData = [
    { title: "Account holder*", value: "Autocenter Niederbipp AG" },
    { title: "IBAN:  ", value: "CH63 0079 0016 6198 4660 3" },
    { title: "BIC:", value: "KNBECH20XXX" },
    { title: "Bank:", value: "BEKB" },
  ];
  return (
    <div className=" border my-3 border-lightGray rounded-md bg-white w-full">
      <div className="flex items-center gap-4 border-b border-lightGray px-4 py-2">
        <Text
          content="Bank details"
          textColor="text-darkBlue"
          fontWeight="font-semibold"
        />
        <MdEdit className="text-secondary" />
      </div>
      <div className=" grid grid-cols-1 p-4 gap-2">
        {/* Contract ID */}
        {detailsBankData?.map((item, index) => (
          <div key={index}>
            <Text
              content={item?.title}
              textSize="text-16px"
              fontWeight="font-medium"
              textColor="text-darkBlue"
            />

            <Text
              content={item?.value}
              textSize="text-[14px]"
              className="capitalize"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailedBank;
