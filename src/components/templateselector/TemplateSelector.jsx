import React from "react";

const TemplateSelector = ({ templates, onTemplateSelect }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
  };

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
            key={template.id || index}
            className="group relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onTemplateSelect(template)}
          >
            {/* Template Image */}
            <img
              src={template.imageUrl || template.preview}
              alt={template.title || template.name}
              className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-white text-center p-4">
              <h3 className="text-lg font-semibold">
                {template.title || template.name}
              </h3>
              <p className="text-sm mt-1">{template.description}</p>
              <p className="text-sm mt-2">Click to select</p>
            </div>

            {/* Template Details Panel */}
            <div className="p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-800">
                  {template.title || template.name}
                </h3>
                <span className="text-green-600 font-bold">
                  ₹{formatPrice(template.price)}
                </span>
              </div>

              <div className="space-y-1 text-sm text-gray-600">
                <p className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-medium">{template.category}</span>
                </p>
                <p className="flex justify-between">
                  <span>Quantity:</span>
                  <span className="font-medium">{template.quantity} pcs</span>
                </p>
                <p className="flex justify-between">
                  <span>Added:</span>
                  <span className="font-medium">
                    {formatDate(template.date)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
