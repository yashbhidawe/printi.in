import React, { useRef, useState, useEffect } from "react";
import * as fabric from "fabric";
import axios from "axios";
import { toast } from "react-toastify";

function CustomizationCanvas() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    // Initialize Fabric.js canvas
    const c = new fabric.Canvas(canvasRef.current);
    setCanvas(c);

    return () => {
      // Cleanup the canvas instance
      c.dispose();
    };
  }, []);

  // Handle image upload and add to canvas
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        fabric.Image.fromURL(e.target.result, (img) => {
          img.set({ left: 100, top: 100 }).scale(0.5);
          canvas.add(img);
        });
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please upload a PNG or JPEG image.");
    }
  };

  // Handle text addition
  const handleAddText = () => {
    const text = new fabric.Textbox("Type here", {
      left: 50,
      top: 50,
      width: 200,
      fontSize: 20,
    });
    canvas.add(text);
  };

  // Convert canvas to data URL and upload to Cloudinary
  const handleSave = async () => {
    const dataUrl = canvas.toDataURL();
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          file: dataUrl,
          upload_preset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        }
      );
      const imageUrl = response.data.secure_url;
      toast.success("Image uploaded successfully! URL: " + imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    }
  };

  return (
    <div className="customization-canvas">
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleUpload}
      />
      <button onClick={handleAddText}>Add Text</button>
      <button onClick={handleSave}>Save & Upload</button>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        style={{ border: "1px solid #000" }}
      />
    </div>
  );
}

export default CustomizationCanvas;
