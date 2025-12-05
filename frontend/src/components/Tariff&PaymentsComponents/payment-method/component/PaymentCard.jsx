import { FaCcMastercard, FaCcVisa } from "react-icons/fa";
import { LiaCcAmex } from "react-icons/lia";
import { FcMenu } from "react-icons/fc";
import { HiMiniXMark } from "react-icons/hi2";

const PaymentCard = ({ setIsPaymentCard }) => {
  return (
    <article className="max-w-[25%] border rounded-md bg-gray-100">
      <section className="relative h-[80px] bg-blue-400">
        <div className="absolute top-3 right-3">
          <HiMiniXMark
            className="cursor-pointer text-xl"
            onClick={() => setIsPaymentCard(false)}
          />
        </div>
        <div className="absolute bottom-[-35%] left-[43%] p-5 rounded-full border bg-white">
          <FcMenu className="text-xl" />
        </div>
      </section>
      <section className="p-5 space-y-5">
        <List icon={<FaCcVisa className="text-4xl" />} name="Visa" />
        <List
          icon={<FaCcMastercard className="text-4xl" />}
          name="Mastercard"
        />
        <List
          icon={<LiaCcAmex className="text-4xl" />}
          name="American Express"
        />
      </section>
      <section className="p-5">
        <p className="text-xs text-gray-600">Secure Payment by Datatrans</p>
      </section>
    </article>
  );
};

export default PaymentCard;

const List = ({ icon, name }) => {
  return (
    <div className="flex gap-3 items-center ">
      <span className="mt-1">{icon}</span>
      <span className="flex-1 text-left">
        <p className="mb-2 text-sm text-gray-700 ">{name}</p>
        <hr />
      </span>
    </div>
  );
};
