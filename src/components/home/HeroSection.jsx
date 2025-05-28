import React, { useState } from "react";
import heroBg from "../../assets/images/hero-bg.png";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full relative bg-gray-100">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <h1 className="text-white text-[32px] sm:text-[44px] lg:text-[56px] leading-[1.2] font-bold">
            Connect with Top{" "}
            <div className="text-[#86D420] inline">Freelancers</div> Around
            <br className="hidden sm:block" />
            <span className="sm:ml-0">the World</span>
          </h1>
          <p className="text-white text-base sm:text-lg lg:text-xl mt-4 sm:mt-5 lg:mt-6 mb-6 sm:mb-7 lg:mb-8 max-w-2xl">
            Find the perfect freelance services for your business. Hire top
            talent and get your projects done with confidence.
          </p>

          {/* Search Container */}
          <div className="w-full max-w-[426px]">
            {/* Search Form */}
            <div className="flex flex-col gap-3">
              {/* Mobile & Tablet Search (visible below lg breakpoint) */}
              <div className="lg:hidden">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for any service..."
                  className="w-full bg-white rounded-[32px] px-6 py-4 sm:py-5 text-base outline-none text-gray-700 placeholder-gray-500 mb-3"
                />
                <button className="w-full bg-[#86D420] text-white text-base sm:text-lg font-medium py-4 sm:py-5 rounded-[32px] hover:bg-[#78bf1d] transition-colors">
                  Search
                </button>
              </div>

              {/* Desktop Search (visible from lg breakpoint) */}
              <div className="hidden lg:block relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search here"
                  className="w-full bg-[#2A2A2A] rounded-[32px] pl-12 pr-32 py-4 text-white placeholder-gray-400 outline-none"
                />
                <div className="absolute left-5 top-1/2 -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <button className="absolute right-0 top-0 h-full bg-[#86D420] text-white px-8 rounded-[32px] font-medium hover:bg-[#78bf1d] transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-white">
              <span className="text-base">Popular:</span>
              <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-2">
                {["Web Development", "Design", "Marketing", "Writing"].map(
                  (tag) => (
                    <button
                      key={tag}
                      className="text-base text-white/80 hover:text-[#86D420] transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
