import { BsCheckCircle } from "react-icons/bs";
import MainHeading from "../Heading/mainHeading";
import Images from "../../assets/images";

const LeftSide = ({ heading = "Log in" }) => {
  const items = Array(4).fill(null);

  return (
    <div className="w[600px] bg-primary h-full  px-16 py-10 flex flex-col justify-between">
      <div>
        <div className="flex flex-col  pt-10">
          <MainHeading heading={heading} className="font-poppins" />
          <p className="text-[13px] py-5 text-white">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore
          </p>
        </div>
        <div className="flex flex-col space-y-10 pt-10">
          {items.map((_, index) => (
            <div key={index} className="flex items-start gap-5 text-white">
              <BsCheckCircle className="text-3xl text-white" />
              <p className="text-[13px]">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-[13px]  text-white">Powered by</p>
        <img src={Images.poweredby} alt="powered by" />
      </div>
    </div>
  );
};
export default LeftSide;
