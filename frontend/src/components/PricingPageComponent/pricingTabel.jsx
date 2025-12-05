import React from "react";
import Button from "../Button";
import MainHeading from "../Heading/mainHeading";
import { useTranslation } from "react-i18next"; // Import useTranslation hook from react-i18next

const PricingTable = () => {
  const { t, i18n } = useTranslation(); // Use i18n to manage language
  const plans = t("pricing.comparePlan.plans", { returnObjects: true });
  const tableData = t("pricing.comparePlan.tableData", { returnObjects: true });

  return (
    <div className="overflow-x-auto p-6 container mx-auto flex flex-col items-center justify-center">
      <MainHeading
        heading={t("pricing.comparePlan.heading")}
        textColor="darkBlue"
        // className="text-midBlue"
      />
      <p className="py-5 text-2xl text-grayText ">
        {t("pricing.comparePlan.content")}
        <span className="underline text-secondary pl-1">
          {t("pricing.comparePlan.startAChat")}
        </span>
      </p>
      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-[#19DB8C33] border-b border-[#19DB8C80]">
            <th className="p-4 text-left text-gray-700 font-semibold"> </th>
            {plans.map((plan, index) => (
              <th
                key={index}
                className="p-4 text-center text-gray-800 font-semibold border-l border-[#19DB8C80]"
              >
                {plan.name}
                <br />
                <span className="text-xl font-normal">{plan.description}</span>
                <br />
                <span className="text-[18px] font-normal text-secondary underline">
                  {plan.trial}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((section, sectionIndex) => (
            <React.Fragment key={sectionIndex}>
              {/* Section Header */}
              {section?.category && (
                <tr className="bg-[#19DB8C33] border-b border-[#19DB8C80]">
                  <th className="p-4 text-left text-gray-700 font-semibold">
                    {section.category}
                  </th>
                  {plans.map((_, planIndex) => (
                    <th
                      key={planIndex}
                      className="p-4 text-center text-gray-800 font-semibold"
                    ></th>
                  ))}
                </tr>
              )}
              {/* Section Rows */}
              {section?.rows?.map((row, rowIndex) => {
                const valuesCount = row?.values?.length || 0;
                return (
                  <tr key={rowIndex} className="border-b border-[#19DB8C80]">
                    <td className="p-4 text-gray-600 font-medium border-r border-[#19DB8C80]">
                      <div>
                        {row.label}
                        {row.description && (
                          <>
                            <br />
                            <span className="font-normal">
                              {row.description}
                            </span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* {row?.values?.map((value, valueIndex) => (
                    <td
                      key={valueIndex}
                      className="p-4 text-center border-r border-[#19DB8C80]"
                    >
                      {value}
                    </td>
                  ))} */}

                    {valuesCount === 1 ? (
                      <td
                        colSpan={3}
                        className="p-4 text-center border-r border-[#19DB8C80] text-grayText"
                      >
                        <div className="flex flex-col">
                        <p className="text-lg font-medium">{row.values[0]}</p>
                        <p>{row?.contentDescription}</p>
                        </div>
                      </td>
                    ) : valuesCount === 2 ? (
                      <>
                        {row?.values?.map((value, index) => (
                          <td
                            key={index}
                            className="p-4 text-center border-r border-[#19DB8C80]"
                          >
                            {value}
                          </td>
                        ))}
                        <td className="p-4 text-center border-r border-[#19DB8C80]"></td>
                      </>
                    ) : (
                      row?.values?.map((value, valueIndex) => (
                        <td
                          key={valueIndex}
                          className="p-4 text-center border-r border-[#19DB8C80]"
                        >
                          {value}
                        </td>
                      ))
                    )}
                  </tr>
                );
              })}
            </React.Fragment>
          ))}
          {/* Call-to-action Buttons */}
          {/* <tr>
            <td className="p-4 text-gray-600 font-medium border-r border-[#19DB8C80]"></td>
            {plans.map((_, index) => (
              <td
                key={index}
                className="p-4 text-center py-10 border-r border-[#19DB8C80] flex items-center justify-center"
              >
                <button className="bg-secondary text-white px-4 py-2 rounded-lg">
                  Learn More
                </button>
              </td>
            ))}
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default PricingTable;
