"use client";

import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";

const Page = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
  });

  const [imageUrl, setImageUrl] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
  });
  const [announcement, setAnnouncement] = useState("");

  // Handle Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    // সব ইমেজ যাবে "site-settings" ফোল্ডারে
    formData.append("folder", "site-settings");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setImageUrl(data.secure_url);
  };

  // Handle Social Media Inputs
  const handleSocialChange = (e) => {
    setSocialLinks({
      ...socialLinks,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      imageUrl,
      socialLinks,
      announcement,
    };
    console.log("Form Data:", formData);
    // এখানে backend এ পাঠাতে পারো
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Site Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Upload */}
        <div>
          <label className="block font-medium">Upload Image</label>
          <input type="file" onChange={handleImageUpload} className="mt-2" />
          {imageUrl && (
            <img src={imageUrl} alt="Uploaded" className="mt-2 w-40 rounded-lg shadow" />
          )}
        </div>

        {/* Social Media Links */}
        <div>
          <label className="block font-medium">Facebook</label>
          <input
            type="url"
            name="facebook"
            value={socialLinks.facebook}
            onChange={handleSocialChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Instagram</label>
          <input
            type="url"
            name="instagram"
            value={socialLinks.instagram}
            onChange={handleSocialChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">LinkedIn</label>
          <input
            type="url"
            name="linkedin"
            value={socialLinks.linkedin}
            onChange={handleSocialChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Twitter</label>
          <input
            type="url"
            name="twitter"
            value={socialLinks.twitter}
            onChange={handleSocialChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Announcement */}
        <div>
          <label className="block font-medium">Announcement</label>
          <textarea
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            className="w-full p-2 border rounded"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Page;
