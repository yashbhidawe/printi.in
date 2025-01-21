import React, { useState } from "react";
import { read, utils } from "xlsx-js-style";

const IDCardGenerator = () => {
  const [excelData, setExcelData] = useState(null);
  const [error, setError] = useState(null);
  const [previewCards, setPreviewCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      }))
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* File Upload Section */}
      <div className="mb-8">
        <div className="max-w-xl mx-auto">
          <label
            htmlFor="file-upload"
            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer 
              transition-all ${
                isLoading
                  ? "border-gray-400 bg-gray-100"
                  : "border-gray-300 bg-gray-50 hover:bg-gray-100"
              }`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {isLoading ? (
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              ) : (
                <>
                  {/* Simple upload icon using SVG */}
                  <svg
                    className="w-12 h-12 mb-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    Excel files only (XLSX, XLS)
                  </p>
                </>
              )}
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              disabled={isLoading}
            />
          </label>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
          <p className="font-medium">Error: {error}</p>
        </div>
      )}

      {/* ID Cards Preview */}
      {previewCards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
            >
              {/* Card Header */}
              <div className="bg-primary p-4 text-white text-center">
                <h3 className="text-xl font-bold">Company Name</h3>
                <p className="text-sm">Employee ID Card</p>
              </div>

              <div className="p-6">
                {/* Employee Photo Placeholder */}
                <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500">Photo</span>
                </div>

                {/* Employee Details */}
                <div className="space-y-2 text-center">
                  <p className="font-bold text-xl">{card.name || "N/A"}</p>
                  <p className="text-gray-600 font-medium">
                    {card.position || "Position"}
                  </p>
                  <div className="bg-gray-100 py-1 px-3 rounded-full inline-block">
                    <p className="text-gray-600">ID: {card.id || index + 1}</p>
                  </div>
                  <p className="text-gray-500">
                    {card.department || "Department"}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="bg-gray-50 px-6 py-3 text-center border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Valid until:{" "}
                  <span className="font-medium">{card.validUntil}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IDCardGenerator;
