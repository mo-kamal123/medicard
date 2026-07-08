import logo from "../../../assets/logo-light.svg";
import googlePlay from "../../../assets/google-play.svg";
import appStore from "../../../assets/app-store.svg";

const Footer = () => {
  const columns = [
    {
      title: "Services",
      items: [
        "Doctors",
        "Beauty",
        "Elder care",
        "Labs & Diagnostics",
        "Pharmacy",
        "Gyms & Wellness",
        "Home Services",
      ],
    },
    {
      title: "Membership",
      items: ["Standard Plan", "Silver 50+"],
    },
    {
      title: "Company",
      items: ["Terms and conditions", "Privacy Policy", "Refund Policy", "Contact Us"],
    },
  ];

  return (
    <footer className="mt-16 bg-sec text-white">
      <div className="w-[90%] m-auto px-4 md:px-6 lg:px-0 py-10 md:py-14">
        <div className="grid gap-8 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <img src={logo} alt="Medicard" className="h-8 md:h-10 w-auto" />
            <p className="mt-4 md:mt-5 text-sm leading-6 text-white/80 max-w-sm">
              Egypt&apos;s #1 healthcare membership card. Access 2,400+ providers,
              exclusive discounts, and comprehensive family health management in
              one card.
            </p>

            <div className="mt-4 md:mt-6 flex flex-wrap items-center gap-3 md:gap-4">
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
              <ul className="mt-3 md:mt-5 space-y-2 md:space-y-3 text-sm text-white/75">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 border-t border-white/15 pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-white/70">
          <p>© 2025 MediCard Egypt. All rights reserved.</p>
          <p>
            +19011 |{" "}
            <a
              href="mailto:support@medicard.com.eg"
              className="hover:text-white transition-colors"
            >
              support@medicard.com.eg
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

