import React, { useState } from "react";

const FileUpload = () => {
  const [image, setImage] = useState(null); // Store the selected file
  const [imageUrl, setImageUrl] = useState(""); // Store the uploaded image URL
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setImage(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "m5vy063f");

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setImageUrl(data.secure_url); // Save the uploaded image URL
        alert("Image uploaded successfully!");
      } else {
        console.error("Error uploading image", data);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h1>Upload an Image</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={loading}
      />
      {loading && <p>Uploading...</p>}
      {imageUrl && (
        <div>
          <p>Image uploaded successfully!</p>
          <img src={imageUrl} alt="Uploaded" style={{ width: "300px" }} />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
