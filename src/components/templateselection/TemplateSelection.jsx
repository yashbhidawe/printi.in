import React from "react";

function TemplateSelection({ onSelectTemplate }) {
  const templates = ["t-shirt", "mug", "card"];

  return (
    <div className="template-selection">
      <h3 className="mb-4 text-center text-2xl font-bold text-primary">
        Select a Template
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template}
            className="template-item cursor-pointer p-4 border rounded-lg shadow-lg"
          >
            <img
              src={`src/assets/images/${template}.png`}
              alt={template}
              className="w-full h-40 object-contain mb-2"
            />
            <button
              onClick={() => onSelectTemplate(template)}
              className="w-full bg-primary text-white py-2 rounded"
            >
              Select {template}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelection;
