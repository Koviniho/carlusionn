/* eslint-disable react/prop-types */
import { useEffect, useMemo, useRef, useState } from "react";
import Icons from "../../../assets/icons";
import CustomInput from "../../Input/custoInput";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicleMakers } from "../../../store/features/vehicle/getVehicleMakersSlice";
import { fetchVehicleModels } from "../../../store/features/vehicle/getVehicleModelSlice";

const FilterSection = ({
  title,
  options = [],
  isSearchable = false,
  onChange,
}) => {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(true); // State to toggle visibility
  // const [filteredOptions, setFilteredOptions] = useState([]);
  // const filteredOptions = options.filter((option) =>
  //   option.toLowerCase().includes(search.toLowerCase())
  // );

  const filteredOptions = useMemo(() => {
    if (search.trim()) {
      return options.filter((option) =>
        String(option).toLowerCase().includes(search.toLowerCase())
      );
    } else {
      // Get 5 random options, ensuring same ones don't change every render
      return [...options].slice(0, 5);
    }
  }, [search, options]);

  const handleSelection = (option) => {
    setSelected(option);
    if (onChange) {
      onChange(option); // Notify parent component about the selection
    }
  };

  return (
    <div className="w-full py-4">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center pb-2"
      >
        <h3 className="font-medium">{title}</h3>
        {isOpen ? (
          <Icons.IoMdArrowDropdown className="w-5 h-5" />
        ) : (
          <Icons.IoMdArrowDropup className="w-5 h-5" />
        )}
      </div>
      {isOpen && (
        <>
          {isSearchable && (
            <CustomInput
              type="text"
              placeholder="Suchen"
              className="w-full border p-1 mt-2 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
          <div className="mt-2 space-y-2">
            {filteredOptions.map((option, index) => (
              <label
                key={index}
                className="flex items-center gap-2 text-xs text-darkBlue"
              >
                <input
                  type="radio"
                  name={title}
                  value={option}
                  checked={selected === option}
                  onChange={() => handleSelection(option)}
                />
                {option}
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
};



const RangeFilter = ({ title, min, max, step, unit, value, onChange }) => {
  const rangeRef = useRef(null);

  useEffect(() => {
    const rangeInput = rangeRef.current;
    if (!rangeInput) return;

    const updateBackground = () => {
      const percentage = ((value - min) / (max - min)) * 100;
      rangeInput.style.background = `linear-gradient(to right, #1E599B ${percentage}%, #D9D9D9 ${percentage}%)`;
    };

    rangeInput.addEventListener("input", updateBackground);
    updateBackground();

    return () => {
      rangeInput.removeEventListener("input", updateBackground);
    };
  }, [value, min, max]);

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    if (onChange) {
      onChange(newValue); // Notify parent
    }
  };

  return (
    <div className="py-4">
      <div className="flex justify-between items-center pb-2">
        <h3 className="font-medium">{title}</h3>
        <Icons.IoMdArrowDropdown className="w-4 h-4" />
      </div>
      <div className="flex flex-col items-end gap-2 mt-2">
        <input
          type="text"
          value={`${value}${unit}`}
          readOnly
          className="w-16 text-center border p-1 rounded text-xs"
        />
        <input
          type="range"
          ref={rangeRef}
          min={min}
          max={max}
          step={step}
          value={value} // Controlled component now
          onChange={handleChange}
          className="w-full mb-2"
        />
      </div>
      <div className="flex justify-between mb-4 text-xs font-normal text-grayText">
        <p>{`${min}${unit}`}</p>
        <p>{`${max}${unit}`}</p>
      </div>
    </div>
  );
};

const FilterComponent = ({ onFilterChange, selectedFilters = {} }) => {
  const dispatch = useDispatch();
  // const [selectedFilters, setSelectedFilters] = useState({});
  console.log("🚀 ~ FilterComponent ~ selectedFilters:", selectedFilters);

  // const handleSelection = (key, value) => {
  //   console.log("🚀 ~ handleSelection ~ value:", value);
  //   setSelectedFilters((prev) => {
  //     const updatedFilters = { ...prev, [key]: value };
  //     onFilterChange(updatedFilters);
  //     return updatedFilters;
  //   });
  // };
  useEffect(() => {
    setTempFilters(selectedFilters); // Sync with applied filters
  }, [selectedFilters]);
  const [tempFilters, setTempFilters] = useState({}); // Temporary state for range filters

  const handleSelection = (key, value) => {
    setTempFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    // setSelectedFilters(tempFilters);
    onFilterChange(tempFilters);
  };
  const resetFilters = () => {
    setTempFilters({});
    // setSelectedFilters({});
    onFilterChange({}); // Send empty filters to API
  };
  ////////////// // vehicleMakers////////////////
  useEffect(() => {
    dispatch(fetchVehicleMakers());
  }, [dispatch]);
  const { vehicleMakers } = useSelector(
    (state) => state?.allVehicleMakersSlice
  );
  ////////////////vehicleModels////////////////
  useEffect(() => {
    if (selectedFilters?.make) {
      dispatch(fetchVehicleModels({ make: selectedFilters?.make }));
    }
  }, [dispatch, selectedFilters?.make]);

  const { VehicleModels } = useSelector((state) => state?.allVehicleModelSlice);

const carBodyTypes = [
  "sedan",
  "hatchback",
  "suv",
  "crossover",
  "coupe",
  "convertible",
  "wagon",
  "pickup",
  "minivan",
  "van",
  "roadster",
  "sports car",
  "luxury sedan",
  "offroad",
  "microcar",
  "limousine",
  "jeep",
  "targa",
  "fastback",
  "shooting brake",
  "muscle car",
  "electric sedan",
  "electric suv",
  "kei car",
  "campervan",
  "bus",
  "station wagon",
  "ute",
  "dune buggy",
  "hearse",
  "fire truck",
  "police car",
  "armored vehicle"
];

  const fuelTypes = [
    "Petrol (Gasoline)",
    "Diesel",
    "Electric",
    "Hybrid (Petrol-Electric)",
    "Hybrid (Diesel-Electric)",
    "Plug-in Hybrid (PHEV)",
    "Hydrogen Fuel Cell",
    "CNG (Compressed Natural Gas)",
    "LPG (Liquefied Petroleum Gas)",
    "Ethanol (Flex Fuel / E85)",
    "Biodiesel",
    "Methanol",
    "Propane",
    "Synthetic Fuel (eFuel)",
    "Solar-Powered",
    "Hydrogen Internal Combustion",
    "Biogas",
  ];
  const carColors = [
    "Black",
    "White",
    "Gray",
    "Silver",
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Orange",
    "Brown",
    "Beige",
    "Purple",
    "Pink",
    "Gold",
    "Bronze",
    "Turquoise",
    "Violet",
    "Multicolor",
    "Champagne",
    "Burgundy",
    "Copper",
    "Graphite",
    "Charcoal",
    "Navy Blue",
    "Midnight Blue",
    "Sky Blue",
    "Lime Green",
    "Olive Green",
    "Mint Green",
    "Teal",
    "Rose",
    "Lavender",
    "Matte Black",
    "Matte Gray",
    "Matte Blue",
    "Matte Red",
    "Pearl White",
    "Chameleon",
    "Carbon Fiber",
    "Custom Color",
  ];
  const getYearsOfManufacture = () => {
    const startYear = 1886;
    const currentYear = new Date().getFullYear();
    return Array.from(
      { length: currentYear - startYear + 1 },
      (_, i) => startYear + i
    );
  };

  const yearsOfManufacture = getYearsOfManufacture();

  return (
    <div className="">
      <div className="grid grid-cols-4 gap-4 ">
        <FilterSection
          title="Marke"
          options={vehicleMakers?.data}
          isSearchable
          onChange={(value) => handleSelection("make", value)}
        />
        <FilterSection
          title="Model"
          options={VehicleModels?.data}
          isSearchable
          onChange={(value) => handleSelection("model", value)}
        />
        <FilterSection
          title="Aufbau"
          options={carBodyTypes}
          isSearchable
          onChange={(value) => handleSelection("bodyType", value)}
        />
        <FilterSection
          title="Treibstoff"
          options={fuelTypes}
          isSearchable
          onChange={(value) => handleSelection("fuel", value)}
        />
        <FilterSection
          title="Vehicle Color"
          options={carColors}
          isSearchable
          onChange={(value) => handleSelection("vehicleColor", value)}
        />
        <FilterSection
          title="Baujahr"
          options={yearsOfManufacture}
          isSearchable
          onChange={(value) => handleSelection("manufactureYear", value)}
        />
        {/* <RangeFilter
          title="Kilometerstand bis"
          min={100}
          max={10000}
          step={100}
          unit="km"
        /> */}
        <RangeFilter
          title="Kilometerstand bis"
          min={100}
          max={10000}
          step={100}
          unit="km"
          onChange={(value) => handleSelection("kilometer", value)}
          value={tempFilters.kilometer || 100}
        />
        <RangeFilter
          title="Preisspanne"
          min={100}
          max={100000}
          step={100}
          unit="$"
          onChange={(value) => handleSelection("price", value)}
          value={tempFilters.price || 500}
        />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={resetFilters}
          className="bg-white text-primary border border-primary hover:bg-primary hover:text-white px-6 py-2 rounded-lg"
        >
          Reset Filters
        </button>
        <button
          onClick={applyFilters}
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-white hover:text-primary hover:border-primary border"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
