/* eslint-disable react/prop-types */


const SearchBar = ({handleSearch,searchTerm}) => {


  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearch}
      placeholder="Search vehicles..."
      className="border border-gray-300 p-2  rounded-md outline-none"
    />
  );
};

export default SearchBar;
