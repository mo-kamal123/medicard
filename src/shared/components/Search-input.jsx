import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search } from "lucide-react";

const SearchInput = ({
  placeholder,
  buttonText,
  showButton = true,
  className = "",
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const ph = placeholder || t("search.placeholder");
  const btnText = buttonText || t("search.button");

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
      className={`w-full max-w-xl flex flex-col flex-row items-stretch sm:items-center gap-2 sm:gap-4 ${className}`}
    >
      <div className="relative flex-1">
        <Search
          size={18}
          className="pointer-events-none absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          placeholder={ph}
          className="w-full rounded-xl border border-gray-300 bg-white/90 py-3 md:py-4 pl-10 md:pl-12 pr-4 md:pr-5 text-sm md:text-base text-gray-700 outline-none placeholder:text-gray-400"
        />
      </div>

      {showButton && (
        <button
          type="submit"
          className="rounded-xl bg-main px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-medium text-white transition-all duration-300 hover:bg-sec"
        >
          {btnText}
        </button>
      )}
    </form>
  );
};

export default SearchInput;
