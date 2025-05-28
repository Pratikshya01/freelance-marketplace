import React from "react";

const NewHeroSection = () => {
  return (
    <div className="flex relative flex-col justify-center items-start self-stretch px-20 py-28 mt-3 w-full min-h-[643px] max-md:px-5 max-md:py-24 max-md:max-w-full">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/0b205cbf4c7e46b8a5bb83ce4b2580c0/572d1f0d45cbe4498926bc2b2568da912480f620?placeholderIfAbsent=true"
        className="object-cover absolute inset-0 size-full"
      />
      <div className="relative mb-0 max-w-full w-[862px] max-md:mb-2.5">
        <div className="text-8xl font-semibold text-white leading-[108px] max-md:max-w-full max-md:text-4xl max-md:leading-[53px]">
          Connect with Top Freelancers Around the World
        </div>
        <div className="flex flex-wrap gap-5 justify-between py-3 pr-3 pl-6 mt-7 max-w-full rounded-3xl border border-solid bg-stone-500 bg-opacity-40 border-stone-400 w-[633px] max-md:pl-5">
          <div className="flex gap-2.5 my-auto text-base text-center text-stone-400">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/0b205cbf4c7e46b8a5bb83ce4b2580c0/f2e9906f64eb11fc24f30bf211064edfbdf5f578?placeholderIfAbsent=true"
              className="object-contain shrink-0 w-6 aspect-square"
            />
            <div>Search here</div>
          </div>
          <div className="px-6 py-3 text-xl font-semibold text-white whitespace-nowrap bg-lime-500 rounded-xl max-md:px-5">
            Search
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHeroSection;
