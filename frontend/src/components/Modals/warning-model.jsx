import React, { useState, useEffect, useRef } from "react";

import { RiErrorWarningLine } from "react-icons/ri";

const WarningModel = ({
  trigger,
  onSave,
  children,
  height,
  width = "30%",
  buttonTwoText = "Save",
  bgColor = "primary",
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const triggerRef = useRef(null);
  const modalRef = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modalRef.current || !triggerRef.current) return;
      if (
        !modalOpen ||
        modalRef.current.contains(target) ||
        triggerRef.current.contains(target)
      )
        return;
      setModalOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [modalOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [modalOpen]);

  return (
    <div>
      <div ref={triggerRef} onClick={() => setModalOpen(!modalOpen)}>
        {trigger}
      </div>
      {modalOpen === true ? (
        <div
          className={`fixed left-0 top-0 z-40 flex h-full min-h-screen w-full items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-5 ${
            modalOpen ? "block" : "hidden"
          }`}
        >
          <div
            ref={modalRef}
            className="w-full lg:w-4/12 rounded-lg bg-white px-8 py-4 text-center dark:bg-boxdark"
          >
            <span className="mx-auto inline-block flex h-20 w-20 items-center justify-center rounded-full bg-[#fbe9e9] p-3">
              <RiErrorWarningLine className="fill-[#DC2626] h-12 w-12" />
            </span>
            {children} {/* Render dynamic content here */}
            <div className="-mx-3 my-4 flex items-center justify-center gap-3 gap-y-2">
              <button
                onClick={() => setModalOpen(false)}
                className=" border border-secondary text-[13px] font-medium w-[98px]  h-[32px] rounded-sm"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onSave();
                  setModalOpen(false);
                }}
                className=" border border-[#E50000] bg-[#E50000] text-white text-[13px] font-medium w-[98px]  h-[32px] rounded-sm"
              >
                {buttonTwoText}
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default WarningModel;
