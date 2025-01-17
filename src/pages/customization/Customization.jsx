import React, { useState } from "react";
import Layout from "../../components/layout/Layout.jsx";
import TemplateSelection from "../../components/templateselection/TemplateSelection.jsx";
import CustomizationComponent from "../../components/customizationcomponent/CustomizationComponent.jsx";

function Customization() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateSelection = (template) => {
    setSelectedTemplate(template);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8">
        {!selectedTemplate ? (
          <TemplateSelection onSelectTemplate={handleTemplateSelection} />
        ) : (
          <CustomizationComponent template={selectedTemplate} />
        )}
      </div>
    </Layout>
  );
}

export default Customization;
