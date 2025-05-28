import React, { useState } from "react";
import client1 from "../../assets/images/client-1.png";
import client2 from "../../assets/images/client-2.png";

const testimonials = [
  {
    id: 1,
    content:
      "I've been amazed by the quality of freelancers on this platform. The talent pool is exceptional, and the platform makes it incredibly easy to find and collaborate with the right professionals. The work delivered consistently exceeds my expectations.",
    author: {
      name: "Sarah Anderson",
      image: client1,
      role: "Product Manager at TechCorp",
    },
  },
  {
    id: 2,
    content:
      "This marketplace has transformed how we handle our project outsourcing. The quality of work, communication, and professionalism of the freelancers here is outstanding. It's become our go-to platform for finding specialized talent.",
    author: {
      name: "Michael Chen",
      image: client2,
      role: "Creative Director",
    },
  },
];

const ClientFeedback = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          We love our client feedback
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-xl shadow-lg p-8">
            {/* Quote Icon */}
            <div className="absolute -top-4 left-8 text-[#86D420] text-6xl">
              "
            </div>

            <div className="mt-6">
              <p className="text-gray-600 text-lg leading-relaxed">
                {testimonials[currentTestimonial].content}
              </p>

              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[currentTestimonial].author.image}
                    alt={testimonials[currentTestimonial].author.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {testimonials[currentTestimonial].author.name}
                    </h4>
                    <p className="text-[#86D420]">
                      {testimonials[currentTestimonial].author.role}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-full border border-gray-300 hover:border-[#86D420] transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-full border border-gray-300 hover:border-[#86D420] transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientFeedback;
