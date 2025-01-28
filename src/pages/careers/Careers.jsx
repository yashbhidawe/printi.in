import React from "react";
import Layout from "../../components/layout/Layout";

const Careers = () => {
  const jobOpenings = [
    {
      title: "Receptionist",
      location: "Rajgurunagar",
      type: "Part-time",
      description:
        "We are looking for a talented receptionist with experience in handling customers, Microsoft Office and with good communication skills.",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
            Careers
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            Join our team and help us create amazing solutions for our
            customers!
          </p>
          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <div
                key={index}
                className="border border-gray-300 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <h2 className="text-2xl font-semibold text-gray-800">
                  {job.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {job.location} • {job.type}
                </p>
                <p className="text-gray-700 mt-3">{job.description}</p>
                <button className="mt-4 bg-primary text-white py-2 px-4 rounded-md hover:bg-accent transition-all">
                  <a
                    href="https://wa.me/918007800493"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    Apply Now
                  </a>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Careers;
