import React from "react";

const   SearchInput = ({
  placeholder = "Search doctors, clinics...",
  buttonText = "Search",
}) => {
  return (
    <div className="w-full max-w-xl flex items-center gap-5 overflow-hidden  border border-white/20">
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 px-5 py-4 outline-none text-gray-700 bg-white/90 bg-transparent rounded-xl"
      />

      <button className="px-6 py-4 bg-main text-white font-medium hover:bg-main/90 transition-all duration-300 rounded-xl">
        {buttonText}
      </button>
    </div>
  );
};

export default SearchInput;