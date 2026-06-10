import { Swiper, SwiperSlide } from "swiper/react";

import { A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const CategoriesSlider = ({ categories }) => {
  return (
    <Swiper
      modules={[A11y]}
      spaceBetween={20}
      slidesPerView={4}
    >
      {categories?.map((cat) => (
        <SwiperSlide key={cat.id}>
          <div className="p-6 text-center flex flex-col gap-2 bg-blue-50 rounded-2xl m-10 w-40">
            <img src={cat.imageUrl} className="w-16 h-16 mx-auto" />
            <p className="font-semibold text-lg">{cat.name}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategoriesSlider;