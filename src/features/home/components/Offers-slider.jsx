import { Swiper, SwiperSlide } from "swiper/react";

import { A11y, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";


const OffersSlider = ({ sliders }) => {
  return (
    <>
      <h2 className="my-8 text-3xl font-bold text-black">
        Why Choose MediCard?
      </h2>

      <Swiper
        className="offers-slider"
        modules={[Navigation, A11y]}
        navigation
        spaceBetween={0}
        slidesPerView={2.5}
      >
        {sliders?.map((provider) => (
          <SwiperSlide key={provider.id}>
            <div className="p-6 w-120 text-center flex flex-col gap-2  m-10">
              <img
                src={
                  "https://images.pexels.com/photos/17227607/pexels-photo-17227607.jpeg"
                }
                className="w-full rounded-xl mx-auto"
              />
              {/* <p className="font-semibold text-lg">{provider.name}</p> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default OffersSlider;
