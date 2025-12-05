// const ContactInfo = () => {
//   return (
//     <div className="bg-white p-6 rounded-[10px] shadow-lg w-full my-4 text-darkBlue">
//       <h2 className="text-lg font-semibold mb-4 ">Contact Information</h2>
//       <div className="mb-4 grid grid-cols-4 items-center">
//         <label className=" font-medium ">Phone Number</label>
//         <input
//           type="text"
//         //   placeholder="My Website"
//           className="col-span-2 p-2  border rounded mt-1 text-xs"
//         />
//       </div>
//       <div className="mb-4 grid grid-cols-4 items-center">
//         <label className=" font-medium ">Email Address</label>
//         <div className="col-span-2">
//           <input
//             type="text"
//             //   placeholder="My Website"
//             className="w-full p-2  border rounded mt-1 text-xs"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactInfo;



import { Field } from "formik";

const ContactInfo = () => {
  return (
    <div className="bg-white p-6 rounded-[10px] shadow-lg w-full my-4 text-darkBlue">
      <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
      <div className="mb-4 grid grid-cols-4 items-center">
        <label className="font-medium">Phone Number</label>
        <Field
          name="phoneNumber"
          type="text"
          className="col-span-2 p-2 border rounded mt-1 text-xs"
        />
      </div>
      <div className="mb-4 grid grid-cols-4 items-center">
        <label className="font-medium">Email Address</label>
        <Field
          name="email"
          type="email"
          className="col-span-2 p-2 border rounded mt-1 text-xs"
        />
      </div>
    </div>
  );
};

export default ContactInfo;
