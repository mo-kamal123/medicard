import { useNavigate } from "react-router-dom";
import SearchInput from "../../../shared/components/Search-input";
import appstore from "../../../assets/app-store.svg";
import googleplay from "../../../assets/google-play.svg";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative hero-bg flex items-center bg-cover bg-center bg-no-repeat min-h-[70vh] md:min-h-0">
      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-20 py-10 md:py-20">
        <div className="items-center ">
          <div className="text-center lg:text-left text-white">

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black font-bold leading-tight mb-4 md:mb-6">
              Less Cost
              <span className="text-sec ml-2 md:ml-4"> More Care.</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#4A5A7A] mb-6 md:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Access 2,000+ doctors, labs, pharmacies, gyms & home services
              across Egypt all with one MediCard membership.
            </p>

            <div className="mb-6 md:mb-10 flex justify-center lg:justify-start">
              <SearchInput
                placeholder="Doctor name, pharmacy, lab…"
                showButton
                className="max-w-2xl"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/buy-card")}
                className="px-6 md:px-8 py-2.5 md:py-3 text-xs md:text-sm font-medium text-white bg-main rounded-lg hover:bg-sec transition"
              >
                Activate Card
              </button>

              <button
                onClick={() => navigate("/become-provider")}
                className="px-4 md:px-5 py-2.5 md:py-3 text-xs md:text-sm font-medium bg-white text-main border border-main rounded-lg hover:bg-blue-50 transition"
              >
                Become a Provider
              </button>
            </div>

            <div className="mt-6 md:mt-10 flex items-center justify-center lg:justify-end gap-4 md:gap-5">
              <img src={googleplay} alt="Google Play" className="h-8 md:h-14 w-auto" />
              <img src={appstore} alt="App Store" className="h-8 md:h-14 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
