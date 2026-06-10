import { useTranslation } from "react-i18next";
import Hero from "../components/Hero";
import { useCategoriesQuery } from "../hooks/home.queries";
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
  const categories = {
    httpStatusCode: 200,
    errors: null,
    succeeded: true,
    message: "Categories retrieved successfully.",
    data: [
      {
        imageUrl: "https://medicard-api-v2.medicardeg.com/doctors.png",
        id: 1,
        name: "Doctors",
      },
      {
        imageUrl: "https://medicard-api-v2.medicardeg.com/labs.png",
        id: 2,
        name: "Labs",
      },
      {
        imageUrl: "https://medicard-api-v2.medicardeg.com/pharmacy.png",
        id: 3,
        name: "Pharmacy",
      },
      {
        imageUrl: "https://medicard-api-v2.medicardeg.com/gyms.png",
        id: 4,
        name: "Gyms",
      },
      {
        imageUrl: "https://medicard-api-v2.medicardeg.com/optical.png",
        id: 5,
        name: "Optical",
      },
    ],
  };
  const providers = {
    httpStatusCode: 200,
    errors: null,
    succeeded: true,
    message: "Home page data retrieved successfully.",
    data: {
      providers: [
        {
          id: 1,
          name: "Alfa Labs",
          imageUrl: "https://medicard-api-v2.medicardeg.com/alfa.png",
          providerCategoryId: 2,
        },
        {
          id: 2,
          name: "Gold's Gym",
          imageUrl: "https://medicard-api-v2.medicardeg.com/golds-gym.png",
          providerCategoryId: 4,
        },
        {
          id: 3,
          name: "Dar Al Fouad Hospital",
          imageUrl: "https://medicard-api-v2.medicardeg.com/daralfouad.png",
          providerCategoryId: 1,
        },
        {
          id: 4,
          name: "El Ezaby Pharmacy",
          imageUrl: "https://medicard-api-v2.medicardeg.com/elezaby.png",
          providerCategoryId: 3,
        },
        {
          id: 5,
          name: "Magrabi Optical",
          imageUrl: "https://medicard-api-v2.medicardeg.com/magrabi.png",
          providerCategoryId: 5,
        },
        {
          id: 6,
          name: "Al Salam International Hospital",
          imageUrl: "https://medicard-api-v2.medicardeg.com/alsalam.png",
          providerCategoryId: 1,
        },
        {
          id: 7,
          name: "Cairo Scan",
          imageUrl: "https://medicard-api-v2.medicardeg.com/cairoscan.png",
          providerCategoryId: 2,
        },
        {
          id: 8,
          name: "Fitness First",
          imageUrl: "https://medicard-api-v2.medicardeg.com/fitness-first.png",
          providerCategoryId: 4,
        },
      ],
      sliders: [],
      plans: [],
      contactUs: null,
    },
  };

  const { data } = useCategoriesQuery();
  console.log(data);

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
          <h2>Service Providers</h2>
          <ProvidersSlider providers={providers.data.providers} />
        </section>
        <section id="why" className="scroll-mt-24">
          <Why />
        </section>
        <section id="offers" className="scroll-mt-24">
          <OffersSlider providers={providers.data.providers} />
        </section>
        <Plans />
        <section id="contact" className="scroll-mt-24">
          <ContactUs />
        </section>
      </div>
      <Footer />
    </section>
  );
}
