import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../../context/data/MyContext.jsx";
import {
  ArrowRight,
  Truck,
  Lock,
  Phone,
  Pencil,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const FeaturedCategories = () => {
  const navigate = useNavigate();
  const { product } = useContext(MyContext);

  const categories = [...new Set(product.map((item) => item.category))].map(
    (category) => ({
      name: category,
      image: product.find((p) => p.category === category)?.imageUrl,
    })
  );

  const CustomPrevButton = () => (
    <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors group">
      <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-gray-800" />
    </button>
  );

  const CustomNextButton = () => (
    <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors group">
      <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-gray-800" />
    </button>
  );

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Browse Categories
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="relative px-12">
          <Swiper
            spaceBetween={24}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-primary/60 !w-2 !h-2",
              bulletActiveClass: "swiper-pagination-bullet-active !bg-primary",
            }}
            className="!pb-12"
          >
            {categories.map((category) => (
              <SwiperSlide key={category.name}>
                <div
                  onClick={() => navigate(`/category/${category.name}`)}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-md aspect-square mb-4">
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-gray-800 font-medium text-lg group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-button-prev">
            <CustomPrevButton />
          </div>
          <div className="swiper-button-next">
            <CustomNextButton />
          </div>
        </div>
      </div>
    </section>
  );
};

// Featured Collection

const FeaturedCollection = () => {
  const navigate = useNavigate();
  const { product } = useContext(MyContext);

  const featuredProducts = product.slice(0, 5);
  const mainProduct = featuredProducts[0];
  const secondaryProducts = featuredProducts.slice(1);

  return (
    <section className="py-12 bg-bgLight">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium text-textDark">
            Featured Products
          </h2>
          <button
            onClick={() => navigate("/allproducts")}
            className="group flex items-center gap-1 text-sm text-primaryLight hover:text-primary"
          >
            View All
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mainProduct && (
            <div
              onClick={() => navigate(`/productinfo/${mainProduct.id}`)}
              className="group relative h-[28rem] rounded-xl overflow-hidden cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${mainProduct.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-medium text-white mb-2 transform transition-all duration-300 group-hover:translate-x-2">
                  {mainProduct.title}
                </h3>
                <button className="flex items-center gap-2 text-white/90 text-sm font-medium transform transition-all duration-300 group-hover:translate-x-2">
                  Shop Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {secondaryProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/productinfo/${item.id}`)}
                className="group relative h-[13.5rem] rounded-xl overflow-hidden cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-medium transform transition-all duration-300 group-hover:translate-x-2">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Benefits Section
const Benefits = () => {
  const benefits = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Free Shipping",
      description: "On orders over ₹1500",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Secure Payment",
      description: "100% secure payment",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Dedicated support",
    },
    {
      icon: <Pencil className="w-6 h-6" />,
      title: "Custom Orders",
      description: "Customize your orders",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center">
              <div
                className="w-12 h-12 mx-auto mb-4 rounded-full bg-primaryLight/10 
                            flex items-center justify-center text-primaryLight"
              >
                {benefit.icon}
              </div>
              <h3 className="text-lg font-medium text-textDark mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Newsletter Section
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your newsletter subscription logic here
    setStatus("Thanks for subscribing!");
    setEmail("");
    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <section className="py-16 bg-primaryLight/5">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-medium text-textDark mb-4">
          Stay Updated
        </h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Subscribe to our newsletter and get exclusive offers, new arrival
          alerts, and more.
        </p>
        <form onSubmit={handleSubmit} className="flex max-w-md mx-auto gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 
                     focus:outline-none focus:border-primaryLight"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-primaryLight text-white rounded-lg 
                     hover:bg-primary transition-all"
          >
            Subscribe
          </button>
        </form>
        {status && <p className="mt-4 text-green-600">{status}</p>}
      </div>
    </section>
  );
};

export { FeaturedCategories, FeaturedCollection, Benefits, Newsletter };
