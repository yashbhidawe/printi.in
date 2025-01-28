import React, { useContext } from "react";
import MyContext from "../../context/data/MyContext.jsx";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";

function Filter() {
  const context = useContext(MyContext);
  const {
    mode,
    searchKey,
    setSearchKey,
    filterType,
    setFilterType,
    product,
    resetFilters,
  } = context;

  const uniqueCategories = [...new Set(product.map((item) => item.category))];
  const isDark = mode === "dark";

  return (
    <div className="container mx-auto px-4 mt-3 mb-4">
      <div
        className={`rounded-md ${
          isDark ? "bg-primary" : "bg-bgLight"
        } shadow-sm border border-bgSecondary`}
      >
        <div className="p-3">
          <div className="flex flex-wrap items-center gap-3">
            {/* Left side - Title and Reset */}
            <div className="flex items-center gap-2 min-w-fit">
              <SlidersHorizontal
                className={`h-4 w-4 ${
                  isDark ? "text-textLight" : "text-primary"
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  isDark ? "text-textLight" : "text-primary"
                }`}
              >
                Filters
              </span>
              <button
                onClick={resetFilters}
                className={`flex items-center gap-1 px-2 py-1 rounded text-xs
                  ${
                    isDark
                      ? "bg-primaryLight hover:bg-accent text-textLight"
                      : "bg-bgSecondary hover:bg-accent hover:text-textLight text-primary"
                  }
                  transition-colors duration-200`}
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
            </div>

            {/* Right side - Filter Controls */}
            <div className="flex flex-1 flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  className={`w-full pl-8 pr-3 py-1.5 text-sm rounded border 
                    ${
                      isDark
                        ? "bg-primaryLight border-primaryLight text-textLight placeholder-textLight/70"
                        : "bg-white border-bgSecondary text-textDark placeholder-textDark/60"
                    }
                    focus:outline-none focus:ring-1 focus:ring-accent`}
                />
                <Search
                  className={`h-3.5 w-3.5 absolute left-2.5 top-2 
                  ${isDark ? "text-textLight/70" : "text-primary/60"}`}
                />
              </div>

              {/* Category Select */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className={`text-sm px-3 py-1.5 rounded border min-w-[150px]
                  ${
                    isDark
                      ? "bg-primaryLight border-primaryLight text-textLight"
                      : "bg-white border-bgSecondary text-textDark"
                  }
                  focus:outline-none focus:ring-1 focus:ring-accent`}
              >
                <option value="all">All Categories</option>
                {uniqueCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
