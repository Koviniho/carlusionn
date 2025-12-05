import { IoSend } from "react-icons/io5";
import Button from "../../../Button";
import Text from "../../../Heading/text";
import CustomInput from "../../../Input/custoInput";
import { BsPaperclip } from "react-icons/bs";
import { MdDone } from "react-icons/md";

const Chat = () => {
  return (
    <article className="space-y-3">
      {/* Left chat */}
      <section className=" flex items-center gap-3 max-w-[50%] ">
        <span className="bg-primary text-xl rounded-full text-white p-1 ">
          OP
        </span>
        <div className="space-y-2">
          <div className="border-[1px] border-primary rounded-md p-3">
            <Text
              content="Hello, I’m interested in the BMW M8 Competition. Could you confirm if it’s still available?"
              textColor="text-primary"
              textSize="text-[12px]"
            />
          </div>
          <Text content="8:00 PM" textSize="text-xs" />
        </div>
      </section>

      {/* right chat */}
      <section className="flex  justify-end">
        <div className=" flex items-center  gap-3 max-w-[50%]  ">
          <div className="space-y-2 flex flex-col items-end ">
            <div className=" bg-primary rounded-md p-3">
              <Text
                content="Hi John, yes, the BMW M8 Competition is still available. Would you like to schedule a test drive or need more details?"
                textColor="text-white"
                textSize="text-[12px]"
              />
            </div>
            <Text content="8:00 PM" textSize="text-xs" />
          </div>
          <span className="bg-primary text-xl rounded-full text-white p-1 ">
            OP
          </span>
        </div>
      </section>
      {/* textfield */}

      <section className="p-2 flex gap-2 border-[1px] border-primary rounded-lg">
        <div className="flex-1">
          <CustomInput
            border={false}
            className="text-gray-500 text-sm"
            placeholder="type a message"
          />
        </div>

        <Button icon={<IoSend />} borderRadius="rounded-md" textColor="white" />
        <button>
          <BsPaperclip className="text-primary text-2xl" />
        </button>
        <button>
          <MdDone className="text-primary text-2xl" />
        </button>
      </section>
    </article>
  );
};

export default Chat;
