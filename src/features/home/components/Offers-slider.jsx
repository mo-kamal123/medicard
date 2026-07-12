import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import i18n, { getLanguageDirection } from "../../../shared/config/i18n/i18n";

import { A11y, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";


const OffersSlider = ({ sliders }) => {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="my-6 md:my-8 text-2xl md:text-3xl font-bold text-black">
        {t("offers.title")}
      </h2>

      <Swiper
        key={i18n.language}
        dir={getLanguageDirection(i18n.language)}
        className="offers-slider"
        modules={[ A11y, Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 1.5 },
          768: { slidesPerView: 2.5 },
        }}
      >
        {sliders?.map((provider) => (
          <SwiperSlide key={provider.id}>
            <div className="p-4 md:p-6 text-center flex flex-col gap-2 my-6 md:my-10">
              <img
                src={
                  "https://images.pexels.com/photos/17227607/pexels-photo-17227607.jpeg"
                }
                className="w-full rounded-xl mx-auto"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default OffersSlider;
