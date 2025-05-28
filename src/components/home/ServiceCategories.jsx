import React from "react";
import devIT from "../../assets/images/development-and-it.png";
import design from "../../assets/images/design-and-creativity.png";
import writing from "../../assets/images/writing-and-translation.png";
import marketing from "../../assets/images/marketing-and-sales.png";

const categories = [
  {
    id: 1,
    title: "Development & IT",
    image: devIT,
    count: "5 Services",
  },
  {
    id: 2,
    title: "Design & Creative",
    image: design,
    count: "8 Services",
  },
  {
    id: 3,
    title: "Writing & Translation",
    image: writing,
    count: "6 Services",
  },
  {
    id: 4,
    title: "Marketing & Sales",
    image: marketing,
    count: "7 Services",
  },
];

const ServiceCard = ({ title, image, count }) => (
  <div className="relative group cursor-pointer overflow-hidden rounded-lg">
    <img
      src={image}
      alt={title}
      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
      <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
      <p className="text-[#86D420]">{count}</p>
    </div>
  </div>
);

const ServiceCategories = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Browse Service by category
            </h2>
            <p className="text-gray-600">
              Your One-Stop Online Marketplace for Everything You Need
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <ServiceCard key={category.id} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
