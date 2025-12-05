import { useState } from "react";
import Text from "../../components/Heading/text";
import CustomInput from "../../components/Input/custoInput";
import Modal from "../../components/modal/modal";
import Button from "../../components/Button";

const TwoFactorAuthentication=()=>{
      const [isTwoway, setIstwoWay] = useState(false);
    
    return(
        <div className="  bg-white   rounded-md border border-gray-300">
              <div className=" gap-3 items-center border-b border-gray-300 p-4">
                <Text
                  content="Two-Factor Authentication"
                  textColor="text-darkBlue"
                  fontWeight="font-semibold"
                  className=""
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <Text
                    content="Set up two-factor authentication:"
                    textColor="text-darkBlue"
                    fontWeight="font-medium"
                    textSize="text-[16px]"
                  />
                  <CustomInput
                    type="toggle"
                    value={true}
                    onChange={() => setIstwoWay(!isTwoway)}
                  />

                
                  <Modal
                    isOpen={isTwoway}
                    onClose={() => setIstwoWay(false)}
                    title={"All Filters"}
                    width={"max-w-5xl"}
                    setModalOpen={setIstwoWay}
                  >
                    <div className="p-4">
                      <p className="font-medium text-left">
                        Disable two-factor authentication?
                      </p>
                      <p className="text-sm  text-grayText mb-4 mt-2">
                        To disable two-factor authentication you must enter your
                        password.
                      </p>
                      <CustomInput placeholder="*****" type="password"  className="text-lg outline-none" />
                      <div className="flex items-center justify-center gap-4 my-4 mt-12 ">
                        <Button
                          text="Disable"
                          borderRadius="rounded-md"
                          textColor="white"
                          onClick={() => setIstwoWay(false)}
                          className={"py-2 px-12"}
                        />
                        <button
                          className={
                            "hover:bg-none px-12 py-2 text-error border-2 border-error rounded-md font-medium"
                          }
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </Modal>
                </div>
                <Text
                  content={
                    "If you enable two-factor authentication, you will receive an email with a verification code for each login, which you must enter to log in."
                  }
                  textSize="text-sm"
                  className="my-4"
                />
              </div>
            </div>
    )
}
export default TwoFactorAuthentication;