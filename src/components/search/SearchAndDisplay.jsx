import React, { useContext, useState, useEffect, useRef } from "react";
import MyContext from "../../context/data/MyContext.jsx";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

function SearchAndDisplay() {
  const { mode, product } = useContext(MyContext);
  const navigate = useNavigate();
  const [searchKey, setSearchKey] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  // Debounced search results
  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchKey) {
        const results = product
          .filter((item) =>
            item.title.toLowerCase().includes(searchKey.toLowerCase())
          )
          .slice(0, 8); // Limit results to 8 items
        setFilteredItems(results);
      } else {
        setFilteredItems([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchKey, product]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemClick = (id) => {
    navigate(`/productinfo/${id}`);
    setSearchKey("");
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Search className="w-4 h-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchKey}
          onChange={(e) => {
            setSearchKey(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search products..."
          className={`w-full pl-10 pr-10 py-2 rounded-lg text-sm transition-all
            ${
              mode === "dark"
                ? "bg-gray-800 text-white placeholder-gray-400 border-gray-700"
                : "bg-white text-gray-900 placeholder-gray-500 border-gray-200"
            }
            border focus:outline-none focus:ring-2 focus:ring-primary/50`}
        />
        {searchKey && (
          <button
            onClick={() => {
              setSearchKey("");
              setFilteredItems([]);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {isOpen && searchKey && (
        <div
          className={`absolute mt-2 w-full rounded-lg shadow-lg overflow-hidden border
            ${
              mode === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }
          `}
        >
          {filteredItems.length > 0 ? (
            <ul className="py-2">
              {filteredItems.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`px-4 py-2 cursor-pointer transition-colors
                    ${
                      mode === "dark"
                        ? "hover:bg-gray-700 text-gray-200"
                        : "hover:bg-gray-50 text-gray-700"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div
              className={`px-4 py-3 text-sm
                ${mode === "dark" ? "text-gray-400" : "text-gray-500"}
              `}
            >
              No products found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchAndDisplay;
