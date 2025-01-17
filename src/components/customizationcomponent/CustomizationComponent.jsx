import React, { useRef, useEffect, useState } from "react";

const CustomizationComponent = ({ template }) => {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(20);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [zoomLevel, setZoomLevel] = useState(100);

  const fonts = [
    "Arial",
    "Times New Roman",
    "Courier New",
    "Georgia",
    "Verdana",
    "Helvetica",
  ];

  useEffect(() => {
    if (!window.fabric) {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js";
      script.async = true;
      script.onload = initCanvas;
      document.body.appendChild(script);
    } else {
      initCanvas();
    }

    function initCanvas() {
      if (canvasRef.current && !fabricRef.current) {
        fabricRef.current = new window.fabric.Canvas(canvasRef.current, {
          width: 600,
          height: 400,
          backgroundColor: "#ffffff",
        });

        // Add selection event listener
        fabricRef.current.on("selection:created", handleSelection);
        fabricRef.current.on("selection:updated", handleSelection);
        fabricRef.current.on("selection:cleared", () =>
          setSelectedObject(null)
        );
      }
    }

    return () => {
      if (fabricRef.current) {
        fabricRef.current.dispose();
        fabricRef.current = null;
      }
    };
  }, []);

  const handleSelection = (e) => {
    setSelectedObject(e.selected[0]);
  };

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file || !fabricRef.current || !window.fabric) return;

    if (file.type === "image/png" || file.type === "image/jpeg") {
      const reader = new FileReader();
      reader.onload = (e) => {
        window.fabric.Image.fromURL(e.target.result, (img) => {
          img.set({
            left: 50,
            top: 50,
            scaleX: 0.5,
            scaleY: 0.5,
          });
          fabricRef.current.add(img);
          fabricRef.current.setActiveObject(img);
          fabricRef.current.renderAll();
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddText = () => {
    if (!fabricRef.current || !window.fabric) return;

    const text = new window.fabric.Textbox("Type here", {
      left: 100,
      top: 100,
      width: 200,
      fontSize,
      fontFamily,
      fill: textColor,
    });

    fabricRef.current.add(text);
    fabricRef.current.setActiveObject(text);
    fabricRef.current.renderAll();
  };

  const handleTextColor = (color) => {
    setTextColor(color);
    if (selectedObject && selectedObject.type === "textbox") {
      selectedObject.set("fill", color);
      fabricRef.current.renderAll();
    }
  };

  const handleFontSize = (size) => {
    setFontSize(size);
    if (selectedObject && selectedObject.type === "textbox") {
      selectedObject.set("fontSize", size);
      fabricRef.current.renderAll();
    }
  };

  const handleFontFamily = (font) => {
    setFontFamily(font);
    if (selectedObject && selectedObject.type === "textbox") {
      selectedObject.set("fontFamily", font);
      fabricRef.current.renderAll();
    }
  };

  const handleZoom = (zoom) => {
    const zoomValue = zoom / 100;
    fabricRef.current.setZoom(zoomValue);
    setZoomLevel(zoom);
  };

  const handleDelete = () => {
    if (selectedObject) {
      fabricRef.current.remove(selectedObject);
      setSelectedObject(null);
    }
  };

  const handleCopy = () => {
    if (selectedObject) {
      selectedObject.clone((cloned) => {
        cloned.set({
          left: selectedObject.left + 20,
          top: selectedObject.top + 20,
        });
        fabricRef.current.add(cloned);
        fabricRef.current.setActiveObject(cloned);
        fabricRef.current.renderAll();
      });
    }
  };

  const handleSave = () => {
    if (!fabricRef.current) return;

    try {
      const dataUrl = fabricRef.current.toDataURL({
        format: "png",
        quality: 1,
        multiplier: 2, // Higher resolution export
      });
      console.log(
        "Canvas data URL generated:",
        dataUrl.substring(0, 100) + "..."
      );
      // Your upload logic here
    } catch (error) {
      console.error("Error saving canvas:", error);
    }
  };

  return (
    <div className="customization-component p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-center text-2xl font-semibold text-indigo-600 mb-4">
        Customize Your {template}
      </h3>

      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex flex-col">
          <label className="mb-1 text-sm">Upload Image</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleUpload}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm">Text Color</label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => handleTextColor(e.target.value)}
            className="w-20 h-10"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm">Font Size</label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) => handleFontSize(parseInt(e.target.value))}
            className="p-2 border border-gray-300 rounded"
            min="8"
            max="72"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm">Font Family</label>
          <select
            value={fontFamily}
            onChange={(e) => handleFontFamily(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            {fonts.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-sm">Zoom</label>
          <input
            type="range"
            min="50"
            max="200"
            value={zoomLevel}
            onChange={(e) => handleZoom(parseInt(e.target.value))}
            className="w-32"
          />
          <span className="text-sm text-center">{zoomLevel}%</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={handleAddText}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition duration-200"
        >
          Add Text
        </button>
        <button
          onClick={handleCopy}
          disabled={!selectedObject}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200 disabled:opacity-50"
        >
          Copy Selected
        </button>
        <button
          onClick={handleDelete}
          disabled={!selectedObject}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 disabled:opacity-50"
        >
          Delete Selected
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition duration-200"
        >
          Save & Upload
        </button>
      </div>

      <div className="border border-gray-300 rounded overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
};

export default CustomizationComponent;
