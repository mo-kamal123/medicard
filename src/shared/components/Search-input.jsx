import { Search } from "lucide-react";
import React from "react";

const SearchInput = ({
  placeholder = "Search doctors, clinics...",
  buttonText = "Search",
}) => {
  return (
    <div className="w-full max-w-xl flex items-center gap-5">
      <div className="relative flex-1">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder={placeholder}
          className="w-full pl-12 pr-5 py-4 outline-none text-gray-700 bg-white/90 rounded-xl border border-gray-300 placeholder:text-gray-400"
        />
      </div>

      <button className="px-8 py-4 bg-main text-white font-medium hover:bg-sec transition-all duration-300 rounded-xl">
        {buttonText}
      </button>
    </div>
  );
};

export default SearchInput;