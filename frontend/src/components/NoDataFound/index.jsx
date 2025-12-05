/* eslint-disable react/prop-types */

import Images from "../../assets/images";

function NoDataFound({ content = "No Data",height,fontSize }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4 ">
      <img src={Images.noDataFound} alt={content} className={`${height ? height:""}`}  />
      <h1 className={`${fontSize? fontSize: "text-4xl"} -mt-5 font-bold bg-gradient-to-bl from-primary to-secondary bg-clip-text text-transparent leading-normal`}>
        {content}
      </h1>{" "}
    </div>
  );
}

export default NoDataFound;
