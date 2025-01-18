import React from "react";

const TemplateSelector = ({ templates, onTemplateSelect }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
      {/* Header */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Choose a Template
      </h2>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onTemplateSelect(template)}
          >
            {/* Template Image */}
            <img
              src={template.preview}
              alt={template.name}
              className="w-full h-40 object-cover group-hover:opacity-90 transition-opacity"
            />

            {/* Template Details */}
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-white text-center">
              <h3 className="text-lg font-semibold">{template.name}</h3>
              <p className="text-sm mt-1">Click to select</p>
            </div>

            {/* Template Name */}
            <p className="text-center text-gray-700 font-medium py-3 bg-gray-50 group-hover:bg-primaryLight group-hover:text-white transition-colors">
              {template.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
