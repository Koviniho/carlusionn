import React from "react";
import Images from "../../assets/images";
import MainHeading from "../../components/Heading/mainHeading";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
// Adjust the path as needed

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="h-screen  flex items-center justify-between bg-white text-white text-3xl mx-10">
      <div className="flex flex-col items-center justify-center gap-10  w-6/12 h-screen">
        <MainHeading heading="Page Not Found" textColor="primary" />
        <Button
          text="Back To Home"
          borderRadius="rounded-md"
          onClick={() => navigate("/")}
        />
      </div>
      <div>
        <img src={Images.notFound} alt="not-found" className="h-screen" />
      </div>
    </div>
  );
}

export default NotFoundPage;
