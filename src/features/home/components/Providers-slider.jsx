import { Swiper, SwiperSlide } from "swiper/react";

import { A11y, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ProvidersSlider = ({ providers }) => {
  return (
    <Swiper
      modules={[A11y, Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      spaceBetween={16}
      slidesPerView={2}
      breakpoints={{
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
      }}
    >
      {providers?.map((provider) => (
        <SwiperSlide key={provider.id}>
          <div className="p-4 md:p-6 text-center flex flex-col gap-2 my-6 md:my-10">
            <img
              src={provider.imageUrl}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProvidersSlider;
