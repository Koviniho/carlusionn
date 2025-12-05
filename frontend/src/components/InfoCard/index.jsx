/* eslint-disable react/prop-types */
import Text from "../Heading/text";
import diarySvg from "../../assets/images/penDiary.svg";
// eslint-disable-next-line react/prop-types
const InfoCard = ({
  title,
  value,
  icon,
  textColor = "darkBlue",
  url = diarySvg,
}) => {
  return (
    <div className="flex items-start justify-between gap-3 border bg-white p-4 rounded-md shadow-sm h-full">
      <div className="space-y-4">
        <p
          className={`text-${textColor} text-sm lg:text-base font-medium flex flex-wrap`}
        >
          {title}
        </p>

        {/* {value && (
          <Text
            content={value}
            fontWeight="font-semibold"
            textColor={`text-${textColor}`}
          />
        )} */}
          
          <Text
            content={value}
            fontWeight="font-semibold"
            textColor={`text-${textColor}`}
          />
       
      </div>
      {/* <IoPricetagsOutline className="text-secondary bg-[#19DB8C33] h-[60px] w-[60px] rounded-full  p-3" /> */}
      <div className=" rounded-full bg-[#1E599B33] flex-shrink-0   flex items-center justify-center p-4 ">
        {icon ? icon : <img src={url} className="w-[30px]" alt="" />}
      </div>
    </div>
  );
};

export default InfoCard;
