/* eslint-disable react/prop-types */


import Button from "../../Button";
import CustomInput from "../../Input/custoInput";
import Select from "react-select";

const LeasingContractForm = ({
  financingFields,
  fields,
  formik,
  setcontractId,
  setcustomerNameId,
  setCarModelId,
  countractIDOption,
  customerNameOption,
  customerOptions,
  vehicleOptions,
  setSearchInput,
  searchInput,
}) => {

  return (
    <div className="grid grid-cols-1 gap-4">
      {fields.map((field) =>
        field.name === "vehicle" || field.name === "customerName" ? (
          <div key={field.name}>
            <label className="block text-base font-medium text-darkBlue">
              {field.label}
            </label>
            <Select
              options={
                searchInput.length > 0
                  ? field.name === "vehicle"
                    ? vehicleOptions
                    : customerOptions
                  : []
              } // Disable options when empty
              placeholder={`Search ${field.label}`}
              value={vehicleOptions?.find(
                (option) => option.value === formik.values[field.name]
              )}
              onInputChange={(input) => setSearchInput(input)} // Update search input state
              onChange={(selectedOption) => {
                formik.setFieldValue(field.name, selectedOption.value);

                if (field.name === "vehicle") {
                  setCarModelId(selectedOption.id);
                } else if (field.name === "customerName") {
                  setcustomerNameId(selectedOption.id);
                }
              }}
              onBlur={() => formik.setFieldTouched(field.name, true)}
              className="mt-1"
              isSearchable
              noOptionsMessage={() =>
                searchInput.length === 0
                  ? "Start typing to search"
                  : "No results found"
              } // Custom message
            />
            {formik.touched[field.name] && formik.errors[field.name] && (
              <p className="text-red-500 text-sm">
                {formik.errors[field.name]}
              </p>
            )}
          </div>
        ) : (
          <CustomInput
            key={field.name}
            type={field.type}
            name={field.name}
            label={field.label}
            value={formik.values[field.name]}
            onChange={(e) => {
              formik.handleChange(e);
              const { name, value } = e.target;

              if (name === "contractId") {
                const selectedOption = countractIDOption.find(
                  (option) => option.value === value
                );
                setcontractId(selectedOption ? selectedOption.id : null);
              } else if (name === "customerName") {
                const selectedOption = customerNameOption.find(
                  (option) => option.value === value
                );
                setcustomerNameId(selectedOption ? selectedOption.id : null);
              }
            }}
            onBlur={formik.handleBlur}
            error={formik.errors[field.name]}
            touched={formik.touched[field.name]}
            options={field?.options || []}
          />
        )
      )}

      <h2 className=" text-xl font-medium pt-4 ">Financing</h2>
      {financingFields?.slice(0, 6).map((field) => (
        <CustomInput
          key={field.name}
          type={field.type}
          name={field.name}
          label={field.label}
          value={formik.values[field.name]}
          placeholder={field.placeholder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors[field.name]}
          touched={formik.touched[field.name]}
          options={field?.options || []}
        />
      ))}
      <h2 className=" text-xl font-medium pt-4 ">Additional</h2>
      {financingFields?.slice(6).map((field) => (
        <CustomInput
          key={field.name}
          type={field.type}
          name={field.name}
          label={field.label}
          value={formik.values[field.name]}
          placeholder={field.placeholder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors[field.name]}
          touched={formik.touched[field.name]}
          options={field?.options || []}
        />
      ))}

      {/*       
      <h2 className="text-gray-600 font-semibold mb-2">Fahrzeug-Merkmale</h2>
      <div className="mb-4">
        <h3 className="text-gray-500 text-sm font-medium mb-1">
          Fahrzeug-Merkmale
        </h3>
        <div className="space-y-2">
          {vehicleAttributes.map((field) => (
            <CustomInput
              key={field.name}
              type={field.type}
              name={field.name}
              label={field.label}
              value={checkedItems[field.name] ? "" : undefined} // Bind only when checked
              onChange={(e) => handleCheckboxChange(e)}
              disabled={field.type === "text" && !checkedItems[field.name]} // Disable if checkbox not checked
            />
          ))}
        </div>
      </div>

    
      <h3 className="text-gray-500 text-sm font-medium mb-1">
        Vertragsabschluss
      </h3>
      <div className="space-y-2">
        {contractAttributes.map((field) => (
          <CustomInput
            key={field.name}
            type="checkbox"
            name={field.name}
            label={field.label}
            checked={checkedItems[field.name] || false}
            onChange={(e) => handleCheckboxChange(e)}
          />
        ))}
      </div>
    */}

      <div>
        <Button
          type="submit"
          text="Create A Lease Agreement"
          className="w-full"
          borderRadius="rounded-md"
          textColor="white"
        />
      </div>
    </div>
  );
};

export default LeasingContractForm;
