import { useTranslation } from "react-i18next";
import Hero from "../components/Hero";
import { useCategoriesQuery, useHomeData } from "../hooks/home.queries";
import CategoriesSlider from "../components/Categories-slider";
import { Provider } from "react-redux";
import ProvidersSlider from "../components/Providers-slider";
import Why from "../components/Why";
import OffersSlider from "../components/Offers-slider";
import Plans from "../components/Plans";
import ContactUs from "../components/Contact-us";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function HomePage() {
  const { t } = useTranslation();
  const location = useLocation();
  const { data: categoriesData } = useCategoriesQuery();
  const { data: homeData } = useHomeData();

  const categories = categoriesData || { data: [] };
  const providers = homeData?.data?.providers || [];
  const sliders = homeData?.data?.sliders || [];
  const plans = (homeData?.data?.plans || []).slice(0, 2);
  const contactUs = homeData?.data?.contactUs || null;

  console.log(homeData);
  useEffect(() => {
    if (!location.hash) return;

    let rafId = 0;
    let tries = 0;
    const maxTries = 60; // ~1s at 60fps

    const tryScroll = () => {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      tries += 1;
      if (tries < maxTries) rafId = window.requestAnimationFrame(tryScroll);
    };

    rafId = window.requestAnimationFrame(tryScroll);
    return () => window.cancelAnimationFrame(rafId);
  }, [location.hash]);

  return (
    <section className="">
      <Hero />
      <div className="w-[90%] m-auto">
        <CategoriesSlider categories={categories.data} />
        <section id="service-providers" className="scroll-mt-24">
          <h2 className="my-8 text-3xl font-bold">Service Providers</h2>
          <ProvidersSlider providers={providers} />
        </section>
        <section id="why" className="scroll-mt-24">
          <Why />
        </section>
        <section id="offers" className="scroll-mt-24">
          <OffersSlider sliders={sliders} />
        </section>
        <Plans plans={plans} />
        <section id="contact" className="scroll-mt-24">
          <ContactUs data={contactUs} />
        </section>
      </div>
      <Footer />
    </section>
  );
}
