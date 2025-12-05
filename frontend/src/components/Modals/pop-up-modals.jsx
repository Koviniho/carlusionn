import React, { useEffect, useRef } from "react";
import CloseSvg from "../../assets/svg/close";

const PopUpModel = ({
  trigger,
  children,
  modalOpen,
  setModalOpen,
  heading = "Pop Up Heading",
}) => {
  const triggerRef = useRef(null);
  const modalRef = useRef(null);

  // Close on click outside
  // useEffect(() => {
  //   const clickHandler = ({ target }) => {
  //     if (!modalOpen) return;
  //     if (
  //       modalRef.current?.contains(target) ||
  //       triggerRef.current?.contains(target)
  //     ) {
  //       return;
  //     }
  //     setModalOpen(false);
  //   };
  //   document.addEventListener("click", clickHandler);
  //   return () => document.removeEventListener("click", clickHandler);
  // }, [modalOpen, setModalOpen]);

  // Close if the Esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (modalOpen && keyCode === 27) {
        setModalOpen(false);
      }
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [modalOpen, setModalOpen]);

  return (
    <div>
      {/* Trigger */}
      <div ref={triggerRef} onClick={() => setModalOpen(true)}>
        {trigger}
      </div>

      {/* Modal */}
      {modalOpen === true ? (
        <>
          {" "}
          <div
            className={`fixed left-0 top-0 z-50 flex    h-full w-full items-center justify-center bg-black/50 ${
              modalOpen === false ? "hidden" : "block"
            }`}
          >
            <div
              ref={modalRef}
              className="w-full max-w-[50%] max-h-[90vh] overflow-y-auto rounded-lg bg-white  shadow-lg  z-[9999]"
            >
              <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-300">
                <h2 className="text-2xl font-medium text-black">
                  {heading}
                </h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-black  "
                >
                  <CloseSvg width="24" height="24"/>
                </button>
              </div>
              {children}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default PopUpModel;
