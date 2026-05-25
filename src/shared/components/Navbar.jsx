import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo.svg";
import { useTranslation } from "react-i18next";
const Navbar = () => {
  const [lang, setLang] = useState("en");
  const { t } = useTranslation();
  // Dynamic nav links
  const navLinks = [
    { name: t("navbar.serviceProviders"), path: "/" },
    { name: t("navbar.why"), path: "/doctors" },
    { name: t("navbar.offers"), path: "/about" },
    { name: t("navbar.contact"), path: "/contact" },
  ];

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b bg-white shadow-sm">
      {/* Left Side */}
      <div className="flex items-center gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Medicard "
            className="w-32 h-auto object-contain"
          />
        </Link>

        {/* Dynamic Links */}
        <nav
          className="flex items-center gap-6 ml-5"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-main" : "text-gray-700 hover:text-main"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Buttons */}
        <button className="px-5 py-2 text-sm font-medium text-main border border-main rounded-lg hover:bg-blue-50 transition">
          Activate Card
        </button>

        <button className="px-5 py-2 text-sm font-medium text-white bg-main rounded-lg hover:bg-blue-700 transition">
          Buy Card
        </button>
        {/* Language Dropdown */}
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="px-3 py-2 text-sm border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="en">EN</option>
          <option value="ar">AR</option>
        </select>
      </div>
    </header>
  );
};

export default Navbar;
