import { Swiper, SwiperSlide } from "swiper/react";

import { A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ProvidersSlider = ({ providers }) => {
  return (
    <Swiper modules={[A11y]} spaceBetween={20} slidesPerView={4}>
      {providers?.map((provider) => (
        <SwiperSlide key={provider.id}>
          <div className="p-6 text-center flex flex-col gap-2  m-10 w-40">
            <img
              src={provider.imageUrl}
              className="w-16 h-16 rounded-full mx-auto"
            />
            {/* <p className="font-semibold text-lg">{provider.name}</p> */}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProvidersSlider;
