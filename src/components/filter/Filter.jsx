import React, { useContext } from "react";
import MyContext from "../../context/data/MyContext.jsx"; // Ensure exact case match
function Filter() {
  const context = useContext(MyContext);
  const {
    mode,
    searchKey,
    setSearchKey,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice,
    product,
    resetFilters,
  } = context;
  return (
    <div className=" container mx-auto px-4 mt-5 ">
      <div
        className="p-5 rounded-lg bg-gray-100 drop-shadow-xl border border-gray-200
"
        style={{
          backgroundColor: mode === "dark" ? "#282c34" : "",
          color: mode === "dark" ? "white" : "",
        }}
      >
        <div className="relative"></div>
        <div className="flex items-center justify-between mt-4">
          <p className="font-medium">Filters</p>
          <button
            className="px-4 py-2 hover:bg-primaryLight bg-primary text-white text-sm font-medium rounded-md"
            style={{ color: mode === "dark" ? "white" : "" }}
            onClick={resetFilters}
          >
            Reset Filter
          </button>
        </div>
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0 focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              style={{
                backgroundColor: mode === "dark" ? "rgb(64 66 70)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              {product.map((item, index) => {
                return (
                  <option value={item.category} key={index}>
                    {item.category}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
