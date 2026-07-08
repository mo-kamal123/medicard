import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useTranslation } from "react-i18next";
import { Globe, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 80 && currentY > lastScrollY.current) {
        setHidden(true);
      } else if (currentY < lastScrollY.current) {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentLang = i18n.language === "ar" ? "AR" : "EN";

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { name: t("navbar.serviceProviders"), hash: "#service-providers" },
    { name: t("navbar.why"), hash: "#why" },
    { name: t("navbar.offers"), hash: "#offers" },
    { name: t("navbar.contact"), hash: "#contact" },
  ];

  const onNavClick = (hash) => (e) => {
    e.preventDefault();
    setMobileOpen(false);
    navigate({ pathname: "/", hash });
  };

  return (
    <>
      <header className={`sticky top-0 grid grid-cols-3 items-center px-4 md:px-8 py-4 bg-white shadow-md z-50 transition-transform duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}>
        <Link to="/" className="flex items-center shrink-0 justify-self-start">
          <img
            src={logo}
            alt="Medicard"
            className="w-32 md:w-42 h-auto object-contain"
          />
        </Link>

        <nav className="hidden lg:flex items-center justify-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.hash}
              to={{ pathname: "/", hash: link.hash }}
              onClick={onNavClick(link.hash)}
              className="text-sm font-medium transition-colors text-gray-700 hover:text-main whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-2 md:gap-4">
          <button
            onClick={() => navigate("/medicard-activation")}
            className="hidden sm:inline-block px-4 md:px-5 py-2 text-sm font-medium text-main border border-main rounded-lg hover:bg-blue-50 transition whitespace-nowrap"
          >
            Activate Card
          </button>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 md:gap-2 text-gray-700 hover:text-sec transition-colors duration-300"
          >
            <Globe size={18} />
            <span className="text-sm font-medium">{currentLang}</span>
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-main"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav
          className={`absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg lg:hidden flex flex-col p-4 gap-3 z-50 transition-all duration-300 ${
            mobileOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.hash}
              to={{ pathname: "/", hash: link.hash }}
              onClick={onNavClick(link.hash)}
              className="text-sm font-medium text-gray-700 hover:text-main py-2"
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => { navigate("/medicard-activation"); setMobileOpen(false); }}
            className="sm:hidden w-full px-4 py-2 text-sm font-medium text-main border border-main rounded-lg hover:bg-blue-50 transition"
          >
            Activate Card
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />
    </>
  );
};

export default Navbar;
