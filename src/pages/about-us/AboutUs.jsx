import React from "react";
import Layout from "../../components/layout/Layout.jsx";
import { Building2, Users, Sparkles, Heart } from "lucide-react";

const AboutUs = () => {
  const features = [
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Our Story",
      description:
        "Founded with a vision to make personalization accessible and meaningful for everyone.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Our Team",
      description:
        "Passionate designers and experts committed to bringing your ideas to life.",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Quality First",
      description:
        "State-of-the-art printing technology ensuring premium quality products.",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Customer Focus",
      description:
        "Dedicated to creating products that you'll love and cherish for years.",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-bgLight to-bgSecondary">
        {/* Hero Section */}
        <div className="container px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Welcome to Printi.in
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-primaryLight max-w-2xl mx-auto">
              Your destination for high-quality customized products that bring
              your creative vision to life.
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12">
            <div className="max-w-3xl mx-auto">
              <p className="text-textDark leading-relaxed mb-6">
                At Printi.in, our mission is to empower you with the ability to
                express yourself through personalized items that capture your
                unique style and creativity. We believe that every item you
                create should be a reflection of who you are—whether it's a
                custom mug for your office, a personalized t-shirt, or a
                beautifully designed notebook.
              </p>
              <p className="text-textDark leading-relaxed">
                Our team of passionate designers and state-of-the-art printing
                technology ensures that each product meets the highest standards
                of quality and durability. From initial concept to final
                creation, we are committed to delivering products that you will
                love and cherish for years to come.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-bgLight rounded-full mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-primary font-semibold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-textDark">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-primaryLight text-lg mb-6">
              Thank you for choosing Printi.in as your go-to destination for all
              your personalized product needs.
            </p>
            <button className="bg-primary hover:bg-primaryLight text-textLight px-8 py-3 rounded-full transition-colors duration-300">
              Start Creating
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
