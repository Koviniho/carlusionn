import Button from "../../components/Button";
import Text from "../../components/Heading/text";

const Password=()=>{
return(
    <div className=" bg-white border border-gray-300 rounded">
    <div className=" gap-3 items-center border-b p-4 border-gray-300 pb-2">
      <Text
        content="Password"
        textColor="text-darkBlue"
        fontWeight="font-semibold"
        className=""
      />
    </div>
    <div className="mt-3 p-4">
      <Text
        content="Current Password"
        textColor="text-darkBlue"
        fontWeight="font-medium"
        textSize="text-[16px]"
      />
      <Text content="**********" />
      <div className="mt-5">
        <Button
          text={"Reset"}
          borderRadius=" rounded-md"
          bgColor="primary"
          textColor="white"
          className={"py-2 px-12"}
        />
      </div>
    </div>
  </div>
)
}
export default Password;