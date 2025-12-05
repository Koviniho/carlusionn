/* eslint-disable react/prop-types */





import CustomInput from "../../../../Input/custoInput";


const RightInfo = ({ formik }) => {
  return (
    <div className="space-y-4">
      <section>
        <div className="flex justify-between items-center">
          <label className="font-semibold text-darkBlue">Notes</label>
          {/* <FaPlus className="text-secondary cursor-pointer" size={12} /> */}
        </div>
        <CustomInput
          type="textarea"
          name="notes"
          placeholder="Add notes or reminders..."
          value={formik.values.notes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.notes}
          touched={formik.touched.notes}
        />
      </section>

      <section>
        <div className="flex justify-between items-center">
          <label className="font-semibold text-darkBlue">Tasks</label>
          {/* <FaPlus className="text-secondary cursor-pointer" size={12} /> */}
        </div>
        <CustomInput
          type="textarea"
          name="tasks"
          placeholder="Add tasks or to-dos..."
          value={formik.values.tasks}
          onChange={formik.handleChange}

          onBlur={formik.handleBlur}
          error={formik.errors.tasks}
          touched={formik.touched.tasks}
        />
      </section>
    </div>
  );
};

export default RightInfo;
