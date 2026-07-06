import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useTranslation } from "react-i18next";
import { Globe, Globe2 } from "lucide-react";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

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
    // We'll let the router update the URL/hash first, then scroll.
    // HomePage also listens to `location.hash` and will scroll on mount.
    e.preventDefault();
    navigate({ pathname: "/", hash });

    // If we're already on Home, do an immediate best-effort scroll too.
    if (location.pathname === "/") {
      window.requestAnimationFrame(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Medicard"
            className="w-42 h-auto object-contain"
          />
        </Link>

        <nav className="flex items-center gap-6 ml-5">
          {navLinks.map((link) => (
            <Link
              key={link.hash}
              to={{ pathname: "/", hash: link.hash }}
              onClick={onNavClick(link.hash)}
              className="text-sm font-medium transition-colors text-gray-700 hover:text-main"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/medicard-activation")}
          className="px-5 py-2 text-sm font-medium text-main border border-main rounded-lg hover:bg-blue-50 transition"
        >
          Activate Card
        </button>

        <button
          onClick={() => navigate("/buy-card")}
          className="px-5 py-2 text-sm font-medium text-white bg-main rounded-lg hover:bg-sec transition"
        >
          Buy Card
        </button>

        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 text-gray-700 hover:text-sec transition-colors duration-300"
        >
          <Globe />
          <span className="text-sm font-medium">{currentLang}</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
