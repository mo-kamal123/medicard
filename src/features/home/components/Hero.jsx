import React from "react";
import SearchInput from "../../../shared/components/Search-input";

const Hero = () => {
  return (
    <section className="relative hero-bg flex items-center bg-cover bg-center bg-no-repeat">
      {/* Dark Overlay */}
      {/* <div className="absolute inset-0 bg-black/60"></div> */}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-20 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left text-white">
            <span className="inline-block px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm tracking-wide">
              Modern Healthcare Platform
            </span>

            <h1 className="text-5xl text-black md:text-6xl font-bold leading-tight mb-6">
              Less Cost
              <span className="text-sec ml-4">Our Priority</span>
            </h1>

            <p className="text-lg md:text-xl text-[#4A5A7A] mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Access 2,000+ doctors, labs, pharmacies, gyms & home services
              across Egypt all with one MediCard membership.
            </p>

            {/* Search */}
            <div className="mb-10 flex justify-center lg:justify-start">
              <SearchInput />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 rounded-xl bg-main text-white font-semibold shadow-lg hover:scale-105 hover:bg-main/90 transition-all duration-300">
                Get Started
              </button>

              <button className="px-8 py-4 rounded-xl border border-white/30 bg-white/10 backdrop-blur-md text-white font-semibold hover:bg-white/20 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
