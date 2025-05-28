import React from "react";
import howItWorks from "../../assets/images/how-it-works.png";

const features = [
  {
    id: 1,
    text: "Connect with pros collaborate better succeed faster",
  },
  {
    id: 2,
    text: "Redefine work Join now for a better experience",
  },
  {
    id: 3,
    text: "Streamline collaboration unlock success",
  },
  {
    id: 4,
    text: "Join us redefine your work experience",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-[#f8fdf2]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-800">How it's work</h2>
            <div className="text-2xl font-semibold text-[#86D420]">
              Global trust of 1 Million bussiness and counting
            </div>
            <p className="text-gray-600">
              Connect with skilled professional, estimate collaboration and
              unlocked success. Join now and redefine your work experience!
            </p>

            <div className="space-y-4">
              {features.map((feature) => (
                <div key={feature.id} className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-[#86D420]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>

            <button className="px-8 py-3 bg-[#86D420] text-white rounded-full hover:bg-[#78bf1d] transition-colors">
              Find Great Work
            </button>
          </div>

          <div className="relative">
            <img
              src={howItWorks}
              alt="How it works"
              className="w-full rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
