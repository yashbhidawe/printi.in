import React from "react";
import { FaUserTie } from "react-icons/fa";
import Layout from "../../../components/layout/Layout.jsx";
import DashboardTab from "./DashbordTabs.jsx";

export default function Dashboard() {
  const stats = [
    {
      id: 1,
      title: "Total Products",
      value: 10,
      icon: <FaUserTie size={50} />,
    },
    { id: 2, title: "Total Orders", value: 10, icon: <FaUserTie size={50} /> },
    { id: 3, title: "Total Users", value: 20, icon: <FaUserTie size={50} /> },
    { id: 4, title: "Total Revenue", value: 20, icon: <FaUserTie size={50} /> },
  ];

  return (
    <Layout>
      <section className="text-gray-600 body-font mt-10 mb-10">
        <div className="container px-5 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="border-2 shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] bg-primary-light border-primary-dark px-4 py-6 rounded-xl hover:shadow-lg hover:shadow-primary-dark transition-shadow duration-300"
              >
                <div className="text-primary w-12 h-12 mb-4 mx-auto">
                  {stat.icon}
                </div>
                <h2 className="text-3xl font-bold text-center text-secondary mb-2">
                  {stat.value}
                </h2>
                <p className="text-lg font-medium text-center text-primary">
                  {stat.title}
                </p>
              </div>
            ))}
          </div>
        </div>
        <DashboardTab />
      </section>
    </Layout>
  );
}
