import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search } from "lucide-react";

const SearchInput = ({
  placeholder = "Search doctors, clinics...",
  buttonText = "Search",
  showButton = true,
  className = "",
}) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const trimmedKeyword = keyword.trim();
    const params = new URLSearchParams();

    if (trimmedKeyword) {
      params.set("keyword", trimmedKeyword);
    }

    const query = params.toString();

    navigate({
      pathname: "/providers",
      search: query ? `?${query}` : "",
    });
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`w-full max-w-xl flex items-center gap-4 ${className}`}
    >
      <div className="relative flex-1">
        <Search
          size={20}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          placeholder={placeholder}
          className="w-full rounded-xl border border-gray-300 bg-white/90 py-4 pl-12 pr-5 text-gray-700 outline-none placeholder:text-gray-400"
        />
      </div>

      {showButton && (
        <button
          type="submit"
          className="rounded-xl bg-main px-8 py-4 font-medium text-white transition-all duration-300 hover:bg-sec"
        >
          {buttonText}
        </button>
      )}
    </form>
  );
};

export default SearchInput;
