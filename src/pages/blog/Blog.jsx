import React from "react";
import { Menu } from "@headlessui/react";
import { Calendar, User, ArrowRight } from "lucide-react";
import Layout from "../../components/layout/Layout";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <a href={blog.link} className="block group">
          <h2 className="text-2xl font-semibold text-primary group-hover:text-primaryLight transition-colors duration-200 mb-3">
            {blog.title}
          </h2>
        </a>

        <p className="text-textDark/70 mb-4">{blog.description}</p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-bgSecondary">
          <div className="flex items-center space-x-4 text-sm text-textDark/60">
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span>{blog.date}</span>
            </div>
          </div>

          <a
            href={blog.link}
            className="flex items-center text-accent hover:text-primary transition-colors duration-200"
          >
            Read More
            <ArrowRight size={16} className="ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  const blogs = [
    {
      title: "The Art of Custom Printing: Ideas for Personalized Products",
      description:
        "Explore creative ideas for custom printing on T-shirts, mugs, and more.",
      link: "https://www.printful.com/blog/custom-printing-ideas",
      author: "Printful Blog",
      date: "Jan 10, 2025",
    },
    {
      title: "Design Tips for Print Marketing Materials",
      description:
        "Learn how to design stunning brochures, flyers, and business cards.",
      link: "https://99designs.com/blog/marketing-advertising/print-design-tips/",
      author: "99designs",
      date: "Jan 5, 2025",
    },
    {
      title: "Choosing the Best Paper for Your Print Projects",
      description:
        "A guide to selecting the perfect paper type for your prints.",
      link: "https://www.vistaprint.com/hub/choosing-paper-for-print-projects",
      author: "Vistaprint Blog",
      date: "Dec 30, 2024",
    },
    {
      title: "Top Trends in Custom Print Designs for 2025",
      description:
        "Discover the latest design trends for custom printing in the new year.",
      link: "https://blog.zazzle.com/custom-print-design-trends/",
      author: "Zazzle Blog",
      date: "Dec 28, 2024",
    },
    {
      title: "How to Create Eye-Catching Packaging Designs",
      description:
        "Tips for creating custom packaging that stands out on shelves.",
      link: "https://packlane.com/blog/packaging-design-tips",
      author: "Packlane Blog",
      date: "Dec 20, 2024",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-bgLight">
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-primary mb-4">
                Explore Printing & Design Resources
              </h1>
              <p className="text-lg text-textDark/80">
                Discover helpful resources and articles on custom printing,
                creative designs, and trends in the printing industry.
              </p>
            </div>

            <div className="space-y-6">
              {blogs.map((blog, index) => (
                <BlogCard key={index} blog={blog} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
