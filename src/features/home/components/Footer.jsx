import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../../assets/logo-light.svg";
import googlePlay from "../../../assets/google-play.svg";
import appStore from "../../../assets/app-store.svg";

const Footer = ({ categories = [], contactUs = null }) => {
  const { t } = useTranslation();

  const contactItems = contactUs?.contactItems || [];
  const phoneItem = contactItems.find((item) => item.type === "phone");
  const emailItem = contactItems.find((item) => item.type === "email");

  const columns = [
    {
      title: t("footer.services.title"),
      isCategories: true,
      items: categories.map((cat) => ({
        label: cat.name,
        to: `/providers?categoryId=${cat.id}`,
      })),
    },
    // {
    //   title: t("footer.membership.title"),
    //   items: [
    //     { label: t("footer.membership.items.0"), to: "#" },
    //     { label: t("footer.membership.items.1"), to: "#" },
    //   ],
    // },
    {
      title: t("footer.company.title"),
      items: [
        { label: t("footer.company.items.0"), to: "/terms-and-conditions" },
        { label: t("footer.company.items.1"), to: "/privacy-policy" },
        { label: t("footer.company.items.2"), to: "/refund-policy" },
      ],
    },
  ];

  return (
    <footer className="mt-16 bg-sec text-white">
      <div className="w-[90%] m-auto px-4 md:px-6 lg:px-0 py-10 md:py-14">
        <div className="grid gap-8 md:gap-12 grid-cols-1 sm:grid-cols-3">
          <div className="sm:col-span-1 flex flex-col sm:items-start sm:justify-between gap-6">
            <div className="flex-1">
              <img src={logo} alt="Medicard" className="h-8 md:h-10 w-auto" />
              <p className="mt-4 md:mt-5 text-sm leading-6 text-white/80 max-w-sm">
                {t("footer.description")}
              </p>
            </div>

            <div className="flex items-center gap-3 md:gap-4 shrink-0 mt-2 sm:mt-0">
              <a href="#" className="inline-flex">
                <img
                  src={googlePlay}
                  alt="Get it on Google Play"
                  className="h-8 md:h-10 w-auto"
                />
              </a>
              <a href="#" className="inline-flex">
                <img
                  src={appStore}
                  alt="Download on the App Store"
                  className="h-8 md:h-10 w-auto"
                />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold tracking-wide text-white">
                {col.title}
              </h3>
              <ul className={`mt-3 md:mt-5 text-sm text-white/75 ${col.isCategories ? "grid grid-cols-2 gap-x-4 gap-y-2" : "space-y-2 md:space-y-3"}`}>
                {col.isCategories
                  ? col.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          to={item.to}
                          className="hover:text-white transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))
                  : col.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          to={item.to}
                          className="hover:text-white transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 border-t border-white/15 pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-white/70">
          <p>&copy; {new Date().getFullYear()} MediCard Egypt. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {phoneItem && (
              <a href={`tel:${phoneItem.url}`} className="hover:text-white transition-colors">
                {phoneItem.value}
              </a>
            )}
            {phoneItem && emailItem && <span>|</span>}
            {emailItem && (
              <a href={`mailto:${emailItem.url}`} className="hover:text-white transition-colors">
                {emailItem.value}
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

