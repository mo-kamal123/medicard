import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import "swiper/css";
import beats from "../../../assets/beats.svg";
import PlanCard from "../../../shared/components/Plan-card";
import i18n, { getLanguageDirection } from "../../../shared/config/i18n/i18n";

const Plans = ({ plans = [] }) => {
  const { i18n: i18nHook } = useTranslation();
  const isRTL = i18nHook.dir() === "rtl";

  if (!plans.length) return null;

  return (
    <>
      <h2 className="my-6 md:my-8 text-2xl md:text-3xl font-bold text-black">
        MediCard Plans
      </h2>

      <div className="flex items-center">
        <img
          src={beats}
          alt=""
          className={`hidden md:block ${isRTL ? "" : "rotate-180"}`}
        />

        <div className="hidden md:flex w-full flex-row items-stretch justify-between gap-4 md:gap-5">
          {plans.map((plan, index) => (
            <PlanCard
              key={plan.id}
              data={{
                title: plan.name,
                price: plan.priceAfter,
                priceBefore: plan.priceBefore,
                discount: plan.discountPercentage,
                benefits: plan.description.split("/").map((s) => s.trim()),
              }}
              active={index === 1}
            />
          ))}
        </div>

        <div className="md:hidden w-full">
          <Swiper
            key={i18n.language}
            dir={getLanguageDirection(i18n.language)}
            modules={[A11y]}
            spaceBetween={16}
            slidesPerView={1.2}
          >
            {plans.map((plan, index) => (
              <SwiperSlide key={plan.id}>
                <PlanCard
                  data={{
                    title: plan.name,
                    price: plan.priceAfter,
                    priceBefore: plan.priceBefore,
                    discount: plan.discountPercentage,
                    benefits: plan.description.split("/").map((s) => s.trim()),
                  }}
                  active={index === 1}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <img
          src={beats}
          alt=""
          className={`hidden md:block ${isRTL ? "rotate-180" : ""}`}
        />
      </div>
    </>
  );
};

export default Plans;