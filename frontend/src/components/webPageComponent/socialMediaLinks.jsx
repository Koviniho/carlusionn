// const SocialMediaLinks = () => {
//     return (
//       <div className="bg-white p-6 rounded-[10px] shadow-lg w-full my-4 text-darkBlue">
//         <h2 className="text-lg font-semibold mb-4 ">Contact Information</h2>
//         <div className="mb-4 grid grid-cols-4 items-center">
//           <label className=" font-medium ">Google URL</label>
//           <input
//             type="text"
//             // placeholder="My Website"
//             className="col-span-2 p-2  border rounded mt-1 text-xs"
//           />
//         </div>
//         <div className="mb-4 grid grid-cols-4 items-center">
//           <label className=" font-medium ">Facebook URL</label>
//           <div className="col-span-2">
//             <input
//               type="text"
//               //   placeholder="My Website"
//               className="w-full p-2  border rounded mt-1 text-xs"
//             />
//           </div>
//         </div>
//         <div className="mb-4 grid grid-cols-4 items-center">
//           <label className=" font-medium ">Instagram URL</label>
//           <input
//             type="text"
//             // placeholder="My Website"
//             className="col-span-2 p-2  border rounded mt-1 text-xs"
//           />
//         </div>
//         <div className="mb-4 grid grid-cols-4 items-center">
//           <label className=" font-medium ">Youtube URL</label>
//           <div className="col-span-2">
//             <input
//               type="text"
//               //   placeholder="My Website"
//               className="w-full p-2  border rounded mt-1 text-xs"
//             />
//           </div>
//         </div>
//         <div className="mb-4 grid grid-cols-4 items-center">
//           <label className=" font-medium ">Twitter URL</label>
//           <input
//             type="text"
//             // placeholder="My Website"
//             className="col-span-2 p-2  border rounded mt-1 text-xs"
//           />
//         </div>
      
//       </div>
//     );
//   };
  
//   export default SocialMediaLinks;
  




import { Field } from "formik";

const SocialMediaLinks = () => {
  return (
    <div className="bg-white p-6 rounded-[10px] shadow-lg w-full my-4 text-darkBlue">
      <h2 className="text-lg font-semibold mb-4">Social Media Links</h2>
      <div className="mb-4 grid grid-cols-4 items-center">
        <label className="font-medium">Google URL</label>
        <Field name="googleUrl" type="text" className="col-span-2 p-2 border rounded mt-1 text-xs" />
      </div>
      <div className="mb-4 grid grid-cols-4 items-center">
        <label className="font-medium">Facebook URL</label>
        <Field name="facebookUrl" type="text" className="col-span-2 p-2 border rounded mt-1 text-xs" />
      </div>
      <div className="mb-4 grid grid-cols-4 items-center">
        <label className="font-medium">Instagram URL</label>
        <Field name="instagramUrl" type="text" className="col-span-2 p-2 border rounded mt-1 text-xs" />
      </div>
      <div className="mb-4 grid grid-cols-4 items-center">
        <label className="font-medium">Youtube URL</label>
        <Field name="youtubeUrl" type="text" className="col-span-2 p-2 border rounded mt-1 text-xs" />
      </div>
      <div className="mb-4 grid grid-cols-4 items-center">
        <label className="font-medium">Twitter URL</label>
        <Field name="twitterUrl" type="text" className="col-span-2 p-2 border rounded mt-1 text-xs" />
      </div>
    </div>
  );
};

export default SocialMediaLinks;
