import React, { useState } from "react";
import { read, utils } from "xlsx-js-style";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const IDCardGenerator = () => {
  const [excelData, setExcelData] = useState(null);
  const [error, setError] = useState(null);
  const [previewCards, setPreviewCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cardType, setCardType] = useState("corporate");
  const [generating, setGenerating] = useState(false);
  const [customLogo, setCustomLogo] = useState(null);
  const [customBackground, setCustomBackground] = useState(null);

  const cardTemplates = {
    corporate: {
      name: "Corporate ID",
      color: "bg-slate-50",
      accent: "border-blue-500",
      textAccent: "text-blue-600",
    },
    executive: {
      name: "Executive ID",
      color: "bg-gray-50",
      accent: "border-purple-500",
      textAccent: "text-purple-600",
    },
    student: {
      name: "Student ID",
      color: "bg-blue-50",
      accent: "border-indigo-500",
      textAccent: "text-indigo-600",
    },
    visitor: {
      name: "Visitor Pass",
      color: "bg-green-50",
      accent: "border-green-500",
      textAccent: "text-green-600",
    },
    event: {
      name: "Event Pass",
      color: "bg-orange-50",
      accent: "border-orange-500",
      textAccent: "text-orange-600",
    },
  };

  const validateExcelData = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("No valid data found in the Excel file");
    }

    const requiredFields = ["name", "id", "position", "department"];
    const headers = Object.keys(data[0]).map((header) => header.toLowerCase());

    const missingFields = requiredFields.filter(
      (field) => !headers.some((header) => header.includes(field))
    );

    if (missingFields.length > 0) {
      throw new Error(`Missing required columns: ${missingFields.join(", ")}`);
    }

    return true;
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setError(null);
    setIsLoading(true);

    try {
      if (!file) {
        throw new Error("Please select a file");
      }

      if (!file.name.match(/\.(xlsx|xls)$/)) {
        throw new Error("Please upload a valid Excel file (.xlsx or .xls)");
      }

      const data = await readExcelFile(file);
      validateExcelData(data);
      setExcelData(data);
      generatePreviewCards(data);
    } catch (err) {
      setError(err.message);
      setExcelData(null);
      setPreviewCards([]);
    } finally {
      setIsLoading(false);
    }
  };

  const readExcelFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = e.target.result;
          const workbook = read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = utils.sheet_to_json(worksheet);
          resolve(jsonData);
        } catch (error) {
          reject(
            new Error(
              "Error processing the Excel file. Please check the format."
            )
          );
        }
      };

      reader.onerror = () => {
        reject(new Error("Error reading the file"));
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const generatePreviewCards = (data) => {
    setPreviewCards(
      data.map((row) => ({
        name: row.Name || row.name || row.NAME,
        id: row.ID || row.Id || row.id,
        position: row.Position || row.position || row.POSITION,
        department: row.Department || row.department || row.DEPARTMENT,
        validUntil: row.ValidUntil || row["Valid Until"] || "2025",
        photo: row.Photo || row.photo || "/api/placeholder/100/100",
        additionalInfo: row["Additional Info"] || "",
        email: row.Email || row.email || "",
        phone: row.Phone || row.phone || "",
      }))
    );
  };

  const generatePDF = async () => {
    if (previewCards.length === 0) {
      setError("Please upload data first");
      return;
    }

    setGenerating(true);
    try {
      const container = document.getElementById("cards-container");
      const pdf = new jsPDF("p", "mm", "a4");
      const cardsPerPage = 4;

      for (let i = 0; i < previewCards.length; i += cardsPerPage) {
        if (i > 0) pdf.addPage();

        const pageCards = previewCards.slice(
          i,
          Math.min(i + cardsPerPage, previewCards.length)
        );
        const canvas = await html2canvas(container, {
          scale: 2,
          logging: false,
          backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/jpeg", 1.0);
        pdf.addImage(imgData, "JPEG", 10, 10, 190, 277);
      }

      pdf.save("id_cards.pdf");
    } catch (err) {
      setError("Error generating PDF. Please try again.");
    }
    setGenerating(false);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomLogo(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomBackground(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderCard = (card) => {
    const template = cardTemplates[cardType];
    return (
      <div
        className={`w-96 h-56 rounded-xl shadow-lg ${template.color} p-6 border-l-4 ${template.accent} transition-all duration-300 hover:shadow-xl relative`}
        style={{
          backgroundImage: customBackground ? `url(${customBackground})` : "",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {customLogo && (
          <img
            src={customLogo}
            alt="Custom Logo"
            className="absolute top-4 right-4 w-12 h-12"
          />
        )}
        <div className="flex gap-4">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
            {card.photo ? (
              <img
                src={card.photo}
                alt={card.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <span className="text-2xl text-gray-400">
                  {card.name?.[0]?.toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className={`text-xl font-bold ${template.textAccent} mb-2`}>
              {card.name}
            </h3>
            <p className="text-sm text-gray-600">{card.position}</p>
            <p className="text-sm text-gray-500">{card.department}</p>
            <p className="text-xs text-gray-400 mt-2">ID: {card.id}</p>
            {card.email && (
              <p className="text-xs text-gray-400 mt-1">Email: {card.email}</p>
            )}
            {card.phone && (
              <p className="text-xs text-gray-400 mt-1">Phone: {card.phone}</p>
            )}
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">
              Valid until: {card.validUntil}
            </p>
            <div className={`text-sm ${template.textAccent} font-semibold`}>
              {template.name}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          ID Card Generator
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Template
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={cardType}
                onChange={(e) => setCardType(e.target.value)}
              >
                {Object.entries(cardTemplates).map(([key, template]) => (
                  <option key={key} value={key}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Excel File
              </label>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Custom Logo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Custom Background
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleBackgroundUpload}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {previewCards.length > 0 && (
            <button
              onClick={generatePDF}
              disabled={generating}
              className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {generating ? "Generating PDF..." : "Generate PDF"}
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div
          id="cards-container"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {previewCards.map((card, index) => (
            <div key={index} className="flex justify-center">
              {renderCard(card)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IDCardGenerator;
