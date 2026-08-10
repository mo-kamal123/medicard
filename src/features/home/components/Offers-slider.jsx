import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import i18n, { getLanguageDirection } from "../../../shared/config/i18n/i18n";

import { A11y, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const OffersSlider = ({ sliders }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <h2 className="mb-6 md:mb-8 text-2xl md:text-3xl font-bold text-black">
        {t("offers.title")}
      </h2>

      <Swiper
        key={i18n.language}
        dir={getLanguageDirection(i18n.language)}
        className="offers-slider home-slider mb-8"
        modules={[A11y, Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2.5 },
        }}
      >
        {sliders?.map((provider) => (
          <SwiperSlide key={provider.id}>
            <div
              className="p-4 md:p-6 text-center flex flex-col gap-2 cursor-pointer"
              onClick={() => navigate(`/provider/${provider.providerId}`)}
            >
              <img
                src={provider.imageUrl}
                alt={provider.providerName}
                className="w-full rounded-xl mx-auto border border-gray-200 transition-shadow duration-300 hover:shadow-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default OffersSlider;
