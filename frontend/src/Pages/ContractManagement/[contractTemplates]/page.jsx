import React, { useEffect } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleContractTemplate } from "../../../store/features/contractTemplates/contractTemplatesSlice";
import MainHeading from "../../../components/Heading/mainHeading";
import Text from "../../../components/Heading/text";
import { FaFilePdf } from "react-icons/fa";
import { formatDate } from "../../../utils/dateFormate";
import { config } from "../../../services/api";
import GoBack from "../../../components/GoBack";

function ContractTemplatesDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleTamplet } = useSelector((state) => state.contractTamplets);
  const contractTemplate = singleTamplet?.contractTemplate;

  useEffect(() => {
    dispatch(getSingleContractTemplate(id));
  }, [id]);

  return (
    <div>
      <Breadcrumb pageName="Contract Templates Details" />
      <div className="mt-20">
        <div className="flex items-center justify-between">
          <MainHeading
            heading={contractTemplate?.templateName || "-"}
            textColor="primary"
            textSize="text-[24px]"
            fontWeight="font-medium"
            className="font-poppins capitalize "
          />
          <GoBack pageName="Contract Templates" />
        </div>
        <div className="border rounded-sm border-gray-200 bg-white w-6/12 mt-10">
          <Text
            content="Contract  Templates Information"
            fontWeight="font-semibold "
            className="px-6 py-4 border-b font-poppins"
            textColor="text-primary"
          />
          <div className="p-6 bg-white rounded-md shadow-md">
            {/* Top Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6  pb-4">
              {/* Contract ID */}
              <div>
                <Text
                  content="templateId"
                  textSize="text-16px"
                  fontWeight="font-semibold"
                  textColor="primary"
                />

                <Text
                  content={contractTemplate?.templateName || "-"}
                  textSize="text-[14px]"
                  className="capitalize"
                />
              </div>

              {/* Customer Name */}
              <div>
                <Text
                  content="Created By"
                  textSize="text-16px"
                  fontWeight="font-semibold"
                  textColor="primary"
                />
                <Text
                  content={contractTemplate?.createdBy || "-"}
                  textSize="text-[14px]"
                  className="capitalize"
                />
              </div>

              {/* Car Model */}
              <div>
                <Text
                  content="Contract Type
"
                  textSize="text-16px"
                  fontWeight="font-semibold"
                  textColor="primary"
                />
                <Text
                  content={contractTemplate?.contractType || "-"}
                  textSize="text-[14px]"
                  className="capitalize"
                />
              </div>

              {/* Salesperson */}
              <div>
                <Text
                  content="Created At"
                  textSize="text-16px"
                  fontWeight="font-semibold"
                  textColor="primary"
                />
                <Text
                  content={formatDate(contractTemplate?.createdAt) || "-"}
                  textSize="text-[14px]"
                  className="capitalize"
                />
              </div>
            </div>

            {/* Bottom Section */}

            <div className="col-span-2 mt-5">
              <Text
                content="Document"
                textSize="text-16px"
                fontWeight="font-semibold"
                textColor="primary"
              />
              <div className="mt-2 flex items-center p-3 bg-gray-100 rounded-md shadow-sm w-full max-w-md">
                {/* PDF Icon */}
                <div className="bg-red-500 p-2 rounded">
                  <FaFilePdf className="text-white w-5 h-5" />
                </div>
                {/* File Details */}
                <div className="ml-3">
                  <a
                    target="_blank"
                    href={`${config.imageBaseUrl}/contractTemplates/${contractTemplate?.contractFile}`} // Replace with your file URL
                    download={contractTemplate?.contractFile} // Triggers download with the file name
                    className="text-gray-800 font-medium text-sm cursor-pointer hover:underline"
                  >
                    {contractTemplate?.contractFile}
                  </a>

                  <p className="text-gray-500 text-xs">19.06 KB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContractTemplatesDetailsPage;
