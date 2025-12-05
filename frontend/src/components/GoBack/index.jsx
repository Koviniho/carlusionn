import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

function GoBack({ pageName = "Page" }) {
  const navigate = useNavigate();
  const handelBack = () => {
    navigate(-1);
  };
  return (
    <button
      data-tooltip-id="edit"
      onClick={handelBack}
      className="flex items-center gap-1 text-primary"
    >
      <IoIosArrowRoundBack size={36} />
      {pageName}
      <Tooltip id="edit" place="top">
        Go back to {pageName} page
      </Tooltip>
    </button>
  );
}

export default GoBack;
