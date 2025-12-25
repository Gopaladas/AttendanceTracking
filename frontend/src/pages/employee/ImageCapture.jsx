    import React, { useState } from 'react';
import axios from 'axios';

const ImageCapture = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  // Cloudinary Details (Note: In real projects, use .env files)
  const CLOUD_NAME = "your_cloud_name"; 
  const UPLOAD_PRESET = "your_unsigned_preset"; 

  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return alert("Photo capture cheyaledhu bro!");

    setLoading(true);
    try {
      // 1. Prepare for Cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", UPLOAD_PRESET);

      // 2. Upload to Cloudinary
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      const imageUrl = res.data.secure_url;
      console.log("Cloudinary URL:", imageUrl);

      // 3. Send URL to your Backend
      await axios.post("http://localhost:5000/api/attendance/save", {
        imageUrl: imageUrl,
        empId: "EMP123" // Example data
      });

      alert("Image captured and link sent to backend!");
    } catch (err) {
      console.error("Error:", err);
      alert("Upload failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      {/* 'capture' attribute opens camera on mobile */}
      <input 
        type="file" 
        accept="image/*" 
        capture="environment" 
        onChange={handleCapture} 
      />

      {preview && (
        <div style={{ margin: '20px' }}>
          <img src={preview} alt="preview" style={{ width: '250px', borderRadius: '10px' }} />
        </div>
      )}

      <br />
      
      <button 
        onClick={handleUpload} 
        disabled={loading}
        style={{ padding: '10px 20px', cursor: 'pointer' }}
      >
        {loading ? "Processing..." : "Submit to Backend"}
      </button>
    </div>
  );
};

export default ImageCapture;