import Breadcrumb from "../../../Breadcrumb";
import Images from "../../../../assets/images";
import AllInformations from "./AllInformations";
import Text from "../../../Heading/text";
import Chat from "./Chat";

const OpenChat = () => {
  return (
    <article className="space-y-4">
      <Breadcrumb
        heading="INV BF73292 | BMW M8 Competition "
        pageName="Inquiry Management"
      />
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
      <section className="border p-4 rounded-lg bg-white space-y-7">
        <div className="flex items-start gap-2">
          <span className="bg-primary text-xl rounded-full text-white p-1 mt-3">
            CB
          </span>
          <div className="w-full space-y-1">
            <Text content="Carlusion Bot" textSize="text-xs" />
            <AllInformations />
          </div>
        </div>

        {/* chat section */}
        <Chat />
      </section>
    </article>
  );
};

export default OpenChat;
