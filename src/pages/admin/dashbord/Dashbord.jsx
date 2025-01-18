import React, { useState, useEffect } from "react";

import Layout from "../../../components/layout/Layout.jsx";
import DashboardTab from "./DashbordTabs.jsx";

export default function Dashboard() {
  return (
    <Layout>
      <section className="text-gray-600 body-font mt-10 mb-10">
        <div className="container px-5 mx-auto">
          <h1 className="text-4xl font-bold text-center text-primary mb-10">
            Dashboard Overview
          </h1>
        </div>
        {/* Dashboard Tabs */}
        <div className="mt-10">
          <DashboardTab />
        </div>
      </section>
    </Layout>
  );
}
