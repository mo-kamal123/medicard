import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import Hero from "../components/Hero";
import { useCategoriesQuery, useHomeData } from "../hooks/home.queries";
import CategoriesSlider from "../components/Categories-slider";
import ProvidersSlider from "../components/Providers-slider";
import Why from "../components/Why";
import OffersSlider from "../components/Offers-slider";
import Plans from "../components/Plans";
import ContactUs from "../components/Contact-us";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import banner from "../../../assets/sahel-banner.png";

export function HomePage({}) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(false);
  const { data: categoriesData } = useCategoriesQuery();
  const { data: homeData } = useHomeData();

  const categories = categoriesData || { data: [] };
  const providers = homeData?.data?.providers || [];
  const sliders = homeData?.data?.sliders || [];
  const plans = (homeData?.data?.plans || []).slice(0, 2);
  const contactUs = homeData?.data?.contactUs || null;

  useEffect(() => {
    if (!location.hash) return;

    const el = document.querySelector(location.hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.hash]);

  useEffect(() => {
    if (sessionStorage.getItem("medicard_banner_shown")) return;
    sessionStorage.setItem("medicard_banner_shown", "1");
    setShowBanner(true);
  }, []);

  return (
    <section className="">
      <Hero />
      <div className="w-[90%] mx-auto">
        <CategoriesSlider categories={categories.data} />
        <div className="mb-10 md:mb-16 cursor-pointer" onClick={() => navigate("/providers")}>
          <img src={banner} alt="banner" className="w-full rounded-2xl object-cover" />
        </div>
        <section id="service-providers" className="scroll-mt-24 mb-10 md:mb-16">
          <div className="mb-6 md:mb-8 flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold">{t("home.serviceProviders")}</h2>
            <span
              onClick={() => navigate("/providers")}
              className="cursor-pointer rounded-lg bg-main px-4 py-2 text-sm font-medium text-white transition hover:bg-sec"
            >
              {t("home.seeMore")}
            </span>
          </div>
          <ProvidersSlider providers={providers} />
        </section>
        <section id="why" className="scroll-mt-24 mb-10 md:mb-16">
          <Why />
        </section>
        <section id="offers" className="scroll-mt-24 mb-10 md:mb-16">
          <OffersSlider sliders={sliders} />
        </section>
        <section id="contact" className="scroll-mt-24">
          <ContactUs data={contactUs} />
        </section>
      </div>
      <Footer categories={categories.data} contactUs={contactUs} />

      {showBanner && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6"
          onClick={() => setShowBanner(false)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowBanner(false)}
              className="absolute -top-3 -right-3 z-10 rounded-full bg-white p-1.5 shadow-md hover:bg-gray-100"
              aria-label="Close banner"
            >
              <X size={18} />
            </button>
            <img
              src={banner}
              alt="banner"
              className="max-h-[55vh] md:max-h-[75vh] w-auto max-w-[92vw] md:max-w-180 cursor-pointer rounded-2xl object-contain"
              onClick={() => { setShowBanner(false); navigate("/providers"); }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
