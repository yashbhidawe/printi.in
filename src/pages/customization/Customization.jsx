import React, { useState } from "react";
import Layout from "../../components/layout/Layout.jsx";
import TemplateSelector from "../../components/templateselector/TemplateSelector.jsx";
import CustomizationComponent from "../../components/customizationcomponent/CustomizationComponent.jsx";

const templates = [
  {
    name: "Mug",
    preview: "/images/mug.png", // Direct path from the public folder
    url: "/images/mug.png", // Same path for the actual file
  },
  {
    name: "Card",
    preview: "/images/card.png",
    url: "/images/card.png",
  },
  {
    name: "T-Shirt",
    preview: "/images/t-shirt.png",
    url: "/images/t-shirt.png",
  },
];

function Customization() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    {
      name: "Mug",
      preview: "/images/mug.png",
      url: "/images/mug.png",
    },
    {
      name: "Card",
      preview: "/images/card.png",
      url: "/images/card.png",
    },
    {
      name: "T-Shirt",
      preview: "/images/t-shirt.png",
      url: "/images/t-shirt.png",
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
