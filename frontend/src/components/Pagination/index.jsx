/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */

// import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

// const Pagination = ({
//   currentPage,
//   totalCount, // Updated to align with your backend data
//   itemsPerPage,
//   onPageChange,
//   handleItemsPerPageChange,
// }) => {
//   // Calculate total pages based on total count and items per page
//   const totalPages = Math.ceil(totalCount / itemsPerPage);

//   // Handle page change
//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       onPageChange(page);
//     }
//   };

//   // Generate page numbers for navigation
//   const pageNumbers = [];
//   const maxPagesToShow = 10;
//   const ellipse = "...";
//   if (totalPages <= maxPagesToShow) {
//     for (let i = 1; i <= totalPages; i++) {
//       pageNumbers.push(i);
//     }
//   } else {
//     const halfPagesToShow = Math.floor(maxPagesToShow / 2);
//     let startPage = currentPage - halfPagesToShow;
//     let endPage = currentPage + halfPagesToShow;

//     if (startPage <= 0) {
//       startPage = 1;
//       endPage = maxPagesToShow;
//     }
//     if (endPage > totalPages) {
//       endPage = totalPages;
//       startPage = totalPages - maxPagesToShow + 1;
//     }

//     if (startPage > 1) {
//       pageNumbers.push(1);
//       if (startPage > 2) {
//         pageNumbers.push(ellipse);
//       }
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i);
//     }

//     if (endPage < totalPages) {
//       if (endPage < totalPages - 1) {
//         pageNumbers.push(ellipse);
//       }
//       pageNumbers.push(totalPages);
//     }
//   }

//   const startEntry = (currentPage - 1) * itemsPerPage + 1;
//   const endEntry = Math.min(currentPage * itemsPerPage, totalCount);

//   return (
//     <div>
//       <div className="flex items-center gap-x-3 justify-end text-[#282F5A] text-[14px] py-4 px-1">
//         <div className="flex items-center space-x-2">
//           <p className="font-medium text-[14px]">Results Per Page</p>
//           <select
//             id="items-per-page"
//             value={itemsPerPage}
//             onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
//             className="border border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-[#282F5A]"
//           >
//             {[10, 20, 30, 50].map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="flex items-center space-x-2 font-regular">
//           <span className="font-medium">
//             {totalCount > 0 ? `${startEntry} - ${endEntry}` : "0"}
//           </span>
//           <span>of</span>
//           <span className="font-medium">{totalCount}</span>
//           <span> entries</span>
//         </div>
//         <button
//           className="cursor-pointer disabled:cursor-not-allowed"
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           <FaChevronLeft />
//         </button>
//         <div className="flex items-center space-x-1">
//           {pageNumbers.map((number, index) =>
//             number === ellipse ? (
//               <span key={index} className="text-gray-500">
//                 {/* {number} */}
//               </span>
//             ) : (
//               <button
//                 key={number}
//                 className={` ${number === currentPage ? "" : ""}`}
//                 onClick={() => handlePageChange(number)}
//               >
//                 {/* {currentPage} */}
//               </button>
//             )
//           )}
//         </div>
//         <button
//           className="cursor-pointer disabled:cursor-not-allowed"
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           <FaChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;



import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const Pagination = ({
  currentPage,
  totalCount,
  itemsPerPage,
  onPageChange,
  handleItemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const startEntry = (currentPage - 1) * itemsPerPage + 1;
  const endEntry = Math.min(currentPage * itemsPerPage, totalCount);

  return (
    <div className="flex items-center gap-x-3 justify-end text-[#282F5A] text-[14px] py-4 px-1">
      {/* Results per page dropdown */}
      <div className="flex items-center space-x-2">
        <p className="font-medium text-[14px]">Results Per Page</p>
        <select
          value={itemsPerPage}
          onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          className="border border-gray-300 rounded-md px-2 py-1 bg-white outline-none "
        >
          {[10, 20, 30, 50].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Entries Display */}
      <div className="flex items-center space-x-2 font-regular">
        <span className="font-medium">
          {totalCount > 0 ? `${startEntry} - ${endEntry}` : "0"}
        </span>
        <span>of</span>
        <span className="font-medium">{totalCount}</span>
        <span>entries</span>
      </div>

      {/* Previous Button */}
      <button
        className="cursor-pointer disabled:cursor-not-allowed"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaChevronLeft />
      </button>

      {/* Page Number Display */}
      <span className="px">{currentPage} / {totalPages}</span>

      {/* Next Button */}
      <button
        className="cursor-pointer disabled:cursor-not-allowed"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
