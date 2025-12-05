/* eslint-disable react/prop-types */
// import { useState } from "react";

// const WebsiteIdentity = () => {
//   const [logo, setLogo] = useState(null);
//   // const [favicon, setFavicon] = useState(null);

//   const handleLogoUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setLogo(URL.createObjectURL(file));
//     }
//   };

//   // const handleFaviconUpload = (event) => {
//   //   const file = event.target.files[0];
//   //   if (file) {
//   //     setFavicon(URL.createObjectURL(file));
//   //   }
//   // };

//   return (
//     <div className="bg-white p-6 rounded-[10px] shadow-lg w-full my-4 text-darkBlue">
//       <h2 className="text-lg font-semibold mb-4 ">Website Identity</h2>
//       <div className="mb-4 grid grid-cols-4 items-center">
//         <label className=" font-medium ">Site Title</label>
//         <input
//           type="text"
//           placeholder="My Website"
//           className="col-span-2 p-2  border rounded mt-1 text-xs"
//         />
//       </div>
//       <div className="mb-4 grid grid-cols-4 items-center">
//         <label className=" font-medium ">Tagline</label>
//         <div className="col-span-2">
//           <input
//             type="text"
//             className="w-full p-2  border rounded mt-1 text-xs"
//           />
//           <p className="text-sm text-gray-500 mt-1">
//             In a few words, explain what this site is about. Example: &quot;Just
//             another website.&quot;
//           </p>
//         </div>
//       </div>

//       <div className="mb-4 grid grid-cols-4  items-start mt-8">
//         <label className="block font-medium ">Logo Upload</label>
//         <div className="col-span-2">
//           <button className="text-left ">
//             <label className="bg-primary text-white px-4 py-2 rounded cursor-pointer">
//               Choose Icon
//               <input
//                 type="file"
//                 className="hidden"
//                 onChange={handleLogoUpload}
//               />
//             </label>
//             {logo && (
//               <img
//                 src={logo}
//                 alt="Logo"
//                 className="h-8 w-16 object-cover  rounded-md inline-block ml-4"
//               />
//             )}
//           </button>
//           <p className="text-sm text-gray-500 mb-4 mt-2">
//             The site icon is what you see in browser tabs etc. It should be
//             square and at least 512 x 512 pixels.
//           </p>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default WebsiteIdentity;

import { Field } from "formik";

const WebsiteIdentity = ({ setFieldValue,setUploadImages,setLogo,myLogo,allURLs,setAllURLs }) => {


  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const updatedURLs = allURLs?.filter(item => item.category !== "logo");
      console.log("🚀 ~ handleLogoUpload ~ updatedURLs:", updatedURLs)
      setAllURLs(updatedURLs);
  
      // Add the new logo to uploadImages state
      // setUploadImages(prev => [...prev, file]);
      setLogo(url);
      setFieldValue("logo", file);
      setUploadImages([file]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-[10px] shadow-lg w-full my-4 text-darkBlue">
      <h2 className="text-lg font-semibold mb-4">Website Identity</h2>
      <div className="mb-4 grid grid-cols-4 items-center">
        <label className="font-medium">Site Title</label>
        <Field
          name="siteTitle"
          type="text"
          placeholder="My Website"
          className="col-span-2 p-2 border rounded mt-1 text-xs"
        />
      </div>
      <div className="mb-8 grid grid-cols-4 items-center">
        <label className="font-medium">Tagline</label>
        <div className="col-span-2">
          <Field
            name="tagline"
            type="text"
            placeholder="Just another website"
            className="w-full p-2 border rounded mt-1 text-xs"
          />
        </div>
      </div>
      <div className="mb-4  grid grid-cols-4 items-start">
        <label className="font-medium">Logo Upload</label>
        <div className="col-span-3">
          <div className="flex items-center ">
            <label className="bg-primary text-white px-4 py-2 rounded cursor-pointer">
              Choose Icon
              <input
                type="file"
                className="hidden"
                onChange={handleLogoUpload}
              />
            </label>

            {myLogo && (
              <img
                src={myLogo}
                alt="Logo"
                className="h-24 w-24 object-contain rounded-md ml-4"
              />
            )}
          </div>
      <p className="text-sm text-gray-500 mb-4 mt-2">
        The site icon is what you see in browser tabs etc. It should be square
        and at least 512 x 512 pixels.
      </p>
        </div>
      </div>
    </div>
  );
};

export default WebsiteIdentity;
