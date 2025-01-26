import React, { useState } from "react";
import Layout from "../../components/layout/Layout.jsx";
import TemplateSelector from "../../components/templateselector/TemplateSelector.jsx";
import CustomizationComponent from "../../components/customizationcomponent/CustomizationComponent.jsx";

function Customization() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    {
      id: "template-mug-01",
      title: "Custom Coffee Mug",
      name: "Custom Coffee Mug",
      description: "High-quality ceramic mug for personalized designs",
      category: "Drinkware",
      imageUrl: "/images/mug.png",
      preview: "/images/mug.png",
      price: "400",
      quantity: "1",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    },
    {
      id: "template-card-01",
      title: "Business Card",
      name: "Business Card",
      description: "Professional business cards with custom designs",
      category: "Stationery",
      imageUrl: "/images/card.png",
      preview: "/images/card.png",
      price: "2.5",
      quantity: "1000",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    },
    {
      id: "template-tshirt-01",
      title: "Custom T-Shirt",
      name: "Custom T-Shirt",
      description: "Premium cotton t-shirts for custom printing",
      category: "Apparel",
      imageUrl: "/images/t-shirt.png",
      preview: "/images/t-shirt.png",
      price: "500",
      quantity: "1",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-200 flex flex-col items-center py-8">
        {!selectedTemplate ? (
          <TemplateSelector
            templates={templates}
            onTemplateSelect={setSelectedTemplate}
          />
        ) : (
          <CustomizationComponent selectedTemplate={selectedTemplate} />
        )}
      </div>
    </Layout>
  );
}

export default Customization;
