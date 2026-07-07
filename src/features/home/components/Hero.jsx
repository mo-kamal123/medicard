import { useNavigate } from "react-router-dom";
import SearchInput from "../../../shared/components/Search-input";
import appstore from "../../../assets/app-store.svg";
import googleplay from "../../../assets/google-play.svg";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative hero-bg flex items-center bg-cover bg-center bg-no-repeat">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-20 py-20">
        <div className="grid lg:grid-cols-1 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left text-white">
            <span className="inline-block px-4 py-2 mb-6 rounded-full text-black bg-white/10 backdrop-blur-md border border-white/20 text-sm tracking-wide">
              Modern Healthcare Platform
            </span>

            <h1 className="text-6xl text-black md:text-6xl font-bold leading-tight mb-6">
              Less Cost
              <span className="text-sec ml-4"> More Care.</span>
            </h1>

            <p className="text-lg md:text-xl text-[#4A5A7A] mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Access 2,000+ doctors, labs, pharmacies, gyms & home services
              across Egypt all with one MediCard membership.
            </p>

            {/* Search */}
            <div className="mb-10 flex justify-center lg:justify-start">
              <SearchInput
                placeholder="Doctor name, pharmacy, lab…"
                showButton
                className="max-w-2xl"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/buy-card")}
                className="px-8 py-3 w-40 text-sm font-medium text-white bg-main rounded-lg hover:bg-sec transition"
              >
                Activate Card
              </button>

              <button
                onClick={() => navigate("/become-provider")}
                className="px-5 py-3 text-sm font-medium bg-white text-main border border-main rounded-lg hover:bg-blue-50 transition"
              >
                Become a Provider
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-10 bottom-10 flex items-center gap-5">
        <img src={googleplay} alt="" />
        <img src={appstore} alt="" />
      </div>
    </section>
  );
};

export default Hero;
