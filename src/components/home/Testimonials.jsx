import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const testimonials = [
  {
    id: 1,
    content:
      "I couldn't be happier with the incredible service I received! The team went above and beyond to cater to my needs, displaying a level of professionalism and expertise that truly impressed me. Their attention to detail and dedication to delivering top-notch results exceeded my expectations. I would wholeheartedly recommend their.",
    author: {
      name: "John Doe",
      image: "/images/testimonials/user1.jpg",
      role: "CEO at TechCorp",
    },
  },
  // Add more testimonials here
];

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            We love our client feedback
          </h2>
        </div>

        <div className="mt-12">
          <div className="relative max-w-3xl mx-auto">
            {/* Testimonial Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="relative text-center">
                <svg
                  className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-gray-100"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="mt-8 text-xl text-gray-500 leading-relaxed">
                  {testimonials[currentTestimonial].content}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-center">
                <img
                  className="h-12 w-12 rounded-full"
                  src={testimonials[currentTestimonial].author.image}
                  alt={testimonials[currentTestimonial].author.name}
                />
                <div className="ml-4 text-left">
                  <div className="text-base font-medium text-gray-900">
                    {testimonials[currentTestimonial].author.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonials[currentTestimonial].author.role}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -left-4 -translate-y-1/2">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50"
              >
                <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <div className="absolute top-1/2 -right-4 -translate-y-1/2">
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50"
              >
                <ChevronRightIcon className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
