'use client'

import SubsidiariesTable from "@/Components/Admin/SubsidiariesTable/SubsidiariesTable";
import { useState } from "react";

const CompanyForm = () => {
  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const [previewFile, setPreviewFile] = useState(null);
  const [previewType, setPreviewType] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);

      if (file.type.startsWith("image/")) setPreviewType("image");
      else if (file.type.startsWith("video/")) setPreviewType("video");
      else setPreviewType("other");

      setPreviewFile({ file, url, name: file.name });
    } else {
      setPreviewFile(null);
      setPreviewType(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!previewFile) {
      setMessage("Please upload an image.");
      return;
    }
    if (!name.trim() || !description.trim()) {
      setMessage("All fields are required!");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      // 1️⃣ Upload to Cloudinary
      const uploadData = new FormData();
      uploadData.append("file", previewFile.file);
      uploadData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
        { method: "POST", body: uploadData }
      );
      const cloudData = await cloudRes.json();

      if (!cloudData.secure_url) throw new Error("Cloudinary upload failed.");

      // 2️⃣ Save to MongoDB via API
      const apiRes = await fetch("/api/subsidiaries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          image: cloudData.secure_url,
          public_id: cloudData.public_id, // ✅ include this
        }),
      });

      const apiData = await apiRes.json();

      if (apiRes.ok) {
        setMessage("Company saved successfully!");
        setName("");
        setDescription("");
        setPreviewFile(null);
        setPreviewType(null);
      } else {
        setMessage(apiData.message || "Failed to save company.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred. Check console.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto py-40 px-6 rounded-md shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Add Company</h2>

        {/* File Upload */}
        <div className="mb-4">
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="w-full"
            onChange={handleFileChange}
          />
          {previewFile && (
            <div className="mt-2">
              {previewType === "image" && (
                <img
                  src={previewFile.url}
                  alt="Preview"
                  className="w-40 h-40 object-contain border rounded"
                />
              )}
            </div>
          )}
        </div>

        {/* Company Name */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Company Name"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <textarea
            placeholder="Description"
            className="w-full p-2 border rounded"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={uploading}
          className={`w-full py-2 rounded text-white ${
            uploading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {uploading ? "Uploading..." : "Submit"}
        </button>

        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </form>

      {/* Table with delete option */}
      <SubsidiariesTable />
    </div>
  );
};

export default CompanyForm;
