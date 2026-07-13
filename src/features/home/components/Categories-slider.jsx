import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import i18n, { getLanguageDirection } from "../../../shared/config/i18n/i18n";

import { A11y, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const CategoriesSlider = ({ categories }) => {
  const navigate = useNavigate();

  return (
    <Swiper
      key={i18n.language}
      dir={getLanguageDirection(i18n.language)}
      modules={[A11y, Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      spaceBetween={16}
      slidesPerView={2}
      breakpoints={{
        640: { slidesPerView: 3 },
        768: { slidesPerView: 7 },
      }}
    >
      {categories?.map((cat) => (
        <SwiperSlide key={cat.id}>
          <div
            onClick={() => navigate(`/providers?category=${encodeURIComponent(cat.name)}`)}
            className="cursor-pointer p-4 md:p-6 text-center flex flex-col gap-2 bg-blue-50 rounded-2xl my-6 md:my-10 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-blue-100"
          >
            <img src={cat.imageUrl} className="w-12 h-12 md:w-16 md:h-16 mx-auto" />
            <p className="font-semibold text-sm md:text-base">{cat.name}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategoriesSlider;