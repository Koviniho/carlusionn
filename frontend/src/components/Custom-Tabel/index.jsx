/* eslint-disable react/prop-types */
import { useLayoutEffect, useRef, useState } from "react";

export default function CustomTable({ TableHeader, TableBody, data }) {
  
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedData, setSelectedData] = useState([]);

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedData?.length > 0 && selectedData?.length < data?.length;
    setChecked(selectedData?.length === data?.length);
    setIndeterminate(isIndeterminate);
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedData, data?.length]);

  function toggleAll() {
    if (checked || indeterminate) {
      setSelectedData([]);
    } else {
      setSelectedData(data);
    }
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  function handleDataSelect(item, isSelected) {
    setSelectedData((prevSelectedData) =>
      isSelected
        ? [...prevSelectedData, item]
        : prevSelectedData.filter((p) => p !== item)
    );
  }

  return (
    <div className="flow-root w-full overflow-auto">
      <div className="overflow-x-auto  ">
        <div className="inline-block min-w-full py-2 align-middle  ">
          <div className="  border-gray-200 ">
            <table className="min-w-full overflow-x-auto text-sm sm:text-base border-collapse border-none">
              <TableHeader
                checkboxRef={checkbox}
                checked={checked}
                onToggleAll={toggleAll}
              />
              <TableBody
                data={data}
                selectedData={selectedData}
                onDataSelect={handleDataSelect}
              />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
